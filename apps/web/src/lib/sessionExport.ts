import type { CustomSession, CustomWorkout, WizardExercise } from './customWorkouts'
import type { FlowExercise, WorkoutBlock } from './workoutBlocks'
import type { SoundKey } from '../hooks/useAudio'
import { isWorkBlock } from './workoutBlocks'

/** Breathwork preset shape used by CustomBreathworkEditor localStorage. */
export interface BreathPresetExport {
  id: string
  name: string
  inhale_sec: number
  hold_in_sec: number
  exhale_sec: number
  hold_out_sec: number
  cycles: number
}

/** Free-meditation preset (duration + ambient). */
export interface MeditationPresetExport {
  id: string
  name: string
  minutes: number
  sound: SoundKey
  note?: string
}

function pretty(value: unknown): string {
  return `${JSON.stringify(value, null, 2)}\n`
}

function exerciseWeight(exercise: WizardExercise): string | number | undefined {
  if (exercise.weightKg != null) return exercise.weightKg
  if (exercise.weightText) return exercise.weightText
  if (exercise.weight_level) return exercise.weight_level
  return undefined
}

function metconExercise(exercise: WizardExercise) {
  return {
    name: exercise.name,
    ...(exercise.detail ? { detail: exercise.detail } : {}),
    ...(exercise.note ? { note: exercise.note } : {}),
  }
}

function kraftExercise(exercise: WizardExercise, previousSupersetId?: string) {
  const weight = exerciseWeight(exercise)
  return {
    name: exercise.name,
    sets: exercise.sets ?? 3,
    ...(exercise.rep_count != null ? { reps: exercise.rep_count } : {}),
    ...(exercise.seconds != null ? { seconds: exercise.seconds } : {}),
    ...(weight !== undefined ? { weight } : {}),
    ...(exercise.note ? { note: exercise.note } : {}),
    ...(exercise.supersetId && exercise.supersetId === previousSupersetId
      ? { supersetWithPrevious: true }
      : {}),
  }
}

function flowExercise(exercise: FlowExercise) {
  return {
    name: exercise.name,
    seconds: exercise.seconds,
    ...(exercise.note ? { note: exercise.note } : {}),
    ...(exercise.sides === 2 ? { sides: 2 } : {}),
  }
}

export function blockToPart(block: WorkoutBlock): Record<string, unknown> {
  if (block.kind === 'pause') {
    return { kind: 'pause', seconds: block.seconds }
  }
  if (block.kind === 'breath') {
    return {
      kind: 'breath',
      name: block.name,
      inhaleSec: block.inhaleSec,
      holdInSec: block.holdInSec,
      exhaleSec: block.exhaleSec,
      holdOutSec: block.holdOutSec,
      cycles: block.cycles,
      ...(block.note ? { note: block.note } : {}),
    }
  }
  if (block.kind === 'meditation') {
    return {
      kind: 'meditation',
      name: block.name,
      minutes: block.minutes,
      ...(block.sound !== 'silence' ? { sound: block.sound } : {}),
      ...(block.note ? { note: block.note } : {}),
    }
  }
  if (block.kind === 'flow') {
    const kind = block.role === 'warmup' ? 'warmup' : block.role === 'mobility' ? 'mobility' : 'flow'
    return {
      kind,
      ...(block.role === 'flow' ? { role: 'flow' } : {}),
      restSec: block.restSec,
      exercises: block.exercises.map(flowExercise),
    }
  }
  if (block.kind === 'krafttraining') {
    let prevSuperset: string | undefined
    const exercises = block.exercises.map((exercise) => {
      const row = kraftExercise(exercise, prevSuperset)
      prevSuperset = exercise.supersetId
      return row
    })
    return {
      kind: 'kraft',
      restBetweenSets: block.restBetweenSets,
      restBetweenExercises: block.restBetweenExercises,
      exercises,
    }
  }
  if (block.kind === 'emom') {
    return {
      kind: 'emom',
      intervalMin: block.intervalMin,
      rounds: block.rounds,
      ...(block.scheme ? { scheme: block.scheme } : {}),
      exercises: block.exercises.map(metconExercise),
    }
  }
  if (block.kind === 'tabata') {
    return {
      kind: 'tabata',
      workSec: block.workSec,
      restSec: block.restSec,
      rounds: block.rounds,
      ...(block.scheme ? { scheme: block.scheme } : {}),
      exercises: block.exercises.map(metconExercise),
    }
  }
  return {
    kind: block.kind,
    minutes: block.minutes,
    ...(block.scheme ? { scheme: block.scheme } : {}),
    exercises: block.exercises.map(metconExercise),
  }
}

/** Build a session-import JSON document from ordered workout blocks. */
export function sessionJsonFromBlocks(name: string, blocks: WorkoutBlock[]): string {
  return pretty({
    name: name.trim() || 'Export',
    parts: blocks.map(blockToPart),
  })
}

/** Single-mode custom workouts without `blocks` become a one-part session JSON. */
export function sessionJsonFromWorkout(workout: CustomWorkout): string {
  if (workout.blocks && workout.blocks.length > 0) {
    return sessionJsonFromBlocks(workout.name, workout.blocks)
  }

  const mode = workout.mode
  let block: WorkoutBlock
  if (mode === 'krafttraining') {
    block = {
      id: workout.id,
      kind: 'krafttraining',
      exercises: workout.exercises,
      restBetweenSets: workout.restBetweenSets ?? 90,
      restBetweenExercises: workout.restBetweenExercises ?? 60,
    }
  } else if (mode === 'emom') {
    block = {
      id: workout.id,
      kind: 'emom',
      exercises: workout.exercises,
      intervalMin: workout.emomInterval ?? 1,
      rounds: workout.emomRounds ?? Math.max(1, workout.minutes),
      scheme: workout.scheme,
    }
  } else if (mode === 'tabata') {
    block = {
      id: workout.id,
      kind: 'tabata',
      exercises: workout.exercises,
      workSec: workout.tabataWork ?? 20,
      restSec: workout.tabataRest ?? 10,
      rounds: workout.tabataRounds ?? 8,
      scheme: workout.scheme,
    }
  } else {
    block = {
      id: workout.id,
      kind: mode,
      exercises: workout.exercises,
      minutes: workout.minutes,
      scheme: workout.scheme,
    }
  }
  return sessionJsonFromBlocks(workout.name, [block])
}

/** Mobility custom session → importable mobility flow (35s default hold). */
export function sessionJsonFromMobility(session: CustomSession, holdSec = 35): string {
  const exercises = session.exerciseNames.map((name, index) => ({
    name: name || `Übung ${index + 1}`,
    seconds: holdSec,
  }))
  return pretty({
    name: session.name.trim() || 'Mobilität',
    parts: [
      {
        kind: 'mobility',
        restSec: 5,
        exercises,
      },
    ],
  })
}

export function sessionJsonFromBreathPreset(preset: BreathPresetExport): string {
  return pretty({
    name: preset.name.trim() || 'Atem',
    parts: [
      {
        kind: 'breath',
        name: preset.name.trim() || 'Atem',
        inhaleSec: preset.inhale_sec,
        holdInSec: preset.hold_in_sec,
        exhaleSec: preset.exhale_sec,
        holdOutSec: preset.hold_out_sec,
        cycles: preset.cycles,
      },
    ],
  })
}

export function sessionJsonFromMeditationPreset(preset: MeditationPresetExport): string {
  return pretty({
    name: preset.name.trim() || 'Meditation',
    parts: [
      {
        kind: 'meditation',
        name: preset.name.trim() || 'Sitzmeditation',
        minutes: preset.minutes,
        ...(preset.sound !== 'silence' ? { sound: preset.sound } : {}),
        ...(preset.note ? { note: preset.note } : {}),
      },
    ],
  })
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    try {
      const area = document.createElement('textarea')
      area.value = text
      area.style.position = 'fixed'
      area.style.left = '-9999px'
      document.body.appendChild(area)
      area.select()
      const ok = document.execCommand('copy')
      document.body.removeChild(area)
      return ok
    } catch {
      return false
    }
  }
}

export function downloadText(filename: string, text: string): void {
  const blob = new Blob([text], { type: 'application/json;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename.endsWith('.json') ? filename : `${filename}.json`
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(url)
}

export function slugFilename(name: string): string {
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9äöüß]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48)
  return `${slug || 'session'}.json`
}

export function workoutHasExportableParts(workout: CustomWorkout): boolean {
  if (workout.blocks && workout.blocks.some(isWorkBlock)) return true
  return workout.exercises.length > 0 || workout.minutes > 0 || workout.mode === 'krafttraining'
}
