import { useRef } from 'react'
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { BottomNav } from './BottomNav'
import { Sidebar } from './Sidebar'
import { LogoIcon } from '../ui/LogoIcon'
import { useFavorites } from '../../hooks/useFavorites'
import { useAudioStore } from '../../store/audioStore'
import { useAuthStore } from '../../store/authStore'
import { ToastContainer } from '../ui/ToastContainer'

const MAIN_ROUTES = ['/', '/routine', '/workout', '/stretching', '/meditation']
const ROUTE_PILLAR: Record<string, string | null> = {
  '/': null, '/routine': null, '/workout': 'workout',
  '/stretching': 'stretching', '/meditation': 'meditation',
}

function FavoritesHeaderBtn() {
  const { favorites } = useFavorites()
  const count = favorites.length
  return (
    <Link
      to="/favorites"
      className="relative flex items-center justify-center"
      style={{ minWidth: 44, minHeight: 44 }}
      aria-label="Favoriten"
    >
      {count > 0 ? (
        <svg viewBox="0 0 24 24" fill="#E8642A" width="20" height="20" aria-hidden="true">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" width="20" height="20" aria-hidden="true">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      )}
      {count > 0 && (
        <span
          className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 flex items-center justify-center rounded-full text-[10px] font-bold text-white"
          style={{ backgroundColor: '#E8642A', padding: '0 3px' }}
        >
          {count > 99 ? '99+' : count}
        </span>
      )}
    </Link>
  )
}

function MuteHeaderBtn() {
  const { isMuted, toggleMute } = useAudioStore()
  return (
    <button
      onClick={toggleMute}
      aria-label={isMuted ? 'Ton einschalten' : 'Ton ausschalten'}
      style={{ minWidth: 44, minHeight: 44 }}
      className="flex items-center justify-center"
    >
      {isMuted ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" width="20" height="20" aria-hidden="true">
          <path d="M11 5L6 9H2v6h4l5 4V5z" strokeLinejoin="round" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" width="20" height="20" aria-hidden="true">
          <path d="M11 5L6 9H2v6h4l5 4V5z" strokeLinejoin="round" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      )}
    </button>
  )
}

export function AppShell() {
  const location    = useLocation()
  const navigate    = useNavigate()
  const { profile } = useAuthStore()
  const touchX      = useRef(0)
  const touchY      = useRef(0)
  const firstName   = profile?.display_name?.trim().split(' ')[0] ?? ''

  const activePillars = profile?.active_pillars?.length
    ? profile.active_pillars
    : ['workout', 'routine', 'stretching', 'meditation']

  const swipeRoutes = MAIN_ROUTES.filter(r => {
    const p = ROUTE_PILLAR[r]
    return p === null || activePillars.includes(p)
  })

  const handleTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX
    touchY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchX.current
    const dy = e.changedTouches[0].clientY - touchY.current
    if (Math.abs(dx) < 50 || Math.abs(dy) > 30) return
    const idx = swipeRoutes.indexOf(location.pathname)
    if (idx < 0) return
    if (dx < 0 && idx < swipeRoutes.length - 1) navigate(swipeRoutes[idx + 1])
    else if (dx > 0 && idx > 0) navigate(swipeRoutes[idx - 1])
  }

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* Fixed sidebar – only visible on lg+ */}
      <Sidebar />

      {/* Content area: offset by sidebar width on desktop */}
      <div className="flex flex-col flex-1 lg:pl-[240px]">
        {/* Mobile header */}
        <div
          className="lg:hidden flex items-center px-3 border-b sticky top-0 z-20"
          style={{ height: 52, backgroundColor: 'var(--color-bg-card)', borderColor: 'rgba(255,255,255,0.08)' }}
        >
          {/* Left: logo */}
          <div className="flex items-center gap-1.5 flex-1 min-w-0">
            <LogoIcon className="w-5 h-5 flex-shrink-0" style={{ color: '#E8642A' }} />
            <span className="font-black text-sm leading-none" style={{ color: '#E8642A' }}>Carve</span>
            <span className="font-black text-sm leading-none" style={{ color: 'var(--color-text)' }}>Out</span>
          </div>
          {/* Right: vorname + icons */}
          <div className="flex items-center gap-0.5 flex-shrink-0">
            {firstName && (
              <Link
                to="/profile"
                className="max-[360px]:hidden text-xs px-1 truncate max-w-[72px]"
                style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}
              >
                {firstName}
              </Link>
            )}
            <MuteHeaderBtn />
            <FavoritesHeaderBtn />
            <Link
              to="/settings"
              className="flex items-center justify-center"
              style={{
                minWidth: 44, minHeight: 44,
                color: location.pathname === '/settings' ? '#E8642A' : 'rgba(255,255,255,0.4)',
              }}
              aria-label="Einstellungen"
            >
              <span className="text-xl leading-none">⚙️</span>
            </Link>
          </div>
        </div>

        <main
          className="flex-1 overflow-y-auto pb-[60px] lg:pb-0"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <Outlet />
        </main>
        <BottomNav />
      </div>
      <ToastContainer />
    </div>
  )
}
