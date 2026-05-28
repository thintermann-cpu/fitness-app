import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWodHistory } from '../hooks/useWodHistory'
import { useStretchingLogs } from '../hooks/useStretchingLogs'
import { useMeditationLogs } from '../hooks/useMeditationLogs'
import { useAuthStore } from '../store/authStore'

type PillarId = 'workout' | 'stretching' | 'meditation'

interface HistoryEntry {
  id: string
  pillar: PillarId
  label: string
  detail: string
  date: string
}

const PILLAR_COLORS: Record<PillarId, string> = {
  workout:    '#E8642A',
  stretching: '#7BC67E',
  meditation: '#9B7FD4',
}

const PILLAR_LABELS: Record<string, Record<PillarId, string>> = {
  de: { workout: 'Training',       stretching: 'Mobilität',    meditation: 'Achtsamkeit' },
  en: { workout: 'Workout',        stretching: 'Mobility',     meditation: 'Mindfulness' },
  es: { workout: 'Entrenamiento',  stretching: 'Movilidad',    meditation: 'Atención'    },
}

const PAGE_TITLE:  Record<string, string> = { de: 'Verlauf', en: 'History', es: 'Historial' }
const FILTER_ALL:  Record<string, string> = { de: 'Alle',    en: 'All',     es: 'Todo'      }
const EMPTY_MSG:   Record<string, string> = { de: 'Noch keine Einträge.', en: 'No entries yet.', es: 'Sin entradas aún.' }

const LOCALE_MAP: Record<string, string> = { de: 'de-DE', en: 'en-US', es: 'es-ES' }

const PILLARS: PillarId[] = ['workout', 'stretching', 'meditation']

function toDateKey(iso: string): string {
  return iso.length >= 10 ? iso.slice(0, 10) + 'T00:00:00' : iso
}

export function HistoryPage() {
  const navigate = useNavigate()
  const lang     = useAuthStore((s) => s.profile?.language ?? 'de')
  const [filter, setFilter] = useState<PillarId | null>(null)

  const { data: wods        = [] } = useWodHistory()
  const { data: stretches   = [] } = useStretchingLogs()
  const { data: meditations = [] } = useMeditationLogs()

  const entries = useMemo((): HistoryEntry[] => {
    const all: HistoryEntry[] = [
      ...wods.map((w) => ({
        id:     w.id,
        pillar: 'workout' as PillarId,
        label:  w.wod_name,
        detail: w.score_value ? `${w.score_value} ${w.score_type}` : '',
        date:   w.completed_at,
      })),
      ...stretches.map((s) => ({
        id:     s.id,
        pillar: 'stretching' as PillarId,
        label:  (s as unknown as { _displayName?: string })._displayName ?? PILLAR_LABELS[lang]?.stretching,
        detail: s.duration_min ? `${s.duration_min} min` : '',
        date:   toDateKey(s.completed_at as unknown as string),
      })),
      ...meditations.map((m) => ({
        id:     m.id,
        pillar: 'meditation' as PillarId,
        label:  PILLAR_LABELS[lang]?.meditation,
        detail: m.duration_min ? `${m.duration_min} min` : '',
        date:   toDateKey(m.completed_at),
      })),
    ]
    return all
      .filter((e) => !filter || e.pillar === filter)
      .sort((a, b) => b.date.localeCompare(a.date))
  }, [wods, stretches, meditations, filter, lang])

  function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString(LOCALE_MAP[lang] ?? 'de-DE', {
      day: 'numeric', month: 'short',
    })
  }

  return (
    <div className="min-h-svh px-4 pt-10 pb-24 max-w-lg mx-auto" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate('/home')}
          className="w-9 h-9 rounded-full flex items-center justify-center text-lg"
          style={{ backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text-muted)' }}
        >
          ←
        </button>
        <h1 className="text-xl font-black" style={{ color: 'var(--color-text)' }}>
          {PAGE_TITLE[lang] ?? PAGE_TITLE.de}
        </h1>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 mb-5 flex-wrap">
        <button
          onClick={() => setFilter(null)}
          className="px-3 py-1.5 rounded-full text-xs font-semibold"
          style={{
            backgroundColor: !filter ? 'rgba(255,255,255,0.15)' : 'var(--color-bg-card)',
            color: !filter ? 'var(--color-text)' : 'var(--color-text-muted)',
          }}
        >
          {FILTER_ALL[lang] ?? FILTER_ALL.de}
        </button>
        {PILLARS.map((p) => (
          <button
            key={p}
            onClick={() => setFilter(filter === p ? null : p)}
            className="px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{
              backgroundColor: filter === p ? `${PILLAR_COLORS[p]}28` : 'var(--color-bg-card)',
              color:           filter === p ? PILLAR_COLORS[p]         : 'var(--color-text-muted)',
              border:         `1px solid ${filter === p ? PILLAR_COLORS[p] + '55' : 'transparent'}`,
            }}
          >
            {PILLAR_LABELS[lang]?.[p] ?? p}
          </button>
        ))}
      </div>

      {/* Entry list */}
      {entries.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            {EMPTY_MSG[lang] ?? EMPTY_MSG.de}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{ backgroundColor: 'var(--color-bg-card)' }}
            >
              <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: PILLAR_COLORS[entry.pillar] }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate" style={{ color: 'var(--color-text)' }}>
                  {entry.label}
                </p>
                {entry.detail && (
                  <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    {entry.detail}
                  </p>
                )}
              </div>
              <span className="text-xs flex-shrink-0" style={{ color: 'var(--color-text-muted)' }}>
                {formatDate(entry.date)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
