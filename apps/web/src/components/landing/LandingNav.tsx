
interface Props {
  lang: 'de' | 'en'
  onToggleLang: () => void
  onLogin: () => void
  onStart: () => void
}

const T = {
  de: { features: 'Features', pricing: 'Preise', login: 'Anmelden', start: 'Kostenlos starten' },
  en: { features: 'Features', pricing: 'Pricing', login: 'Sign in',  start: 'Start for free' },
}

export function LandingNav({ lang, onToggleLang, onLogin, onStart }: Props) {
  const t = T[lang]
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-10 h-14"
      style={{ backgroundColor: 'rgba(13,13,20,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Logo */}
      <a href="#" className="flex items-center gap-2 shrink-0" aria-label="CarveOut">
        <img src="/carveout_logo.jpg" alt="CarveOut" style={{ height: 28, width: 28, objectFit: 'contain', borderRadius: 6 }} />
        <span className="text-sm font-bold tracking-wide" style={{ color: 'var(--color-text)' }}>CarveOut</span>
      </a>

      {/* Center links */}
      <div className="hidden md:flex items-center gap-6">
        <a href="#features" className="text-sm transition-colors hover:text-white" style={{ color: 'var(--color-text-muted)' }}>{t.features}</a>
        <a href="#pricing"  className="text-sm transition-colors hover:text-white" style={{ color: 'var(--color-text-muted)' }}>{t.pricing}</a>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleLang}
          className="px-2 py-1 rounded text-xs font-semibold transition-colors"
          style={{ color: 'var(--color-text-muted)', backgroundColor: 'rgba(255,255,255,0.06)' }}
        >
          {lang === 'de' ? 'EN' : 'DE'}
        </button>
        <button
          onClick={onLogin}
          className="hidden sm:block px-3 py-1.5 rounded-lg text-sm font-medium transition-colors hover:text-white"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {t.login}
        </button>
        <button
          onClick={onStart}
          className="px-4 py-1.5 rounded-lg text-sm font-bold text-white transition-opacity active:opacity-80"
          style={{ backgroundColor: '#E8642A' }}
        >
          {t.start}
        </button>
      </div>
    </nav>
  )
}
