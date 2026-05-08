import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

interface NavItem {
  to: string
  label: string
  icon: string
  end?: boolean
}

const NAV_ITEMS: NavItem[] = [
  { to: '/admin',              label: 'Dashboard',      icon: '⬛', end: true },
  { to: '/admin/users',        label: 'Users',          icon: '👥' },
  { to: '/admin/push',         label: 'Push Reminders', icon: '🔔' },
  { to: '/admin/emails',       label: 'Emails',         icon: '✉️' },
  { to: '/admin/feedback',     label: 'Feedback',       icon: '💬' },
  { to: '/admin/wods',         label: 'WODs',           icon: '🏋️' },
  { to: '/admin/tasks',        label: 'Manual Tasks',   icon: '📋' },
]

export function AdminLayout() {
  const { signOut } = useAuthStore()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/login')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: '220px',
          minHeight: '100vh',
          backgroundColor: 'var(--color-bg-card)',
          borderRight: '1px solid var(--color-bg-elevated)',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 50,
        }}
      >
        {/* Logo area */}
        <div
          style={{
            padding: '24px 20px 18px',
            borderBottom: '1px solid var(--color-bg-elevated)',
          }}
        >
          <span
            style={{
              color: 'var(--color-primary)',
              fontWeight: 700,
              fontSize: '18px',
              letterSpacing: '-0.5px',
            }}
          >
            CarveOut
          </span>
          <span
            style={{
              color: 'var(--color-text-muted)',
              fontSize: '11px',
              display: 'block',
              marginTop: '2px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Admin Panel
          </span>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '12px 10px', overflowY: 'auto' }}>
          {NAV_ITEMS.map(({ to, label, icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '9px 12px',
                borderRadius: '8px',
                marginBottom: '2px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
                backgroundColor: isActive ? 'rgba(232,100,42,0.12)' : 'transparent',
                transition: 'background-color 0.15s, color 0.15s',
              })}
            >
              <span style={{ fontSize: '15px', width: '18px', textAlign: 'center' }}>{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div style={{ padding: '12px 10px', borderTop: '1px solid var(--color-bg-elevated)' }}>
          <button
            onClick={handleSignOut}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              width: '100%',
              padding: '9px 12px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: 'transparent',
              color: 'var(--color-text-muted)',
              fontSize: '14px',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-error)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}
          >
            <span style={{ fontSize: '15px', width: '18px', textAlign: 'center' }}>🚪</span>
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main
        style={{
          marginLeft: '220px',
          flex: 1,
          padding: '36px 40px',
          minHeight: '100vh',
          color: 'var(--color-text)',
        }}
      >
        <Outlet />
      </main>
    </div>
  )
}
