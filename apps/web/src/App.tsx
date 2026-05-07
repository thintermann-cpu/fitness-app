import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAuthStore } from './store/authStore'
import { AppShell } from './components/layout/AppShell'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { OnboardingPage } from './pages/OnboardingPage'
import { RoutinePage } from './pages/RoutinePage'
import { WorkoutPage } from './pages/WorkoutPage'
import { SettingsPage } from './pages/SettingsPage'
import { HomePage } from './pages/HomePage'

const Stretching = () => <div className="p-4" style={{ color: 'var(--color-text)' }}>Stretching</div>
const Meditation = () => <div className="p-4" style={{ color: 'var(--color-text)' }}>Meditation</div>

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 2 * 60 * 1000 },
  },
})

function ProtectedLayout() {
  const { user, loading, profile } = useAuthStore()
  const location = useLocation()

  if (loading) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        style={{ backgroundColor: 'var(--color-bg)' }}
      >
        <span style={{ color: 'var(--color-text-muted)' }}>Loading…</span>
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />

  // Not yet onboarded — send to /onboarding (avoid redirect loop)
  if (!profile?.primary_pillar && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />
  }

  return <Outlet />
}

function AuthLayout() {
  const { user, loading } = useAuthStore()
  if (loading) return null
  return user ? <Navigate to="/" replace /> : <Outlet />
}

function AppContent() {
  const initialize = useAuthStore((s) => s.initialize)

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login"    element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedLayout />}>
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route element={<AppShell />}>
          <Route path="/"                 element={<HomePage />} />
          <Route path="/workout"          element={<WorkoutPage />} />
          <Route path="/workout/:wodName" element={<WorkoutPage />} />
          <Route path="/routine"          element={<RoutinePage />} />
          <Route path="/stretching"       element={<Stretching />} />
          <Route path="/meditation"       element={<Meditation />} />
          <Route path="/settings"         element={<SettingsPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </QueryClientProvider>
  )
}
