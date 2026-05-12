import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useFavorites } from '../hooks/useFavorites'
import { useStretchingRoutines } from '../hooks/useStretching'
import { useMeditations } from '../hooks/useMeditations'
import type { StretchingRoutine } from '../hooks/useStretching'
import type { Meditation } from '../hooks/useMeditations'

type Section = 'workout' | 'stretching' | 'meditation'

const SECTIONS: { id: Section; label: string; color: string; emoji: string }[] = [
  { id: 'workout',    label: 'Workouts',       color: '#E8642A', emoji: '💪' },
  { id: 'stretching', label: 'Stretch & Yoga', color: '#7BC67E', emoji: '🧘' },
  { id: 'meditation', label: 'Meditationen',   color: '#9B7FD4', emoji: '🧠' },
]

export function FavoritesPage() {
  const navigate      = useNavigate()
  const [params]      = useSearchParams()
  const initSection   = params.get('section') as Section | null

  const [open, setOpen] = useState<Set<Section>>(
    new Set(initSection ? [initSection] : ['workout', 'stretching', 'meditation']),
  )

  const { favorites }                  = useFavorites()
  const { data: allRoutines   = [] }   = useStretchingRoutines()
  const { data: allMeditations = [] }  = useMeditations()

  const favWods = favorites.filter(f => f.content_type === 'wod')

  const favRoutines = favorites
    .filter(f => f.content_type === 'stretching_routine')
    .map(f => allRoutines.find(r => r.id === f.content_id))
    .filter((r): r is StretchingRoutine => Boolean(r))

  const favMeditations = favorites
    .filter(f => f.content_type === 'meditation')
    .map(f => allMeditations.find(m => m.id === f.content_id))
    .filter((m): m is Meditation => Boolean(m))

  const itemsFor = (id: Section) =>
    id === 'workout' ? favWods.length
    : id === 'stretching' ? favRoutines.length
    : favMeditations.length

  const totalFavs = favorites.length

  const toggleSection = (id: Section) =>
    setOpen(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })

  return (
    <div className="min-h-svh bg-[var(--color-bg)] flex flex-col overflow-x-hidden">
      {/* Header */}
      <div className="px-4 pt-4 pb-4 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="text-lg leading-none"
          style={{ color: 'var(--color-text-muted)' }}
        >
          ←
        </button>
        <h1 className="text-2xl font-black text-[var(--color-text)]">Favoriten</h1>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pb-24 max-w-lg mx-auto w-full space-y-3">
        {totalFavs === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" width="48" height="48">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <p className="text-center text-sm" style={{ color: 'var(--color-text-muted)' }}>
              Tippe auf ein ❤ um Favoriten zu speichern
            </p>
          </div>
        ) : (
          SECTIONS.map(({ id, label, color, emoji }) => {
            const count = itemsFor(id)
            if (count === 0) return null
            const isOpen = open.has(id)

            return (
              <div
                key={id}
                className="rounded-[var(--radius-md)] overflow-hidden"
                style={{ border: '1px solid rgba(255,255,255,0.07)' }}
              >
                {/* Section header */}
                <button
                  onClick={() => toggleSection(id)}
                  className="w-full flex items-center gap-3 px-4 py-3"
                  style={{ backgroundColor: 'var(--color-bg-card)' }}
                >
                  <span className="text-lg leading-none">{emoji}</span>
                  <span className="font-semibold text-sm text-[var(--color-text)] flex-1 text-left">
                    {label}
                  </span>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: `${color}22`, color }}
                  >
                    {count}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    {isOpen ? '▲' : '▼'}
                  </span>
                </button>

                {/* Items */}
                {isOpen && (
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    {id === 'workout' && favWods.map(f => (
                      <button
                        key={f.content_id}
                        onClick={() => navigate(`/workout/${encodeURIComponent(f.content_id)}`)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left active:opacity-70 transition-opacity"
                        style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', backgroundColor: 'var(--color-bg)' }}
                      >
                        <span className="text-sm font-medium text-[var(--color-text)] flex-1">
                          {f.content_id}
                        </span>
                        <span className="text-lg leading-none" style={{ color }}>→</span>
                      </button>
                    ))}

                    {id === 'stretching' && favRoutines.map(r => (
                      <button
                        key={r.id}
                        onClick={() => navigate('/stretching')}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left active:opacity-70 transition-opacity"
                        style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', backgroundColor: 'var(--color-bg)' }}
                      >
                        <span className="text-sm font-medium text-[var(--color-text)] flex-1">
                          {r.name}
                        </span>
                        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                          {r.duration_min} min
                        </span>
                      </button>
                    ))}

                    {id === 'meditation' && favMeditations.map(m => (
                      <button
                        key={m.id}
                        onClick={() => navigate('/meditation')}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left active:opacity-70 transition-opacity"
                        style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', backgroundColor: 'var(--color-bg)' }}
                      >
                        <span className="text-sm font-medium text-[var(--color-text)] flex-1">
                          {m.name}
                        </span>
                        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                          {m.duration_min} min
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
