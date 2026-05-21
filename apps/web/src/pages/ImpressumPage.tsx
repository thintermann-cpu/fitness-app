import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LandingNav }    from '../components/landing/LandingNav'
import { LandingFooter } from '../components/landing/LandingFooter'

type Lang = 'de' | 'en'

function getInitialLang(): Lang {
  const stored = localStorage.getItem('lang') as Lang | null
  if (stored === 'de' || stored === 'en') return stored
  const browser = navigator.language.toLowerCase()
  return browser.startsWith('de') || browser.startsWith('at') || browser.startsWith('ch') ? 'de' : 'en'
}

const T = {
  de: {
    title:     'Impressum',
    back:      '← Zurück zur Startseite',
    legal:     'Angaben gemäss § 5 TMG / Art. 13 UWG',
    email:     'E-Mail',
    responsible: 'Verantwortlich für den Inhalt',
    note:      'Hinweis: CarveOut ist ein privates Projekt ohne gewerbliche Absicht. Alle Inhalte dienen ausschliesslich dem persönlichen Gebrauch.',
  },
  en: {
    title:     'Legal Notice',
    back:      '← Back to Homepage',
    legal:     'Information according to § 5 TMG / Art. 13 UWG',
    email:     'Email',
    responsible: 'Responsible for content',
    note:      'Note: CarveOut is a private project without commercial intent. All content is for personal use only.',
  },
}

export function ImpressumPage() {
  const [lang, setLang] = useState<Lang>(getInitialLang)

  function toggleLang() {
    const next: Lang = lang === 'de' ? 'en' : 'de'
    setLang(next)
    localStorage.setItem('lang', next)
  }

  const t = T[lang]

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg)' }}>
      <LandingNav
        lang={lang}
        onToggleLang={toggleLang}
        onLogin={() => window.location.href = '/login'}
        onStart={() => window.location.href = '/register'}
      />

      <main className="flex-1 pt-24 pb-20 px-5">
        <div className="max-w-2xl mx-auto">
          <Link
            to="/"
            className="inline-block text-sm mb-8 transition-colors hover:text-white"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {t.back}
          </Link>

          <h1 className="text-3xl font-black mb-2" style={{ color: 'var(--color-text)' }}>
            {t.title}
          </h1>
          <p className="text-sm mb-8" style={{ color: 'var(--color-text-muted)' }}>
            {t.legal}
          </p>

          <div
            className="rounded-2xl p-6 space-y-4 text-sm"
            style={{ backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text)' }}
          >
            <div>
              <p className="font-semibold">Tim Hintermann</p>
              <p style={{ color: 'var(--color-text-muted)' }}>[Adresse auf Anfrage]</p>
            </div>

            <div>
              <p className="font-semibold">{t.email}</p>
              <a
                href="mailto:t.hintermann@gmail.com"
                className="transition-colors hover:text-white"
                style={{ color: 'var(--color-text-muted)' }}
              >
                t.hintermann@gmail.com
              </a>
            </div>

            <div>
              <p className="font-semibold">{t.responsible}</p>
              <p style={{ color: 'var(--color-text-muted)' }}>Tim Hintermann</p>
            </div>
          </div>

          <p
            className="mt-6 text-sm rounded-2xl p-4"
            style={{ backgroundColor: 'rgba(255,255,255,0.04)', color: 'var(--color-text-muted)' }}
          >
            {t.note}
          </p>
        </div>
      </main>

      <LandingFooter lang={lang} onToggleLang={toggleLang} />
    </div>
  )
}
