import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { useAuthStore } from '../store/authStore'

export interface DailyLog {
  id: string
  date: string
  water_ml: number
  mood: string | null
  mood_comment: string | null
}

export function useDailyLog(date: string) {
  const userId      = useAuthStore((s) => s.user?.id ?? null)
  const queryClient = useQueryClient()
  const qk          = ['daily_log', userId ?? 'anon', date] as const

  const query = useQuery({
    queryKey: qk,
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    queryFn: async (): Promise<DailyLog | null> => {
      const { data, error } = await supabase
        .from('daily_logs')
        .select('*')
        .eq('user_id', userId!)
        .eq('date', date)
        .maybeSingle()
      if (error) throw error
      return data as DailyLog | null
    },
  })

  const setWater = useMutation({
    mutationFn: async (water_ml: number) => {
      if (!userId) throw new Error('Not authenticated')
      const { error } = await supabase
        .from('daily_logs')
        .upsert({ user_id: userId, date, water_ml }, { onConflict: 'user_id,date' })
      if (error) throw error
    },
    onMutate: async (water_ml) => {
      await queryClient.cancelQueries({ queryKey: qk })
      const previous = queryClient.getQueryData<DailyLog | null>(qk)
      queryClient.setQueryData<DailyLog | null>(qk, (old) =>
        old ? { ...old, water_ml } : { id: 'opt', date, water_ml, mood: null, mood_comment: null }
      )
      return { previous }
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(qk, context?.previous)
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: qk }),
  })

  const setMood = useMutation({
    mutationFn: async ({ mood, mood_comment }: { mood: string; mood_comment: string }) => {
      if (!userId) throw new Error('Not authenticated')
      const { error } = await supabase
        .from('daily_logs')
        .upsert({ user_id: userId, date, mood, mood_comment }, { onConflict: 'user_id,date' })
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: qk })
      queryClient.invalidateQueries({ queryKey: ['recent_mood_wod'] })
    },
  })

  return {
    log: query.data ?? null,
    isLoading: query.isLoading,
    setWater: setWater.mutate,
    setMood: setMood.mutate,
  }
}
