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
import { CustomWorkoutsPage } from './pages/CustomWorkoutsPage'
import { SettingsPage } from './pages/SettingsPage'
import { HomePage } from './pages/HomePage'
import { LandingPage } from './pages/LandingPage'
import { ImpressumPage } from './pages/ImpressumPage'
import { DatenschutzPage } from './pages/DatenschutzPage'
import { StretchingPage } from './pages/StretchingPage'
import { MeditationPage } from './pages/MeditationPage'
import { FavoritesPage } from './pages/FavoritesPage'
import { HistoryPage } from './pages/HistoryPage'
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage'
import { AdminUsersPage } from './pages/admin/AdminUsersPage'
import { AdminTasksPage } from './pages/admin/AdminTasksPage'
import { AdminWodsPage } from './pages/admin/AdminWodsPage'
import { AdminPushPage } from './pages/admin/AdminPushPage'
import { AdminEmailsPage } from './pages/admin/AdminEmailsPage'
import { AdminFeedbackPage } from './pages/admin/AdminFeedbackPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 5 * 60 * 1000, gcTime: 30 * 60 * 1000, refetchOnWindowFocus: true },
  },
})

function RefreshPillarsOnFocus() {
  useEffect(() => {
    const refresh = () => {
      if (document.visibilityState !== 'visible') return
      void queryClient.invalidateQueries({ queryKey: ['today_pillars'] })
      void queryClient.invalidateQueries({ queryKey: ['week_pillars'] })
      void queryClient.invalidateQueries({ queryKey: ['routine_logs'] })
      void queryClient.invalidateQueries({ queryKey: ['routine_logs_week'] })
    }
    document.addEventListener('visibilitychange', refresh)
    window.addEventListener('focus', refresh)
    return () => {
      document.removeEventListener('visibilitychange', refresh)
      window.removeEventListener('focus', refresh)
    }
  }, [])
  return null
}

function ProfileRedirect() {
  const { search } = useLocation()
  return <Navigate to={`/settings${search}`} replace />
}

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

  // Not yet onboarded — send to /onboarding (only once profile has loaded)
  if (
    profile !== null &&
    !profile.primary_pillar &&
    location.pathname !== '/onboarding' &&
    !location.pathname.startsWith('/admin')
  ) {
    return <Navigate to="/onboarding" replace />
  }

  return <Outlet />
}

function AuthLayout() {
  const { user, loading } = useAuthStore()
  if (!loading && user) return <Navigate to="/home" replace />
  return <Outlet />
}

function LandingPublicRoute() {
  const { user, loading } = useAuthStore()
  if (loading) return null
  return user ? <Navigate to="/home" replace /> : <LandingPage />
}

function AppContent() {
  const initialize = useAuthStore((s) => s.initialize)

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <Routes>
      {/* Public landing page */}
      <Route path="/" element={<LandingPublicRoute />} />
      <Route path="/impressum"   element={<ImpressumPage />} />
      <Route path="/datenschutz" element={<DatenschutzPage />} />

      <Route element={<AuthLayout />}>
        <Route path="/login"    element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedLayout />}>
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route element={<AppShell />}>
          <Route path="/home"              element={<HomePage />} />
          <Route path="/workout"             element={<WorkoutPage />} />
          <Route path="/workout/custom"     element={<CustomWorkoutsPage />} />
          <Route path="/workout/:wodName"   element={<WorkoutPage />} />
          <Route path="/routine"          element={<RoutinePage />} />
          <Route path="/stretching"       element={<StretchingPage />} />
          <Route path="/meditation"       element={<MeditationPage />} />
          <Route path="/favorites"        element={<FavoritesPage />} />
          <Route path="/history"          element={<HistoryPage />} />
          <Route path="/settings"         element={<SettingsPage />} />
          <Route path="/profile"          element={<ProfileRedirect />} />
        </Route>
      </Route>

      {/* Admin area — AdminRoute handles auth + role check */}
      <Route
        path="/admin"
        element={<AdminRoute><AdminLayout /></AdminRoute>}
      >
        <Route index                   element={<AdminDashboardPage />} />
        <Route path="users"            element={<AdminUsersPage />} />
        <Route path="push"             element={<AdminPushPage />} />
        <Route path="emails"           element={<AdminEmailsPage />} />
        <Route path="feedback"         element={<AdminFeedbackPage />} />
        <Route path="wods"             element={<AdminWodsPage />} />
        <Route path="tasks"            element={<AdminTasksPage />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RefreshPillarsOnFocus />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </QueryClientProvider>
  )
}