import { useNavigate } from 'react-router-dom'
import { getSuggestedPillar, type Pillar } from '../../lib/adaptiveSuggestion'
import { useAuthStore } from '../../store/authStore'
import { useTodayPillars } from '../../hooks/useTodayPillars'

type Lang = 'de' | 'en' | 'es'

const GOAL_HINT: Record<string, Record<Lang, string>> = {
  abnehmen:      { de: 'Gut für dein Ziel: Abnehmen & Körper formen.', en: 'Good for your goal: weight loss.',          es: 'Bueno para tu objetivo: perder peso.' },
  kraft:         { de: 'Gut für dein Ziel: Kraft aufbauen.',            en: 'Good for your goal: build strength.',        es: 'Bueno para tu objetivo: ganar fuerza.' },
  beweglichkeit: { de: 'Gut für dein Ziel: Beweglichkeit verbessern.', en: 'Good for your goal: improve flexibility.',  es: 'Bueno para tu objetivo: mejorar flexibilidad.' },
  entspannen:    { de: 'Gut für dein Ziel: Entspannen & Fokus.',       en: 'Good for your goal: relax & focus.',         es: 'Bueno para tu objetivo: relajarte y enfocarte.' },
}

const GOAL_PILLAR: Record<string, Pillar[]> = {
  abnehmen:      ['workout', 'stretching'],
  kraft:         ['workout'],
  beweglichkeit: ['stretching', 'meditation'],
  entspannen:    ['meditation', 'stretching'],
}

function getGoalHint(pillar: Pillar, goal: string | null | undefined, lang: Lang): string | null {
  if (!goal || !GOAL_PILLAR[goal]?.includes(pillar)) return null
  return GOAL_HINT[goal]?.[lang] ?? null
}

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

const ALL_DONE: Record<Lang, string> = {
  de: 'Alle Einheiten für heute erledigt 🎉',
  en: 'All sessions for today done 🎉',
  es: 'Todas las sesiones de hoy completadas 🎉',
}
const ALL_DONE_SUB: Record<Lang, string> = {
  de: 'Großartig — komm morgen wieder.',
  en: 'Great job — see you tomorrow.',
  es: 'Excelente — vuelve mañana.',
}

export function AdaptiveSuggestion() {
  const navigate              = useNavigate()
  const { profile }           = useAuthStore()
  const lang                  = (profile?.language ?? 'de') as Lang
  const goal                  = profile?.goal ?? null
  const { data: todayPillars } = useTodayPillars()

  const completedPillars = todayPillars
    ? (['workout', 'routine', 'stretching', 'meditation'] as const).filter(
        (p) => todayPillars[p],
      )
    : []

  const pillar = getSuggestedPillar(goal, completedPillars)

  if (pillar === null) {
    return (
      <section
        className="rounded-2xl p-4 relative overflow-hidden"
        style={{ backgroundColor: 'var(--color-bg-card)' }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ backgroundColor: '#4CAF50' }} />
        <div className="pl-3 flex items-center gap-3">
          <span className="text-3xl leading-none">🎉</span>
          <div>
            <p className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>
              {ALL_DONE[lang]}
            </p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
              {ALL_DONE_SUB[lang]}
            </p>
          </div>
        </div>
      </section>
    )
  }

  const cfg      = PILLAR_CONFIG[pillar]
  const goalHint = getGoalHint(pillar, goal, lang)

  return (
    <section
      className="rounded-2xl p-4 relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg-card)' }}
    >
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
            {goalHint && (
              <p className="text-xs mt-1 font-medium" style={{ color: cfg.color }}>
                {goalHint}
              </p>
            )}
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
