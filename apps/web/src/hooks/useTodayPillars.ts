import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { useAuthStore } from '../store/authStore'
import { localPillarDone, todayKey } from '../lib/pillarDone'

export interface TodayPillars {
  workout: boolean
  routine: boolean
  stretching: boolean
  meditation: boolean
  total: number
}

export function useTodayPillars() {
  const user = useAuthStore((s) => s.user)

  return useQuery({
    queryKey: ['today_pillars', user?.id ?? 'anon'],
    staleTime: 0,
    refetchOnMount: 'always',
    enabled: !!user,
    queryFn: async (): Promise<TodayPillars> => {
      const today = todayKey()
      const todayStart = `${today}T00:00:00`
      const local = {
        workout: localPillarDone('workout'),
        routine: localPillarDone('routine'),
        stretching: localPillarDone('stretching'),
        meditation: localPillarDone('meditation'),
      }

      let workout = local.workout
      let stretching = local.stretching
      let meditation = local.meditation
      let routine = local.routine
      try {
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
        const manual = new Set((manualRes.data ?? []).map((r: { pillar: string }) => r.pillar))
        workout    = (wodRes.count     ?? 0) > 0 || manual.has('workout')    || local.workout
        stretching = (stretchRes.count ?? 0) > 0 || manual.has('stretching') || local.stretching
        meditation = (medRes.count     ?? 0) > 0 || manual.has('meditation') || local.meditation
        routine    = (routineRes.count ?? 0) > 0 || manual.has('routine')    || local.routine
      } catch {
        // Session abgelaufen oder Netz weg: der lokale Stand bleibt.
      }
      const total      = [workout, routine, stretching, meditation].filter(Boolean).length

      return { workout, routine, stretching, meditation, total }
    },
  })
}
