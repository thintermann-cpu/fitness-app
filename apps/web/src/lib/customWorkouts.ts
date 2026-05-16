export interface WizardExercise {
  id: string
  name: string
  detail?: string
}

export interface CustomWorkout {
  id: string
  name: string
  mode: 'fortime' | 'amrap' | 'emom' | 'tabata'
  minutes: number
  exercises: WizardExercise[]
  createdAt: string
}

export interface CustomSession {
  id: string
  name: string
  exerciseIds: string[]
  exerciseNames: string[]
  createdAt: string
}

const WK_KEY = 'carveout_custom_workouts'
const SS_KEY = 'carveout_custom_sessions'

function load<T>(key: string): T[] {
  try {
    return JSON.parse(localStorage.getItem(key) ?? '[]') as T[]
  } catch {
    return []
  }
}

function persist<T>(key: string, items: T[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(items))
  } catch {}
}

export function loadCustomWorkouts(): CustomWorkout[] {
  return load<CustomWorkout>(WK_KEY)
}

export function saveCustomWorkout(w: CustomWorkout): void {
  persist(WK_KEY, [w, ...loadCustomWorkouts().filter((x) => x.id !== w.id)])
}

export function deleteCustomWorkout(id: string): void {
  persist(WK_KEY, loadCustomWorkouts().filter((w) => w.id !== id))
}

export function loadCustomSessions(): CustomSession[] {
  return load<CustomSession>(SS_KEY)
}

export function saveCustomSession(s: CustomSession): void {
  persist(SS_KEY, [s, ...loadCustomSessions().filter((x) => x.id !== s.id)])
}

export function deleteCustomSession(id: string): void {
  persist(SS_KEY, loadCustomSessions().filter((s) => s.id !== id))
}
