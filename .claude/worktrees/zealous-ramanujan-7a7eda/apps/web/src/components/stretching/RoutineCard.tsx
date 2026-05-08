import type { StretchingRoutine } from '../../hooks/useStretching'

const PILLAR_COLOR = '#7BC67E'

const GOAL_LABELS: Record<string, { de: string; en: string; es: string }> = {
  morning:      { de: 'Morgen',        en: 'Morning',      es: 'Mañana' },
  post_workout: { de: 'Post-Workout',  en: 'Post-Workout', es: 'Post-entreno' },
  office:       { de: 'Büro',          en: 'Office',       es: 'Oficina' },
  evening:      { de: 'Abend',         en: 'Evening',      es: 'Tarde' },
  full_body:    { de: 'Ganzkörper',    en: 'Full Body',    es: 'Cuerpo completo' },
  upper_body:   { de: 'Oberkörper',    en: 'Upper Body',   es: 'Tren superior' },
  lower_body:   { de: 'Unterkörper',   en: 'Lower Body',   es: 'Tren inferior' },
  recovery:     { de: 'Erholung',      en: 'Recovery',     es: 'Recuperación' },
}

const DIFFICULTY_DOTS: Record<string, number> = {
  beginner:     1,
  intermediate: 2,
  advanced:     3,
}

type Lang = 'de' | 'en' | 'es'

interface Props {
  routine: StretchingRoutine
  lang: Lang
  onClick: () => void
}

export function RoutineCard({ routine, lang, onClick }: Props) {
  const goalLabels = GOAL_LABELS[routine.goal]
  const goalLabel = goalLabels ? goalLabels[lang] : routine.goal
  const dots = DIFFICULTY_DOTS[routine.difficulty] ?? 1

  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-[var(--radius-md)] bg-[var(--color-bg-card)] border border-white/5 p-4 active:scale-[0.98] transition-transform"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="font-semibold text-[var(--color-text)] text-base leading-tight">
          {routine.name}
        </span>
        <span
          className="shrink-0 text-xs font-medium px-2 py-0.5 rounded-full"
          style={{ backgroundColor: `${PILLAR_COLOR}22`, color: PILLAR_COLOR }}
        >
          {goalLabel}
        </span>
      </div>

      <p className="text-sm text-[var(--color-text-muted)] line-clamp-2 mb-3">
        {routine.description}
      </p>

      <div className="flex items-center gap-3">
        <div className="flex gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: i < dots ? PILLAR_COLOR : 'rgba(255,255,255,0.15)' }}
            />
          ))}
        </div>
        <span className="text-xs text-[var(--color-text-subtle)] capitalize">
          {routine.difficulty}
        </span>
        <span className="text-[var(--color-text-subtle)] text-xs">·</span>
        <span className="text-xs text-[var(--color-text-subtle)]">
          {routine.duration_min} min
        </span>
        <span className="ml-auto text-xs text-[var(--color-text-subtle)]">
          {routine.exercise_ids.length} exercises
        </span>
      </div>
    </button>
  )
}
