import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'

export interface RoutineLog {
  id: string
  routine_id: string
  date: string
  completed: boolean
}

async function getUserId(): Promise<string | null> {
  const { data: { user } } = await supabase.auth.getUser()
  return user?.id ?? null
}

export function useRoutineLogs(date: string) {
  return useQuery({
    queryKey: ['routine_logs', date],
    queryFn: async (): Promise<RoutineLog[]> => {
      const uid = await getUserId()
      if (!uid) return []
      const { data, error } = await supabase
        .from('routine_logs')
        .select('*')
        .eq('user_id', uid)
        .eq('date', date)
      if (error) throw error
      return (data ?? []) as RoutineLog[]
    },
  })
}

export function useWeekLogs(weekDates: string[]) {
  return useQuery({
    queryKey: ['routine_logs_week', weekDates.join(',')],
    enabled: weekDates.length > 0,
    queryFn: async (): Promise<RoutineLog[]> => {
      const uid = await getUserId()
      if (!uid) return []
      const { data, error } = await supabase
        .from('routine_logs')
        .select('*')
        .eq('user_id', uid)
        .in('date', weekDates)
      if (error) throw error
      return (data ?? []) as RoutineLog[]
    },
  })
}

export function useToggleRoutineLog(date: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ routineId, isCompleted }: { routineId: string; isCompleted: boolean }) => {
      const uid = await getUserId()
      if (!uid) throw new Error('Not authenticated')
      if (isCompleted) {
        const { error } = await supabase
          .from('routine_logs')
          .delete()
          .eq('user_id', uid)
          .eq('routine_id', routineId)
          .eq('date', date)
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('routine_logs')
          .upsert(
            { user_id: uid, routine_id: routineId, date, completed: true },
            { onConflict: 'user_id,routine_id,date' },
          )
        if (error) throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routine_logs'] })
      queryClient.invalidateQueries({ queryKey: ['routine_logs_week'] })
    },
  })
}
