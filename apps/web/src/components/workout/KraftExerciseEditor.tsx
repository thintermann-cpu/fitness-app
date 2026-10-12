import type { WizardExercise } from '../../lib/customWorkouts'
import { groupAt, setGroupSets, toggleSupersetWithNext } from '../../lib/kraftPlan'
import { ExerciseListEditor } from '../wizard/ExerciseListEditor'

interface Props {
  exercises: WizardExercise[]
  onChange: (exercises: WizardExercise[]) => void
}

function MiniStepper({
  value, onChange, min, max,
}: { value: number; onChange: (value: number) => void; min: number; max: number }) {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-6 h-6 rounded-lg text-sm font-bold flex items-center justify-center"
        style={{ backgroundColor: 'var(--color-bg-elevated)', color: 'var(--color-text-muted)' }}
      >−</button>
      <span className="w-7 text-center text-sm font-bold" style={{ color: 'var(--color-text)' }}>{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-6 h-6 rounded-lg text-sm font-bold flex items-center justify-center"
        style={{ backgroundColor: 'var(--color-bg-elevated)', color: 'var(--color-text-muted)' }}
      >+</button>
    </div>
  )
}

export function KraftExerciseEditor({ exercises, onChange }: Props) {
  const update = (id: string, patch: Partial<WizardExercise>) => {
    onChange(exercises.map((exercise) => (exercise.id === id ? { ...exercise, ...patch } : exercise)))
  }

  return (
    <div className="space-y-2">
      <p className="text-[11px] leading-snug" style={{ color: 'var(--color-text-muted)' }}>
        Sätze und Reps pro Übung. Supersatz: beide direkt hintereinander, Pause erst nach der Runde. Hinweis zu Form oder Tempo ist optional.
      </p>
      {exercises.map((exercise, index) => {
        const group = groupAt(exercises, index)
        const linkedDown = index < exercises.length - 1
          && Boolean(exercise.supersetId)
          && exercise.supersetId === exercises[index + 1].supersetId
        const inGroup = group.superset
        return (
          <div key={exercise.id} className="space-y-1">
            <div
              className="rounded-xl px-3 py-3 space-y-2.5"
              style={{
                backgroundColor: 'var(--color-bg-card)',
                borderLeft: inGroup ? '3px solid #E8642A' : undefined,
              }}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold w-5 text-center flex-shrink-0" style={{ color: 'var(--color-text-muted)' }}>
                  {index + 1}
                </span>
                <span className="flex-1 text-sm font-medium" style={{ color: 'var(--color-text)' }}>{exercise.name}</span>
                {inGroup && (
                  <span className="text-[10px] font-bold uppercase" style={{ color: '#E8642A' }}>Supersatz</span>
                )}
                <button
                  type="button"
                  onClick={() => onChange(exercises.filter((item) => item.id !== exercise.id))}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-xs"
                  style={{ color: '#ef4444' }}
                  aria-label="Entfernen"
                >✕</button>
              </div>
              <div className="flex items-center gap-4 pl-7">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Sätze</span>
                  <MiniStepper
                    value={exercise.sets ?? 3}
                    min={1}
                    max={10}
                    onChange={(sets) => onChange(setGroupSets(exercises, index, sets))}
                  />
                </div>
                <span style={{ color: 'var(--color-text-muted)' }}>×</span>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Reps</span>
                  <MiniStepper
                    value={exercise.rep_count ?? 8}
                    min={1}
                    max={30}
                    onChange={(rep_count) => update(exercise.id, { rep_count })}
                  />
                </div>
              </div>
              <div className="flex gap-2 pl-7">
                {(['leicht', 'mittel', 'schwer'] as const).map((weight) => (
                  <button
                    key={weight}
                    type="button"
                    onClick={() => update(exercise.id, {
                      weight_level: exercise.weight_level === weight ? undefined : weight,
                    })}
                    className="px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: exercise.weight_level === weight ? '#10B98120' : 'var(--color-bg-elevated)',
                      color: exercise.weight_level === weight ? '#10B981' : 'var(--color-text-muted)',
                    }}
                  >
                    {weight.charAt(0).toUpperCase() + weight.slice(1)}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={exercise.note ?? ''}
                maxLength={140}
                onChange={(event) => update(exercise.id, { note: event.target.value.trim() ? event.target.value : undefined })}
                placeholder="Ausführung, Tempo, Form (optional)"
                aria-label={`Hinweis zu ${exercise.name}`}
                className="w-full rounded-lg px-2 py-1.5 text-xs outline-none"
                style={{
                  backgroundColor: 'var(--color-bg-elevated)',
                  color: 'var(--color-text)',
                }}
              />
            </div>
            {index < exercises.length - 1 && (
              <button
                type="button"
                onClick={() => onChange(toggleSupersetWithNext(exercises, index))}
                className="w-full text-[11px] font-semibold py-1"
                style={{ color: linkedDown ? '#E8642A' : 'var(--color-text-muted)' }}
              >
                {linkedDown ? 'Supersatz lösen' : 'Supersatz mit der nächsten'}
              </button>
            )}
          </div>
        )
      })}
      <ExerciseListEditor
        items={[]}
        fromCatalog
        onChange={(added) => {
          const last = added[added.length - 1]
          if (!last) return
          onChange([...exercises, { ...last, sets: 3, rep_count: 8 }])
        }}
      />
    </div>
  )
}
