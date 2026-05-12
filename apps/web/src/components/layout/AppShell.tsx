import { Outlet, Link } from 'react-router-dom'
import { BottomNav } from './BottomNav'
import { Sidebar } from './Sidebar'
import { useFavorites } from '../../hooks/useFavorites'

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

export function AppShell() {
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* Fixed sidebar – only visible on lg+ */}
      <Sidebar />

      {/* Content area: offset by sidebar width on desktop */}
      <div className="flex flex-col flex-1 lg:pl-[240px]">
        {/* Mobile-only top bar with favorites shortcut */}
        <div
          className="lg:hidden flex items-center justify-end px-3 border-b border-white/5 sticky top-0 z-20"
          style={{ height: 44, backgroundColor: 'var(--color-bg)' }}
        >
          <FavoritesHeaderBtn />
        </div>

        <main className="flex-1 overflow-y-auto pb-[60px] lg:pb-0">
          <Outlet />
        </main>
        <BottomNav />
      </div>
    </div>
  )
}
