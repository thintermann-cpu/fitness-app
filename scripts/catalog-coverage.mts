import { readFileSync } from 'node:fs'
import {
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
