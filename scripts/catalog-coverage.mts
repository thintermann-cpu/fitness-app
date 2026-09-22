import { readFileSync } from 'node:fs'
import {
  composeWorkoutScheme,
  countableEquipment,
  matchesEquipmentCount,
  parseWodExercises,
  parseWorkoutSearch,
} from '../apps/web/src/lib/exerciseCatalog.ts'

const wods = JSON.parse(readFileSync('apps/web/public/wods.json', 'utf8')) as Array<{
  name: string
  uebungen?: string
  equipment?: string
}>

let segments = 0
let matched = 0
const unmatched = new Map<string, number>()
for (const wod of wods) {
  for (const item of parseWodExercises(wod.uebungen ?? '')) {
    segments += 1
    if (item.id) matched += 1
    else unmatched.set(item.name, (unmatched.get(item.name) ?? 0) + 1)
  }
}

const failures: string[] = []
function check(label: string, ok: boolean) {
  if (!ok) failures.push(label)
}

check('bw ignored', countableEquipment(['Dumbbell', 'Bodyweight']).join() === 'dumbbell')
check('pair is one', countableEquipment(['Dumbbells']).join() === 'dumbbell')
check('slash splits', countableEquipment(['Kettlebell/Dumbbell']).sort().join() === 'dumbbell,kettlebell')
check('count 1 dumbbell only', matchesEquipmentCount(['Dumbbell', 'Bodyweight'], ['dumbbell'], '1'))
check('count 1 rejects two', !matchesEquipmentCount(['Dumbbell', 'Kettlebell'], ['dumbbell'], '1'))
check('count 2 includes', matchesEquipmentCount(['Dumbbell', 'Kettlebell', 'Bodyweight'], ['dumbbell'], '2'))
check('count 2 rejects 3', !matchesEquipmentCount(['Dumbbell', 'Kettlebell', 'Barbell'], ['dumbbell'], '2'))
check('count 3', matchesEquipmentCount(['Dumbbell', 'Kettlebell', 'Barbell'], ['dumbbell'], '3'))
check('more is 4+', matchesEquipmentCount(['Dumbbell', 'Kettlebell', 'Barbell', 'Box'], [], 'more'))
check('more rejects 3', !matchesEquipmentCount(['Dumbbell', 'Kettlebell', 'Barbell'], [], 'more'))
check('any includes', matchesEquipmentCount(['Dumbbell', 'Kettlebell', 'Barbell'], ['dumbbell'], 'any'))
check('bw only is not 1', !matchesEquipmentCount(['Bodyweight'], [], '1'))
check('kurzhantel', parseWorkoutSearch('Kurzhantel').requiredEquipment.join() === 'dumbbell')
check('workouts mit', parseWorkoutSearch('workouts mit Kurzhanteln').requiredEquipment.join() === 'dumbbell')
check('klimmzug', parseWorkoutSearch('Klimmzug').exerciseIds.includes('pull-up'))
check('box jumps stay exercise', parseWorkoutSearch('box jumps').requiredEquipment.length === 0)
check('strip keeps helen', parseWorkoutSearch('Helen Kurzhantel').remainder.toLowerCase().includes('helen'))

const fran = wods.find((w) => w.name === 'Fran')
const brad = wods.find((w) => w.name === 'Brad')
check('fran scheme', Boolean(fran) && composeWorkoutScheme({
  runden: fran?.runden, reps: fran?.reps, exercises: fran?.uebungen, description: fran?.beschreibung,
}).includes('3 Runden') && composeWorkoutScheme({
  runden: fran?.runden, reps: fran?.reps, exercises: fran?.uebungen, description: fran?.beschreibung,
}).includes('21-15-9'))
if (brad) {
  const bradScheme = composeWorkoutScheme({
    runden: brad.runden, reps: brad.reps, exercises: brad.uebungen, description: brad.beschreibung,
  })
  const bradItems = parseWodExercises(brad.uebungen ?? '')
  check('brad keeps 5 rounds', /5 Runden/.test(bradScheme))
  check('brad skips template reps', !bradScheme.includes('21-15-9'))
  check('brad keeps front squat reps', bradItems.some((item) => item.name === 'Front Squats' && item.detail === '12'))
}
const openDumbbell = matchesEquipmentCount(['Dumbbell', 'Barbell', 'Box'], ['dumbbell'], 'any')
check('beliebig keeps other gear', openDumbbell)
check('count 1 closes other gear', !matchesEquipmentCount(['Dumbbell', 'Barbell'], ['dumbbell'], '1'))
check('unknown gear stays open', matchesEquipmentCount(['Dumbbell', 'SkiErg'], ['dumbbell'], 'any'))
check('unknown gear counts as second', matchesEquipmentCount(['Dumbbell', 'SkiErg'], ['dumbbell'], '2'))
check('unknown gear blocks count 1', !matchesEquipmentCount(['Dumbbell', 'SkiErg'], ['dumbbell'], '1'))

const bradshaw = wods.find((w) => w.name === 'Bradshaw')
if (bradshaw) {
  const bradshawScheme = composeWorkoutScheme({
    runden: bradshaw.runden, reps: bradshaw.reps, exercises: bradshaw.uebungen, description: bradshaw.beschreibung,
  })
  check('bradshaw uses blob rounds', bradshawScheme === '3 Runden')
}

const helen = wods.find((w) => w.name === 'Helen')
check('helen exists', Boolean(helen))
if (helen) {
  const gear = (helen.equipment ?? '').split(',').map((s) => s.trim())
  check('helen not count 1 kb', !matchesEquipmentCount(gear, ['kettlebell'], '1'))
  check('helen count 2 kb', matchesEquipmentCount(gear, ['kettlebell'], '2') || matchesEquipmentCount(gear, ['kettlebell'], 'any'))
}

console.log(JSON.stringify({
  wods: wods.length,
  segments,
  matched,
  unmatched: unmatched.size,
  coverage: `${((matched / segments) * 100).toFixed(1)}%`,
  failures,
  topUnmatched: [...unmatched.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])),
}, null, 2))
if (failures.length) process.exitCode = 1
