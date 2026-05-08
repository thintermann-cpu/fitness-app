import { Outlet } from 'react-router-dom'
import { BottomNav } from './BottomNav'

export function AppShell() {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <main className="flex-1 overflow-y-auto" style={{ paddingBottom: '60px' }}>
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
