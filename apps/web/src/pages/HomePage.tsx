import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { useWeekLogs } from '../hooks/useRoutineLogs'
import type { RoutineLog } from '../hooks/useRoutineLogs'

const PILLARS = [
  { id: 'workout',    label: 'Workout',    emoji: '🏋️', color: '#E8642A', route: '/workout' },
  { id: 'routine',    label: 'Mein Tag',   emoji: '📋', color: '#4A90D9', route: '/routine' },
  { id: 'stretching', label: 'Stretching', emoji: '🤸', color: '#7BC67E', route: '/stretching' },
  { id: 'meditation', label: 'Meditation', emoji: '🧘', color: '#9B7FD4', route: '/meditation' },
] as const

function localDateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function calcStreak(logs: RoutineLog[], dates: string[]): number {
  let streak = 0
  for (const date of dates) {
    if (logs.some((l) => l.date === date && l.completed)) {
      streak++
    } else {
      break
    }
  }
  return streak
}

const LOCALE_MAP: Record<string, string> = {
  de: 'de-DE',
  en: 'en-US',
  es: 'es-ES',
}

export function HomePage() {
  const navigate   = useNavigate()
  const { profile } = useAuthStore()

  const last7Dates = useMemo(() => {
    const today = new Date()
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      return localDateStr(d)
    })
  }, [])

  const { data: weekLogs = [] } = useWeekLogs(last7Dates)
  const streak = calcStreak(weekLogs, last7Dates)

  const locale    = LOCALE_MAP[profile?.language ?? 'de'] ?? 'de-DE'
  const dateLabel = new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    day:     'numeric',
    month:   'long',
  }).format(new Date())

  const firstName = profile?.display_name?.trim().split(' ')[0]
  const greeting  = firstName ? `Hi ${firstName} 👋` : 'Hi 👋'

  const primaryPillar = profile?.primary_pillar

  return (
    <div
      className="p-4 space-y-5 max-w-md mx-auto"
      style={{ color: 'var(--color-text)' }}
    >
      {/* ── Header ── */}
      <header className="pt-2 space-y-0.5">
        <h1 className="text-2xl font-bold">{greeting}</h1>
        <p className="text-sm capitalize" style={{ color: 'var(--color-text-muted)' }}>
          {dateLabel}
        </p>
      </header>

      {/* ── Pillar cards ── */}
      <section className="grid grid-cols-2 gap-3">
        {PILLARS.map((p) => {
          const isPrimary = primaryPillar === p.id
          return (
            <button
              key={p.id}
              onClick={() => navigate(p.route)}
              className="rounded-2xl p-5 text-left transition-transform active:scale-95 relative overflow-hidden"
              style={{
                backgroundColor: 'var(--color-bg-card)',
                borderTop: `3px solid ${isPrimary ? p.color : 'transparent'}`,
                color: 'var(--color-text)',
              }}
            >
              {/* Subtle color wash for primary pillar */}
              {isPrimary && (
                <div
                  className="absolute inset-0"
                  style={{ backgroundColor: p.color, opacity: 0.06 }}
                />
              )}
              <div className="relative">
                <div className="text-3xl mb-2">{p.emoji}</div>
                <div className="font-semibold text-sm">{p.label}</div>
                {isPrimary && (
                  <div
                    className="text-xs mt-1 font-medium"
                    style={{ color: p.color }}
                  >
                    Mein Fokus
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </section>

      {/* ── Daily summary ── */}
      {streak > 0 && (
        <section
          className="rounded-2xl px-4 py-3 flex items-center gap-3"
          style={{ backgroundColor: 'var(--color-bg-card)' }}
        >
          <span className="text-2xl">🔥</span>
          <div>
            <p className="font-semibold text-sm">{streak}-Tage Streak</p>
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              Weiter so!
            </p>
          </div>
        </section>
      )}

      {/* ── Widget area — future: Garmin steps, Mood tracker, Quick-Log ── */}
    </div>
  )
}
