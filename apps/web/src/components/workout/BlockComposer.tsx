import { ExerciseListEditor } from '../wizard/ExerciseListEditor'
import {
  blockColor,
  blockLabel,
  blockSummary,
  createBlock,
  isWorkBlock,
  type WorkoutBlock,
} from '../../lib/workoutBlocks'

const ADDABLE: WorkoutBlock['kind'][] = ['krafttraining', 'pause', 'emom', 'amrap', 'fortime', 'tabata']

interface Props {
  parts: WorkoutBlock[]
  onChange: (parts: WorkoutBlock[]) => void
}

function Stepper({
  value, min, max, onChange,
}: { value: number; min: number; max: number; onChange: (value: number) => void }) {
  return (
    <div className="flex items-center gap-1">
      <button type="button" onClick={() => onChange(Math.max(min, value - 1))} className="w-7 h-7 rounded-lg text-sm font-bold" style={{ backgroundColor: 'var(--color-bg-elevated)', color: 'var(--color-text-muted)' }}>−</button>
      <span className="w-8 text-center text-sm font-bold" style={{ color: 'var(--color-text)' }}>{value}</span>
      <button type="button" onClick={() => onChange(Math.min(max, value + 1))} className="w-7 h-7 rounded-lg text-sm font-bold" style={{ backgroundColor: 'var(--color-bg-elevated)', color: 'var(--color-text-muted)' }}>+</button>
    </div>
  )
}

function patch(parts: WorkoutBlock[], id: string, next: WorkoutBlock): WorkoutBlock[] {
  return parts.map((part) => (part.id === id ? next : part))
}

export function BlockComposer({ parts, onChange }: Props) {
  const workCount = parts.filter(isWorkBlock).length

  function move(index: number, delta: number) {
    const target = index + delta
    if (target < 0 || target >= parts.length) return
    const next = parts.slice()
    const [item] = next.splice(index, 1)
    next.splice(target, 0, item)
    onChange(next)
  }

  function remove(id: string) {
    const part = parts.find((item) => item.id === id)
    if (part && isWorkBlock(part) && workCount <= 1) return
    onChange(parts.filter((item) => item.id !== id))
  }

  return (
    <div className="space-y-3">
      <div>
        <p className="text-lg font-black" style={{ color: 'var(--color-text)' }}>Teile</p>
        <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
          Reihenfolge frei. Zwischen zwei Teilen fragt eine Pause, ob es weitergeht.
        </p>
      </div>

      {parts.map((part, index) => (
        <div key={part.id} className="rounded-xl p-3 space-y-2" style={{ backgroundColor: 'var(--color-bg-card)' }}>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: blockColor(part) }}>
              {blockLabel(part)}
            </span>
            <span className="flex-1 text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>{blockSummary(part)}</span>
            <button type="button" onClick={() => move(index, -1)} disabled={index === 0} aria-label="Nach oben" className="w-7 h-7 text-xs" style={{ color: index === 0 ? 'rgba(255,255,255,0.15)' : 'var(--color-text-muted)' }}>↑</button>
            <button type="button" onClick={() => move(index, 1)} disabled={index === parts.length - 1} aria-label="Nach unten" className="w-7 h-7 text-xs" style={{ color: index === parts.length - 1 ? 'rgba(255,255,255,0.15)' : 'var(--color-text-muted)' }}>↓</button>
            <button type="button" onClick={() => remove(part.id)} disabled={isWorkBlock(part) && workCount <= 1} aria-label="Entfernen" className="w-7 h-7 text-xs" style={{ color: isWorkBlock(part) && workCount <= 1 ? 'rgba(255,255,255,0.15)' : '#ef4444' }}>✕</button>
          </div>

          {part.kind === 'pause' && (
            <div className="flex items-center justify-between">
              <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Minuten</span>
              <Stepper value={Math.max(1, Math.round(part.seconds / 60))} min={1} max={15} onChange={(minutes) => onChange(patch(parts, part.id, { ...part, seconds: minutes * 60 }))} />
            </div>
          )}

          {part.kind === 'emom' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Intervall min</span>
                <Stepper value={part.intervalMin} min={1} max={5} onChange={(intervalMin) => onChange(patch(parts, part.id, { ...part, intervalMin }))} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Runden</span>
                <Stepper value={part.rounds} min={1} max={30} onChange={(rounds) => onChange(patch(parts, part.id, { ...part, rounds }))} />
              </div>
              <ExerciseListEditor fromCatalog items={part.exercises} onChange={(exercises) => onChange(patch(parts, part.id, { ...part, exercises }))} />
            </div>
          )}

          {(part.kind === 'amrap' || part.kind === 'fortime') && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Minuten</span>
                <Stepper value={part.minutes} min={1} max={60} onChange={(minutes) => onChange(patch(parts, part.id, { ...part, minutes }))} />
              </div>
              <ExerciseListEditor fromCatalog items={part.exercises} onChange={(exercises) => onChange(patch(parts, part.id, { ...part, exercises }))} />
            </div>
          )}

          {part.kind === 'tabata' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Work s</span>
                <Stepper value={part.workSec} min={5} max={120} onChange={(workSec) => onChange(patch(parts, part.id, { ...part, workSec }))} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Pause s</span>
                <Stepper value={part.restSec} min={5} max={120} onChange={(restSec) => onChange(patch(parts, part.id, { ...part, restSec }))} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Runden</span>
                <Stepper value={part.rounds} min={1} max={20} onChange={(rounds) => onChange(patch(parts, part.id, { ...part, rounds }))} />
              </div>
              <ExerciseListEditor fromCatalog items={part.exercises} onChange={(exercises) => onChange(patch(parts, part.id, { ...part, exercises }))} />
            </div>
          )}

          {part.kind === 'krafttraining' && part.exercises.length === 0 && (
            <ExerciseListEditor
              fromCatalog
              items={part.exercises}
              onChange={(exercises) => onChange(patch(parts, part.id, { ...part, exercises }))}
              placeholder="Angabe z. B. 5×5 im Feld darunter"
            />
          )}
          {part.kind === 'krafttraining' && part.exercises.length > 0 && part.id !== parts.find(isWorkBlock)?.id && (
            <ExerciseListEditor
              fromCatalog
              items={part.exercises}
              onChange={(exercises) => onChange(patch(parts, part.id, {
                ...part,
                exercises: exercises.map((exercise) => ({ ...exercise, sets: exercise.sets ?? 3, rep_count: exercise.rep_count ?? 8 })),
              }))}
            />
          )}
        </div>
      ))}

      <div className="flex gap-2 flex-wrap">
        {ADDABLE.map((kind) => (
          <button
            key={kind}
            type="button"
            onClick={() => onChange([...parts, createBlock(kind)])}
            className="px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{ backgroundColor: 'var(--color-bg-elevated)', color: 'var(--color-text)' }}
          >
            + {kind === 'krafttraining' ? 'Kraft' : kind === 'pause' ? 'Pause' : kind === 'fortime' ? 'For Time' : kind === 'amrap' ? 'AMRAP' : kind === 'emom' ? 'EMOM' : 'Tabata'}
          </button>
        ))}
      </div>
    </div>
  )
}
