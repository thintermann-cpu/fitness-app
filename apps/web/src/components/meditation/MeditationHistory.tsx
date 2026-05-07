import { useMeditationLogs } from '../../hooks/useMeditationLogs'
import type { Meditation, BreathworkTechnique } from '../../hooks/useMeditations'

const PILLAR_COLOR = '#9B7FD4'

const T = {
  de: {
    empty:      'Noch keine Sessions abgeschlossen.',
    min:        'Min',
    today:      'Heute',
    meditation: 'Meditation',
    breathwork: 'Atemübung',
    custom:     'Eigener Timer',
  },
  en: {
    empty:      'No sessions completed yet.',
    min:        'Min',
    today:      'Today',
    meditation: 'Meditation',
    breathwork: 'Breathwork',
    custom:     'Custom Timer',
  },
  es: {
    empty:      'Ninguna sesión completada aún.',
    min:        'Min',
    today:      'Hoy',
    meditation: 'Meditación',
    breathwork: 'Respiración',
    custom:     'Temporizador',
  },
}

const SESSION_EMOJI: Record<string, string> = {
  meditation:   '🧘',
  breathwork:   '🌬',
  custom_timer: '⏱',
}

type Lang = 'de' | 'en' | 'es'

interface Props {
  meditations: Meditation[]
  techniques:  BreathworkTechnique[]
  lang: Lang
}

export function MeditationHistory({ meditations, techniques, lang }: Props) {
  const t = T[lang]
  const { data: logs = [], isLoading } = useMeditationLogs()

  const meditationMap = new Map(meditations.map((m) => [m.id, m]))
  const techniqueMap  = new Map(techniques.map((t) => [t.id, t]))
  const today         = new Date().toISOString().slice(0, 10)

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
        <span className="text-4xl">🧘</span>
        <p className="text-sm text-[var(--color-text-muted)]">{t.empty}</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {logs.map((log) => {
        const name =
          log.session_type === 'meditation'  ? (log.meditation_id ? (meditationMap.get(log.meditation_id)?.name ?? t.meditation) : t.meditation)
          : log.session_type === 'breathwork' ? (log.technique_id  ? (techniqueMap.get(log.technique_id)?.name   ?? t.breathwork) : t.breathwork)
          : t.custom

        const isToday = log.completed_at === today
        const emoji   = SESSION_EMOJI[log.session_type] ?? '🧘'

        return (
          <div
            key={log.id}
            className="rounded-[var(--radius-md)] bg-[var(--color-bg-card)] border border-white/5 p-4"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">{emoji}</span>
                <div>
                  <p className="font-semibold text-sm text-[var(--color-text)]">{name}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    {isToday ? t.today : log.completed_at}
                  </p>
                </div>
              </div>
              <span
                className="text-xs font-semibold px-2 py-1 rounded-full shrink-0"
                style={{ backgroundColor: `${PILLAR_COLOR}22`, color: PILLAR_COLOR }}
              >
                {log.duration_min} {t.min}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
