import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { useAuthStore } from '../store/authStore'

export interface MeditationLog {
  id: string
  user_id: string
  meditation_id: string | null
  technique_id: string | null
  session_type: 'meditation' | 'breathwork' | 'custom_timer'
  duration_min: number
  completed_at: string
}

const STORAGE_KEY = 'carveout_meditation_logs'

function readLocal(): MeditationLog[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as MeditationLog[]
  } catch {
    return []
  }
}

function writeLocal(entries: MeditationLog[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

export function useMeditationLogs() {
  const user        = useAuthStore((s) => s.user)
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['meditation_logs', user?.id ?? 'anon'],
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    queryFn: async (): Promise<MeditationLog[]> => {
      if (!user) return readLocal()

      const { data, error } = await supabase
        .from('meditation_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false })

      if (error) return readLocal()
      return (data ?? []) as MeditationLog[]
    },
    enabled: true,
  })

  const addLog = useMutation({
    mutationFn: async (entry: {
      meditation_id?: string | null
      technique_id?: string | null
      session_type: 'meditation' | 'breathwork' | 'custom_timer'
      duration_min: number
      completed_at?: string
    }): Promise<MeditationLog> => {
      const newLog: MeditationLog = {
        id:            crypto.randomUUID(),
        user_id:       user?.id ?? 'local',
        meditation_id: entry.meditation_id ?? null,
        technique_id:  entry.technique_id ?? null,
        session_type:  entry.session_type,
        duration_min:  entry.duration_min,
        completed_at:  entry.completed_at ?? new Date().toISOString().slice(0, 10),
      }

      if (!user) {
        writeLocal([newLog, ...readLocal()])
        return newLog
      }

      const { data, error } = await supabase
        .from('meditation_logs')
        .insert({
          user_id:       user.id,
          meditation_id: newLog.meditation_id,
          technique_id:  newLog.technique_id,
          session_type:  newLog.session_type,
          duration_min:  newLog.duration_min,
          completed_at:  newLog.completed_at,
        })
        .select()
        .single()

      if (error) {
        writeLocal([newLog, ...readLocal()])
        return newLog
      }

      return data as MeditationLog
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['meditation_logs'] })
    },
  })

  return { ...query, addLog }
}
