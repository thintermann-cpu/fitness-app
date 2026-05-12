import { Link, useLocation } from 'react-router-dom'
import { LogoIcon } from '../ui/LogoIcon'
import { useAuthStore } from '../../store/authStore'

const ALL_PILLARS = ['workout', 'routine', 'stretching', 'meditation']

const NAV_ITEMS = [
  { path: '/workout',    icon: '💪', label: 'Workout',  color: '#E8642A', pillarId: 'workout' },
  { path: '/routine',    icon: '📋', label: 'Routine',  color: '#4A90D9', pillarId: null },
  { path: '/stretching', icon: '🧘', label: 'Stretch & Yoga',  color: '#7BC67E', pillarId: 'stretching' },
  { path: '/meditation', icon: '🧠', label: 'Focus',    color: '#9B7FD4', pillarId: 'meditation' },
] as const

export function Sidebar() {
  const { pathname } = useLocation()
  const { profile } = useAuthStore()
  const activePillars = profile?.active_pillars?.length ? profile.active_pillars : ALL_PILLARS

  const visibleItems = NAV_ITEMS.filter(
    item => item.pillarId === null || activePillars.includes(item.pillarId)
  )

  const initials = profile?.display_name
    ? profile.display_name.slice(0, 2).toUpperCase()
    : '?'

  return (
    <aside
      className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 z-40"
      style={{
        width: '240px',
        backgroundColor: '#16161F',
        borderRight: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Logo */}
      <div className="px-6 py-5 border-b flex items-center gap-3" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <LogoIcon className="w-8 h-8" style={{ color: '#E8642A' }} />
        <span className="text-xl font-black" style={{ color: '#E8642A' }}>Carve</span>
        <span className="text-xl font-black" style={{ color: 'var(--color-text)' }}>Out</span>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {visibleItems.map(({ path, icon, label, color }) => {
          const isActive = pathname === path || (path !== '/workout' && pathname.startsWith(path))
            || (path === '/workout' && (pathname === '/workout' || pathname.startsWith('/workout/')))
          const activeColor = color

          return (
            <Link
              key={path}
              to={path}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all"
              style={{
                backgroundColor: isActive ? `${activeColor}18` : 'transparent',
                color: isActive ? activeColor : 'var(--color-text-muted)',
              }}
            >
              <span className="text-lg leading-none w-6 text-center flex-shrink-0">{icon}</span>
              <span className="text-sm font-semibold">{label}</span>
              {isActive && (
                <div
                  className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: activeColor }}
                />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer: user info + settings */}
      <div className="px-3 py-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl">
          {/* Avatar */}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
            style={{ backgroundColor: '#E8642A20', color: '#E8642A' }}
          >
            {initials}
          </div>
          <span
            className="text-sm font-medium truncate flex-1"
            style={{ color: 'var(--color-text)' }}
          >
            {profile?.display_name ?? 'User'}
          </span>
          <Link
            to="/settings"
            className="flex-shrink-0 transition-colors"
            style={{
              color: pathname === '/settings' ? '#E8642A' : 'var(--color-text-muted)',
            }}
            title="Settings"
          >
            <span className="text-base leading-none">⚙️</span>
          </Link>
        </div>
      </div>
    </aside>
  )
}
