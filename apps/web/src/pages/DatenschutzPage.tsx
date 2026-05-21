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

const SECTIONS = {
  de: [
    {
      title: '1. Verantwortlicher',
      body: 'Tim Hintermann\nKontakt: t.hintermann@gmail.com',
    },
    {
      title: '2. Welche Daten wir verarbeiten',
      body: '**Konto-Daten:** E-Mail-Adresse (via Supabase Auth) — ausschliesslich für die Anmeldung.\n\n**Nutzungsdaten:** Anonyme Ereignisse (via PostHog, EU-Server) — kein Name, keine E-Mail-Adresse, kein Gerätefingerprint.\n\n**Keine Cookies:** PostHog läuft im Memory-Modus; es werden keine Tracking-Daten lokal gespeichert.',
    },
    {
      title: '3. Zweck der Verarbeitung',
      body: '**Konto-Daten:** Authentifizierung und Bereitstellung des Dienstes.\n\n**Nutzungsdaten:** Produktverbesserung (z. B. welche Funktionen genutzt werden).',
    },
    {
      title: '4. Weitergabe an Dritte',
      body: '**Supabase (Irland/EU):** Datenbankhosting und Authentifizierung.\n\n**PostHog (EU-Cloud):** Anonymes Event-Tracking.\n\nKeine Weitergabe an Werbetreibende, kein Datenverkauf.',
    },
    {
      title: '5. Deine Rechte (DSGVO Art. 15–21)',
      body: 'Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung und Widerspruch.\n\nAnfragen an: t.hintermann@gmail.com',
    },
    {
      title: '6. Datenlöschung',
      body: '**Account-Daten:** Löschung auf Anfrage per E-Mail an t.hintermann@gmail.com.\n\n**Anonyme Tracking-Daten:** Können nicht gelöscht werden, da kein Personenbezug besteht.',
    },
    {
      title: '7. Änderungen',
      body: 'Diese Datenschutzerklärung kann jederzeit angepasst werden. Stand: Mai 2026.',
    },
  ],
  en: [
    {
      title: '1. Controller',
      body: 'Tim Hintermann\nContact: t.hintermann@gmail.com',
    },
    {
      title: '2. Data We Process',
      body: '**Account data:** Email address (via Supabase Auth) — used for login only.\n\n**Usage data:** Anonymous events (via PostHog, EU server) — no name, no email, no device fingerprint.\n\n**No cookies:** PostHog runs in memory mode; no tracking data is stored locally.',
    },
    {
      title: '3. Purpose of Processing',
      body: '**Account data:** Authentication and service provision.\n\n**Usage data:** Product improvement (e.g., which features are used).',
    },
    {
      title: '4. Third Parties',
      body: '**Supabase (Ireland/EU):** Database hosting and authentication.\n\n**PostHog (EU Cloud):** Anonymous event tracking.\n\nNo data sold, no advertising partners.',
    },
    {
      title: '5. Your Rights (GDPR Art. 15–21)',
      body: 'You have the right to access, rectification, erasure, restriction of processing, and objection.\n\nContact: t.hintermann@gmail.com',
    },
    {
      title: '6. Data Deletion',
      body: '**Account data:** Deleted on request via email to t.hintermann@gmail.com.\n\n**Anonymous tracking data:** Cannot be deleted as it contains no personal information.',
    },
    {
      title: '7. Changes',
      body: 'This privacy policy may be updated at any time. Last updated: May 2026.',
    },
  ],
}

const LABELS = {
  de: { title: 'Datenschutzerklärung', back: '← Zurück zur Startseite' },
  en: { title: 'Privacy Policy',       back: '← Back to Homepage' },
}

function renderBody(text: string) {
  return text.split('\n\n').map((para, i) => {
    const parts = para.split(/\*\*(.+?)\*\*/g)
    return (
      <p key={i} className="mb-3 last:mb-0" style={{ color: 'var(--color-text-muted)' }}>
        {parts.map((part, j) =>
          j % 2 === 1
            ? <strong key={j} style={{ color: 'var(--color-text)' }}>{part}</strong>
            : part
        )}
      </p>
    )
  })
}

export function DatenschutzPage() {
  const [lang, setLang] = useState<Lang>(getInitialLang)

  function toggleLang() {
    const next: Lang = lang === 'de' ? 'en' : 'de'
    setLang(next)
    localStorage.setItem('lang', next)
  }

  const sections = SECTIONS[lang]
  const labels   = LABELS[lang]

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
            {labels.back}
          </Link>

          <h1 className="text-3xl font-black mb-10" style={{ color: 'var(--color-text)' }}>
            {labels.title}
          </h1>

          <div className="space-y-4">
            {sections.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl p-6"
                style={{ backgroundColor: 'var(--color-bg-card)' }}
              >
                <h2 className="text-base font-bold mb-3" style={{ color: 'var(--color-text)' }}>
                  {s.title}
                </h2>
                <div className="text-sm leading-relaxed">
                  {renderBody(s.body)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <LandingFooter lang={lang} onToggleLang={toggleLang} />
    </div>
  )
}
