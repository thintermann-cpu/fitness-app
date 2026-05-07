import { useState, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const signIn = useAuthStore((s) => s.signIn)
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const { error } = await signIn(email, password)
    setLoading(false)
    if (error) {
      setError(error)
    } else {
      navigate('/', { replace: true })
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ background: 'var(--color-bg)' }}>
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-10 text-center">
          <span className="text-3xl font-bold tracking-tight" style={{ color: 'var(--color-primary)' }}>
            CarveOut
          </span>
          <p className="mt-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Dein Fitness-Companion
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-6" style={{ background: 'var(--color-bg-card)' }}>
          <h1 className="text-xl font-semibold mb-6" style={{ color: 'var(--color-text)' }}>
            Anmelden
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>
                E-Mail
              </label>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                style={{
                  background: 'var(--color-bg-elevated)',
                  color: 'var(--color-text)',
                  border: '1px solid var(--color-text-subtle)',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--color-primary)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--color-text-subtle)')}
                placeholder="du@example.com"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>
                Passwort
              </label>
              <input
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                style={{
                  background: 'var(--color-bg-elevated)',
                  color: 'var(--color-text)',
                  border: '1px solid var(--color-text-subtle)',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--color-primary)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--color-text-subtle)')}
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-sm rounded-xl px-4 py-3" style={{ color: 'var(--color-error)', background: 'rgba(244,67,54,0.1)' }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl py-3 text-sm font-semibold transition-opacity disabled:opacity-60 mt-2"
              style={{ background: 'var(--color-primary)', color: '#fff' }}
            >
              {loading ? 'Wird angemeldet…' : 'Anmelden'}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Noch kein Konto?{' '}
          <Link to="/register" className="font-medium" style={{ color: 'var(--color-primary)' }}>
            Registrieren
          </Link>
        </p>
      </div>
    </div>
  )
}
