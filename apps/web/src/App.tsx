import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAuthStore } from './store/authStore'
import { AppShell } from './components/layout/AppShell'
import { AdminLayout } from './components/layout/AdminLayout'
import AdminRoute from './components/AdminRoute'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { OnboardingPage } from './pages/OnboardingPage'
import { RoutinePage } from './pages/RoutinePage'
import { WorkoutPage } from './pages/WorkoutPage'
import { SettingsPage } from './pages/SettingsPage'
import { HomePage } from './pages/HomePage'
import { StretchingPage } from './pages/StretchingPage'
import { MeditationPage } from './pages/MeditationPage'
import { FavoritesPage } from './pages/FavoritesPage'
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage'
import { AdminUsersPage } from './pages/admin/AdminUsersPage'
import { AdminTasksPage } from './pages/admin/AdminTasksPage'
import { AdminWodsPage } from './pages/admin/AdminWodsPage'
import { AdminPlaceholderPage } from './pages/admin/AdminPlaceholderPage'
import { ProfilePage } from './pages/ProfilePage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 5 * 60 * 1000, gcTime: 10 * 60 * 1000 },
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

  // Not yet onboarded — send to /onboarding (avoid redirect loop, skip for admin)
  if (
    !profile?.primary_pillar &&
    location.pathname !== '/onboarding' &&
    !location.pathname.startsWith('/admin')
  ) {
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
          <Route path="/stretching"       element={<StretchingPage />} />
          <Route path="/meditation"       element={<MeditationPage />} />
          <Route path="/favorites"        element={<FavoritesPage />} />
          <Route path="/settings"         element={<SettingsPage />} />
          <Route path="/profile"          element={<ProfilePage />} />
        </Route>
      </Route>

      {/* Admin area — AdminRoute handles auth + role check */}
      <Route
        path="/admin"
        element={<AdminRoute><AdminLayout /></AdminRoute>}
      >
        <Route index                   element={<AdminDashboardPage />} />
        <Route path="users"            element={<AdminUsersPage />} />
        <Route path="push"             element={<AdminPlaceholderPage title="Push Reminders" />} />
        <Route path="emails"           element={<AdminPlaceholderPage title="Emails" />} />
        <Route path="feedback"         element={<AdminPlaceholderPage title="Feedback" />} />
        <Route path="wods"             element={<AdminWodsPage />} />
        <Route path="tasks"            element={<AdminTasksPage />} />
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