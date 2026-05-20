import { useEffect, useRef } from 'react'

interface Props {
  lang: 'de' | 'en'
  onStart: () => void
}

const T = {
  de: {
    headline: 'Beweg deinen Hintern.',
    sub: 'Freundlich gemeint.',
    text: 'Es gibt keinen perfekten Zeitpunkt. Es gibt nur heute. 3 Minuten sind mehr als null. Eine Session ist mehr als keine. CarveOut ist bereit — bist du es auch?',
    cta: 'Jetzt kostenlos starten →',
    tagline: 'Nicht perfekt — einfach & konstant.',
  },
  en: {
    headline: 'Get off the couch.',
    sub: 'Said with love.',
    text: 'There\'s no perfect moment. There\'s only today. 3 minutes beats zero. One session beats none. CarveOut is ready — are you?',
    cta: 'Start for free →',
    tagline: 'Not perfect — just consistent.',
  },
}

export function CtaSection({ lang, onStart }: Props) {
  const t = T[lang]
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('lp-visible'); obs.disconnect() } },
      { threshold: 0.1 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="px-5 md:px-10 py-24 text-center" style={{ backgroundColor: 'var(--color-bg-card)' }}>
      <div ref={ref} className="lp-fade max-w-xl mx-auto space-y-5">
        <h2
          className="font-black leading-tight"
          style={{ fontSize: 'clamp(32px, 7vw, 60px)', color: 'var(--color-text)' }}
        >
          {t.headline}
        </h2>
        <p className="text-lg font-semibold" style={{ color: '#E8642A' }}>{t.sub}</p>
        <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{t.text}</p>
        <div className="flex flex-col items-center gap-3 pt-2">
          <button
            onClick={onStart}
            className="px-8 py-4 rounded-2xl font-bold text-white text-lg transition-opacity active:opacity-80 hover:opacity-90"
            style={{ backgroundColor: '#E8642A' }}
          >
            {t.cta}
          </button>
          <p className="text-sm italic" style={{ color: 'var(--color-text-muted)' }}>{t.tagline}</p>
        </div>
      </div>
    </section>
  )
}
