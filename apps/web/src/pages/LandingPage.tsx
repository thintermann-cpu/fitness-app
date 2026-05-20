import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LandingNav }       from '../components/landing/LandingNav'
import { Hero }             from '../components/landing/Hero'
import { PersonaSection }   from '../components/landing/PersonaSection'
import { PillarSection }    from '../components/landing/PillarSection'
import { HowItWorks }       from '../components/landing/HowItWorks'
import { ResultsTimeline }  from '../components/landing/ResultsTimeline'
import { PricingSection }   from '../components/landing/PricingSection'
import { CtaSection }       from '../components/landing/CtaSection'
import { LandingFooter }    from '../components/landing/LandingFooter'

type Lang = 'de' | 'en'

function getInitialLang(): Lang {
  const stored = localStorage.getItem('lang') as Lang | null
  if (stored === 'de' || stored === 'en') return stored
  const browser = navigator.language.toLowerCase()
  return browser.startsWith('de') || browser.startsWith('at') || browser.startsWith('ch') ? 'de' : 'en'
}

export function LandingPage() {
  const navigate = useNavigate()
  const [lang, setLang] = useState<Lang>(getInitialLang)

  function toggleLang() {
    const next: Lang = lang === 'de' ? 'en' : 'de'
    setLang(next)
    localStorage.setItem('lang', next)
  }

  function handleStart() { navigate('/register') }
  function handleLogin()  { navigate('/login')    }

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => { document.documentElement.style.scrollBehavior = '' }
  }, [])

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)', minHeight: '100vh' }}>
      <style>{`
        .lp-fade { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .lp-visible { opacity: 1; transform: translateY(0); }
      `}</style>

      <LandingNav lang={lang} onToggleLang={toggleLang} onLogin={handleLogin} onStart={handleStart} />
      <Hero            lang={lang} onStart={handleStart} />
      <PersonaSection  lang={lang} />
      <PillarSection   lang={lang} />
      <HowItWorks      lang={lang} />
      <ResultsTimeline lang={lang} />
      <PricingSection  lang={lang} />
      <CtaSection      lang={lang} onStart={handleStart} />
      <LandingFooter   lang={lang} onToggleLang={toggleLang} />
    </div>
  )
}
