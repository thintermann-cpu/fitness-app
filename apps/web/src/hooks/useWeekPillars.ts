import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { useAuthStore } from '../store/authStore'

export interface DayPillars {
  date: string
  dayLabel: string
  isToday: boolean
  workout: boolean
  routine: boolean
  stretching: boolean
  meditation: boolean
}

function getLastSevenDays(): string[] {
  const days: string[] = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    days.push(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    )
  }
  return days
}

function getDayLabel(dateStr: string, lang: string): string {
  const locales: Record<string, string> = { de: 'de-DE', en: 'en-US', es: 'es-ES' }
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString(locales[lang] ?? 'de-DE', { weekday: 'short' }).slice(0, 2)
}

export function useWeekPillars() {
  const user = useAuthStore((s) => s.user)
  const lang = useAuthStore((s) => s.profile?.language ?? 'de')

  return useQuery({
    queryKey: ['week_pillars', user?.id ?? 'anon'],
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    queryFn: async (): Promise<DayPillars[]> => {
      const days = getLastSevenDays()
      const today = days[6]
      const from = days[0]
      const fromTs = `${from}T00:00:00`

      const [wodRes, stretchRes, medRes, routineRes, manualRes] = await Promise.all([
        supabase.from('wod_history').select('completed_at').gte('completed_at', fromTs),
        supabase.from('stretching_logs').select('completed_at').gte('completed_at', from),
        supabase.from('meditation_logs').select('completed_at').gte('completed_at', from),
        supabase.from('routine_logs').select('date').gte('date', from).eq('completed', true),
        supabase.from('pillar_manual_logs').select('pillar, date').gte('date', from),
      ])

      const workoutDays  = new Set((wodRes.data     ?? []).map((r: { completed_at: string }) => r.completed_at.slice(0, 10)))
      const stretchDays  = new Set((stretchRes.data ?? []).map((r: { completed_at: string }) => String(r.completed_at).slice(0, 10)))
      const medDays      = new Set((medRes.data     ?? []).map((r: { completed_at: string }) => String(r.completed_at).slice(0, 10)))
      const routineDays  = new Set((routineRes.data ?? []).map((r: { date: string }) => r.date))

      const manualByDay: Record<string, Set<string>> = {}
      for (const m of (manualRes.data ?? [])) {
        if (!manualByDay[m.date]) manualByDay[m.date] = new Set()
        manualByDay[m.date].add(m.pillar)
      }

      return days.map((date) => ({
        date,
        dayLabel: getDayLabel(date, lang),
        isToday: date === today,
        workout:    workoutDays.has(date)  || (manualByDay[date]?.has('workout')    ?? false),
        stretching: stretchDays.has(date)  || (manualByDay[date]?.has('stretching') ?? false),
        meditation: medDays.has(date)      || (manualByDay[date]?.has('meditation') ?? false),
        routine:    routineDays.has(date)  || (manualByDay[date]?.has('routine')    ?? false),
      }))
    },
  })
}
