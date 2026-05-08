import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'

export interface DailyLog {
  id: string
  date: string
  water_ml: number
  mood: string | null
  mood_comment: string | null
}

async function getUserId(): Promise<string | null> {
  const { data: { user } } = await supabase.auth.getUser()
  return user?.id ?? null
}

export function useDailyLog(date: string) {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['daily_log', date],
    queryFn: async (): Promise<DailyLog | null> => {
      const uid = await getUserId()
      if (!uid) return null
      const { data, error } = await supabase
        .from('daily_logs')
        .select('*')
        .eq('user_id', uid)
        .eq('date', date)
        .maybeSingle()
      if (error) throw error
      return data as DailyLog | null
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })

  const setWater = useMutation({
    mutationFn: async (water_ml: number) => {
      const uid = await getUserId()
      if (!uid) throw new Error('Not authenticated')
      const { error } = await supabase
        .from('daily_logs')
        .upsert({ user_id: uid, date, water_ml }, { onConflict: 'user_id,date' })
      if (error) throw error
    },
    onMutate: async (water_ml) => {
      await queryClient.cancelQueries({ queryKey: ['daily_log', date] })
      const previous = queryClient.getQueryData<DailyLog | null>(['daily_log', date])
      queryClient.setQueryData<DailyLog | null>(['daily_log', date], (old) =>
        old ? { ...old, water_ml } : { id: 'opt', date, water_ml, mood: null, mood_comment: null }
      )
      return { previous }
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(['daily_log', date], context?.previous)
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['daily_log', date] }),
  })

  const setMood = useMutation({
    mutationFn: async ({ mood, mood_comment }: { mood: string; mood_comment: string }) => {
      const uid = await getUserId()
      if (!uid) throw new Error('Not authenticated')
      const { error } = await supabase
        .from('daily_logs')
        .upsert({ user_id: uid, date, mood, mood_comment }, { onConflict: 'user_id,date' })
      if (error) throw error
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['daily_log', date] }),
  })

  return {
    log: query.data ?? null,
    isLoading: query.isLoading,
    setWater: setWater.mutate,
    setMood: setMood.mutate,
  }
}
