import { useNavigate } from 'react-router-dom'
import { getSuggestedPillar } from '../../lib/adaptiveSuggestion'
import { useAuthStore } from '../../store/authStore'

type Lang = 'de' | 'en' | 'es'

const PILLAR_CONFIG = {
  workout: {
    color:  '#E8642A',
    emoji:  '💪',
    route:  '/workout',
    headline: {
      de: 'Perfekte Zeit für ein Workout 🏋️',
      en: 'Perfect time for a workout 🏋️',
      es: 'Hora perfecta para entrenar 🏋️',
    },
    sub: {
      de: 'Nutze deine Energie jetzt.',
      en: 'Channel your energy now.',
      es: 'Aprovecha tu energía ahora.',
    },
    cta: { de: 'Workout starten', en: 'Start workout', es: 'Empezar entreno' },
  },
  routine: {
    color:  '#4A90D9',
    emoji:  '📋',
    route:  '/routine',
    headline: {
      de: 'Guten Morgen 🌅 — Zeit für dein Ritual',
      en: 'Good morning 🌅 — Time for your ritual',
      es: 'Buenos días 🌅 — Hora de tu ritual',
    },
    sub: {
      de: 'Starte strukturiert in den Tag.',
      en: 'Start your day with structure.',
      es: 'Empieza el día con estructura.',
    },
    cta: { de: 'Ritual öffnen', en: 'Open ritual', es: 'Abrir ritual' },
  },
  stretching: {
    color:  '#7BC67E',
    emoji:  '🤸',
    route:  '/stretching',
    headline: {
      de: 'Guter Abend 🌆 — Jetzt dehnen & entspannen',
      en: 'Good evening 🌆 — Time to stretch & unwind',
      es: 'Buenas tardes 🌆 — Hora de estirar y relajar',
    },
    sub: {
      de: 'Lass den Tag hinter dir.',
      en: 'Let the day go.',
      es: 'Deja ir el día.',
    },
    cta: { de: 'Stretching starten', en: 'Start stretching', es: 'Empezar estiramiento' },
  },
  meditation: {
    color:  '#9B7FD4',
    emoji:  '🧘',
    route:  '/meditation',
    headline: {
      de: 'Gute Nacht 🌙 — Zeit für Ruhe & Fokus',
      en: 'Good night 🌙 — Time for calm & focus',
      es: 'Buenas noches 🌙 — Hora de calma y enfoque',
    },
    sub: {
      de: 'Schalte ab und komme zur Ruhe.',
      en: 'Wind down and find stillness.',
      es: 'Relájate y encuentra la calma.',
    },
    cta: { de: 'Meditation starten', en: 'Start meditation', es: 'Empezar meditación' },
  },
} as const

export function AdaptiveSuggestion() {
  const navigate  = useNavigate()
  const { profile } = useAuthStore()
  const lang      = (profile?.language ?? 'de') as Lang
  const pillar    = getSuggestedPillar()
  const cfg       = PILLAR_CONFIG[pillar]

  return (
    <section
      className="rounded-2xl p-4 relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg-card)' }}
    >
      {/* Color accent — left border */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
        style={{ backgroundColor: cfg.color }}
      />
      <div className="pl-3">
        <div className="flex items-start gap-3">
          <span className="text-3xl leading-none flex-shrink-0">{cfg.emoji}</span>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm leading-snug" style={{ color: 'var(--color-text)' }}>
              {cfg.headline[lang]}
            </p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
              {cfg.sub[lang]}
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate(cfg.route)}
          className="mt-3 px-4 py-2 rounded-xl text-sm font-semibold transition-opacity active:opacity-70"
          style={{ backgroundColor: `${cfg.color}22`, color: cfg.color }}
        >
          {cfg.cta[lang]}
        </button>
      </div>
    </section>
  )
}
