import { useStretchingLogs } from '../../hooks/useStretchingLogs'
import type { StretchingRoutine } from '../../hooks/useStretching'

const PILLAR_COLOR = '#7BC67E'

const T = {
  de: {
    empty: 'Noch keine Sessions abgeschlossen.',
    min: 'Min',
    today: 'Heute',
  },
  en: {
    empty: 'No sessions completed yet.',
    min: 'Min',
    today: 'Today',
  },
  es: {
    empty: 'Ninguna sesión completada aún.',
    min: 'Min',
    today: 'Hoy',
  },
}

type Lang = 'de' | 'en' | 'es'

interface Props {
  routines: StretchingRoutine[]
  lang: Lang
}

export function StretchingHistory({ routines, lang }: Props) {
  const t = T[lang]
  const { data: logs = [], isLoading } = useStretchingLogs()

  const routineMap = new Map(routines.map((r) => [r.id, r]))
  const today = new Date().toISOString().slice(0, 10)

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <span className="text-sm text-[var(--color-text-muted)]">…</span>
      </div>
    )
  }

  if (logs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
        <span className="text-4xl">🤸</span>
        <p className="text-sm text-[var(--color-text-muted)]">{t.empty}</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {logs.map((log) => {
        const routine = log.routine_id ? routineMap.get(log.routine_id) : null
        const isToday = log.completed_at === today

        return (
          <div
            key={log.id}
            className="rounded-[var(--radius-md)] bg-[var(--color-bg-card)] border border-white/5 p-4"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">🤸</span>
                <div>
                  <p className="font-semibold text-sm text-[var(--color-text)]">
                    {routine?.name ?? 'Stretching'}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    {isToday ? t.today : log.completed_at}
                  </p>
                </div>
              </div>
              {log.duration_min != null && (
                <span
                  className="text-xs font-semibold px-2 py-1 rounded-full"
                  style={{ backgroundColor: `${PILLAR_COLOR}22`, color: PILLAR_COLOR }}
                >
                  {log.duration_min} {t.min}
                </span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
