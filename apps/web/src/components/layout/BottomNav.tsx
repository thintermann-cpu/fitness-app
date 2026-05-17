import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

const ALL_PILLARS = ['workout', 'routine', 'stretching', 'meditation']

const NAV_ITEMS = [
  { path: '/',           icon: '🏠', key: 'home',       color: null,      pillarId: null },
  { path: '/routine',    icon: '📋', key: 'routine',    color: '#4A90D9', pillarId: null },
  { path: '/workout',    icon: '💪', key: 'workout',    color: '#E8642A', pillarId: 'workout' },
  { path: '/stretching', icon: '🧘', key: 'stretching', color: '#7BC67E', pillarId: 'stretching' },
  { path: '/meditation', icon: '🧠', key: 'meditation', color: '#9B7FD4', pillarId: 'meditation' },
] as const

const NAV_LABELS: Record<string, Record<string, string>> = {
  de: { home: 'Mein Tag', workout: 'Training', routine: 'Rituale',  stretching: 'Stretch & Yoga',      meditation: 'Fokus' },
  en: { home: 'My Day',   workout: 'Workout',  routine: 'Rituals',  stretching: 'Stretch & Yoga',      meditation: 'Meditate' },
  es: { home: 'Mi Día',   workout: 'Entreno',  routine: 'Rituales', stretching: 'Estiramiento & Yoga', meditation: 'Meditar' },
}

export function BottomNav() {
  const { pathname }  = useLocation()
  const navigate      = useNavigate()
  const { profile }   = useAuthStore()
  const lang          = profile?.language ?? 'de'
  const labels        = NAV_LABELS[lang] ?? NAV_LABELS.de
  const activePillars = profile?.active_pillars?.length ? profile.active_pillars : ALL_PILLARS

  const [hideInactive, setHideInactive] = useState(() => localStorage.getItem('hide_inactive_pillars') === 'true')
  const [inactiveAlert, setInactiveAlert] = useState(false)

  useEffect(() => {
    const handler = () => setHideInactive(localStorage.getItem('hide_inactive_pillars') === 'true')
    window.addEventListener('hide_inactive_changed', handler)
    return () => window.removeEventListener('hide_inactive_changed', handler)
  }, [])

  const visibleItems = hideInactive
    ? NAV_ITEMS.filter((item) => item.pillarId === null || activePillars.includes(item.pillarId))
    : NAV_ITEMS

  return (
    <>
      <nav
        className="fixed bottom-0 left-0 right-0 flex items-stretch lg:hidden"
        style={{
          backgroundColor: 'var(--color-bg-card)',
          borderTop: '1px solid var(--color-bg-elevated)',
          height: '60px',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        {visibleItems.map(({ path, icon, key, color, pillarId }) => {
          const isCurrentPage  = pathname === path
          const isPillarActive = pillarId === null || activePillars.includes(pillarId)
          const activeColor    = color ?? 'var(--color-text)'
          const label          = labels[key] ?? key

          return (
            <button
              key={path}
              onClick={() => {
                if (!isPillarActive) { setInactiveAlert(true); return }
                navigate(path)
              }}
              className="relative flex flex-col items-center justify-center gap-0.5 flex-1"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                opacity: isPillarActive ? 1 : 0.45,
              }}
            >
              {isCurrentPage && isPillarActive && (
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 rounded-b-full"
                  style={{ backgroundColor: activeColor, height: '2px' }}
                />
              )}
              <span className="text-xl leading-none">{icon}</span>
              <span
                className="text-[10px] font-medium leading-none truncate max-w-[56px]"
                style={{ color: isCurrentPage && isPillarActive ? activeColor : 'var(--color-text-muted)' }}
              >
                {label}
              </span>
            </button>
          )
        })}
      </nav>

      {inactiveAlert && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center px-6 lg:hidden"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
          onClick={() => setInactiveAlert(false)}
        >
          <div
            className="w-full max-w-xs rounded-2xl p-5 space-y-3"
            style={{ backgroundColor: 'var(--color-bg-card)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-bold text-base" style={{ color: 'var(--color-text)' }}>
              Noch nicht aktiviert
            </p>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              Dieser Bereich ist in deinem Profil nicht aktiv. Du kannst ihn in den Einstellungen einschalten.
            </p>
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => { setInactiveAlert(false); navigate('/settings') }}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{ backgroundColor: '#E8642A' }}
              >
                Zu den Einstellungen
              </button>
              <button
                onClick={() => setInactiveAlert(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold"
                style={{ backgroundColor: 'var(--color-bg-elevated)', color: 'var(--color-text-muted)' }}
              >
                Schliessen
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
