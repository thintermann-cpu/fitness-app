import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

const ALL_PILLARS = ['workout', 'routine', 'stretching', 'meditation']

const NAV_ITEMS = [
  { path: '/home',       icon: '🏠', key: 'home',       color: null,      pillarId: null         },
  { path: '/routine',    icon: '📋', key: 'routine',    color: '#4A90D9', pillarId: 'routine'    },
  { path: '/workout',    icon: '💪', key: 'workout',    color: '#E8642A', pillarId: 'workout'    },
  { path: '/stretching', icon: '🧘', key: 'stretching', color: '#7BC67E', pillarId: 'stretching' },
  { path: '/meditation', icon: '🧠', key: 'meditation', color: '#9B7FD4', pillarId: 'meditation' },
] as const

const NAV_LABELS: Record<string, Record<string, string>> = {
  de: { home: 'Mein Tag', workout: 'Training', routine: 'Routine',  stretching: 'Stretch & Yoga',      meditation: 'Fokus' },
  en: { home: 'My Day',   workout: 'Workout',  routine: 'Routines', stretching: 'Stretch & Yoga',      meditation: 'Meditate' },
  es: { home: 'Mi Día',   workout: 'Entreno',  routine: 'Rutinas',  stretching: 'Estiramiento & Yoga', meditation: 'Meditar' },
}

export function BottomNav() {
  const { pathname } = useLocation()
  const navigate     = useNavigate()
  const { profile }  = useAuthStore()
  const lang         = profile?.language ?? 'de'
  const labels       = NAV_LABELS[lang] ?? NAV_LABELS.de
  const activePillars = profile?.active_pillars?.length ? profile.active_pillars : ALL_PILLARS

  const visibleItems = NAV_ITEMS.filter(
    item => item.pillarId === null || activePillars.includes(item.pillarId)
  )

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 flex items-stretch lg:hidden"
      style={{
        backgroundColor: 'var(--color-bg-card)',
        borderTop: '1px solid var(--color-bg-elevated)',
        height: '60px',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      {visibleItems.map(({ path, icon, key, color }) => {
        const isCurrentPage = pathname === path
        const activeColor   = color ?? 'var(--color-text)'
        const label         = labels[key] ?? key

        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className="relative flex flex-col items-center justify-center gap-0.5 flex-1"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {isCurrentPage && (
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-8 rounded-b-full"
                style={{ backgroundColor: activeColor, height: '2px' }}
              />
            )}
            <span className="text-xl leading-none">{icon}</span>
            <span
              className="text-[10px] font-medium leading-none truncate max-w-[56px]"
              style={{ color: isCurrentPage ? activeColor : 'var(--color-text-muted)' }}
            >
              {label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
