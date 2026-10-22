import type { WizardExercise } from './customWorkouts'
import { formatHistoryExercises } from './kraftPlan'
import { TIMER_LABELS, type TimerMode } from './timerLabels'
import type { SoundKey } from '../hooks/useAudio'

const BLOCK_LABELS = {
  pause: 'Pause',
  krafttraining: 'Kraft',
  emom: 'EMOM',
  amrap: 'AMRAP',
  fortime: 'For Time',
  tabata: 'Tabata',
} as const

export interface FlowExercise {
  id: string
  name: string
  seconds: number
  note?: string
  /** 2 plays the station twice. The second pass says "andere Seite". */
  sides?: 1 | 2
}

export type FlowRole = 'warmup' | 'mobility' | 'flow'

export type WorkoutBlock =
  | { id: string; kind: 'krafttraining'; exercises: WizardExercise[]; restBetweenSets: number; restBetweenExercises: number }
  | { id: string; kind: 'pause'; seconds: number }
  | { id: string; kind: 'emom'; exercises: WizardExercise[]; intervalMin: number; rounds: number; scheme?: string }
  | { id: string; kind: 'amrap'; exercises: WizardExercise[]; minutes: number; scheme?: string }
  | { id: string; kind: 'fortime'; exercises: WizardExercise[]; minutes: number; scheme?: string }
  | { id: string; kind: 'tabata'; exercises: WizardExercise[]; workSec: number; restSec: number; rounds: number; scheme?: string }
  | { id: string; kind: 'flow'; role: FlowRole; restSec: number; exercises: FlowExercise[] }
  | { id: string; kind: 'breath'; name: string; inhaleSec: number; holdInSec: number; exhaleSec: number; holdOutSec: number; cycles: number; note?: string }
  | { id: string; kind: 'meditation'; name: string; minutes: number; sound: SoundKey; note?: string }

export interface BlockGate {
  pauseSec: number
  /** Next work block. -1 means the pause ends the session. */
  nextIndex: number
  /** Work block that "Überspringen" drops. Absent when the pause only ends the session. */
  skipIndex?: number
  /** True when a Pause part set the length. False is the 60s default between parts. */
  explicit: boolean
}

const DEFAULT_GATE_SEC = 60

export function blockLabel(block: WorkoutBlock): string {
  if (block.kind === 'flow') {
    if (block.role === 'warmup') return 'Warm-up'
    if (block.role === 'mobility') return 'Mobilität'
    return 'Ablauf'
  }
  if (block.kind === 'breath') return block.name || 'Atem'
  if (block.kind === 'meditation') return block.name || 'Meditation'
  return BLOCK_LABELS[block.kind]
}

export function blockColor(block: WorkoutBlock): string {
  if (block.kind === 'pause') return '#60A5FA'
  if (block.kind === 'flow') {
    if (block.role === 'mobility') return '#7BC67E'
    if (block.role === 'warmup') return '#F59E0B'
    return '#E8642A'
  }
  if (block.kind === 'breath' || block.kind === 'meditation') return '#9B7FD4'
  return TIMER_LABELS[block.kind].color
}

export function blockSummary(block: WorkoutBlock): string {
  if (block.kind === 'pause') return `${Math.round(block.seconds / 60)} min`
  if (block.kind === 'krafttraining') {
    return formatHistoryExercises(block.exercises) || 'Sätze'
  }
  if (block.kind === 'flow') {
    const seconds = block.exercises.reduce((sum, exercise) => sum + exercise.seconds * (exercise.sides === 2 ? 2 : 1), 0)
    const minutes = Math.max(1, Math.round(seconds / 60))
    return `${block.exercises.length} Übungen · ${minutes} min`
  }
  if (block.kind === 'emom') return `${block.rounds}× ${block.intervalMin} min`
  if (block.kind === 'tabata') return `${block.rounds}× ${block.workSec}s / ${block.restSec}s`
  if (block.kind === 'breath') return `${block.inhaleSec}-${block.holdInSec}-${block.exhaleSec}-${block.holdOutSec} · ${block.cycles}`
  if (block.kind === 'meditation') return `${block.minutes} min`
  return `${block.minutes} min`
}

export function isWorkBlock(block: WorkoutBlock): boolean {
  return block.kind !== 'pause'
}

/** Names a saved chain should match in the workout search. */
export function blockSearchText(block: WorkoutBlock): string {
  if (block.kind === 'pause') return ''
  if (block.kind === 'breath' || block.kind === 'meditation') {
    return [block.name, block.note].filter(Boolean).join(' ')
  }
  return block.exercises.map((exercise) => exercise.name).join(' ')
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
  if (kind === 'flow') return { id, kind, role: 'flow', restSec: 10, exercises: [] }
  if (kind === 'breath') return { id, kind, name: 'Box Breathing', inhaleSec: 4, holdInSec: 4, exhaleSec: 4, holdOutSec: 4, cycles: 8 }
  if (kind === 'meditation') return { id, kind, name: 'Sitzmeditation', minutes: 10, sound: 'silence' }
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
  while (index < blocks.length) {
    const block = blocks[index]
    if (block.kind !== 'pause') break
    pause += block.seconds
    explicit = true
    index += 1
  }
  if (index >= blocks.length) {
    if (!explicit) return null
    return { pauseSec: Math.max(1, pause), nextIndex: -1, explicit: true }
  }
  return {
    pauseSec: explicit ? Math.max(1, pause) : DEFAULT_GATE_SEC,
    nextIndex: index,
    skipIndex: index,
    explicit,
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
    || block.kind === 'flow'
    || block.kind === 'breath'
    || block.kind === 'meditation'
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
  if (block.kind === 'flow') {
    const seconds = block.exercises.reduce((sum, exercise) => sum + exercise.seconds * (exercise.sides === 2 ? 2 : 1), 0)
    return {
      mode: 'fortime',
      minutes: Math.max(1, Math.round(seconds / 60)),
      exercises: block.exercises.map((exercise) => ({
        id: exercise.id,
        name: exercise.name,
        note: exercise.note,
        detail: `${exercise.seconds}s`,
      })),
    }
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
  if (block.kind === 'breath') {
    const seconds = (block.inhaleSec + block.holdInSec + block.exhaleSec + block.holdOutSec) * block.cycles
    return { mode: 'fortime', minutes: Math.max(1, Math.round(seconds / 60)), exercises: [] }
  }
  if (block.kind === 'meditation') {
    return { mode: 'fortime', minutes: block.minutes, exercises: [] }
  }
  return { mode: block.kind, minutes: block.minutes, exercises: block.exercises, scheme: block.scheme }
}

export function readBlocks(value: unknown): WorkoutBlock[] | undefined {
  if (!Array.isArray(value)) return undefined
  const blocks = value.filter(isWorkoutBlock)
  return blocks.length > 0 ? blocks : undefined
}
