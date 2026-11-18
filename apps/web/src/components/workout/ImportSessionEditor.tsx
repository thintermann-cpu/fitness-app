import type { SoundKey } from '../../hooks/useAudio'
import {
  blockColor,
  blockLabel,
  blockSummary,
  createBlock,
  isWorkBlock,
  type FlowExercise,
  type FlowRole,
  type WorkoutBlock,
} from '../../lib/workoutBlocks'
import { ExerciseListEditor } from '../wizard/ExerciseListEditor'
import { KraftExerciseEditor } from './KraftExerciseEditor'

interface Props {
  name: string
  blocks: WorkoutBlock[]
  onName: (name: string) => void
  onBlocks: (blocks: WorkoutBlock[]) => void
}

function makeFlow(role: FlowRole): WorkoutBlock {
  const block = createBlock('flow')
  if (block.kind !== 'flow') return block
  return { ...block, role }
}

const ADDABLE: { label: string; make: () => WorkoutBlock }[] = [
  { label: 'Warm-up', make: () => makeFlow('warmup') },
  { label: 'Kraft', make: () => createBlock('krafttraining') },
  { label: 'AMRAP', make: () => createBlock('amrap') },
  { label: 'For Time', make: () => createBlock('fortime') },
  { label: 'EMOM', make: () => createBlock('emom') },
  { label: 'Tabata', make: () => createBlock('tabata') },
  { label: 'Mobilität', make: () => makeFlow('mobility') },
  { label: 'Ablauf', make: () => createBlock('flow') },
  { label: 'Pause', make: () => createBlock('pause') },
  { label: 'Atem', make: () => createBlock('breath') },
  { label: 'Meditation', make: () => createBlock('meditation') },
]

function clamp(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) return min
  return Math.min(max, Math.max(min, Math.round(value)))
}

function patchAt(blocks: WorkoutBlock[], id: string, next: WorkoutBlock) {
  return blocks.map((block) => (block.id === id ? next : block))
}

export function sessionDraftReady(blocks: WorkoutBlock[]) {
  if (!blocks.some(isWorkBlock)) return false
  return blocks.every((block) => {
    if (block.kind === 'pause') return block.seconds >= 1
    if (block.kind === 'breath') {
      return block.name.trim().length > 0 && block.inhaleSec >= 1 && block.exhaleSec >= 1 && block.cycles >= 1
    }
    if (block.kind === 'meditation') return block.name.trim().length > 0 && block.minutes >= 1
    if (block.kind === 'krafttraining') {
      if (block.exercises.length === 0) return false
      return block.exercises.every((exercise) => exercise.name.trim().length > 0 && (exercise.rep_count != null || exercise.seconds != null))
    }
    if (block.exercises.length === 0) return false
    return block.exercises.every((exercise) => exercise.name.trim().length > 0)
  })
}

export function ImportSessionEditor({ name, blocks, onName, onBlocks }: Props) {
  const workCount = blocks.filter(isWorkBlock).length

  function move(index: number, delta: number) {
    const target = index + delta
    if (target < 0 || target >= blocks.length) return
    const next = blocks.slice()
    const [item] = next.splice(index, 1)
    next.splice(target, 0, item)
    onBlocks(next)
  }

  function remove(id: string) {
    const part = blocks.find((item) => item.id === id)
    if (part && isWorkBlock(part) && workCount <= 1) return
    onBlocks(blocks.filter((item) => item.id !== id))
  }

  function update(id: string, next: WorkoutBlock) {
    onBlocks(patchAt(blocks, id, next))
  }

  return (
    <div className="space-y-3">
      <label className="block">
        <span className="text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>Name</span>
        <input
          value={name}
          onChange={(event) => onName(event.target.value.slice(0, 80))}
          aria-label="Session-Name"
          className="mt-1 w-full rounded-xl px-3 py-2 text-sm font-bold outline-none"
          style={{ backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text)', border: '1px solid rgba(255,255,255,0.08)' }}
        />
      </label>

      {blocks.map((block, index) => (
        <div key={block.id} className="rounded-xl p-3 space-y-2" style={{ backgroundColor: 'var(--color-bg-card)' }}>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white shrink-0" style={{ backgroundColor: blockColor(block) }}>
              {index + 1}. {blockLabel(block)}
            </span>
            <span className="flex-1 text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>{blockSummary(block)}</span>
            <button type="button" onClick={() => move(index, -1)} disabled={index === 0} aria-label="Teil nach oben" className="w-7 h-7 text-xs" style={{ color: index === 0 ? 'rgba(255,255,255,0.15)' : 'var(--color-text-muted)' }}>↑</button>
            <button type="button" onClick={() => move(index, 1)} disabled={index === blocks.length - 1} aria-label="Teil nach unten" className="w-7 h-7 text-xs" style={{ color: index === blocks.length - 1 ? 'rgba(255,255,255,0.15)' : 'var(--color-text-muted)' }}>↓</button>
            <button type="button" onClick={() => remove(block.id)} disabled={isWorkBlock(block) && workCount <= 1} aria-label="Teil entfernen" className="w-7 h-7 text-xs" style={{ color: isWorkBlock(block) && workCount <= 1 ? 'rgba(255,255,255,0.15)' : '#ef4444' }}>✕</button>
          </div>

          {block.kind === 'breath' && (
            <BreathFields block={block} onChange={(next) => update(block.id, next)} />
          )}

          {block.kind === 'meditation' && (
            <MeditationFields block={block} onChange={(next) => update(block.id, next)} />
          )}

          {block.kind === 'pause' && (
            <NumberRow
              label="Sekunden"
              value={block.seconds}
              min={1}
              max={3600}
              onChange={(seconds) => update(block.id, { ...block, seconds })}
            />
          )}

          {block.kind === 'flow' && (
            <FlowExerciseList
              exercises={block.exercises}
              onChange={(exercises) => update(block.id, { ...block, exercises })}
            />
          )}

          {block.kind === 'krafttraining' && (
            <>
              <NumberRow label="Satzpause s" value={block.restBetweenSets} min={0} max={600} onChange={(restBetweenSets) => update(block.id, { ...block, restBetweenSets })} />
              <NumberRow label="Übungspause s" value={block.restBetweenExercises} min={0} max={600} onChange={(restBetweenExercises) => update(block.id, { ...block, restBetweenExercises })} />
              <KraftExerciseEditor
                exercises={block.exercises}
                onChange={(exercises) => update(block.id, { ...block, exercises })}
              />
            </>
          )}

          {(block.kind === 'amrap' || block.kind === 'fortime') && (
            <>
              <NumberRow
                label="Minuten"
                value={block.minutes}
                min={block.kind === 'fortime' ? 0 : 1}
                max={90}
                onChange={(minutes) => update(block.id, { ...block, minutes })}
              />
              <ExerciseListEditor
                fromCatalog
                items={block.exercises}
                onChange={(exercises) => update(block.id, { ...block, exercises })}
              />
            </>
          )}

          {block.kind === 'emom' && (
            <>
              <NumberRow label="Intervall min" value={block.intervalMin} min={1} max={10} onChange={(intervalMin) => update(block.id, { ...block, intervalMin })} />
              <NumberRow label="Runden" value={block.rounds} min={1} max={60} onChange={(rounds) => update(block.id, { ...block, rounds })} />
              <ExerciseListEditor
                fromCatalog
                items={block.exercises}
                onChange={(exercises) => update(block.id, { ...block, exercises })}
              />
            </>
          )}

          {block.kind === 'tabata' && (
            <>
              <NumberRow label="Work s" value={block.workSec} min={5} max={180} onChange={(workSec) => update(block.id, { ...block, workSec })} />
              <NumberRow label="Pause s" value={block.restSec} min={5} max={180} onChange={(restSec) => update(block.id, { ...block, restSec })} />
              <NumberRow label="Runden" value={block.rounds} min={1} max={40} onChange={(rounds) => update(block.id, { ...block, rounds })} />
              <ExerciseListEditor
                fromCatalog
                items={block.exercises}
                onChange={(exercises) => update(block.id, { ...block, exercises })}
              />
            </>
          )}
        </div>
      ))}

      <div className="flex gap-2 flex-wrap">
        {ADDABLE.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => onBlocks([...blocks, item.make()])}
            className="px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{ backgroundColor: 'var(--color-bg-elevated)', color: 'var(--color-text)' }}
          >
            + {item.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function NumberRow({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (value: number) => void }) {
  return (
    <label className="flex items-center justify-between gap-3">
      <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{label}</span>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        aria-label={label}
        onChange={(event) => onChange(clamp(Number(event.target.value), min, max))}
        className="w-20 rounded-lg px-2 py-1 text-sm text-right outline-none"
        style={{ backgroundColor: 'var(--color-bg-elevated)', color: 'var(--color-text)' }}
      />
    </label>
  )
}

const fieldStyle = {
  backgroundColor: 'var(--color-bg-elevated)',
  color: 'var(--color-text)',
  border: '1px solid rgba(255,255,255,0.06)',
}

function FlowExerciseList({
  exercises,
  onChange,
}: {
  exercises: FlowExercise[]
  onChange: (exercises: FlowExercise[]) => void
}) {
  function add() {
    onChange([
      ...exercises,
      { id: crypto.randomUUID(), name: '', seconds: 40 },
    ])
  }

  function remove(id: string) {
    onChange(exercises.filter((exercise) => exercise.id !== id))
  }

  function move(index: number, delta: number) {
    const target = index + delta
    if (target < 0 || target >= exercises.length) return
    const next = exercises.slice()
    const [item] = next.splice(index, 1)
    next.splice(target, 0, item)
    onChange(next)
  }

  return (
    <div className="space-y-2">
      {exercises.map((exercise, exerciseIndex) => (
        <div key={exercise.id} className="space-y-1">
          <div className="flex items-start gap-1">
            <div className="flex-1">
              <FlowRow
                exercise={exercise}
                onChange={(next) => onChange(exercises.map((item, i) => (i === exerciseIndex ? next : item)))}
              />
            </div>
            <button type="button" onClick={() => move(exerciseIndex, -1)} disabled={exerciseIndex === 0} aria-label="Übung nach oben" className="w-7 h-7 text-xs mt-1" style={{ color: exerciseIndex === 0 ? 'rgba(255,255,255,0.15)' : 'var(--color-text-muted)' }}>↑</button>
            <button type="button" onClick={() => move(exerciseIndex, 1)} disabled={exerciseIndex === exercises.length - 1} aria-label="Übung nach unten" className="w-7 h-7 text-xs mt-1" style={{ color: exerciseIndex === exercises.length - 1 ? 'rgba(255,255,255,0.15)' : 'var(--color-text-muted)' }}>↓</button>
            <button type="button" onClick={() => remove(exercise.id)} aria-label="Übung entfernen" className="w-7 h-7 text-xs mt-1" style={{ color: '#ef4444' }}>✕</button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="text-xs font-semibold"
        style={{ color: 'var(--color-pillar-workout)' }}
      >
        + Übung hinzufügen
      </button>
    </div>
  )
}

function FlowRow({ exercise, onChange }: { exercise: FlowExercise; onChange: (next: FlowExercise) => void }) {
  return (
    <div className="grid grid-cols-[1fr_4.5rem] gap-2">
      <input
        value={exercise.name}
        aria-label="Übung"
        onChange={(event) => onChange({ ...exercise, name: event.target.value.slice(0, 80) })}
        className="rounded-lg px-2 py-1.5 text-sm outline-none"
        style={fieldStyle}
      />
      <input
        type="number"
        value={exercise.seconds}
        min={5}
        max={900}
        aria-label="Sekunden"
        onChange={(event) => onChange({ ...exercise, seconds: clamp(Number(event.target.value), 5, 900) })}
        className="rounded-lg px-2 py-1.5 text-sm text-right outline-none"
        style={fieldStyle}
      />
      <input
        value={exercise.note ?? ''}
        aria-label="Hinweis"
        placeholder="Hinweis"
        onChange={(event) => onChange({ ...exercise, note: event.target.value.slice(0, 140) || undefined })}
        className="col-span-2 rounded-lg px-2 py-1.5 text-xs outline-none"
        style={fieldStyle}
      />
    </div>
  )
}

type BreathBlock = Extract<WorkoutBlock, { kind: 'breath' }>
type MeditationBlock = Extract<WorkoutBlock, { kind: 'meditation' }>

const SOUND_OPTIONS: { key: SoundKey; label: string }[] = [
  { key: 'silence', label: 'Stille' },
  { key: 'bowl', label: 'Schale' },
  { key: 'rain', label: 'Regen' },
  { key: 'forest', label: 'Wald' },
  { key: 'waves', label: 'Wellen' },
  { key: 'white_noise', label: 'Rauschen' },
  { key: 'fire', label: 'Feuer' },
  { key: 'night', label: 'Nacht' },
  { key: 'wind', label: 'Wind' },
  { key: 'harp', label: 'Harfe' },
  { key: 'zen_guitar', label: 'Zen-Gitarre' },
  { key: 'deep_om', label: 'Deep Om' },
]

function BreathFields({ block, onChange }: { block: BreathBlock; onChange: (next: BreathBlock) => void }) {
  return (
    <div className="space-y-2">
      <input
        value={block.name}
        aria-label="Name der Atmung"
        onChange={(event) => onChange({ ...block, name: event.target.value.slice(0, 80) })}
        className="w-full rounded-lg px-2 py-1.5 text-sm outline-none"
        style={fieldStyle}
      />
      <NumberRow label="Einatmen s" value={block.inhaleSec} min={1} max={30} onChange={(inhaleSec) => onChange({ ...block, inhaleSec })} />
      <NumberRow label="Halten s" value={block.holdInSec} min={0} max={30} onChange={(holdInSec) => onChange({ ...block, holdInSec })} />
      <NumberRow label="Ausatmen s" value={block.exhaleSec} min={1} max={30} onChange={(exhaleSec) => onChange({ ...block, exhaleSec })} />
      <NumberRow label="Pause s" value={block.holdOutSec} min={0} max={30} onChange={(holdOutSec) => onChange({ ...block, holdOutSec })} />
      <NumberRow label="Zyklen" value={block.cycles} min={1} max={80} onChange={(cycles) => onChange({ ...block, cycles })} />
      <input
        value={block.note ?? ''}
        aria-label="Hinweis"
        placeholder="Hinweis"
        onChange={(event) => onChange({ ...block, note: event.target.value.slice(0, 140) || undefined })}
        className="w-full rounded-lg px-2 py-1.5 text-xs outline-none"
        style={fieldStyle}
      />
    </div>
  )
}

function MeditationFields({ block, onChange }: { block: MeditationBlock; onChange: (next: MeditationBlock) => void }) {
  return (
    <div className="space-y-2">
      <input
        value={block.name}
        aria-label="Name der Meditation"
        onChange={(event) => onChange({ ...block, name: event.target.value.slice(0, 80) })}
        className="w-full rounded-lg px-2 py-1.5 text-sm outline-none"
        style={fieldStyle}
      />
      <NumberRow label="Minuten" value={block.minutes} min={1} max={90} onChange={(minutes) => onChange({ ...block, minutes })} />
      <label className="flex items-center justify-between gap-3">
        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Klang</span>
        <select
          value={block.sound}
          aria-label="Klang"
          onChange={(event) => onChange({ ...block, sound: event.target.value as SoundKey })}
          className="rounded-lg px-2 py-1 text-sm outline-none"
          style={fieldStyle}
        >
          {SOUND_OPTIONS.map((option) => (
            <option key={option.key} value={option.key}>{option.label}</option>
          ))}
        </select>
      </label>
      <input
        value={block.note ?? ''}
        aria-label="Hinweis"
        placeholder="Hinweis"
        onChange={(event) => onChange({ ...block, note: event.target.value.slice(0, 140) || undefined })}
        className="w-full rounded-lg px-2 py-1.5 text-xs outline-none"
        style={fieldStyle}
      />
    </div>
  )
}
