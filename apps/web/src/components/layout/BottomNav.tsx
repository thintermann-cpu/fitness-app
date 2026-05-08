import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

const ALL_PILLARS = ['workout', 'routine', 'stretching', 'meditation']

const NAV_ITEMS = [
  { path: '/workout',    icon: '💪', label: 'Workout',  color: '#E8642A', pillarId: 'workout' },
  { path: '/routine',    icon: '📋', label: 'Routine',  color: '#4A90D9', pillarId: null },
  { path: '/stretching', icon: '🧘', label: 'Stretch',  color: '#7BC67E', pillarId: 'stretching' },
  { path: '/meditation', icon: '🧠', label: 'Focus',    color: '#9B7FD4', pillarId: 'meditation' },
  { path: '/settings',   icon: '⚙️', label: 'Settings', color: null,      pillarId: null },
] as const

export function BottomNav() {
  const { pathname } = useLocation()
  const { profile } = useAuthStore()
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
      {visibleItems.map(({ path, icon, label, color }) => {
        const isActive = pathname === path
        const activeColor = color ?? 'var(--color-text)'

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
              className="text-[10px] font-medium leading-none"
              style={{ color: isActive ? activeColor : 'var(--color-text-muted)' }}
            >
              {label}
            </span>
          </Link>
        )
      })}
    </nav>