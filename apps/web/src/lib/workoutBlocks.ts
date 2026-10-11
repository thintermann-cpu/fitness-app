import type { WizardExercise } from './customWorkouts'
import { TIMER_LABELS, type TimerMode } from './timerLabels'

const BLOCK_LABELS = {
  pause: 'Pause',
  krafttraining: 'Kraft',
  emom: 'EMOM',
  amrap: 'AMRAP',
  fortime: 'For Time',
  tabata: 'Tabata',
} as const

export type WorkoutBlock =
  | { id: string; kind: 'krafttraining'; exercises: WizardExercise[]; restBetweenSets: number; restBetweenExercises: number }
  | { id: string; kind: 'pause'; seconds: number }
  | { id: string; kind: 'emom'; exercises: WizardExercise[]; intervalMin: number; rounds: number; scheme?: string }
  | { id: string; kind: 'amrap'; exercises: WizardExercise[]; minutes: number; scheme?: string }
  | { id: string; kind: 'fortime'; exercises: WizardExercise[]; minutes: number; scheme?: string }
  | { id: string; kind: 'tabata'; exercises: WizardExercise[]; workSec: number; restSec: number; rounds: number; scheme?: string }

export interface BlockGate {
  pauseSec: number
  /** Next work block. -1 means the pause ends the session. */
  nextIndex: number
  /** Work block that "Überspringen" drops. Absent when the pause only ends the session. */
  skipIndex?: number
}

const DEFAULT_GATE_SEC = 60

export function blockLabel(block: WorkoutBlock): string {
  return BLOCK_LABELS[block.kind]
}

export function blockColor(block: WorkoutBlock): string {
  if (block.kind === 'pause') return '#60A5FA'
  return TIMER_LABELS[block.kind].color
}

export function blockSummary(block: WorkoutBlock): string {
  if (block.kind === 'pause') return `${Math.round(block.seconds / 60)} min`
  if (block.kind === 'krafttraining') {
    const names = block.exercises.map((exercise) => {
      const sets = exercise.sets ?? 3
      const reps = exercise.rep_count ?? 8
      return `${sets}×${reps} ${exercise.name}`
    })
    return names.join(', ') || 'Sätze'
  }
  if (block.kind === 'emom') return `${block.rounds}× ${block.intervalMin} min`
  if (block.kind === 'tabata') return `${block.rounds}× ${block.workSec}s / ${block.restSec}s`
  return `${block.minutes} min`
}

export function isWorkBlock(block: WorkoutBlock): boolean {
  return block.kind !== 'pause'
}

export function isChained(blocks: WorkoutBlock[]): boolean {
  return blocks.filter(isWorkBlock).length >= 2
}

export function chainEntryName(workoutName: string | undefined, block: WorkoutBlock): string {
  const label = blockLabel(block)
  return workoutName ? `${workoutName} · ${label}` : label
}

export function createBlock(kind: WorkoutBlock['kind']): WorkoutBlock {
  const id = crypto.randomUUID()
  if (kind === 'pause') return { id, kind, seconds: 180 }
  if (kind === 'krafttraining') return { id, kind, exercises: [], restBetweenSets: 90, restBetweenExercises: 60 }
  if (kind === 'emom') return { id, kind, exercises: [], intervalMin: 1, rounds: 10 }
  if (kind === 'tabata') return { id, kind, exercises: [], workSec: 20, restSec: 10, rounds: 8 }
  return { id, kind, exercises: [], minutes: kind === 'amrap' ? 12 : 10 }
}

/** Replace the first work part with the block defined in the earlier wizard steps. */
export function patchFirstWork(parts: WorkoutBlock[], primary: WorkoutBlock): WorkoutBlock[] {
  const index = parts.findIndex(isWorkBlock)
  if (index < 0) return [primary, ...parts]
  const next = parts.slice()
  next[index] = { ...primary, id: parts[index].id }
  return next
}

/**
 * Pause between two work parts. An explicit Pause part uses its length.
 * Without one, the gate is 60 seconds. A trailing Pause ends the session.
 */
export function gateAfter(blocks: WorkoutBlock[], afterIndex: number): BlockGate | null {
  let index = afterIndex + 1
  let pause = 0
  let explicit = false
  while (index < blocks.length && blocks[index].kind === 'pause') {
    pause += blocks[index].seconds
    explicit = true
    index += 1
  }
  if (index >= blocks.length) {
    if (!explicit) return null
    return { pauseSec: Math.max(1, pause), nextIndex: -1 }
  }
  return {
    pauseSec: explicit ? Math.max(1, pause) : DEFAULT_GATE_SEC,
    nextIndex: index,
    skipIndex: index,
  }
}

export function isWorkoutBlock(value: unknown): value is WorkoutBlock {
  if (!value || typeof value !== 'object') return false
  const block = value as { id?: unknown; kind?: unknown }
  if (typeof block.id !== 'string' || typeof block.kind !== 'string') return false
  return block.kind === 'pause'
    || block.kind === 'krafttraining'
    || block.kind === 'emom'
    || block.kind === 'amrap'
    || block.kind === 'fortime'
    || block.kind === 'tabata'
}

export function seedFromBlock(block: WorkoutBlock): {
  mode: TimerMode
  minutes: number
  exercises: WizardExercise[]
  restBetweenSets?: number
  restBetweenExercises?: number
  emomInterval?: number
  emomRounds?: number
  tabataWork?: number
  tabataRest?: number
  tabataRounds?: number
  scheme?: string
} {
  if (block.kind === 'pause') {
    return { mode: 'fortime', minutes: Math.max(1, Math.round(block.seconds / 60)), exercises: [] }
  }
  if (block.kind === 'krafttraining') {
    return {
      mode: 'krafttraining',
      minutes: 0,
      exercises: block.exercises,
      restBetweenSets: block.restBetweenSets,
      restBetweenExercises: block.restBetweenExercises,
    }
  }
  if (block.kind === 'emom') {
    return {
      mode: 'emom',
      minutes: block.intervalMin * block.rounds,
      exercises: block.exercises,
      emomInterval: block.intervalMin,
      emomRounds: block.rounds,
      scheme: block.scheme,
    }
  }
  if (block.kind === 'tabata') {
    return {
      mode: 'tabata',
      minutes: Math.max(1, Math.round((block.workSec + block.restSec) * block.rounds / 60)),
      exercises: block.exercises,
      tabataWork: block.workSec,
      tabataRest: block.restSec,
      tabataRounds: block.rounds,
      scheme: block.scheme,
    }
  }
  return { mode: block.kind, minutes: block.minutes, exercises: block.exercises, scheme: block.scheme }
}

export function readBlocks(value: unknown): WorkoutBlock[] | undefined {
  if (!Array.isArray(value)) return undefined
  const blocks = value.filter(isWorkoutBlock)
  return blocks.length > 0 ? blocks : undefined
}
