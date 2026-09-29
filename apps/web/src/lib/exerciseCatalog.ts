/**
 * Canonical training exercises and equipment.
 * Built from the 708 local WODs: forms may only add a catalog match,
 * and the workout search treats gear words (incl. German) as equipment.
 */

export interface CatalogExercise {
  id: string
  name: string
  equipment: string[]
  aliases: string[]
}

export interface CatalogEquipment {
  id: string
  name: string
  aliases: string[]
}

export interface ParsedExercise {
  id: string | null
  name: string
  detail?: string
}

export type EquipmentCount = 'any' | '1' | '2' | '3' | 'more'

export interface WorkoutQuery {
  requiredEquipment: string[]
  exerciseIds: string[]
  /** Free-text tokens that are neither equipment nor a catalog exercise. */
  text: string
  /** Search text with equipment words removed. Exercise words stay. */
  remainder: string
}

export interface WorkoutSearchFields {
  name: string
  description?: string
  exercises?: string
  equipment?: string[]
}

export const EQUIPMENT: CatalogEquipment[] = [
  { id: 'dumbbell', name: 'Dumbbell', aliases: ['dumbbell', 'dumbbells', 'db', 'kurzhantel', 'kurzhanteln', 'kurzhantelpaar'] },
  { id: 'kettlebell', name: 'Kettlebell', aliases: ['kettlebell', 'kettlebells', 'kb', 'kugelhantel', 'kugelhanteln'] },
  { id: 'barbell', name: 'Barbell', aliases: ['barbell', 'langhantel', 'langhanteln'] },
  { id: 'pull-up-bar', name: 'Pull-up Bar', aliases: ['pull-up bar', 'pullup bar', 'pull up bar', 'klimmzugstange', 'reck'] },
  { id: 'box', name: 'Box', aliases: ['box', 'plyo box', 'plyobox', 'jump box'] },
  { id: 'jump-rope', name: 'Jump Rope', aliases: ['jump rope', 'jumprope', 'springseil', 'seilspringen'] },
  { id: 'sandbag', name: 'Sandbag', aliases: ['sandbag', 'sandsack', 'sandsacke'] },
  { id: 'rower', name: 'Rower', aliases: ['rower', 'rowing machine', 'row erg', 'rudergerat', 'rudergerät', 'concept2'] },
  { id: 'wall-ball', name: 'Wall Ball', aliases: ['wall ball', 'wallball', 'wandball', 'wandbaelle'] },
  { id: 'weight-vest', name: 'Gewichtsweste', aliases: ['gewichtsweste', 'weight vest', 'weighted vest'] },
  { id: 'rings', name: 'Rings', aliases: ['rings', 'ringe', 'turnringe'] },
  { id: 'bike', name: 'Assault Bike', aliases: ['assault bike', 'air bike', 'airbike', 'echo bike', 'bike'] },
  { id: 'ski-erg', name: 'Ski Erg', aliases: ['ski erg', 'skierg', 'ski'] },
  { id: 'ghd', name: 'GHD', aliases: ['ghd', 'glute ham developer'] },
  { id: 'parallettes', name: 'Parallettes', aliases: ['parallettes', 'parallette'] },
  { id: 'rope', name: 'Rope', aliases: ['climb rope', 'kletterseil', 'rope'] },
  { id: 'medball', name: 'Medball', aliases: ['medball', 'medicine ball', 'medizinball'] },
  { id: 'resistance-band', name: 'Resistance Band', aliases: ['resistance band', 'resistance bands', 'widerstandsband', 'band'] },
  { id: 'plate', name: 'Plate', aliases: ['plate', 'plates', 'gewichtsscheibe', 'scheibe'] },
  { id: 'wall', name: 'Wall', aliases: ['wall', 'wand'] },
]

const BODYWEIGHT = new Set(['bodyweight', 'bw', 'korpergewicht', 'körpergewicht', 'eigengewicht', 'ohne gerat', 'ohne gerät'])

const ABBREV: Record<string, string> = {
  kb: 'kettlebell',
  db: 'dumbbell',
  dbs: 'dumbbell',
  c2b: 'chest-to-bar',
  ctb: 'chest-to-bar',
  hspu: 'handstand push-ups',
  hspus: 'handstand push-ups',
  t2b: 'toes-to-bar',
  ohs: 'overhead squat',
  du: 'double unders',
  dus: 'double unders',
  wb: 'wall ball',
  hc: 'hollow crunches',
  hps: 'hang power snatch',
  hpc: 'hang power clean',
  hpcs: 'hang power clean',
  rdl: 'romanian deadlift',
  rdls: 'romanian deadlift',
  sdlhp: 'sumo deadlift high pull',
  mu: 'muscle-up',
  mus: 'muscle-ups',
  dl: 'deadlift',
  dls: 'deadlifts',
  k2e: 'knees-to-elbows',
  pc: 'power clean',
  fs: 'front squat',
  pp: 'push press',
  bs: 'back squat',
}

const LEADING = [
  'alternating', 'single-arm', 'single arm', 'double-arm', 'double kb', 'double',
  'strict', 'kipping', 'walking', 'jumping', 'lateral', 'reverse', 'weighted',
  'bar-facing', 'front rack', 'overhead', 'hang',
]

const STOPWORDS = new Set([
  'workout', 'workouts', 'wod', 'wods', 'mit', 'und', 'oder', 'fur', 'fuer', 'für',
  'nur', 'equipment', 'gerat', 'geraet', 'gerät', 'ein', 'eine', 'einem', 'einen',
  'der', 'die', 'das', 'den', 'dem', 'im', 'in', 'auf', 'von', 'with', 'and', 'or',
  'using', 'use', 'alle', 'the', 'a', 'for', 'wo',
])

type Seed = [id: string, name: string, equipment: string[], aliases: string[]]

const SEEDS: Seed[] = [
  ['pull-up', 'Pull-ups', ['pull-up-bar'], ['pull-up', 'pullups', 'pullup', 'klimmzug', 'klimmzuge', 'klimmzuege', 'kipping pull-ups', 'jumping pull-ups', 'l-pull-ups', 'chest-to-bar pull-ups', 'c2b pull-ups', 'chest-to-bar', 'c2b', 'ctb']],
  ['strict-pull-up', 'Strict Pull-ups', ['pull-up-bar'], ['strict pull-up', 'strict pullups']],
  ['push-up', 'Push-ups', [], ['push-up', 'pushups', 'pushup', 'liegestutz', 'liegestutze', 'liegestuetze', 'liegestuetz', 'strict push-ups', 'clapping push-ups', 'pike push-ups', 'hand-release push-ups']],
  ['burpee', 'Burpees', [], ['burpee', 'burpees', 'bar-facing burpees', 'burpees over bar', 'burpees over box', 'burpee to target', 'burpees to target', 'lateral burpees', 'lateral burpees over db', 'burpee box jump', 'burpee box jumps', 'burpee sumo jump squat', 'burpee broad jumps', 'burpees uber die linie']],
  ['air-squat', 'Air Squats', [], ['air squat', 'air squats', 'squat', 'squats', 'kniebeuge', 'kniebeugen']],
  ['sit-up', 'Sit-ups', [], ['sit-up', 'situps', 'situp', 'jack knife sit-ups']],
  ['double-under', 'Double Unders', ['jump-rope'], ['double under', 'double-under', 'double unders', 'du', 'dus', 'singles']],
  ['toes-to-bar', 'Toes-to-Bar', ['pull-up-bar'], ['toes to bar', 'toe to bar', 't2b']],
  ['hspu', 'Handstand Push-ups', [], ['handstand push-up', 'handstand pushup', 'hspu', 'strict hspu', 'parallette hspu', 'kb hspu']],
  ['handstand-walk', 'Handstand Walk', [], ['handstand walks']],
  ['handstand-hold', 'Handstand Hold', [], ['handstand hold']],
  ['muscle-up', 'Muscle-ups', ['pull-up-bar'], ['muscle-up', 'muscleup', 'mu', 'bar muscle-ups', 'bar muscle-up', 'bar mu']],
  ['ring-muscle-up', 'Ring Muscle-ups', ['rings'], ['ring muscle-up', 'ring muscle-ups']],
  ['box-jump', 'Box Jumps', ['box'], ['box jump', 'box jumps', 'box jump-over', 'box jump-overs', 'box jump overs', 'over-the-box jumps']],
  ['jumping-jack', 'Jumping Jacks', [], ['jumping jack', 'hampelmann']],
  ['wall-ball', 'Wall Balls', ['wall-ball'], ['wall ball', 'wall balls', 'wb', 'wandball']],
  ['thruster', 'Thrusters', ['barbell'], ['thruster', 'thrusters']],
  ['deadlift', 'Deadlifts', ['barbell'], ['deadlift', 'deadlifts', 'kreuzheben', 'dl']],
  ['kb-swing', 'KB Swings', ['kettlebell'], ['kb swing', 'kb swings', 'kettlebell swing', 'kettlebell swings', 'swings', 'swing', 'kugelhantel schwingen']],
  ['db-thruster', 'DB Thrusters', ['dumbbell'], ['db thruster', 'db thrusters', 'dumbbell thruster', 'dumbbell thrusters']],
  ['db-push-press', 'DB Push Press', ['dumbbell'], ['db push press', 'dumbbell push press']],
  ['sandbag-clean', 'Sandbag Cleans', ['sandbag'], ['sandbag clean', 'sandbag cleans']],
  ['row', 'Row', ['rower'], ['row', 'rudern', 'cal row', 'calorie row']],
  ['kb-snatch', 'KB Snatches', ['kettlebell'], ['kb snatch', 'kb snatches', 'kettlebell snatch', 'kettlebell snatches']],
  ['goblet-squat', 'KB Goblet Squats', ['kettlebell'], ['goblet squat', 'goblet squats', 'kb goblet squat', 'kb goblet squats']],
  ['kb-push-press', 'KB Push Press', ['kettlebell'], ['kb push press', 'kettlebell push press']],
  ['kb-deadlift', 'KB Deadlifts', ['kettlebell'], ['kb deadlift', 'kb deadlifts', 'kettlebell deadlift', 'kettlebell deadlifts']],
  ['kb-clean', 'KB Cleans', ['kettlebell'], ['kb clean', 'kb cleans', 'kettlebell clean', 'kettlebell cleans', 'kb muscle cleans', 'kb power clean']],
  ['db-deadlift', 'DB Deadlifts', ['dumbbell'], ['db deadlift', 'db deadlifts', 'dumbbell deadlift', 'dumbbell deadlifts']],
  ['run', 'Run', [], ['run', 'running', 'laufen', 'jog', 'sprint', 'sprints', 'mile run']],
  ['wall-walk', 'Wall Walks', ['wall'], ['wall walk', 'wall walks']],
  ['db-snatch', 'DB Snatches', ['dumbbell'], ['db snatch', 'db snatches', 'dumbbell snatch', 'dumbbell snatches', 'dumbbell snatches']],
  ['overhead-squat', 'Overhead Squats', ['barbell'], ['overhead squat', 'overhead squats', 'ohs', 'uberkniebeuge']],
  ['v-up', 'V-ups', [], ['v-up', 'v-ups', 'v ups', 'vup', 'single leg v-ups']],
  ['lunge', 'Lunges', [], ['lunge', 'lunges', 'ausfallschritt', 'ausfallschritte', 'walking lunge', 'walking lunges', 'reverse lunge', 'reverse lunges', 'jumping lunge', 'jumping lunges', 'overhead walking lunges', 'front rack walking lunges', 'front rack lunges', 'overhead lunges']],
  ['l-sit', 'L-Sit Hold', [], ['l-sit', 'l sit', 'l-sit hold', 'lsit']],
  ['squat-snatch', 'Squat Snatches', ['barbell'], ['squat snatch', 'squat snatches']],
  ['farmers-carry', 'Farmers Carry', [], ['farmer carry', 'farmers carries', 'farmers walk', 'kb farmers carry']],
  ['snatch', 'Snatches', ['barbell'], ['snatch', 'snatches', 'reissen', 'reisen']],
  ['squat-clean', 'Squat Cleans', ['barbell'], ['squat clean', 'squat cleans']],
  ['power-snatch', 'Power Snatches', ['barbell'], ['power snatch', 'power snatches']],
  ['power-clean', 'Power Cleans', ['barbell'], ['power clean', 'power cleans', 'pc']],
  ['front-squat', 'Front Squats', ['barbell'], ['front squat', 'front squats', 'frontkniebeuge', 'fs']],
  ['clean', 'Cleans', ['barbell'], ['clean', 'cleans', 'umsetzen']],
  ['push-press', 'Push Press', ['barbell'], ['push press', 'pp']],
  ['push-jerk', 'Push Jerk', ['barbell'], ['push jerk', 'push jerks']],
  ['jerk', 'Jerks', ['barbell'], ['jerk', 'jerks']],
  ['split-jerk', 'Split Jerk', ['barbell'], ['split jerk', 'split jerks']],
  ['clean-and-jerk', 'Clean & Jerk', ['barbell'], ['clean and jerk', 'clean & jerk', 'clean and jerks', 'c&j']],
  ['back-squat', 'Back Squats', ['barbell'], ['back squat', 'back squats', 'kniebeuge hinten', 'bs']],
  ['bench-press', 'Bench Press', ['barbell'], ['bench press', 'bench presses', 'bankdrucken', 'bench', 'floor press']],
  ['dip', 'Dips', [], ['dip', 'dips', 'bar dips']],
  ['ring-dip', 'Ring Dips', ['rings'], ['ring dip', 'ring dips']],
  ['ring-row', 'Ring Rows', ['rings'], ['ring row', 'ring rows']],
  ['mountain-climber', 'Mountain Climbers', [], ['mountain climber', 'mountain climbers']],
  ['plank', 'Plank', [], ['plank', 'plank hold', 'side plank']],
  ['hollow-hold', 'Hollow Hold', [], ['hollow holds']],
  ['hollow-rock', 'Hollow Rocks', [], ['hollow rock', 'hollow rocks']],
  ['hollow-crunch', 'Hollow Crunches', [], ['hollow crunch', 'hollow crunches', 'hc']],
  ['russian-twist', 'Russian Twists', [], ['russian twist', 'russian twists']],
  ['jump-squat', 'Jump Squats', [], ['jump squat', 'jump squats', 'squat jumps', 'squat jump', 'tuck jump', 'tuck jumps']],
  ['pistol', 'Pistol Squats', [], ['pistol', 'pistols', 'pistol squat', 'pistol squats', 'kb pistols']],
  ['good-morning', 'Good Mornings', ['barbell'], ['good morning', 'good mornings']],
  ['box-step-up', 'Box Step-ups', ['box'], ['box step-up', 'box step-ups', 'box step up', 'box step ups', 'weighted box step-ups']],
  ['devil-press', 'Devil Press', ['dumbbell'], ['devil presses']],
  ['man-maker', 'Man Makers', ['dumbbell'], ['man maker', 'manmakers']],
  ['ghd-sit-up', 'GHD Sit-ups', ['ghd'], ['ghd sit-up', 'ghd sit-ups', 'ghd situps']],
  ['rope-climb', 'Rope Climbs', ['rope'], ['rope climb', 'rope climbs']],
  ['ski', 'Ski Erg', ['ski-erg'], ['ski erg', 'skierg', 'cal ski', 'ski']],
  ['bike', 'Assault Bike', ['bike'], ['assault bike', 'cal bike', 'air bike', 'echo bike', 'bike']],
  ['wall-sit', 'Wall Sit', ['wall'], ['wall sits']],
  ['broad-jump', 'Broad Jumps', [], ['broad jump', 'broad jumps']],
  ['knees-to-elbows', 'Knees-to-Elbows', ['pull-up-bar'], ['knees to elbows', 'knee to elbow']],
  ['crunch', 'Crunches', [], ['crunch', 'crunches', 'reverse crunch', 'reverse crunches', 'tuck crunch', 'tuck crunches']],
  ['leg-raise', 'Leg Raises', [], ['leg raise', 'leg raises', 'leg pull-in']],
  ['hanging-knee-raise', 'Hanging Knee Raises', ['pull-up-bar'], ['hanging knee raise', 'hanging knee raises']],
  ['shoulder-to-overhead', 'Shoulder-to-Overhead', ['barbell'], ['shoulder to overhead', 's2oh', 'shoulder-to-oh']],
  ['hang-power-clean', 'Hang Power Cleans', ['barbell'], ['hang power clean', 'hang power cleans', 'hpc']],
  ['hang-snatch', 'Hang Snatches', ['barbell'], ['hang snatch', 'hang snatches', 'hang power snatch']],
  ['squat-clean-jerk', 'Squat Clean & Jerk', ['barbell'], ['squat clean and jerk']],
  ['romanian-deadlift', 'Romanian Deadlifts', ['barbell'], ['romanian deadlift', 'romanian deadlifts', 'rdl']],
  ['bent-over-row', 'Bent-over Rows', ['barbell'], ['bent-over row', 'bent over row', 'bent-over rows', 'barbell row', 'barbell rows', 'pendlay row', 'pendlay rows', 'upright row', 'upright rows']],
  ['turkish-get-up', 'Turkish Get-ups', ['kettlebell'], ['turkish get-up', 'turkish get-ups', 'turkish getup']],
  ['glute-bridge', 'Glute Bridges', [], ['glute bridge', 'glute bridges']],
  ['hip-extension', 'Hip Extensions', [], ['hip extension', 'hip extensions', 'hip ext']],
  ['back-extension', 'Back Extensions', ['ghd'], ['back extension', 'back extensions', 'back ext']],
  ['db-row', 'DB Rows', ['dumbbell'], ['db row', 'db rows', 'dumbbell row', 'gorilla row', 'db plank rows', 'plank rows']],
  ['db-front-squat', 'DB Front Squats', ['dumbbell'], ['db front squat', 'db front squats', 'dumbbell front squat']],
  ['db-overhead-squat', 'DB Overhead Squats', ['dumbbell'], ['db overhead squat', 'db overhead squats', 'dumbbell overhead squat']],
  ['db-lunge', 'DB Lunges', ['dumbbell'], ['db lunge', 'db lunges', 'dumbbell lunge', 'db overhead lunges', 'single-arm overhead lunges']],
  ['db-cluster', 'DB Clusters', ['dumbbell'], ['db cluster', 'db clusters']],
  ['db-burpee', 'DB Burpees', ['dumbbell'], ['db burpee', 'db burpees']],
  ['db-swing', 'DB Swings', ['dumbbell'], ['db swing', 'db swings', 'dumbbell swing']],
  ['db-squat', 'DB Squats', ['dumbbell'], ['db squat', 'db squats', 'dumbbell squat', 'dumbbell squats']],
  ['kb-front-squat', 'KB Front Squats', ['kettlebell'], ['kb front squat', 'kb front squats', 'kettlebell front squat', 'double kb front squat']],
  ['kb-thruster', 'KB Thrusters', ['kettlebell'], ['kb thruster', 'kb thrusters', 'kettlebell thruster']],
  ['kb-lunge', 'KB Lunges', ['kettlebell'], ['kb lunge', 'kb lunges', 'kettlebell lunge']],
  ['kb-halo', 'KB Halos', ['kettlebell'], ['kb halo', 'kb halos', 'kettlebell halo']],
  ['kb-row', 'KB Rows', ['kettlebell'], ['kb row', 'kb rows', 'kettlebell row']],
  ['kb-press', 'KB Press', ['kettlebell'], ['kb press', 'kettlebell press']],
  ['sandbag-squat', 'Sandbag Squats', ['sandbag'], ['sandbag squat', 'sandbag squats']],
  ['sandbag-carry', 'Sandbag Carries', ['sandbag'], ['sandbag carry', 'sandbag carries', 'sandbag bear hug carry', 'sandbag bear hug step-ups', 'sandbag over shoulder', 'sandbag carry run']],
  ['sandbag-front-squat', 'Sandbag Front Squats', ['sandbag'], ['sandbag front squat']],
  ['sandbag-push-press', 'Sandbag Push Press', ['sandbag'], ['sandbag push press']],
  ['high-knees', 'High Knees', [], ['high knee', 'high knees']],
  ['bear-complex', 'Bear Complex', ['barbell'], ['bear complexes']],
  ['band-pull-apart', 'Band Pull-aparts', ['resistance-band'], ['band pull-apart', 'band pull apart', 'band pull-aparts']],
  ['band-press', 'Band Press', ['resistance-band'], ['oh band press', 'overhead band press']],
  ['sumo-deadlift-high-pull', 'Sumo Deadlift High Pull', ['barbell'], ['sumo deadlift high pull', 'sdlhp']],
  ['chin-up', 'Chin-ups', ['pull-up-bar'], ['chin-up', 'chin-ups', 'chinup', 'chinups']],
  ['db-clean', 'DB Cleans', ['dumbbell'], ['db clean', 'db cleans', 'dumbbell clean', 'db hang clean', 'db hang cleans', 'db hang power cleans']],
  ['db-clean-jerk', 'DB Clean & Jerk', ['dumbbell'], ['db clean and jerk', 'db hang clean and jerk', 'dumbbell clean and jerk']],
  ['db-power-snatch', 'DB Power Snatches', ['dumbbell'], ['db power snatch', 'db power snatches']],
  ['kb-jerk', 'KB Jerk', ['kettlebell'], ['kb jerk', 'kb push jerk', 'kb push jerks']],
  ['kb-back-squat', 'KB Back Squat', ['kettlebell'], ['kb back squat', 'kb back squats']],
  ['kb-clean-press', 'KB Clean & Press', ['kettlebell'], ['kb clean and press']],
  ['kb-clean-jerk', 'KB Clean & Jerk', ['kettlebell'], ['kb clean and jerk']],
  ['kb-offset-push-up', 'KB Offset Push-ups', ['kettlebell'], ['kb offset push-up', 'kb offset push-ups']],
  ['kb-horn-curl', 'KB Horn Curls', ['kettlebell'], ['kb horn curl', 'kb horn curls']],
  ['kb-windmill', 'KB Windmills', ['kettlebell'], ['kb windmill', 'kb windmills']],
  ['kb-rotation-swing', 'KB Rotation Swings', ['kettlebell'], ['kb rotation swing', 'kb swing button up', 'kb snatch trunk rotation']],
  ['arch-hold', 'Arch Hold', [], ['arch holds']],
  ['tuck-up', 'Tuck-ups', [], ['tuck-up', 'tuck-ups', 'tuck ups']],
  ['toe-touch', 'Toe Touches', [], ['toe touch', 'toe touches', 'toe taps']],
  ['ground-to-overhead', 'Ground-to-Overhead', ['barbell'], ['ground to overhead', 'g2oh']],
  ['snatch-balance', 'Snatch Balance', ['barbell'], ['snatch balances']],
  ['clean-and-press', 'Clean & Press', ['barbell'], ['clean and press']],
  ['hang-clean', 'Hang Cleans', ['barbell'], ['hang clean', 'hang cleans', 'kb hang cleans']],
  ['muscle-clean', 'Muscle Cleans', ['barbell'], ['muscle clean', 'muscle cleans']],
  ['push-up-burpee', 'Push-up to Burpee', [], []],
  ['around-the-world', 'Around the World', ['plate'], ['around the world with plate']],
  ['kb-russian-twist', 'KB Russian Twists', ['kettlebell'], ['kb russian twist', 'kb russian twists']],
  ['db-shoulder-to-overhead', 'DB Shoulder-to-Overhead', ['dumbbell'], ['db shoulder-to-overhead', 'db shoulder to overhead', 'db hang clean-to-oh', 'db hang clean-to-overhead']],
  ['db-step-up', 'DB Step-ups', ['dumbbell'], ['db step-up', 'db step-ups']],
  ['db-overhead-lunge', 'DB Overhead Lunges', ['dumbbell'], ['db overhead lunge']],
  ['strict-press', 'Strict Press', ['barbell'], ['strict press', 'shoulder press', 'press']],
  ['dead-hang', 'Dead Hangs', ['pull-up-bar'], ['dead hang', 'dead hangs']],
  ['floor-wiper', 'Floor Wipers', ['barbell'], ['floor wiper', 'floor wipers']],
  ['thruster-db-note', 'DB Hang Clean-to-Overhead', ['dumbbell'], ['db hang clean-to-overhead', 'db hang clean to overhead']],
]

const EXERCISES: CatalogExercise[] = []
const exerciseExact = new Map<string, CatalogExercise>()
const equipmentExact = new Map<string, string>()

function registerExercise(seed: Seed) {
  const [id, name, equipment, aliases] = seed
  const ex: CatalogExercise = {
    id,
    name,
    equipment,
    aliases: [...new Set([name, ...aliases])],
  }
  EXERCISES.push(ex)
  for (const alias of ex.aliases) {
    for (const key of aliasKeys(alias)) {
      if (!exerciseExact.has(key)) exerciseExact.set(key, ex)
    }
  }
}

function aliasKeys(alias: string): string[] {
  const plain = normKey(alias)
  const expanded = normKey(expandAbbrev(alias))
  return plain === expanded ? [plain] : [plain, expanded]
}

for (const seed of SEEDS) registerExercise(seed)

for (const eq of EQUIPMENT) {
  for (const alias of [eq.name, ...eq.aliases]) {
    const key = normKey(alias)
    if (key && !equipmentExact.has(key)) equipmentExact.set(key, eq.id)
  }
}

interface Phrase {
  kind: 'equipment' | 'exercise'
  id: string
  alias: string
}

const PHRASES: Phrase[] = [
  ...EQUIPMENT.flatMap((eq) =>
    [eq.name, ...eq.aliases].map((alias) => ({ kind: 'equipment' as const, id: eq.id, alias: normKey(alias) })),
  ),
  ...EXERCISES.flatMap((ex) =>
    ex.aliases.map((alias) => ({ kind: 'exercise' as const, id: ex.id, alias: normKey(expandAbbrev(alias)) })),
  ),
]
  .filter((p) => p.alias.length > 0)
  .sort((a, b) => b.alias.length - a.alias.length || (a.kind === b.kind ? 0 : a.kind === 'equipment' ? -1 : 1))

export function listExercises(): CatalogExercise[] {
  return EXERCISES
}

export function exerciseById(id: string): CatalogExercise | undefined {
  return EXERCISES.find((ex) => ex.id === id)
}

export function equipmentById(id: string): CatalogEquipment | undefined {
  return EQUIPMENT.find((eq) => eq.id === id)
}

export function normKey(value: string): string {
  return value
    .toLowerCase()
    .replace(/ä/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/ü/g, 'u')
    .replace(/ß/g, 'ss')
    .replace(/&/g, ' and ')
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9+\- ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function expandAbbrev(value: string): string {
  return normKey(value)
    .split(' ')
    .map((word) => ABBREV[word] ?? word)
    .join(' ')
}

function lookupKey(key: string): CatalogExercise | null {
  if (!key) return null
  const direct = exerciseExact.get(key)
  if (direct) return direct
  for (const adj of LEADING) {
    if (key.startsWith(`${adj} `)) {
      const rest = lookupKey(key.slice(adj.length + 1))
      if (rest) return rest
    }
  }
  if (key.endsWith('es')) {
    const hit = exerciseExact.get(key.slice(0, -2))
    if (hit) return hit
  }
  if (key.endsWith('s')) {
    const hit = exerciseExact.get(key.slice(0, -1))
    if (hit) return hit
  }
  const plural = exerciseExact.get(`${key}s`)
  return plural ?? null
}

const GEAR_PREFIXES = ['kettlebell', 'dumbbell', 'sandbag', 'barbell']

export function lookupExerciseName(name: string): CatalogExercise | null {
  const expanded = normKey(expandAbbrev(name))
  const direct = lookupKey(expanded) ?? lookupKey(normKey(name))
  if (direct) return direct
  for (const gear of GEAR_PREFIXES) {
    if (!expanded.startsWith(`${gear} `)) continue
    const rest = lookupKey(expanded.slice(gear.length + 1))
    if (rest) return rest
  }
  return null
}

function isBodyweightLabel(label: string): boolean {
  const key = normKey(label)
  return BODYWEIGHT.has(key) || key.includes('bodyweight') || key.includes('korpergewicht')
}

export function matchEquipmentLabel(label: string): string | null {
  const key = normKey(label)
  if (!key || isBodyweightLabel(key)) return null
  const exact = equipmentExact.get(key)
  if (exact) return exact
  for (const phrase of PHRASES) {
    if (phrase.kind !== 'equipment') continue
    const padded = ` ${key} `
    if (padded.includes(` ${phrase.alias} `)) return phrase.id
  }
  return null
}

/** Unique gear ids. Bodyweight is ignored. A dumbbell pair stays one id. Slash combos split. */
export function countableEquipment(list: string[]): string[] {
  const ids: string[] = []
  const seen = new Set<string>()
  for (const raw of list) {
    for (const part of raw.split('/')) {
      const label = part.trim()
      if (!label || isBodyweightLabel(label)) continue
      const id = matchEquipmentLabel(label) ?? normKey(label).replace(/\s+/g, '-')
      if (!id || id === 'bodyweight' || seen.has(id)) continue
      seen.add(id)
      ids.push(id)
    }
  }
  return ids
}

export function matchesEquipmentCount(
  equipment: string[],
  required: string[],
  count: EquipmentCount,
): boolean {
  const set = countableEquipment(equipment)
  if (required.some((id) => !set.includes(id))) return false
  if (count === 'any') return true
  if (count === '1') return set.length === 1
  if (count === '2') return set.length === 2
  if (count === '3') return set.length === 3
  return set.length >= 4
}

function longestAt(text: string): (Phrase & { len: number }) | null {
  for (const phrase of PHRASES) {
    if (text === phrase.alias || text.startsWith(`${phrase.alias} `)) {
      return { ...phrase, len: phrase.alias.length }
    }
  }
  return null
}

export function parseWorkoutSearch(raw: string): WorkoutQuery {
  let rest = normKey(raw)
    .split(' ')
    .filter((word) => word && !STOPWORDS.has(word))
    .join(' ')
  const requiredEquipment: string[] = []
  const exerciseIds: string[] = []
  const text: string[] = []
  const remainder: string[] = []
  while (rest) {
    const hit = longestAt(rest)
    if (hit) {
      if (hit.kind === 'equipment') {
        if (!requiredEquipment.includes(hit.id)) requiredEquipment.push(hit.id)
      } else {
        if (!exerciseIds.includes(hit.id)) exerciseIds.push(hit.id)
        remainder.push(hit.alias)
      }
      rest = rest.slice(hit.len).trim()
      continue
    }
    const word = rest.split(' ')[0] ?? ''
    if (word) {
      text.push(word)
      remainder.push(word)
    }
    rest = rest.slice(word.length).trim()
  }
  return {
    requiredEquipment,
    exerciseIds,
    text: text.join(' '),
    remainder: remainder.join(' '),
  }
}

export function stripEquipmentTokens(raw: string): string {
  return parseWorkoutSearch(raw).remainder
}

export function workoutMatchesQuery(
  wod: WorkoutSearchFields,
  query: WorkoutQuery,
  count: EquipmentCount,
): boolean {
  if (!matchesEquipmentCount(wod.equipment ?? [], query.requiredEquipment, count)) return false
  if (query.exerciseIds.length > 0) {
    const ids = new Set(
      parseWodExercises(wod.exercises ?? '')
        .map((item) => item.id)
        .filter((id): id is string => Boolean(id)),
    )
    const blob = normKey(`${wod.name} ${wod.description ?? ''} ${wod.exercises ?? ''}`)
    const exerciseHit = query.exerciseIds.every((id) => {
      if (ids.has(id)) return true
      const exercise = exerciseById(id)
      return exercise?.aliases.some((alias) => blob.includes(normKey(alias))) ?? false
    })
    if (!exerciseHit) return false
  }
  if (query.text) {
    const blob = `${wod.name} ${wod.description ?? ''} ${wod.exercises ?? ''}`.toLowerCase()
    if (!blob.includes(query.text.toLowerCase())) return false
  }
  return true
}

export function searchExercises(query: string, limit = 8): CatalogExercise[] {
  const q = normKey(query)
  if (!q) return []
  const ranked = EXERCISES.map((ex) => {
    let score = 0
    for (const alias of ex.aliases) {
      const key = normKey(expandAbbrev(alias))
      if (key === q) score = Math.max(score, 100)
      else if (key.startsWith(q)) score = Math.max(score, 80)
      else if (key.includes(q)) score = Math.max(score, 40)
    }
    return { ex, score }
  })
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score || a.ex.name.localeCompare(b.ex.name))

  const out = ranked.map((row) => row.ex)
  const gear = matchEquipmentLabel(q)
  if (gear) {
    for (const ex of EXERCISES) {
      if (ex.equipment.includes(gear) && !out.includes(ex)) out.push(ex)
    }
  }
  return out.slice(0, limit)
}

/** Enter/click accepts a catalog exercise only. Unknown text is rejected. */
export function acceptExerciseQuery(query: string): CatalogExercise | null {
  const q = normKey(query)
  if (!q) return null
  const exact = lookupExerciseName(q)
  if (exact) return exact
  const hits = searchExercises(query, 8).filter((ex) =>
    ex.aliases.some((alias) => {
      const key = normKey(expandAbbrev(alias))
      return key.startsWith(q)
    }),
  )
  if (hits.length === 1) return hits[0]
  return null
}

const SCHEME_PATTERNS: RegExp[] = [
  /^(min\s+\d+(?:\s*-\s*\d+)?\s*:)\s*/i,
  /^(\d+\s*min(?:utes)?(?:\s+amrap)?\s*:)\s*/i,
  /^(\d+\s*x\s*:)\s*/i,
  /^(\d+\s*sets?\s+of(?:\s+\d+)?)\s*/i,
  /^(\d+\s*(?:rounds?|sets?)\b[^:]*:)\s*/i,
  /^((?:\d+\s*-\s*)+\d+\s*:)\s*/,
  /^((?:alt|tabata|emom|ladder|pyramid)\b[^:]*:)\s*/i,
  /^(\d+\s*exercises?\b[^:]*:)\s*/i,
  /^(\d+\s*reps?\b[^:]*:)\s*/i,
  /^(\d+\s*min(?:utes)?)\s+/i,
  /^(.*\b(?:amrap|rounds?|sets?|reps?|ladder|emom)\b[^:]*:)\s*/i,
]

/** Pull "5 Rounds:" / "Min 1:" off the front and keep the label. */
function takeScheme(segment: string): { scheme: string; rest: string } {
  const labels: string[] = []
  let text = segment.trim()
  for (let i = 0; i < 4; i += 1) {
    let hit = false
    for (const pattern of SCHEME_PATTERNS) {
      const match = text.match(pattern)
      const label = match?.[1]?.replace(/:\s*$/, '').trim()
      if (!match || !label) continue
      labels.push(label)
      text = text.slice(match[0].length).trim()
      hit = true
      break
    }
    if (!hit) break
  }
  return { scheme: labels.join(' · '), rest: text }
}

function peel(input: string): { name: string; detail?: string } {
  let text = input.trim()
  const bits: string[] = []
  const dashed = text.split(/\s+[—–]\s+/)
  if (dashed.length > 1 && dashed[0]) {
    bits.push(dashed.slice(1).join(' '))
    text = dashed[0].trim()
  }
  text = text.replace(/\s*\(([^)]*)\)\s*/g, (_m, inner: string) => {
    bits.push(inner)
    return ' '
  }).replace(/\s+/g, ' ').trim()
  text = text.replace(/\s+(alternierend|r\/l|l\/r|each side|each arm|each leg|per side|per arm|for time|amrap|alt|combo|max|unbroken|again|in sets|[rl])$/i, (_m, mod: string) => {
    bits.push(mod)
    return ''
  }).trim()
  text = text.replace(/\s+for\s+.+$/i, (mod) => {
    bits.push(mod.trim())
    return ''
  }).trim()
  text = text.replace(/\s+at\s+.+$/i, (mod) => {
    bits.push(mod.trim())
    return ''
  }).trim()
  text = text.replace(/\s+every\b.+$/i, (mod) => {
    bits.push(mod.trim())
    return ''
  }).trim()

  const lead = text.match(/^((?:\d+\s*-\s*)+\d+|\d+(?:\.\d+)?\s*(?:lb|lbs)|\d+(?:\.\d+)?(?:\s*(?:cal|kcal|m|meter|meters|s|sec|secs|min|mins))?|max(?:imum)?(?:\s+unbroken)?)\s+(.+)$/i)
  if (lead?.[1] && lead[2] && /[a-zäöü]/i.test(lead[2])) {
    bits.unshift(lead[1])
    text = lead[2].trim()
  }
  const trail = text.match(/^(.*[a-zäöü])\s+(\d+(?:\s*-\s*\d+)*|\d+(?:\.\d+)?\s*(?:m|meter|meters|cal|kcal|s|sec|min|mile|miles|lb|lbs)?)$/i)
  if (trail?.[1] && trail[2]) {
    bits.unshift(trail[2])
    text = trail[1].trim()
  }
  const distLead = text.match(/^(\d+(?:\.\d+)?\s*(?:m|mile|miles|cal))\s+(.+)$/i)
  if (distLead?.[1] && distLead[2]) {
    bits.unshift(distLead[1])
    text = distLead[2].trim()
  }
  const mileLead = text.match(/^(\d+(?:\.\d+)?\s*miles?)\s+(.+)$/i)
  if (mileLead?.[1] && mileLead[2]) {
    bits.unshift(mileLead[1])
    text = mileLead[2].trim()
  }
  const detail = bits.map((bit) => bit.trim()).filter(Boolean).join(' ')
  return { name: text.trim(), detail: detail || undefined }
}

function isJunk(name: string): boolean {
  const key = normKey(name)
  if (!key) return true
  if (!/[a-z]/.test(key)) return true
  if (key.length < 2) return true
  if (equipmentExact.has(key)) return true
  if (/rest|for time|amrap|partition as needed|^every |rounds?( each)?$|^effort$/.test(key)) return true
  return /^(rest|continue until failure|of each|failure|max effort)$/.test(key)
}

function lookupTail(name: string): CatalogExercise | null {
  const words = normKey(expandAbbrev(name)).split(' ').filter(Boolean)
  if (words.length < 2) return null
  for (let size = Math.min(4, words.length - 1); size >= 1; size -= 1) {
    const tail = words.slice(-size).join(' ')
    const hit = lookupKey(tail)
    if (hit) return hit
  }
  return null
}

function pushParsed(out: ParsedExercise[], name: string, detail: string | undefined, matched: CatalogExercise | null) {
  if (matched) {
    out.push({ id: matched.id, name: matched.name, detail })
    return
  }
  if (isJunk(name)) return
  out.push({ id: null, name: name.trim(), detail })
}

function parseSegment(segment: string, out: ParsedExercise[]) {
  const pieces = segment.split(/\s+[—–]\s+|\s+-\s+/).map((part) => part.trim()).filter(Boolean)
  if (pieces.length > 1) {
    const before = out.length
    for (const piece of pieces) parseSegment(piece, out)
    if (out.length > before) return
  }
  const { rest } = takeScheme(segment)
  if (!rest) return
  const peeled = peel(rest)
  const hit = lookupExerciseName(peeled.name)
  if (hit) {
    pushParsed(out, peeled.name, peeled.detail, hit)
    return
  }
  if (/[,/+&]|\bor\b|\band\b|\bwith\b/i.test(rest)) {
    const parts = rest.split(/\s*(?:,|\/|\+|&|\bor\b|\band\b|\bwith\b)\s*/i).map((part) => part.trim()).filter(Boolean)
    if (parts.length > 1) {
      const before = out.length
      for (const part of parts) parseSegment(part, out)
      if (out.length > before) return
    }
  }
  const tail = lookupTail(peeled.name)
  if (tail) {
    pushParsed(out, peeled.name, peeled.detail, tail)
    return
  }
  pushParsed(out, rest, peeled.detail, null)
}

interface ParsedChunk {
  scheme: string
  items: ParsedExercise[]
}

function parseChunk(segment: string): ParsedChunk {
  const { scheme, rest } = takeScheme(segment)
  const items: ParsedExercise[] = []
  if (rest) parseSegment(rest, items)
  const schemeOnly = !items.length && /runde|round|amrap|for time|emom/i.test(segment)
    ? segment.trim()
    : ''
  return { scheme: scheme || schemeOnly, items }
}

export interface ParsedWodSession {
  items: ParsedExercise[]
  /** Shared prescription such as "5 Rounds", kept off the exercise names. */
  scheme: string
}

export function parseWodSession(text: string): ParsedWodSession {
  if (!text?.trim()) return { items: [], scheme: '' }
  const chunks = text
    .replace(/\r/g, '')
    .split(/\s*(?:·|;|\||\n)+\s*/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map(parseChunk)
    .filter((chunk) => chunk.items.length > 0 || chunk.scheme)
  const schemes = [...new Set(chunks.map((chunk) => chunk.scheme).filter(Boolean))]
  const shared = schemes.length === 1 && chunks.every((chunk) => !chunk.scheme || chunk.scheme === schemes[0])
    ? schemes[0]
    : ''
  const items = chunks.flatMap((chunk) => {
    const extra = shared ? '' : chunk.scheme
    if (!extra) return chunk.items
    return chunk.items.map((item) => ({
      ...item,
      detail: [extra, item.detail].filter(Boolean).join(' · '),
    }))
  })
  return { items, scheme: shared }
}

export function parseWodExercises(text: string): ParsedExercise[] {
  return parseWodSession(text).items
}

function germanScheme(label: string): string {
  return label
    .replace(/\brounds\b/gi, 'Runden')
    .replace(/\bround\b/gi, 'Runde')
    .replace(/\bfor time\b/gi, 'für Zeit')
}

function repsBelong(reps: string, exercises: string): boolean {
  const value = reps.trim()
  if (!value) return false
  if (exercises.toLowerCase().includes(value.toLowerCase())) return true
  if (/^\d+(?:[/-]\d+)+$/.test(value) && /\d+\s*rounds?:/i.test(exercises) && !exercises.toLowerCase().includes(value.toLowerCase())) {
    return false
  }
  return true
}

/** Rounds, rep scheme and labels parsed out of the exercise blob. */
export function composeWorkoutScheme(input: {
  runden?: string
  reps?: string
  exercises?: string
  description?: string
}): string {
  const parsed = parseWodSession(input.exercises ?? '').scheme
  const parts: string[] = []
  let rounds = (input.runden ?? '').trim()
  if (!rounds) {
    const fromDescription = (input.description ?? '').match(/(\d+)\s*runden/i)
    if (fromDescription?.[1]) rounds = fromDescription[1]
  }
  const roundLabel = rounds
    ? (/runde|round/i.test(rounds) ? germanScheme(rounds) : `${rounds} Runden`)
    : ''
  const embedded = germanScheme(parsed)
  const embeddedRound = embedded.match(/(\d+)\s*runden?\b/i)?.[1]
  const fieldRound = rounds.match(/\d+/)?.[0]
  // Hero rows often store a stale round count. The "N Rounds:" line in the
  // exercise text is the prescription the athlete actually does.
  const roundsDisagree = Boolean(embeddedRound && fieldRound && embeddedRound !== fieldRound)
  if (roundsDisagree) {
    parts.push(embedded)
  } else {
    if (roundLabel) parts.push(roundLabel)
    const sameRound = Boolean(
      roundLabel &&
      fieldRound &&
      /runden|runde/i.test(embedded) &&
      new RegExp(`\\b${fieldRound}\\b`).test(embedded),
    )
    if (embedded && !sameRound) parts.push(embedded)
  }
  const reps = (input.reps ?? '').trim()
  if (reps && repsBelong(reps, input.exercises ?? '')) {
    const blob = parts.join(' ')
    if (roundLabel && reps.toLowerCase().startsWith(roundLabel.toLowerCase())) {
      const idx = parts.indexOf(roundLabel)
      if (idx >= 0) parts[idx] = reps
    } else if (!blob.toLowerCase().includes(reps.toLowerCase())) {
      parts.push(reps)
    }
  }
  return parts.join(' · ')
}

export function formatParsedExercise(item: ParsedExercise): string {
  return item.detail ? `${item.name} · ${item.detail}` : item.name
}

function collectGearIds(text: string): string[] {
  const key = ` ${normKey(text)} `
  const ids: string[] = []
  const seen = new Set<string>()
  for (const phrase of PHRASES) {
    if (phrase.kind !== 'equipment' || !phrase.alias) continue
    if (key.includes(` ${phrase.alias} `) && !seen.has(phrase.id)) {
      seen.add(phrase.id)
      ids.push(phrase.id)
    }
  }
  if (/\b(laufen|running|run)\b/.test(normKey(text)) && !seen.has('laufen')) ids.push('laufen')
  return ids
}

/** Gear that is always required, plus groups where any one option is enough ("oder"). */
export function gearNeeds(source: string, listed: string[] = []): { required: string[]; anyOf: string[][] } {
  const required = new Set<string>()
  const anyOf: string[][] = []
  const chunks = source.split(/\s*(?:·|\n)+\s*/).map((part) => part.trim()).filter(Boolean)
  let sawGear = false
  for (const chunk of chunks.length ? chunks : [source]) {
    if (/\boder\b/i.test(chunk)) {
      const options = [...new Set(chunk.split(/\s+oder\s+/i).flatMap(collectGearIds))]
      if (options.length >= 2) {
        anyOf.push(options)
        sawGear = true
        continue
      }
    }
    const ids = collectGearIds(chunk)
    if (ids.length) sawGear = true
    for (const id of ids) required.add(id)
  }
  if (!sawGear) {
    for (const id of countableEquipment(listed)) {
      if (id !== 'bodyweight') required.add(id)
    }
  }
  for (const group of anyOf) for (const id of group) required.delete(id)
  return { required: [...required], anyOf }
}

/** A tile shows the workout when its place can cover the gear. "oder" needs only one option. */
export function fitsLocationEquipment(source: string, listed: string[], allowedLabels: string[]): boolean {
  const allowed = new Set(
    allowedLabels.map((label) => collectGearIds(label)[0] ?? (isBodyweightLabel(label) ? '' : normKey(label))).filter(Boolean),
  )
  const { required, anyOf } = gearNeeds(source, listed)
  if (required.some((id) => !allowed.has(id))) return false
  return anyOf.every((group) => group.some((id) => allowed.has(id)))
}

function gearLabel(id: string): string {
  return equipmentById(id)?.name ?? (id === 'laufen' ? 'Laufen' : id)
}

/** Turn a program-workout description into exercise lines and the gear those lines name. */
export function decomposeProgramText(description: string): { exercises: string; equipment: string[] } {
  const [main, scheme] = description.split(/\s+—\s+/)
  const lines: string[] = []
  for (const chunk of (main ?? '').split(/\s*·\s*/).map((part) => part.trim()).filter(Boolean)) {
    if (/^pause\b/i.test(chunk)) continue
    const text = chunk
      .replace(/(\d+\s*s)\s*\/\s*(\d+\s*s)/gi, '$1-$2')
      .replace(/^(odd|even|jede minute|core)\s*:\s*/i, '')
      .replace(/^\d+\.\s*/, '')
      .trim()
    if (!text || /^pause\b/i.test(text)) continue
    const colon = text.match(/^(.*?):\s*(.+)$/)
    if (colon?.[2]?.includes('/')) {
      const head = colon[1].trim()
      if (head && !/^\d+\s*s\s*\/\s*\d+\s*s$/i.test(head)) lines.push(head)
      for (const part of colon[2].split(/\s*\/\s*/)) {
        const name = part.trim()
        if (name) lines.push(name)
      }
      continue
    }
    lines.push(text)
  }
  const needs = gearNeeds(description)
  const equipment = [...new Set([...needs.required, ...needs.anyOf.flat()])].map(gearLabel)
  const note = scheme?.trim()
  return {
    exercises: [lines.join('\n'), note ? `Vorgabe: ${note}` : ''].filter(Boolean).join('\n'),
    equipment,
  }
}

export interface PrescriptionLine {
  name: string
  detail?: string
  sets?: number
  repCount?: number
}

export interface CatalogPrescription {
  /** single = one movement, dropped from the catalog. strength = sets per exercise. */
  kind: 'single' | 'metcon' | 'strength'
  scheme: string
  lines: PrescriptionLine[]
  /** Only set when a CrossFit row moves into HIIT or a Kraft format. Girls and Heroes stay. */
  wodCategory?: string
  type: string
  restBetweenSets?: number
}

const LOADED_GEAR = /dumbbell|kettlebell|barbell|sandbag|gewichtsweste|weight vest|kurzhantel|langhantel|kb\b|db\b/i

function canonTimerType(type: string): string {
  const key = type.trim().toLowerCase()
  if (key === 'fortime' || key === 'for time' || key === 'timer') return 'ForTime'
  if (key === 'amrap') return 'AMRAP'
  if (key === 'emom') return 'EMOM'
  if (key === 'tabata') return 'Tabata'
  if (key === 'krafttraining') return 'krafttraining'
  return type.trim()
}

function splitMovementText(text: string): string[] {
  const parts: string[] = []
  let current = ''
  let depth = 0
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (ch === '(') depth += 1
    if (ch === ')' && depth) depth -= 1
    const plus = depth === 0 && ch === '+' && /\s/.test(text[i - 1] ?? '') && /\s/.test(text[i + 1] ?? '')
    if (depth === 0 && (ch === ',' || ch === '·' || ch === '\n' || ch === ';' || plus)) {
      parts.push(current)
      current = ''
      continue
    }
    current += ch
  }
  parts.push(current)
  return parts
}

function movementParts(text: string): string[] {
  return splitMovementText(text)
    .map((part) => part.trim()
      .replace(/^[a-zäöü][^:]{0,24}:\s*(?=\d+\.\s)/i, '')
      .replace(/^(odd|even|jede minute|min\s*\d+|core)\s*:\s*/i, '')
      .replace(/^\d+\.\s*/, '')
      .replace(/^\d+\s*(?:runden|rounds)\s*:\s*/i, '')
      .trim())
    .filter((part) => {
      if (!part) return false
      if (/^(pause|vorgabe)\b/i.test(part)) return false
      if (/^\d+\s*s\s*pause/i.test(part)) return false
      return /[a-zäöü]/i.test(part)
    })
}

function inlineSet(name: string): { name: string; sets?: number; repCount?: number; detail?: string } {
  const match = name.match(/(\d+)\s*[x×]\s*(\d+)\s*(s)?/i)
  if (!match) return { name }
  const cleaned = name.replace(match[0], '').replace(/[·,]\s*$/, '').replace(/\s{2,}/g, ' ').trim()
  const sets = Number(match[1])
  const repCount = Number(match[2])
  return {
    name: cleaned || name,
    sets,
    repCount,
    detail: match[3] ? `${sets}×${repCount}s` : undefined,
  }
}

function slashSetPairs(text: string): { sets: number; repCount: number }[] {
  const pairs: { sets: number; repCount: number }[] = []
  for (const chunk of text.split(/\s*\/\s*/)) {
    const match = chunk.match(/(\d+)\s*[x×]\s*(\d+)/)
    if (match) pairs.push({ sets: Number(match[1]), repCount: Number(match[2]) })
  }
  return pairs
}

function plainRepParts(reps: string): string[] | null {
  const parts = reps.split(/\s*\/\s*/).map((part) => part.trim())
  if (parts.length < 2 || parts.some((part) => !/^\d+$/.test(part))) return null
  return parts
}

/** Same leading count on every line ("10 Curl") belongs in the reps field. */
function sharedLeadingReps(
  lines: { name: string; detail?: string; sets?: number; repCount?: number }[],
): { reps: string; name: string }[] | null {
  if (lines.length < 2) return null
  const parsed = lines.map((line) => {
    if (line.sets || line.repCount || line.detail) return null
    const match = line.name.match(/^(\d+)\s+(.+)$/)
    if (!match?.[1] || !match[2] || !/[a-zäöü]/i.test(match[2])) return null
    return { reps: match[1], name: match[2].trim() }
  })
  if (parsed.some((row) => !row)) return null
  const reps = parsed[0]!.reps
  if (!parsed.every((row) => row!.reps === reps)) return null
  return parsed as { reps: string; name: string }[]
}

function restSeconds(text: string): number | undefined {
  const seconds = text.match(/pause:\s*(\d+)\s*s/i)
  if (seconds) return Number(seconds[1])
  const minutes = text.match(/pause:\s*(\d+)\s*(?:[–-]\s*\d+\s*)?min/i)
  if (minutes) return Number(minutes[1]) * 60
  return undefined
}

/**
 * Pair stored reps with exercises, and tell a metcon (shared rounds) from
 * strength work (several sets of each exercise). One-movement rows are marked
 * so the catalog can drop them.
 */
export function presentCatalogWorkout(input: {
  exercises?: string
  description?: string
  runden?: string
  reps?: string
  gewicht?: string
  type?: string
  category?: string
  wodCategory?: string
  estimatedMinutes?: number
  equipment?: string[]
}): CatalogPrescription {
  const description = (input.description ?? '').trim()
  const storedExercises = (input.exercises ?? '').trim()
  const [body, ...tailParts] = description.split(/\s+—\s+/)
  const tail = tailParts.join(' — ')
  const source = storedExercises || body
  const rawLines = movementParts(source).map(inlineSet)
  const reps = (input.reps ?? '').trim()
  const repParts = plainRepParts(reps)
  const eachSet = `${tail} ${reps} ${description}`.match(/(\d+)\s*[x×]\s*(\d+)\s*je\s+übung/i)
  const setPairs = slashSetPairs(`${tail} ${reps}`)
  const typeKey = (input.type ?? '').trim().toLowerCase()
  const markedStrength = typeKey === 'krafttraining' || input.wodCategory === 'krafttraining'
  const roundish = /amrap|emom|tabata|for\s*time|rounds|runden/i.test(`${input.type ?? ''} ${description}`)
  const strength = markedStrength
    || Boolean(eachSet)
    || setPairs.length >= 2
    || (setPairs.length === 1 && /sätze|sets/i.test(`${tail} ${description}`) && !roundish)

  let lines: PrescriptionLine[] = rawLines.map((line) => ({
    name: line.name,
    detail: line.detail,
    sets: line.sets,
    repCount: line.repCount,
  }))
  const sameReps = sharedLeadingReps(lines)
  if (sameReps) {
    lines = lines.map((line, index) => ({
      ...line,
      name: sameReps[index].name,
      detail: sameReps[index].reps,
    }))
  }

  if (strength) {
    const shared = eachSet
      ? lines.map(() => ({ sets: Number(eachSet[1]), repCount: Number(eachSet[2]) }))
      : setPairs
    let cursor = 0
    lines = lines.map((line) => {
      if (line.sets && line.repCount) return line
      const pair = shared[cursor]
      if (pair) cursor += 1
      return {
        ...line,
        sets: pair?.sets ?? line.sets ?? 3,
        repCount: pair?.repCount ?? line.repCount ?? 8,
      }
    })
  } else if (repParts && repParts.length === lines.length) {
    lines = lines.map((line, index) => ({ ...line, detail: `${repParts[index]} Wdh.` }))
  }

  // Named CrossFit rows that are one movement on purpose (Karen, KB Grace, Grace Home)
  // stay in the list. Program rows that collapsed to a single exercise do not.
  const crossfitCatalog = (input.wodCategory ?? '') === 'crossfit'
    || /girl|hero|home gym|homewod|benchmark|open|eigenes|core wod/i.test(input.category ?? '')
    || /^(emom|tabata)$/i.test((input.category ?? '').trim())
  const kind: CatalogPrescription['kind'] = lines.length < 2 && !crossfitCatalog
    ? 'single'
    : strength ? 'strength' : 'metcon'
  const rounds = (input.runden ?? '').trim()
  const roundFromText = description.match(/(\d+)\s*(?:runden|rounds)\b/i)?.[1]
  const roundLabel = rounds
    ? (/runde|round/i.test(rounds) ? germanScheme(rounds) : `${rounds} Runden`)
    : roundFromText ? `${roundFromText} Runden` : ''
  const minutes = input.estimatedMinutes ?? 0
  const canonType = canonTimerType(input.type ?? '')
  const clockLabel = !roundLabel && (canonType === 'AMRAP' || canonType === 'EMOM' || canonType === 'Tabata')
    ? [minutes ? `${minutes} Min` : '', canonType].filter(Boolean).join(' ')
    : ''
  const repsLeft = !strength && !(repParts && repParts.length === rawLines.length) ? reps : ''
  const weight = (input.gewicht ?? '').trim()
  const weightLabel = weight && /^\d+(?:[.,]\d+)?$/.test(weight) ? `${weight} kg` : ''
  const pause = strength ? (tail.match(/pause:\s*[^·]+/i)?.[0]?.replace(/pause:\s*/i, 'Pause ') ?? '') : ''
  const scheme = (strength
    ? [pause, weightLabel]
    : [roundLabel, clockLabel, repsLeft, weightLabel]
  ).filter(Boolean).join(' · ')

  const gearText = `${(input.equipment ?? []).join(' ')} ${source} ${description}`
  const loaded = LOADED_GEAR.test(gearText)
  let wodCategory: string | undefined
  const namedBenchmark = /girl|hero/i.test(input.category ?? '')
  const alreadyProgram = Boolean(input.wodCategory && input.wodCategory !== 'crossfit')
  if (!namedBenchmark && !alreadyProgram) {
    if (kind === 'strength') wodCategory = 'krafttraining'
    else if (loaded && (minutes === 0 || minutes > 15) && !/tabata/i.test(input.type ?? '')) wodCategory = 'kraft_ausdauer'
    else if (loaded) wodCategory = 'kraft_wenig_zeit'
    else wodCategory = 'hiit'
  }

  return {
    kind,
    scheme,
    lines,
    wodCategory,
    type: kind === 'strength' ? 'krafttraining' : canonTimerType(input.type ?? ''),
    restBetweenSets: strength ? restSeconds(`${tail} ${description}`) : undefined,
  }
}
