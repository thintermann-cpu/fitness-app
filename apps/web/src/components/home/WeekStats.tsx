import { useQuery } from '@tanstack/react-query'
import { supabase } from '../../lib/supabase'
import { useAuthStore } from '../../store/authStore'

type Lang = 'de' | 'en' | 'es'

const HEADER: Record<Lang, string> = {
  de: 'Diese Woche',
  en: 'This week',
  es: 'Esta semana',
}

const TOTAL_LABEL: Record<Lang, (n: number) => string> = {
  de: (n) => `${n} Session${n !== 1 ? 's' : ''}`,
  en: (n) => `${n} session${n !== 1 ? 's' : ''}`,
  es: (n) => `${n} sesión${n !== 1 ? 'es' : ''}`,
}

function sevenDaysAgoStr(): string {
  const d = new Date()
  d.setDate(d.getDate() - 6)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

interface WeekData {
  workout: number
  stretching: number
  meditation: number
}

export function WeekStats() {
  const user        = useAuthStore((s) => s.user)
  const { profile } = useAuthStore()
  const lang        = (profile?.language ?? 'de') as Lang

  const { data } = useQuery({
    queryKey: ['week_stats', user?.id ?? 'anon'],
    staleTime: 5 * 60 * 1000,
    enabled: !!user,
    queryFn: async (): Promise<WeekData> => {
      const since = sevenDaysAgoStr()
      const sinceIso = `${since}T00:00:00`

      const [wodRes, stretchRes, medRes] = await Promise.all([
        supabase
          .from('wod_history')
          .select('*', { count: 'exact', head: true })
          .gte('completed_at', sinceIso),
        supabase
          .from('stretching_logs')
          .select('*', { count: 'exact', head: true })
          .gte('completed_at', since),
        supabase
          .from('meditation_logs')
          .select('*', { count: 'exact', head: true })
          .gte('completed_at', since),
      ])

      return {
        workout:    wodRes.count    ?? 0,
        stretching: stretchRes.count ?? 0,
        meditation: medRes.count    ?? 0,
      }
    },
  })

  if (!data) return null

  const total = data.workout + data.stretching + data.meditation

  return (
    <section
      className="rounded-2xl p-4"
      style={{ backgroundColor: 'var(--color-bg-card)' }}
    >
      <div className="flex items-baseline justify-between mb-3">
        <p className="text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>
          {HEADER[lang]}
        </p>
        <p className="text-xs font-bold" style={{ color: 'var(--color-text)' }}>
          {TOTAL_LABEL[lang](total)}
        </p>
      </div>
      <div className="flex gap-4">
        <StatItem emoji="🏋️" count={data.workout}    color="#E8642A" />
        <StatItem emoji="🤸" count={data.stretching} color="#7BC67E" />
        <StatItem emoji="🧘" count={data.meditation} color="#9B7FD4" />
      </div>
    </section>
  )
}

function StatItem({ emoji, count, color }: { emoji: string; count: number; color: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-base leading-none">{emoji}</span>
      <span className="text-sm font-bold" style={{ color: count > 0 ? color : 'var(--color-text-subtle)' }}>
        {count}
      </span>
    </div>
  )
}
