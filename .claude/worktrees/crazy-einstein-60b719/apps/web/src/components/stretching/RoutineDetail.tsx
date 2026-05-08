import type { StretchingRoutine, StretchingExercise } from '../../hooks/useStretching'
import { ExerciseCard } from './ExerciseCard'

const PILLAR_COLOR = '#7BC67E'

const T = {
  de: {
    back: '← Zurück',
    exercises: 'Übungen',
    start: 'Session starten',
    min: 'Min',
  },
  en: {
    back: '← Back',
    exercises: 'Exercises',
    start: 'Start Session',
    min: 'Min',
  },
  es: {
    back: '← Volver',
    exercises: 'Ejercicios',
    start: 'Iniciar sesión',
    min: 'Min',
  },
}

type Lang = 'de' | 'en' | 'es'

interface Props {
  routine: StretchingRoutine
  exercises: StretchingExercise[]
  lang: Lang
  onBack: () => void
  onStart: () => void
}

export function RoutineDetail({ routine, exercises, lang, onBack, onStart }: Props) {
  const t = T[lang]
  const orderedExercises = routine.exercise_ids
    .map((id) => exercises.find((e) => e.id === id))
    .filter((e): e is StretchingExercise => e !== undefined)

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="text-sm font-medium"
          style={{ color: PILLAR_COLOR }}
        >
          {t.back}
        </button>
      </div>

      {/* Routine info */}
      <div
        className="rounded-[var(--radius-md)] p-4 border border-white/5"
        style={{ backgroundColor: 'var(--color-bg-card)' }}
      >
        <h2 className="text-xl font-bold text-[var(--color-text)] mb-1">{routine.name}</h2>
        <p className="text-sm text-[var(--color-text-muted)] mb-3">{routine.description}</p>
        <div className="flex items-center gap-4 text-sm text-[var(--color-text-subtle)]">
          <span>{routine.duration_min} {t.min}</span>
          <span>·</span>
          <span className="capitalize">{routine.difficulty}</span>
          <span>·</span>
          <span>{orderedExercises.length} {t.exercises}</span>
        </div>
      </div>

      {/* Exercise list */}
      <div className="space-y-2">
        {orderedExercises.map((ex, i) => (
          <ExerciseCard key={ex.id} exercise={ex} index={i} />
        ))}
      </div>

      {/* Start button */}
      <div className="pb-4">
        <button
          onClick={onStart}
          className="w-full py-4 rounded-[var(--radius-md)] font-bold text-white text-base transition-opacity active:opacity-80"
          style={{ backgroundColor: PILLAR_COLOR }}
        >
          {t.start}
        </button>
      </div>
    </div>
  )
}
