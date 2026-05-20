import { useEffect, useRef } from 'react'

interface Props { lang: 'de' | 'en' }

const T = {
  de: {
    label: 'FÜR WEN?',
    headline: 'Du erkennst dich wieder?',
    cards: [
      { emoji: '😤', title: 'Ich weiss, ich sollte — aber ich fange nie an.', text: 'Du hast drei Fitness-Apps auf dem Handy und keine davon geöffnet. Du verschiebst es auf Montag. Dann auf nächste Woche. CarveOut ist für genau dich gebaut: kleinstmögliche Hürde, sofortiger Effekt, kein Perfektionismus.' },
      { emoji: '👨‍👩‍👧', title: 'Busy Parents', text: 'Drei Kinder, voller Kalender, null Energie um 21 Uhr. Du weisst dass du dir Zeit für dich nehmen solltest — aber wann? 10 Minuten morgens, bevor alle aufwachen. CarveOut macht das möglich.' },
      { emoji: '💼', title: 'High Performer mit zu wenig Zeit', text: 'Du optimierst alles — ausser dich selbst. Meetings, Reisen, Deadlines. CarveOut gibt dir Struktur die sich in deinen Tag fügt, nicht dagegen kämpft.' },
      { emoji: '🧘', title: 'Fitness-Affin & Mindfulness-orientiert', text: 'Du trainierst, aber die Meditation bleibt aus. Oder umgekehrt. Du suchst eine App die beides versteht — und zusammenbringt. Willkommen.' },
    ],
  },
  en: {
    label: 'WHO IS IT FOR?',
    headline: 'Sound familiar?',
    cards: [
      { emoji: '😤', title: 'I know I should — but I never start.', text: 'You have three fitness apps on your phone and haven\'t opened any of them. You keep pushing it to Monday. Then next week. CarveOut is built for exactly you: lowest possible barrier, immediate results, zero perfectionism.' },
      { emoji: '👨‍👩‍👧', title: 'Busy Parents', text: 'Three kids, a packed calendar, zero energy at 9 PM. You know you should make time for yourself — but when? 10 minutes in the morning, before everyone wakes up. CarveOut makes it possible.' },
      { emoji: '💼', title: 'High Performers with no time', text: 'You optimize everything — except yourself. Meetings, travel, deadlines. CarveOut gives you structure that fits into your day, not fights against it.' },
      { emoji: '🧘', title: 'Fitness & Mindfulness — but pulled in two directions', text: 'You work out, but meditation never happens. Or the opposite. You need an app that understands both — and brings them together. Welcome.' },
    ],
  },
}

export function PersonaSection({ lang }: Props) {
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
    <section className="px-5 md:px-10 py-20 max-w-5xl mx-auto">
      <div ref={ref} className="lp-fade">
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#E8642A' }}>{t.label}</p>
        <h2 className="text-3xl md:text-4xl font-black mb-10" style={{ color: 'var(--color-text)' }}>{t.headline}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {t.cards.map((c) => (
            <div
              key={c.emoji}
              className="rounded-2xl p-5 space-y-3"
              style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <span style={{ fontSize: 36 }}>{c.emoji}</span>
              <p className="font-bold text-base leading-snug" style={{ color: 'var(--color-text)' }}>{c.title}</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
