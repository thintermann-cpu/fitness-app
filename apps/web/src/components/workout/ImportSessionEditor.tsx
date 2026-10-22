import type { SoundKey } from '../../hooks/useAudio'
import type { WizardExercise } from '../../lib/customWorkouts'
import {
  blockColor,
  blockLabel,
  blockSummary,
  isWorkBlock,
  type FlowExercise,
  type WorkoutBlock,
} from '../../lib/workoutBlocks'

interface Props {
  name: string
  blocks: WorkoutBlock[]
  onName: (name: string) => void
  onBlocks: (blocks: WorkoutBlock[]) => void
}

function clamp(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) return min
  return Math.min(max, Math.max(min, Math.round(value)))
}

function loadLabel(exercise: WizardExercise) {
  if (exercise.weightKg != null) return String(exercise.weightKg)
  if (exercise.weightText) return exercise.weightText
  if (exercise.weight_level) return exercise.weight_level
  return ''
}

function applyLoad(exercise: WizardExercise, raw: string): WizardExercise {
  const trimmed = raw.trim()
  if (!trimmed) return { ...exercise, weightKg: undefined, weightText: undefined, weight_level: undefined }
  const kg = trimmed.match(/^(\d+(?:[.,]\d+)?)(?:\s*kg)?$/i)
  if (kg) {
    const amount = Number(kg[1].replace(',', '.'))
    if (amount > 0 && amount <= 500) {
      return { ...exercise, weightKg: Math.round(amount * 100) / 100, weightText: undefined, weight_level: undefined }
    }
  }
  const key = trimmed.toLowerCase()
  if (key === 'leicht' || key === 'mittel' || key === 'schwer') {
    return { ...exercise, weight_level: key, weightKg: undefined, weightText: undefined }
  }
  return { ...exercise, weightText: trimmed.slice(0, 40), weightKg: undefined, weight_level: undefined }
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

          {block.kind === 'flow' && block.exercises.map((exercise, exerciseIndex) => (
            <FlowRow
              key={exercise.id}
              exercise={exercise}
              onChange={(next) => update(block.id, {
                ...block,
                exercises: block.exercises.map((item, i) => (i === exerciseIndex ? next : item)),
              })}
            />
          ))}

          {block.kind === 'krafttraining' && (
            <>
              <NumberRow label="Satzpause s" value={block.restBetweenSets} min={0} max={600} onChange={(restBetweenSets) => update(block.id, { ...block, restBetweenSets })} />
              {block.exercises.map((exercise, exerciseIndex) => (
                <KraftRow
                  key={exercise.id}
                  exercise={exercise}
                  onChange={(next) => update(block.id, {
                    ...block,
                    exercises: block.exercises.map((item, i) => (i === exerciseIndex ? next : item)),
                  })}
                />
              ))}
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
              {block.exercises.map((exercise, exerciseIndex) => (
                <DetailRow
                  key={exercise.id}
                  exercise={exercise}
                  onChange={(next) => update(block.id, {
                    ...block,
                    exercises: block.exercises.map((item, i) => (i === exerciseIndex ? next : item)),
                  })}
                />
              ))}
            </>
          )}

          {block.kind === 'emom' && (
            <>
              <NumberRow label="Intervall min" value={block.intervalMin} min={1} max={10} onChange={(intervalMin) => update(block.id, { ...block, intervalMin })} />
              <NumberRow label="Runden" value={block.rounds} min={1} max={60} onChange={(rounds) => update(block.id, { ...block, rounds })} />
              {block.exercises.map((exercise, exerciseIndex) => (
                <DetailRow
                  key={exercise.id}
                  exercise={exercise}
                  onChange={(next) => update(block.id, {
                    ...block,
                    exercises: block.exercises.map((item, i) => (i === exerciseIndex ? next : item)),
                  })}
                />
              ))}
            </>
          )}

          {block.kind === 'tabata' && (
            <>
              <NumberRow label="Work s" value={block.workSec} min={5} max={180} onChange={(workSec) => update(block.id, { ...block, workSec })} />
              <NumberRow label="Pause s" value={block.restSec} min={5} max={180} onChange={(restSec) => update(block.id, { ...block, restSec })} />
              <NumberRow label="Runden" value={block.rounds} min={1} max={40} onChange={(rounds) => update(block.id, { ...block, rounds })} />
              {block.exercises.map((exercise, exerciseIndex) => (
                <DetailRow
                  key={exercise.id}
                  exercise={exercise}
                  onChange={(next) => update(block.id, {
                    ...block,
                    exercises: block.exercises.map((item, i) => (i === exerciseIndex ? next : item)),
                  })}
                />
              ))}
            </>
          )}
        </div>
      ))}
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

function KraftRow({ exercise, onChange }: { exercise: WizardExercise; onChange: (next: WizardExercise) => void }) {
  return (
    <div className="grid grid-cols-[1fr_3.2rem_3.2rem_4.5rem] gap-2">
      <input
        value={exercise.name}
        aria-label="Übung"
        onChange={(event) => onChange({ ...exercise, name: event.target.value.slice(0, 80) })}
        className="rounded-lg px-2 py-1.5 text-sm outline-none"
        style={fieldStyle}
      />
      <input type="number" value={exercise.sets ?? 3} min={1} max={20} aria-label="Sätze" onChange={(event) => onChange({ ...exercise, sets: clamp(Number(event.target.value), 1, 20) })} className="rounded-lg px-2 py-1.5 text-sm text-right outline-none" style={fieldStyle} />
      <input type="number" value={exercise.rep_count ?? 8} min={1} max={100} aria-label="Reps" onChange={(event) => onChange({ ...exercise, rep_count: clamp(Number(event.target.value), 1, 100) })} className="rounded-lg px-2 py-1.5 text-sm text-right outline-none" style={fieldStyle} />
      <input value={loadLabel(exercise)} aria-label="Last" placeholder="kg" onChange={(event) => onChange(applyLoad(exercise, event.target.value))} className="rounded-lg px-2 py-1.5 text-sm outline-none" style={fieldStyle} />
      <input
        value={exercise.note ?? ''}
        aria-label="Hinweis"
        placeholder="Hinweis"
        onChange={(event) => onChange({ ...exercise, note: event.target.value.slice(0, 140) || undefined })}
        className="col-span-4 rounded-lg px-2 py-1.5 text-xs outline-none"
        style={fieldStyle}
      />
    </div>
  )
}

function DetailRow({ exercise, onChange }: { exercise: WizardExercise; onChange: (next: WizardExercise) => void }) {
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
        value={exercise.detail ?? ''}
        aria-label="Angabe"
        placeholder="Reps"
        onChange={(event) => onChange({ ...exercise, detail: event.target.value.slice(0, 40) || undefined })}
        className="rounded-lg px-2 py-1.5 text-sm outline-none"
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
