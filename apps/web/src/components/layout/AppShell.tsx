import { Outlet } from 'react-router-dom'
import { BottomNav } from './BottomNav'
import { Sidebar } from './Sidebar'

export function AppShell() {
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* Fixed sidebar – only visible on lg+ */}
      <Sidebar />

      {/* Content area: offset by sidebar width on desktop */}
      <div className="flex flex-col flex-1 lg:pl-[240px]">
        <main className="flex-1 overflow-y-auto pb-[60px] lg:pb-0">
          <Outlet />
        </main>
        <BottomNav />
      </div>
    </div>
  )
}
