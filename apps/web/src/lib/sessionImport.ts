import { lookupExerciseName } from './exerciseCatalog'
import type { WizardExercise } from './customWorkouts'
import type { FlowExercise, FlowRole, WorkoutBlock } from './workoutBlocks'

export interface ImportWarning {
  part: number
  exercise: string
  message: string
}

export interface SessionImport {
  name: string
  blocks: WorkoutBlock[]
  errors: string[]
  warnings: ImportWarning[]
}

const WEIGHTS: Record<string, WizardExercise['weight_level']> = {
  leicht: 'leicht',
  mittel: 'mittel',
  schwer: 'schwer',
  light: 'leicht',
  medium: 'mittel',
  heavy: 'schwer',
}

function unwrap(text: string): string {
  const trimmed = text.trim()
  const fenced = trimmed.match(/^```(?:json)?\s*([\s\S]*?)```$/i)
  return (fenced?.[1] ?? trimmed).trim()
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  return value as Record<string, unknown>
}

function pick(record: Record<string, unknown>, keys: string[]): unknown {
  for (const key of keys) {
    if (record[key] !== undefined) return record[key]
  }
  return undefined
}

function num(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && value.trim() && Number.isFinite(Number(value))) return Number(value)
  return null
}

function text(value: unknown, max: number): string | undefined {
  if (typeof value !== 'string') return undefined
  const trimmed = value.trim()
  if (!trimmed) return undefined
  return trimmed.slice(0, max)
}

function intIn(value: unknown, min: number, max: number): number | null {
  const parsed = num(value)
  if (parsed == null) return null
  const rounded = Math.round(parsed)
  if (rounded < min || rounded > max) return null
  return rounded
}

function kindOf(value: unknown): { kind: WorkoutBlock['kind']; role?: FlowRole } | null {
  if (typeof value !== 'string') return null
  const key = value.trim().toLowerCase().replace(/[\s_]+/g, '-')
  if (key === 'kraft' || key === 'krafttraining' || key === 'strength') return { kind: 'krafttraining' }
  if (key === 'pause' || key === 'rest') return { kind: 'pause' }
  if (key === 'emom') return { kind: 'emom' }
  if (key === 'amrap') return { kind: 'amrap' }
  if (key === 'fortime' || key === 'for-time') return { kind: 'fortime' }
  if (key === 'tabata') return { kind: 'tabata' }
  if (key === 'flow' || key === 'ablauf' || key === 'timed') return { kind: 'flow', role: 'flow' }
  if (key === 'warmup' || key === 'warm-up' || key === 'aufwaermen') return { kind: 'flow', role: 'warmup' }
  if (key === 'mobility' || key === 'mobilitaet' || key === 'stretching') return { kind: 'flow', role: 'mobility' }
  return null
}

function roleOf(value: unknown, fallback: FlowRole): FlowRole {
  if (typeof value !== 'string') return fallback
  const key = value.trim().toLowerCase()
  if (key === 'warmup' || key === 'warm-up') return 'warmup'
  if (key === 'mobility' || key === 'mobilitaet' || key === 'stretching') return 'mobility'
  if (key === 'flow' || key === 'ablauf') return 'flow'
  return fallback
}

function warnName(part: number, name: string, warnings: ImportWarning[]) {
  if (lookupExerciseName(name)) return
  warnings.push({
    part,
    exercise: name,
    message: 'Kein Katalogtreffer. Abbildung und hinterlegter Kurztext entfallen. Der Hinweis aus dem JSON bleibt.',
  })
}

function readExercises(value: unknown, partNo: number, errors: string[]): Record<string, unknown>[] {
  if (!Array.isArray(value) || value.length === 0) {
    errors.push(`Teil ${partNo}: mindestens eine Übung.`)
    return []
  }
  if (value.length > 40) {
    errors.push(`Teil ${partNo}: höchstens 40 Übungen.`)
    return []
  }
  return value.flatMap((item, index) => {
    const record = asRecord(item)
    if (!record) {
      errors.push(`Teil ${partNo}, Übung ${index + 1}: Objekt erwartet.`)
      return []
    }
    return [record]
  })
}

function linkSupersets(exercises: WizardExercise[], flags: boolean[]) {
  let group: string | undefined
  exercises.forEach((exercise, index) => {
    if (flags[index] && index > 0) {
      if (!group) {
        group = crypto.randomUUID()
        exercises[index - 1].supersetId = group
      }
      exercise.supersetId = group
      return
    }
    group = undefined
  })
}

function compilePart(raw: unknown, index: number, errors: string[], warnings: ImportWarning[]): WorkoutBlock | null {
  const partNo = index + 1
  const record = asRecord(raw)
  if (!record) {
    errors.push(`Teil ${partNo}: Objekt erwartet.`)
    return null
  }
  const parsedKind = kindOf(pick(record, ['kind', 'type']))
  if (!parsedKind) {
    errors.push(`Teil ${partNo}: kind fehlt oder ist unbekannt. Erlaubt: flow, kraft, pause, emom, amrap, fortime, tabata, warmup, mobility.`)
    return null
  }
  const id = crypto.randomUUID()

  if (parsedKind.kind === 'pause') {
    const seconds = intIn(pick(record, ['seconds', 'sek', 'sec']), 1, 3600)
    if (seconds == null) errors.push(`Teil ${partNo}: Pause braucht seconds zwischen 1 und 3600.`)
    return seconds == null ? null : { id, kind: 'pause', seconds }
  }

  if (parsedKind.kind === 'flow') {
    const role = roleOf(pick(record, ['role']), parsedKind.role ?? 'flow')
    const restSec = intIn(pick(record, ['restSec', 'rest', 'pauseSec']), 0, 180) ?? 10
    const rows = readExercises(pick(record, ['exercises', 'uebungen']), partNo, errors)
    const exercises: FlowExercise[] = []
    rows.forEach((row, rowIndex) => {
      const name = text(pick(row, ['name']), 80)
      const seconds = intIn(pick(row, ['seconds', 'sek', 'sec']), 5, 900)
      if (!name) errors.push(`Teil ${partNo}, Übung ${rowIndex + 1}: Name fehlt.`)
      if (seconds == null) errors.push(`Teil ${partNo}, Übung ${rowIndex + 1}: seconds zwischen 5 und 900.`)
      const sidesRaw = intIn(pick(row, ['sides', 'seiten']), 1, 2)
      if (pick(row, ['sides', 'seiten']) !== undefined && sidesRaw == null) {
        errors.push(`Teil ${partNo}, Übung ${rowIndex + 1}: sides ist 1 oder 2.`)
      }
      if (!name || seconds == null) return
      warnName(partNo, name, warnings)
      exercises.push({
        id: crypto.randomUUID(),
        name,
        seconds,
        note: text(pick(row, ['note', 'description', 'beschreibung']), 140),
        sides: sidesRaw === 2 ? 2 : 1,
      })
    })
    if (exercises.length === 0) return null
    return { id, kind: 'flow', role, restSec, exercises }
  }

  const rows = readExercises(pick(record, ['exercises', 'uebungen']), partNo, errors)
  const scheme = text(pick(record, ['scheme', 'ablauf']), 120)

  if (parsedKind.kind === 'krafttraining') {
    const restBetweenSets = intIn(pick(record, ['restBetweenSets', 'restSets']), 0, 600) ?? 90
    const restBetweenExercises = intIn(pick(record, ['restBetweenExercises', 'restExercises']), 0, 600) ?? 60
    const flags: boolean[] = []
    const exercises: WizardExercise[] = []
    rows.forEach((row, rowIndex) => {
      const name = text(pick(row, ['name']), 80)
      const sets = intIn(pick(row, ['sets', 'saetze']), 1, 20)
      const reps = intIn(pick(row, ['reps', 'rep_count', 'repCount']), 1, 100)
      if (!name) errors.push(`Teil ${partNo}, Übung ${rowIndex + 1}: Name fehlt.`)
      if (sets == null) errors.push(`Teil ${partNo}, Übung ${rowIndex + 1}: sets zwischen 1 und 20.`)
      if (reps == null) errors.push(`Teil ${partNo}, Übung ${rowIndex + 1}: reps zwischen 1 und 100.`)
      const weightRaw = text(pick(row, ['weight', 'weight_level']), 20)?.toLowerCase()
      if (weightRaw && !WEIGHTS[weightRaw]) {
        errors.push(`Teil ${partNo}, Übung ${rowIndex + 1}: weight ist leicht, mittel oder schwer.`)
      }
      const superset = pick(row, ['supersetWithPrevious', 'superset']) === true
      if (superset && exercises.length === 0) {
        warnings.push({ part: partNo, exercise: name ?? 'Übung', message: 'supersetWithPrevious an der ersten Übung wird ignoriert.' })
      }
      if (!name || sets == null || reps == null) return
      warnName(partNo, name, warnings)
      flags.push(superset && exercises.length > 0)
      exercises.push({
        id: crypto.randomUUID(),
        name,
        sets,
        rep_count: reps,
        weight_level: weightRaw ? WEIGHTS[weightRaw] : undefined,
        note: text(pick(row, ['note', 'description', 'beschreibung']), 140),
      })
    })
    if (exercises.length === 0) return null
    linkSupersets(exercises, flags)
    return { id, kind: 'krafttraining', exercises, restBetweenSets, restBetweenExercises }
  }

  const metcon: WizardExercise[] = []
  rows.forEach((row, rowIndex) => {
    const name = text(pick(row, ['name']), 80)
    if (!name) {
      errors.push(`Teil ${partNo}, Übung ${rowIndex + 1}: Name fehlt.`)
      return
    }
    warnName(partNo, name, warnings)
    metcon.push({
      id: crypto.randomUUID(),
      name,
      detail: text(pick(row, ['detail', 'reps', 'prescription']), 80),
      note: text(pick(row, ['note', 'description', 'beschreibung']), 140),
    })
  })
  if (metcon.length === 0) return null

  if (parsedKind.kind === 'emom') {
    const intervalMin = intIn(pick(record, ['intervalMin', 'interval']), 1, 10)
    const rounds = intIn(pick(record, ['rounds', 'runden']), 1, 60)
    if (intervalMin == null) errors.push(`Teil ${partNo}: intervalMin zwischen 1 und 10.`)
    if (rounds == null) errors.push(`Teil ${partNo}: rounds zwischen 1 und 60.`)
    if (intervalMin == null || rounds == null) return null
    return { id, kind: 'emom', exercises: metcon, intervalMin, rounds, scheme }
  }

  if (parsedKind.kind === 'tabata') {
    const workSec = intIn(pick(record, ['workSec', 'work']), 5, 180)
    const restSec = intIn(pick(record, ['restSec', 'rest']), 5, 180)
    const rounds = intIn(pick(record, ['rounds', 'runden']), 1, 40)
    if (workSec == null) errors.push(`Teil ${partNo}: workSec zwischen 5 und 180.`)
    if (restSec == null) errors.push(`Teil ${partNo}: restSec zwischen 5 und 180.`)
    if (rounds == null) errors.push(`Teil ${partNo}: rounds zwischen 1 und 40.`)
    if (workSec == null || restSec == null || rounds == null) return null
    return { id, kind: 'tabata', exercises: metcon, workSec, restSec, rounds, scheme }
  }

  const min = parsedKind.kind === 'fortime' ? 0 : 1
  const minutes = intIn(pick(record, ['minutes', 'min']), min, 90)
  if (minutes == null) errors.push(`Teil ${partNo}: minutes zwischen ${min} und 90.`)
  if (minutes == null) return null
  return { id, kind: parsedKind.kind, exercises: metcon, minutes, scheme }
}

/** Parse a chatbot JSON session. Errors block the start. Unknown names are warnings. */
export function parseSessionImport(source: string): SessionImport {
  const errors: string[] = []
  const warnings: ImportWarning[] = []
  let parsed: unknown
  try {
    parsed = JSON.parse(unwrap(source))
  } catch {
    return { name: 'Import', blocks: [], errors: ['Kein gültiges JSON.'], warnings }
  }
  const root = asRecord(parsed)
  if (!root) return { name: 'Import', blocks: [], errors: ['Die Wurzel muss ein Objekt sein.'], warnings }
  const name = text(pick(root, ['name']), 80) ?? 'Import'
  const parts = pick(root, ['parts', 'blocks'])
  if (!Array.isArray(parts) || parts.length === 0) {
    return { name, blocks: [], errors: ['parts muss eine Liste mit mindestens einem Teil sein.'], warnings }
  }
  if (parts.length > 20) {
    return { name, blocks: [], errors: ['Höchstens 20 Teile.'], warnings }
  }
  return finish(name, parts, errors, warnings)
}

function finish(name: string, parts: unknown[], errors: string[], warnings: ImportWarning[]): SessionImport {
  const blocks: WorkoutBlock[] = []
  parts.forEach((part, index) => {
    const before = errors.length
    const block = compilePart(part, index, errors, warnings)
    if (block && errors.length === before) blocks.push(block)
  })
  const work = blocks.filter((block) => block.kind !== 'pause')
  if (errors.length === 0 && work.length === 0) errors.push('Mindestens ein Arbeitsteil, eine Pause allein reicht nicht.')
  return { name, blocks: errors.length > 0 ? [] : blocks, errors, warnings }
}
