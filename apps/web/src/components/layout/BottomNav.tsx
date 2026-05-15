import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

const ALL_PILLARS = ['workout', 'routine', 'stretching', 'meditation']

const NAV_ITEMS = [
  { path: '/',           icon: '🏠', key: 'home',       color: null,      pillarId: null },
  { path: '/workout',    icon: '💪', key: 'workout',    color: '#E8642A', pillarId: 'workout' },
  { path: '/routine',    icon: '📋', key: 'routine',    color: '#4A90D9', pillarId: null },
  { path: '/stretching', icon: '🧘', key: 'stretching', color: '#7BC67E', pillarId: 'stretching' },
  { path: '/meditation', icon: '🧠', key: 'meditation', color: '#9B7FD4', pillarId: 'meditation' },
  { path: '/settings',   icon: '⚙️', key: 'settings',   color: null,      pillarId: null },
] as const

const NAV_LABELS: Record<string, Record<string, string>> = {
  de: { home: 'Start',   workout: 'Training', routine: 'Mein Tag', stretching: 'Stretch & Yoga',      meditation: 'Fokus',    settings: 'Einstellungen' },
  en: { home: 'Home',    workout: 'Workout',  routine: 'My Day',   stretching: 'Stretch & Yoga',      meditation: 'Meditate', settings: 'Settings' },
  es: { home: 'Inicio',  workout: 'Entreno',  routine: 'Mi Día',   stretching: 'Estiramiento & Yoga', meditation: 'Meditar',  settings: 'Ajustes' },
}

export function BottomNav() {
  const { pathname } = useLocation()
  const { profile }  = useAuthStore()
  const lang         = profile?.language ?? 'de'
  const labels       = NAV_LABELS[lang] ?? NAV_LABELS.de
  const activePillars = profile?.active_pillars?.length ? profile.active_pillars : ALL_PILLARS

  const visibleItems = NAV_ITEMS.filter(item =>
    item.pillarId === null || activePillars.includes(item.pillarId)
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
        const isActive    = pathname === path
        const activeColor = color ?? 'var(--color-text)'
        const label       = labels[key] ?? key

        return (
          <Link
            key={path}
            to={path}
            className="relative flex flex-col items-center justify-center gap-0.5 flex-1 transition-opacity"
            style={{ color: isActive ? activeColor : 'var(--color-text-subtle)' }}
          >
            {isActive && (
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-8 rounded-b-full"
                style={{ backgroundColor: activeColor, height: '2px' }}
              />
            )}
            <span className="text-xl leading-none">{icon}</span>
            <span
              className="text-[10px] font-medium leading-none truncate max-w-[56px]"
              style={{ color: isActive ? activeColor : 'var(--color-text-muted)' }}
            >
              {label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
