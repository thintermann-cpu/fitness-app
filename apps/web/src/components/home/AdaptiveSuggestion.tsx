import { getSuggestedPillar, type Pillar } from '../../lib/adaptiveSuggestion'
import { useAuthStore } from '../../store/authStore'
import { useTodayPillars } from '../../hooks/useTodayPillars'

type Lang = 'de' | 'en' | 'es'

const PILLAR_CONFIG: Record<Pillar, { emoji: string; headline: Record<Lang, string>; sub: Record<Lang, string> }> = {
  workout: {
    emoji: '💪',
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
  },
  routine: {
    emoji: '📋',
    headline: {
      de: 'Guten Morgen 🌅 — Zeit für deine Routine',
      en: 'Good morning 🌅 — Time for your routine',
      es: 'Buenos días 🌅 — Hora de tu rutina',
    },
    sub: {
      de: 'Starte strukturiert in den Tag.',
      en: 'Start your day with structure.',
      es: 'Empieza el día con estructura.',
    },
  },
  stretching: {
    emoji: '🤸',
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
  },
  meditation: {
    emoji: '🧘',
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
  },
}

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
  const { profile }            = useAuthStore()
  const lang                   = (profile?.language ?? 'de') as Lang
  const goal                   = profile?.goal ?? null
  const { data: todayPillars } = useTodayPillars()

  const completedPillars = todayPillars
    ? (['workout', 'routine', 'stretching', 'meditation'] as const).filter(
        (p) => todayPillars[p],
      )
    : []

  const pillar = getSuggestedPillar(goal, completedPillars)
  console.log('[AdaptiveSuggestion] mounted — pillar:', pillar, 'goal:', goal, 'completed:', completedPillars)

  if (pillar === null) {
    return (
      <div
        className="rounded-2xl px-4 py-3"
        style={{ backgroundColor: 'red', border: '3px solid yellow' }}
      >
        <p className="text-sm font-semibold" style={{ color: '#4CAF50' }}>
          {ALL_DONE[lang]}
        </p>
        <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
          {ALL_DONE_SUB[lang]}
        </p>
      </div>
    )
  }

  const cfg = PILLAR_CONFIG[pillar]
  return (
    <div
      className="rounded-2xl px-4 py-3"
      style={{ backgroundColor: 'red', border: '3px solid yellow' }}
    >
      <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
        {cfg.headline[lang]}
      </p>
      <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
        {cfg.sub[lang]}
      </p>
    </div>
  )
}
