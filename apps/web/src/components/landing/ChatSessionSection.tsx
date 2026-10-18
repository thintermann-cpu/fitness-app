import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

interface Props { lang: 'de' | 'en' }

const T = {
  de: {
    label: 'AUS DEM CHAT',
    headline: 'Der Plan, den du sowieso machst.',
    text: 'Wer das Training schon im Chat oder auf dem Zettel hat, setzt es nicht noch einmal im Wizard zusammen. Ein JSON startet Warm-up, Kraft, Metcon und Mobilität der Reihe nach. Einmal sichern, beim nächsten Mal direkt.',
    link: 'Vorteil und Format',
  },
  en: {
    label: 'FROM CHAT',
    headline: 'The plan you were going to write anyway.',
    text: 'If the session already lives in a chat or on paper, you do not rebuild it in the wizard. JSON starts warm-up, strength, metcon, and mobility in order. Save it once, and the next time it runs straight through.',
    link: 'Why and how',
  },
}

export function ChatSessionSection({ lang }: Props) {
  const t = T[lang]
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('lp-visible'); obs.disconnect() } },
      { threshold: 0.1 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="px-5 md:px-10 py-16 max-w-4xl mx-auto">
      <div ref={ref} className="lp-fade rounded-3xl p-6 md:p-8" style={{ backgroundColor: 'var(--color-bg-card)' }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#E8642A' }}>{t.label}</p>
        <h2 className="text-2xl md:text-3xl font-black mb-3" style={{ color: 'var(--color-text)' }}>{t.headline}</h2>
        <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--color-text-muted)' }}>{t.text}</p>
        <Link to="/session-import" className="text-sm font-bold" style={{ color: '#E8642A' }}>
          {t.link} →
        </Link>
      </div>
    </section>
  )
}
