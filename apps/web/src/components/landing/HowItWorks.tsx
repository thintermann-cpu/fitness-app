import { useEffect, useRef } from 'react'

interface Props { lang: 'de' | 'en' }

const T = {
  de: {
    label: 'SO EINFACH',
    headline: 'Einfacher als du denkst.',
    steps: [
      { icon: '👤', title: 'Account erstellen',  text: '30 Sekunden. Keine Kreditkarte. Kein Bullshit.' },
      { icon: '🎯', title: 'Pillar wählen',      text: 'Alle vier Säulen auf einen Blick — oder direkt in die Session die du heute brauchst.' },
      { icon: '▶️', title: 'Loslegen',           text: 'Heute. Jetzt. Hier. 10 Minuten reichen um anzufangen.' },
    ],
  },
  en: {
    label: 'HOW IT WORKS',
    headline: 'Simpler than you think.',
    steps: [
      { icon: '👤', title: 'Create account',  text: '30 seconds. No credit card. No nonsense.' },
      { icon: '🎯', title: 'Choose a pillar', text: 'All four areas at a glance — or go straight to today\'s session.' },
      { icon: '▶️', title: 'Get started',     text: 'Today. Now. Here. 10 minutes is enough to begin.' },
    ],
  },
}

export function HowItWorks({ lang }: Props) {
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
    <section className="px-5 md:px-10 py-20 max-w-4xl mx-auto">
      <div ref={ref} className="lp-fade">
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#E8642A' }}>{t.label}</p>
        <h2 className="text-3xl md:text-4xl font-black mb-12" style={{ color: 'var(--color-text)' }}>{t.headline}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 relative">
          {/* Connector line on desktop */}
          <div
            className="hidden md:block absolute top-10 left-[16.66%] right-[16.66%] h-px"
            style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
          />

          {t.steps.map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-4 relative">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-3xl z-10"
                style={{ backgroundColor: 'var(--color-bg-elevated)', border: '2px solid rgba(255,255,255,0.08)' }}
              >
                {s.icon}
              </div>
              <div>
                <p className="font-bold text-base mb-1" style={{ color: 'var(--color-text)' }}>{s.title}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{s.text}</p>
              </div>
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black"
                style={{ backgroundColor: '#E8642A', color: 'white' }}
              >
                {i + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
