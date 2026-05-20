
interface Props {
  lang: 'de' | 'en'
  onToggleLang: () => void
}

const T = {
  de: { tagline: 'Deine tägliche Praxis.', privacy: 'Datenschutz', legal: 'Impressum', copyright: '© 2026 CarveOut' },
  en: { tagline: 'Your daily practice.',   privacy: 'Privacy Policy', legal: 'Legal Notice', copyright: '© 2026 CarveOut' },
}

export function LandingFooter({ lang, onToggleLang }: Props) {
  const t = T[lang]
  return (
    <footer
      className="px-5 md:px-10 py-10"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)', backgroundColor: 'var(--color-bg)' }}
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src="/carveout_logo.jpg" alt="CarveOut" style={{ height: 24, width: 24, objectFit: 'contain', borderRadius: 5 }} />
          <span className="text-sm font-semibold" style={{ color: 'var(--color-text-muted)' }}>
            CarveOut — {t.tagline}
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--color-text-subtle)' }}>
          <a href="/datenschutz" className="hover:text-white transition-colors">{t.privacy}</a>
          <a href="/impressum"   className="hover:text-white transition-colors">{t.legal}</a>
          <span>{t.copyright}</span>
          <button
            onClick={onToggleLang}
            className="px-2 py-0.5 rounded text-xs font-semibold transition-colors hover:text-white"
          >
            {lang === 'de' ? 'EN' : 'DE'}
          </button>
        </div>
      </div>
    </footer>
  )
}
