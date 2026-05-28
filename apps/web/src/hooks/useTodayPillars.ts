import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { useAuthStore } from '../store/authStore'

export interface TodayPillars {
  workout: boolean
  routine: boolean
  stretching: boolean
  meditation: boolean
  total: number
}

function todayStr(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function useTodayPillars() {
  const user = useAuthStore((s) => s.user)

  return useQuery({
    queryKey: ['today_pillars', user?.id ?? 'anon'],
    staleTime: 5 * 60 * 1000,
    enabled: !!user,
    queryFn: async (): Promise<TodayPillars> => {
      const today = todayStr()
      const todayStart = `${today}T00:00:00`

      const [wodRes, stretchRes, medRes, routineRes, manualRes] = await Promise.all([
        supabase
          .from('wod_history')
          .select('*', { count: 'exact', head: true })
          .gte('completed_at', todayStart),
        supabase
          .from('stretching_logs')
          .select('*', { count: 'exact', head: true })
          .eq('completed_at', today),
        supabase
          .from('meditation_logs')
          .select('*', { count: 'exact', head: true })
          .eq('completed_at', today),
        supabase
          .from('routine_logs')
          .select('*', { count: 'exact', head: true })
          .eq('date', today)
          .eq('completed', true),
        supabase
          .from('pillar_manual_logs')
          .select('pillar')
          .eq('date', today),
      ])

      const manual     = new Set((manualRes.data ?? []).map((r: { pillar: string }) => r.pillar))
      const workout    = (wodRes.count     ?? 0) > 0 || manual.has('workout')
      const stretching = (stretchRes.count ?? 0) > 0 || manual.has('stretching')
      const meditation = (medRes.count     ?? 0) > 0 || manual.has('meditation')
      const routine    = (routineRes.count ?? 0) > 0 || manual.has('routine')
      const total      = [workout, routine, stretching, meditation].filter(Boolean).length

      return { workout, routine, stretching, meditation, total }
    },
  })
}
