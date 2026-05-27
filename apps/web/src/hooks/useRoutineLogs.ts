import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { useAuthStore } from '../store/authStore'

export interface RoutineLog {
  id: string
  routine_id: string
  date: string
  completed: boolean
}

export function useRoutineLogs(date: string) {
  const userId = useAuthStore((s) => s.user?.id ?? null)
  return useQuery({
    queryKey: ['routine_logs', userId ?? 'anon', date],
    enabled: !!userId,
    queryFn: async (): Promise<RoutineLog[]> => {
      const { data, error } = await supabase
        .from('routine_logs')
        .select('*')
        .eq('user_id', userId!)
        .eq('date', date)
      if (error) throw error
      return (data ?? []) as RoutineLog[]
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useWeekLogs(weekDates: string[]) {
  const userId = useAuthStore((s) => s.user?.id ?? null)
  return useQuery({
    queryKey: ['routine_logs_week', userId ?? 'anon', weekDates.join(',')],
    enabled: !!userId && weekDates.length > 0,
    queryFn: async (): Promise<RoutineLog[]> => {
      const { data, error } = await supabase
        .from('routine_logs')
        .select('*')
        .eq('user_id', userId!)
        .in('date', weekDates)
      if (error) throw error
      return (data ?? []) as RoutineLog[]
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useToggleRoutineLog(date: string) {
  const userId = useAuthStore((s) => s.user?.id ?? null)
  const queryClient = useQueryClient()
  const logQk = ['routine_logs', userId ?? 'anon', date] as const

  return useMutation({
    mutationFn: async ({ routineId, isCompleted }: { routineId: string; isCompleted: boolean }) => {
      if (!userId) throw new Error('Not authenticated')
      if (isCompleted) {
        const { error } = await supabase
          .from('routine_logs')
          .delete()
          .eq('user_id', userId)
          .eq('routine_id', routineId)
          .eq('date', date)
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('routine_logs')
          .upsert(
            { user_id: userId, routine_id: routineId, date, completed: true },
            { onConflict: 'user_id,routine_id,date' },
          )
        if (error) throw error
      }
    },
    onMutate: async ({ routineId, isCompleted }) => {
      await queryClient.cancelQueries({ queryKey: logQk })
      const previous = queryClient.getQueryData<RoutineLog[]>(logQk)
      queryClient.setQueryData<RoutineLog[]>(logQk, (old = []) => {
        if (isCompleted) {
          return old.filter(l => l.routine_id !== routineId)
        }
        return [
          ...old.filter(l => l.routine_id !== routineId),
          { id: 'opt', routine_id: routineId, date, completed: true },
        ]
      })
      return { previous }
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(logQk, context?.previous)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['routine_logs'] })
      queryClient.invalidateQueries({ queryKey: ['routine_logs_week'] })
    },
  })
}
