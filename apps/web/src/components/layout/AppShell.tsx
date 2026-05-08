import { Outlet } from 'react-router-dom'
import { BottomNav } from './BottomNav'
import { Sidebar } from './Sidebar'

export function AppShell() {
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* Fixed sidebar – only visible on lg+ */}
      <Sidebar />

      {/* Content area: offset by sidebar width on deskto