import type { WizardExercise } from './customWorkouts'

export interface ExerciseGroup {
  start: number
  end: number
  superset: boolean
}

export function exerciseGroups(exercises: WizardExercise[]): ExerciseGroup[] {
  const groups: ExerciseGroup[] = []
  let index = 0
  while (index < exercises.length) {
    const id = exercises[index].supersetId
    let end = index
    if (id) {
      while (end + 1 < exercises.length && exercises[end + 1].supersetId === id) end += 1
    }
    groups.push({ start: index, end, superset: end > index })
    index = end + 1
  }
  return groups
}

export function groupAt(exercises: WizardExercise[], index: number): ExerciseGroup {
  return exerciseGroups(exercises).find((group) => index >= group.start && index <= group.end)
    ?? { start: index, end: index, superset: false }
}

/** A superset shares one set count. Reps stay on each exercise. */
export function alignSupersetSets(exercises: WizardExercise[]): WizardExercise[] {
  return exerciseGroups(exercises).flatMap((group) => {
    const slice = exercises.slice(group.start, group.end + 1)
    if (!group.superset) return slice
    const sets = slice[0].sets ?? 3
    return slice.map((exercise) => (exercise.sets === sets ? exercise : { ...exercise, sets }))
  })
}

export function setGroupSets(exercises: WizardExercise[], index: number, sets: number): WizardExercise[] {
  const group = groupAt(exercises, index)
  if (!group.superset) {
    return exercises.map((exercise, i) => (i === index ? { ...exercise, sets } : exercise))
  }
  return exercises.map((exercise, i) => (
    i >= group.start && i <= group.end ? { ...exercise, sets } : exercise
  ))
}

export function toggleSupersetWithNext(exercises: WizardExercise[], index: number): WizardExercise[] {
  if (index < 0 || index >= exercises.length - 1) return exercises
  const current = exercises[index]
  const next = exercises[index + 1]
  const linked = Boolean(current.supersetId && current.supersetId === next.supersetId)
  if (linked) {
    const id = current.supersetId
    const split = exercises.map((exercise, i) => (
      i > index && exercise.supersetId === id ? { ...exercise, supersetId: undefined } : exercise
    ))
    const still = split.filter((exercise) => exercise.supersetId === id).length
    if (still >= 2) return split
    return split.map((exercise) => (
      exercise.supersetId === id ? { ...exercise, supersetId: undefined } : exercise
    ))
  }

  const absorb = new Set<string>()
  if (current.supersetId) absorb.add(current.supersetId)
  if (next.supersetId) absorb.add(next.supersetId)
  const merged = exercises.flatMap((exercise, i) => (
    i === index || i === index + 1 || (exercise.supersetId && absorb.has(exercise.supersetId)) ? [i] : []
  ))
  const id = crypto.randomUUID()
  const sets = exercises[merged[0]]?.sets ?? 3
  return exercises.map((exercise, i) => (
    merged.includes(i) ? { ...exercise, supersetId: id, sets } : exercise
  ))
}

/** Sets × reps, a hold in seconds, or both. The fallback 8 reps is only for an old rep exercise. */
export function kraftWorkLabel(exercise: WizardExercise): string {
  const sets = exercise.sets ?? 3
  if (exercise.rep_count == null && exercise.seconds != null) return `${sets} × ${exercise.seconds}s`
  if (exercise.rep_count != null && exercise.seconds != null) return `${sets} × ${exercise.rep_count} · ${exercise.seconds}s`
  return `${sets} × ${exercise.rep_count ?? 8}`
}

export function exerciseLoad(exercise: WizardExercise): string | undefined {
  if (typeof exercise.weightKg === 'number' && Number.isFinite(exercise.weightKg)) {
    const rounded = Math.round(exercise.weightKg * 100) / 100
    const body = Number.isInteger(rounded) ? String(rounded) : String(rounded).replace('.', ',')
    return `${body} kg`
  }
  if (exercise.weightText?.trim()) return exercise.weightText.trim()
  if (exercise.weight_level) return exercise.weight_level
  return undefined
}

function formatOne(exercise: WizardExercise, asKraft: boolean): string {
  const hold = exercise.rep_count == null && exercise.seconds != null
  const hasScheme = exercise.sets != null || exercise.rep_count != null || hold
  const scheme = asKraft || hasScheme
    ? hold
      ? `${exercise.sets ?? 3}×${exercise.seconds}s `
      : exercise.rep_count != null && exercise.seconds != null
        ? `${exercise.sets ?? 3}×${exercise.rep_count} · ${exercise.seconds}s `
        : `${exercise.sets ?? 3}×${exercise.rep_count ?? 8} `
    : ''
  const detail = !scheme && exercise.detail ? ` ${exercise.detail}` : ''
  const weight = exerciseLoad(exercise)
  const note = exercise.note?.trim() ? ` — ${exercise.note.trim()}` : ''
  return `${scheme}${exercise.name}${detail}${weight ? ` ${weight}` : ''}${note}`
}

/** One history line. Kraft shows sets×reps. Metcon keeps the prescription text. Supersets are grouped. */
export function formatHistoryExercises(exercises: WizardExercise[]): string {
  const kraft = exercises.some((exercise) => (
    exercise.sets != null || exercise.rep_count != null || exercise.seconds != null || exercise.weight_level || exercise.weightKg != null || exercise.weightText || exercise.supersetId
  ))
  return exerciseGroups(exercises).map((group) => {
    const members = exercises.slice(group.start, group.end + 1).map((exercise) => formatOne(exercise, kraft && group.superset))
    if (!group.superset) return formatOne(exercises[group.start], false)
    return `Supersatz ${members.join(' + ')}`
  }).join(' · ')
}
