import { Link, useLocation } from 'react-router-dom'
import { LogoIcon } from '../ui/LogoIcon'
import { useAuthStore } from '../../store/authStore'
import { useFavorites } from '../../hooks/useFavorites'

const ALL_PILLARS = ['workout', 'routine', 'stretching', 'meditation']

const NAV_ITEMS = [
  { path: '/',           icon: '🏠', key: 'home',       color: '#F0EDE8', pillarId: null },
  { path: '/routine',    icon: '📋', key: 'routine',    color: '#4A90D9', pillarId: null },
  { path: '/workout',    icon: '💪', key: 'workout',    color: '#E8642A', pillarId: 'workout' },
  { path: '/stretching', icon: '🧘', key: 'stretching', color: '#7BC67E', pillarId: 'stretching' },
  { path: '/meditation', icon: '🧠', key: 'meditation', color: '#9B7FD4', pillarId: 'meditation' },
] as const

const SIDEBAR_LABELS: Record<string, Record<string, string>> = {
  de: { home: 'Mein Tag', workout: 'Training', routine: 'Rituale',  stretching: 'Stretch & Yoga',      meditation: 'Fokus'    },
  en: { home: 'My Day',   workout: 'Workout',  routine: 'Rituals',  stretching: 'Stretch & Yoga',      meditation: 'Meditate' },
  es: { home: 'Mi Día',   workout: 'Entreno',  routine: 'Rituales', stretching: 'Estiramiento & Yoga', meditation: 'Meditar'  },
}

export function Sidebar() {
  const { pathname }  = useLocation()
  const { profile }   = useAuthStore()
  const { favorites } = useFavorites()
  const activePillars = profile?.active_pillars?.length ? profile.active_pillars : ALL_PILLARS
  const favCount      = favorites.length
  const lang          = profile?.language ?? 'de'
  const labels        = SIDEBAR_LABELS[lang] ?? SIDEBAR_LABELS.de

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
        {visibleItems.map(({ path, icon, key, color }) => {
          const label = labels[key] ?? key
          const isActive = path === '/'
            ? pathname === '/'
            : (pathname === path
                || (path !== '/workout' && pathname.startsWith(path))
                || (path === '/workout' && (pathname === '/workout' || pathname.startsWith('/workout/'))))
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

      {/* Favorites link */}
      <div className="px-3 pb-2">
        <Link
          to="/favorites"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all"
          style={{
            backgroundColor: pathname === '/favorites' ? '#E8642A18' : 'transparent',
            color: pathname === '/favorites' ? '#E8642A' : 'var(--color-text-muted)',
          }}
        >
          <span className="text-lg leading-none w-6 text-center flex-shrink-0">
            {favCount > 0 ? (
              <svg viewBox="0 0 24 24" fill="#E8642A" width="20" height="20" style={{ display: 'inline' }}>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20" style={{ display: 'inline' }}>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            )}
          </span>
          <span className="text-sm font-semibold flex-1">Favoriten</span>
          {favCount > 0 && (
            <span
              className="text-xs font-bold px-1.5 py-0.5 rounded-full"
              style={{ backgroundColor: '#E8642A22', color: '#E8642A' }}
            >
              {favCount}
            </span>
          )}
          {pathname === '/favorites' && (
            <div className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#E8642A' }} />
          )}
        </Link>
      </div>

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
