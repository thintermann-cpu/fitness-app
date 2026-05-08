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

  const query = useQuery({
    queryKey: ['stretching_logs', user?.id ?? 'anon'],
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
    }): Promise<StretchingLog> => {
      const newLog: StretchingLog = {
        id: crypto.randomUUID(),
        user_id: user?.id ?? 'local',
        routine_id: entry.routine_id,
        completed_at: entry.completed_at ?? new Date().toISOString().slice(0, 10),
        duration_min: entry.duration_min,
      }

      if (!user) {
        const all = readLocal()
        writeLocal([newLog, ...all])
        return newLog
      }

      const { data, error } = await supabase
        .from('stretching_logs')
        .insert({
          user_id: user.id,
          routine_id: entry.routine_id,
          duration_min: entry.duration_min,
          completed_at: newLog.completed_at,
        })
        .select()
        .single()

      if (error) {
        const all = readLocal()
        writeLocal([newLog, ...all])
        return newLog
      }

      return data as StretchingLog
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['stretching_logs'] })
    },
  })

  return { ...query, addLog }
}
