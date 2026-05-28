import { useNavigate } from 'react-router-dom'
import { useWeekPillars } from '../../hooks/useWeekPillars'
import { useAuthStore } from '../../store/authStore'

const PILLAR_COLORS = {
  workout:    '#E8642A',
  routine:    '#4A90D9',
  stretching: '#7BC67E',
  meditation: '#9B7FD4',
} as const

const PILLARS = ['workout', 'routine', 'stretching', 'meditation'] as const
type Pillar = typeof PILLARS[number]

const HEADER_LABEL: Record<string, string> = {
  de: 'Letzte 7 Tage',
  en: 'Last 7 Days',
  es: 'Últimos 7 días',
}
const HISTORY_LINK: Record<string, string> = {
  de: 'Verlauf →',
  en: 'History →',
  es: 'Historial →',
}

export function WeekStrip() {
  const navigate = useNavigate()
  const lang = useAuthStore((s) => s.profile?.language ?? 'de')
  const { data: days = [], isLoading } = useWeekPillars()

  return (
    <section className="rounded-2xl p-4" style={{ backgroundColor: 'var(--color-bg-card)' }}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>
          {HEADER_LABEL[lang] ?? HEADER_LABEL.de}
        </p>
        <button
          onClick={() => navigate('/history')}
          className="text-xs font-semibold"
          style={{ color: '#E8642A', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          {HISTORY_LINK[lang] ?? HISTORY_LINK.de}
        </button>
      </div>

      {isLoading ? (
        <div className="h-12 flex items-center justify-center">
          <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>…</span>
        </div>
      ) : (
        <div className="grid grid-cols-7 gap-1">
          {days.map((day) => {
            const active = PILLARS.filter((p) => day[p as Pillar])
            return (
              <div key={day.date} className="flex flex-col items-center gap-1">
                <span
                  className="text-[10px] font-semibold"
                  style={{ color: day.isToday ? 'var(--color-text)' : 'var(--color-text-muted)' }}
                >
                  {day.dayLabel}
                </span>
                <div
                  className="w-full rounded-lg flex flex-col items-center justify-center gap-[3px] py-1.5"
                  style={{
                    minHeight: 44,
                    backgroundColor: day.isToday ? 'rgba(255,255,255,0.05)' : 'transparent',
                  }}
                >
                  {active.length === 0 ? (
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: 'rgba(255,255,255,0.10)' }}
                    />
                  ) : (
                    active.map((p) => (
                      <div
                        key={p}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: PILLAR_COLORS[p as Pillar] }}
                      />
                    ))
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
