import { Link, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  { path: '/workout',    icon: '💪', label: 'Workout',  color: '#E8642A' },
  { path: '/routine',    icon: '📋', label: 'Routine',  color: '#4A90D9' },
  { path: '/stretching', icon: '🧘', label: 'Stretch',  color: '#7BC67E' },
  { path: '/meditation', icon: '🧠', label: 'Focus',    color: '#9B7FD4' },
  { path: '/settings',   icon: '⚙️', label: 'Settings', color: null },
] as const

export function BottomNav() {
  const { pathname } = useLocation()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 flex items-stretch"
      style={{
        backgroundColor: 'var(--color-bg-card)',
        borderTop: '1px solid var(--color-bg-elevated)',
        height: '60px',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      {NAV_ITEMS.map(({ path, icon, label, color }) => {
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
  )
}
