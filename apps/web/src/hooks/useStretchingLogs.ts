import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { useAuthStore } from '../store/authStore'

export interface StretchingLog {
  id: string
  user_id: string
  routine_id: string | null
  completed_at: string
  duration_min: number | null
}

const STORAGE_KEY = 'carveout_stretching_logs'
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

function readLocal(): StretchingLog[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as StretchingLog[]
  } catch {
    return []
  }
}

function writeLocal(entries: StretchingLog[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

export function useStretchingLogs() {
  const user = useAuthStore((s) => s.user)
  const queryClient = useQueryClient()
  const qk = ['stretching_logs', user?.id ?? 'anon'] as const

  const query = useQuery({
    queryKey: qk,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    queryFn: async (): Promise<StretchingLog[]> => {
      if (!user) return readLocal()

      const { data, error } = await supabase
        .from('stretching_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false })

      if (error) return readLocal()
      return (data ?? []) as StretchingLog[]
    },
    enabled: true,
  })

  const addLog = useMutation({
    mutationFn: async (entry: {
      routine_id: string | null
      duration_min: number
      completed_at?: string
      display_name?: string
      subcategory?: string
    }): Promise<StretchingLog> => {
      const meta = { _displayName: entry.display_name, _subcategory: entry.subcategory }
      const newLog = Object.assign({
        id: crypto.randomUUID(),
        user_id: user?.id ?? 'local',
        routine_id: entry.routine_id,
        completed_at: entry.completed_at ?? new Date().toISOString().slice(0, 10),
        duration_min: entry.duration_min,
      }, meta) as StretchingLog

      if (!user) {
        const all = readLocal()
        writeLocal([newLog, ...all])
        return newLog
      }

      // Non-UUID routine_ids (custom sessions) cannot reference the FK column
      const dbRoutineId = entry.routine_id && UUID_RE.test(entry.routine_id) ? entry.routine_id : null

      const { data, error } = await supabase
        .from('stretching_logs')
        .insert({
          user_id: user.id,
          routine_id: dbRoutineId,
          duration_min: entry.duration_min,
          completed_at: newLog.completed_at,
        })
        .select()
        .single()

      if (error) {
        console.error('[useStretchingLogs] insert error:', error.message)
        const all = readLocal()
        writeLocal([newLog, ...all])
        return Object.assign({ ...newLog }, { _fromLocal: true }) as StretchingLog
      }

      return Object.assign(data as StretchingLog, meta)
    },
    onSuccess: (data) => {
      const prepend = (old: StretchingLog[] | undefined) =>
        old ? [data, ...old.filter((e) => e.id !== data.id)] : [data]
      queryClient.setQueryData(qk, prepend)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const d = data as any
      if (!d._fromLocal && d._subcategory !== 'yoga_flow') {
        void queryClient.invalidateQueries({ queryKey: ['stretching_logs'] })
      }
    },
  })

  return { ...query, addLog }
}
