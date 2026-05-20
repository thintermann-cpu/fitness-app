import { useEffect, useRef } from 'react'

interface Props {
  lang: 'de' | 'en'
  onStart: () => void
}

const T = {
  de: {
    h1a: 'Workout. Stretching. Meditation. Ritual.',
    h1b: 'Alles. Täglich. 30 Minuten.',
    sub: 'CarveOut ist die App für alle, die wissen, dass sie mehr könnten — und jetzt endlich anfangen.',
    cta: 'Jetzt kostenlos starten →',
    fine: 'Kein Abo erforderlich. Keine Kreditkarte. Einfach starten.',
  },
  en: {
    h1a: 'Workout. Stretching. Meditation. Ritual.',
    h1b: 'Everything. Daily. 30 Minutes.',
    sub: 'CarveOut is the app for everyone who knows they could do more — and is finally ready to start.',
    cta: 'Start for free →',
    fine: 'No subscription required. No credit card. Just start.',
  },
}

const PILLARS = ['#E8642A', '#4A90D9', '#7BC67E', '#9B7FD4']

export function Hero({ lang, onStart }: Props) {
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
    <section className="min-h-screen flex flex-col items-center justify-center px-5 pt-20 pb-16 text-center">
      <div ref={ref} className="lp-fade max-w-2xl mx-auto space-y-6">
        <h1
          className="font-black leading-tight"
          style={{ fontSize: 'clamp(28px, 6vw, 56px)', color: 'var(--color-text)' }}
        >
          {t.h1a}<br />
          <span style={{ color: '#E8642A' }}>{t.h1b}</span>
        </h1>

        <p className="text-lg leading-relaxed mx-auto max-w-xl" style={{ color: 'var(--color-text-muted)' }}>
          {t.sub}
        </p>

        <div className="flex flex-col items-center gap-3">
          <button
            onClick={onStart}
            className="px-8 py-4 rounded-2xl font-bold text-white text-lg transition-opacity active:opacity-80 hover:opacity-90"
            style={{ backgroundColor: '#E8642A' }}
          >
            {t.cta}
          </button>
          <p className="text-xs" style={{ color: 'var(--color-text-subtle)' }}>{t.fine}</p>
        </div>

        {/* Pillar color bar */}
        <div className="flex rounded-full overflow-hidden mx-auto h-2 w-full max-w-sm mt-4">
          {PILLARS.map((c) => (
            <div key={c} className="flex-1" style={{ backgroundColor: c }} />
          ))}
        </div>
      </div>
    </section>
  )
}
