import { useEffect, useRef } from 'react'

interface Props { lang: 'de' | 'en' }

const T = {
  de: {
    label: 'RESULTATE',
    headline: 'Die Veränderung kommt schneller als du denkst.',
    items: [
      { when: 'Nach 3 Tagen',     text: 'Erste Energie. Du schläfst besser. Dein Kopf ist klarer. Dein Körper erinnert sich, wie gut sich Bewegung anfühlt.' },
      { when: 'Nach 7 Tagen',     text: 'Erstes Selbstvertrauen. Du hast dich sieben Mal überwunden. Das klingt klein — ist es aber nicht. Grit entsteht genau hier.' },
      { when: 'Nach 2 Wochen',    text: 'Dein Körper reagiert. Mehr Kraft. Weniger Verspannungen. Ruhigerer Schlaf. Das Training wird leichter — nicht weil es einfacher wird, sondern weil du stärker wirst.' },
      { when: 'Nach einem Monat', text: 'Du erkennst dich wieder. Regelmässigkeit ist zur Gewohnheit geworden. Du fragst dich nicht mehr ob du trainierst — du tust es einfach.' },
    ],
  },
  en: {
    label: 'RESULTS',
    headline: 'Change comes faster than you think.',
    items: [
      { when: 'After 3 days',   text: 'First energy. Better sleep. Clearer head. Your body remembers how good movement feels.' },
      { when: 'After 7 days',   text: 'First confidence. You\'ve overcome yourself seven times. That sounds small — but it isn\'t. Grit starts exactly here.' },
      { when: 'After 2 weeks',  text: 'Your body responds. More strength. Less tension. Quieter sleep. Training gets easier — not because it gets simpler, but because you get stronger.' },
      { when: 'After 1 month',  text: 'You recognize yourself again. Consistency has become habit. You don\'t wonder whether you\'ll train — you just do.' },
    ],
  },
}

const DOT_COLORS = ['#E8642A', '#4A90D9', '#7BC67E', '#9B7FD4']

export function ResultsTimeline({ lang }: Props) {
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
    <section className="px-5 md:px-10 py-20" style={{ backgroundColor: 'var(--color-bg-card)' }}>
      <div ref={ref} className="lp-fade max-w-2xl mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#E8642A' }}>{t.label}</p>
        <h2 className="text-3xl md:text-4xl font-black mb-12" style={{ color: 'var(--color-text)' }}>{t.headline}</h2>

        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-4 top-0 bottom-0 w-px"
            style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
          />

          <div className="space-y-8">
            {t.items.map((item, i) => (
              <div key={i} className="flex gap-6 relative">
                {/* Dot */}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 text-xs font-black text-white"
                  style={{ backgroundColor: DOT_COLORS[i] }}
                >
                  📅
                </div>
                <div className="pb-2">
                  <p className="font-bold text-sm mb-1" style={{ color: DOT_COLORS[i] }}>{item.when}</p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
