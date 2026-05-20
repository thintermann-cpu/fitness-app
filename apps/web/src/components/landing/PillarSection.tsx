import { useEffect, useRef } from 'react'

interface Props { lang: 'de' | 'en' }

const PILLARS = [
  {
    color: '#4A90D9',
    emoji: '📋',
    de: { name: 'Ritual',             sub: 'Struktur & Gewohnheit',  benefits: ['Morgenroutine', 'Klarer Kopf', 'Tagesstruktur'],      dur: '5–10 Min' },
    en: { name: 'Ritual',             sub: 'Structure & Habit',      benefits: ['Morning routine', 'Clear mind', 'Daily structure'],    dur: '5–10 min' },
  },
  {
    color: '#E8642A',
    emoji: '💪',
    de: { name: 'Workout',            sub: 'Kraft & Ausdauer',       benefits: ['Stärker werden', 'Körper formen', 'Grit & Disziplin'], dur: '10–20 Min' },
    en: { name: 'Workout',            sub: 'Strength & Endurance',   benefits: ['Get stronger', 'Shape your body', 'Grit & discipline'], dur: '10–20 min' },
  },
  {
    color: '#7BC67E',
    emoji: '🧘',
    de: { name: 'Stretching & Yoga',  sub: 'Mobilität & Flow',       benefits: ['Verspannungen lösen', 'Beweglichkeit', 'Erholung'],    dur: '5–20 Min' },
    en: { name: 'Stretching & Yoga',  sub: 'Mobility & Flow',        benefits: ['Release tension', 'Flexibility', 'Recovery'],          dur: '5–20 min' },
  },
  {
    color: '#9B7FD4',
    emoji: '🔮',
    de: { name: 'Meditation',         sub: 'Geist & Fokus',          benefits: ['Stress abbauen', 'Besser schlafen', 'Mentale Stärke'], dur: '5–20 Min' },
    en: { name: 'Meditation',         sub: 'Mind & Focus',           benefits: ['Reduce stress', 'Sleep better', 'Mental strength'],    dur: '5–20 min' },
  },
]

const WHY = {
  de: [
    { dot: '#4A90D9', text: 'Ritual gibt dir Struktur. Ein klarer Morgen bedeutet einen klaren Tag — und ein klares Leben.' },
    { dot: '#E8642A', text: 'Workout gibt dir Kraft und Grit. Jedes Training das du durchziehst beweist dir: Du kannst.' },
    { dot: '#7BC67E', text: 'Stretching & Yoga gibt dir Mobilität und Erholung. Dein Körper kann nicht geben was er nicht hat.' },
    { dot: '#9B7FD4', text: 'Meditation gibt dir Klarheit. Weniger Rauschen. Mehr du.' },
  ],
  en: [
    { dot: '#4A90D9', text: 'Ritual gives you structure. A clear morning means a clear day — and a clearer life.' },
    { dot: '#E8642A', text: 'Workout gives you strength and grit. Every session you complete proves something to yourself: you can.' },
    { dot: '#7BC67E', text: 'Stretching & Yoga gives you mobility and recovery. Your body can\'t give what it doesn\'t have.' },
    { dot: '#9B7FD4', text: 'Meditation gives you clarity. Less noise. More you.' },
  ],
}

const T = {
  de: { label: 'DIE 4 SÄULEN', headline: 'Vier Bereiche. Ein Leben.', intro: 'Die meisten Apps lösen ein Problem. CarveOut löst vier — gleichzeitig. Denn Kraft ohne Erholung funktioniert nicht. Meditation ohne Bewegung auch nicht. Nur zusammen entfalten die vier Säulen ihre volle Wirkung.', tagline: 'Jede Säule stärkt die anderen — 30 Min täglich, die alles verändern.' },
  en: { label: 'THE 4 PILLARS', headline: 'Four areas. One life.', intro: 'Most apps solve one problem. CarveOut solves four — simultaneously. Because strength without recovery doesn\'t work. Meditation without movement doesn\'t either. Together, the four pillars unlock their full potential.', tagline: 'Each pillar strengthens the others — 30 minutes a day that change everything.' },
}

export function PillarSection({ lang }: Props) {
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
    <section id="features" className="px-5 md:px-10 py-20" style={{ backgroundColor: 'var(--color-bg-card)' }}>
      <div ref={ref} className="lp-fade max-w-5xl mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#E8642A' }}>{t.label}</p>
        <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: 'var(--color-text)' }}>{t.headline}</h2>
        <p className="text-base leading-relaxed mb-10 max-w-2xl" style={{ color: 'var(--color-text-muted)' }}>{t.intro}</p>

        {/* Pillar cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {PILLARS.map((p) => {
            const d = p[lang]
            return (
              <div
                key={p.color}
                className="rounded-2xl overflow-hidden"
                style={{ backgroundColor: 'var(--color-bg)', border: `1px solid ${p.color}30` }}
              >
                {/* Top bar */}
                <div className="h-1" style={{ backgroundColor: p.color }} />
                <div className="p-5 space-y-3" style={{ backgroundColor: `${p.color}08` }}>
                  <span style={{ fontSize: 32 }}>{p.emoji}</span>
                  <div>
                    <p className="font-black text-base" style={{ color: p.color }}>{d.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{d.sub}</p>
                  </div>
                  <div className="border-t" style={{ borderColor: `${p.color}20` }} />
                  <ul className="space-y-1">
                    {d.benefits.map((b) => (
                      <li key={b} className="text-xs flex items-center gap-1.5" style={{ color: 'var(--color-text-muted)' }}>
                        <span style={{ color: p.color }}>✓</span> {b}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs font-semibold" style={{ color: `${p.color}80` }}>{d.dur}</p>
                </div>
              </div>
            )
          })}
        </div>

        <p className="text-center text-sm font-semibold italic mb-10" style={{ color: 'var(--color-text-muted)' }}>
          "{t.tagline}"
        </p>

        {/* Why text */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {WHY[lang].map((w) => (
            <div key={w.dot} className="flex items-start gap-3">
              <div className="w-3 h-3 rounded-full mt-1 shrink-0" style={{ backgroundColor: w.dot }} />
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{w.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
