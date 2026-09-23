import { useQuery } from '@tanstack/react-query'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import {
  decomposeProgramText,
  fitsLocationEquipment,
  parseWorkoutSearch,
  presentCatalogWorkout,
  workoutMatchesQuery,
  type CatalogPrescription,
  type EquipmentCount,
} from '../lib/exerciseCatalog'

export interface Wod {
  id: string
  name: string
  type: string
  category: string
  description: string
  exercises: string
  equipment: string[]
  difficulty: string
  estimated_minutes: number
  is_jumping: boolean
  is_editors_pick?: boolean
  wod_category?: string
  equipment_tags?: string[]
  runden?: string
  reps?: string
  gewicht?: string
  skal_leicht?: string
  skal_schwer?: string
  quelle?: string
  /** Rounds, per-exercise reps, or sets. One-movement rows stay out of the list. */
  prescription?: CatalogPrescription
}

export interface WodFilters {
  type?: string
  category?: string
  difficulty?: string
  search?: string
  page?: number
  equipmentFilter?: string[]
  excludeEquipment?: string[]
  userEquipment?: string[]   // profile.equipment — show only WODs whose equipment_tags ⊆ userEquipment
  minDuration?: number
  maxDuration?: number
  silentMode?: boolean
  editorsPick?: boolean
  wodCategory?: string
  /** Beliebig / 1 / 2 / 3 / mehr — counts gear types, bodyweight excluded. */
  equipmentCount?: EquipmentCount
}

export const EDITORS_PICK_IDS = new Set<string>([
  '63','75','89','90','93','105','213','214','255','258','267','274','275',
  '278','279','284','306','307','310','317','332','334','343','345','346',
  '370','372','395','396','619','628','633','639','644','650','656','661',
  '671','675','691','739','763','764','765','open_25_1','open_17_2',
])

const PAGE_SIZE = 20

/** Local JSON uses German keys; live Supabase rows use English keys. */
interface RawWod {
  id: string
  name: string
  typ?: string
  type?: string
  kategorie?: string
  category?: string | null
  beschreibung?: string
  description?: string | null
  uebungen?: string
  exercises?: string | null
  equipment?: string | string[] | null
  equipment_tags?: string[] | null
  dauer?: string | number
  estimated_minutes?: number | null
  schwierigkeit?: string
  difficulty?: string | null
  is_editors_pick?: boolean | null
  wod_category?: string | null
  runden?: string
  reps?: string
  gewicht?: string
  skal_leicht?: string
  skal_schwer?: string
  quelle?: string
}

function parseEquipment(value: unknown, tags?: string[] | null): string[] {
  if (Array.isArray(value) && value.length > 0) {
    return value.filter((v): v is string => typeof v === 'string' && v.length > 0)
  }
  if (typeof value === 'string' && value.trim()) {
    return value.split(',').map((s) => s.trim()).filter(Boolean)
  }
  if (Array.isArray(tags) && tags.length > 0) {
    return tags.filter(Boolean)
  }
  return []
}

function mapRawToWod(raw: RawWod): Wod {
  const description = raw.description ?? raw.beschreibung ?? ''
  let exercises = raw.exercises ?? raw.uebungen ?? ''
  const tags = raw.equipment_tags ?? []
  let equipment = parseEquipment(raw.equipment, tags)
  if (!exercises.trim() && description.trim()) {
    const decomposed = decomposeProgramText(description)
    exercises = decomposed.exercises
    if (decomposed.equipment.length) equipment = decomposed.equipment
  }
  const prescription = presentCatalogWorkout({
    exercises,
    description,
    runden: raw.runden,
    reps: raw.reps,
    gewicht: raw.gewicht,
    type: raw.type ?? raw.typ,
    category: raw.category ?? raw.kategorie ?? '',
    wodCategory: raw.wod_category ?? undefined,
    estimatedMinutes: Number(raw.estimated_minutes) || parseInt(String(raw.dauer ?? ''), 10) || 0,
    equipment,
  })
  return {
    id: String(raw.id),
    name: raw.name,
    type: prescription.type || (raw.type ?? raw.typ ?? ''),
    category: raw.category ?? raw.kategorie ?? '',
    description,
    exercises,
    equipment,
    difficulty: raw.difficulty ?? raw.schwierigkeit ?? '',
    estimated_minutes: Number(raw.estimated_minutes) || parseInt(String(raw.dauer ?? ''), 10) || 0,
    is_editors_pick: raw.is_editors_pick ?? EDITORS_PICK_IDS.has(String(raw.id)),
    wod_category: prescription.wodCategory ?? raw.wod_category ?? undefined,
    equipment_tags: tags.length ? tags : undefined,
    is_jumping: (() => {
      const JUMP_KEYWORDS = ['jump', 'jumping', 'burpee', 'hop', 'double under', 'double-under', 'box jump', 'skip']
      const text = exercises.toLowerCase()
      return JUMP_KEYWORDS.some((kw) => text.includes(kw))
    })(),
    prescription,
    runden: raw.runden,
    reps: raw.reps,
    gewicht: raw.gewicht,
    skal_leicht: raw.skal_leicht,
    skal_schwer: raw.skal_schwer,
    quelle: raw.quelle,
  }
}

let cachedLocalWods: Wod[] | null = null

async function loadLocalWods(): Promise<Wod[]> {
  if (cachedLocalWods) return cachedLocalWods
  const resp = await fetch('/wods.json')
  const raw: RawWod[] = await resp.json()
  cachedLocalWods = raw.map(mapRawToWod)
  return cachedLocalWods
}

const EQUIPMENT_NORM: Record<string, string> = {
  dumbbells:          'dumbbell',
  'resistance bands': 'resistance band',
  'rowing machine':   'rower',
  'assault bike':     'bike',
}

function normEq(e: string): string {
  const l = e.toLowerCase()
  return EQUIPMENT_NORM[l] ?? l
}

function applyLocalFilters(wods: Wod[], filters: Omit<WodFilters, 'page'>): Wod[] {
  wods = wods.filter((w) => w.prescription?.kind !== 'single')
  if (filters.wodCategory) wods = wods.filter((w) => w.wod_category === filters.wodCategory)
  if (filters.type) wods = wods.filter((w) => w.type === filters.type)
  if (filters.category) wods = wods.filter((w) => w.category === filters.category)
  if (filters.difficulty) wods = wods.filter((w) => w.difficulty === filters.difficulty)
  const count = filters.equipmentCount ?? 'any'
  const parsedSearch = parseWorkoutSearch(filters.search ?? '')
  const searchActive = Boolean(filters.search?.trim()) || count !== 'any'
  if (searchActive) {
    wods = wods.filter((w) => workoutMatchesQuery(w, parsedSearch, count))
  }
  if (filters.equipmentFilter?.length) {
    wods = wods.filter((w) =>
      fitsLocationEquipment(`${w.description}\n${w.exercises}`, w.equipment, filters.equipmentFilter ?? []),
    )
  }
  if (filters.excludeEquipment?.length) {
    const excluded = new Set(filters.excludeEquipment.map((e) => e.toLowerCase()))
    wods = wods.filter((w) => !w.equipment.some((eq) => excluded.has(eq.toLowerCase())))
  }
  if (filters.userEquipment?.length) {
    const allowed = new Set(filters.userEquipment.map(normEq))
    allowed.add('bodyweight')
    wods = wods.filter((w) => {
      const tags = w.equipment_tags?.length ? w.equipment_tags : w.equipment
      return tags.length === 0 || tags.every((eq) => allowed.has(normEq(eq)))
    })
  }
  if (filters.minDuration != null) wods = wods.filter((w) => w.estimated_minutes > 0 && w.estimated_minutes >= filters.minDuration!)
  if (filters.maxDuration != null) wods = wods.filter((w) => w.estimated_minutes > 0 && w.estimated_minutes <= filters.maxDuration!)
  if (filters.silentMode) wods = wods.filter((w) => !w.is_jumping)
  if (filters.editorsPick) wods = wods.filter((w) => w.is_editors_pick ?? EDITORS_PICK_IDS.has(w.id))
  return wods
}

async function fetchLocalWods(filters: WodFilters): Promise<{ data: Wod[]; count: number }> {
  const all = await loadLocalWods()
  const filtered = applyLocalFilters(all, filters)
  const page = filters.page ?? 0
  return { data: filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE), count: filtered.length }
}

const SUPABASE_TIMEOUT_MS = 8000

function raceTimeout<T>(promise: PromiseLike<T>, ms: number): Promise<T | null> {
  return Promise.race([
    Promise.resolve(promise),
    new Promise<null>((resolve) => setTimeout(() => resolve(null), ms)),
  ])
}

async function loadSupabaseWods(): Promise<Wod[] | null> {
  const result = await raceTimeout(
    supabase.from('wods').select('*').order('name').limit(2000),
    SUPABASE_TIMEOUT_MS,
  )
  if (!result || result.error) {
    if (result?.error) console.error('[useWods]', result.error.message)
    return null
  }
  return ((result.data ?? []) as RawWod[]).map(mapRawToWod)
}

async function fetchMatchingWods(filters: Omit<WodFilters, 'page'>): Promise<Wod[]> {
  if (!isSupabaseConfigured) {
    return applyLocalFilters(await loadLocalWods(), filters)
  }
  const rows = await loadSupabaseWods()
  if (!rows) return applyLocalFilters(await loadLocalWods(), filters)
  return applyLocalFilters(rows, filters)
}

export async function pickRandomWod(filters: Omit<WodFilters, 'page'>): Promise<Wod | null> {
  const filtered = await fetchMatchingWods(filters)
  if (filtered.length === 0) return null
  return filtered[Math.floor(Math.random() * filtered.length)]
}

export function useWods(filters: WodFilters = {}) {
  return useQuery({
    queryKey: ['wods', filters],
    queryFn: async () => {
      const page = filters.page ?? 0
      if (!isSupabaseConfigured) return fetchLocalWods(filters)
      const rows = await loadSupabaseWods()
      if (!rows) {
        if (filters.wodCategory || filters.editorsPick) {
          throw new Error('Supabase-Anfrage für Programm-Filter fehlgeschlagen (Timeout)')
        }
        return fetchLocalWods(filters)
      }
      const filtered = applyLocalFilters(rows, filters)
      return {
        data: filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE),
        count: filtered.length,
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  })
}

export function useWod(name: string) {
  return useQuery({
    queryKey: ['wod', name],
    queryFn: async () => {
      if (!isSupabaseConfigured) {
        const wods = await loadLocalWods()
        return wods.find((w) => w.name === name) ?? null
      }

      const result = await raceTimeout(
        supabase.from('wods').select('*').eq('name', name).single(),
        SUPABASE_TIMEOUT_MS,
      )

      if (!result || result.error) {
        if (result?.error) console.error('[useWod]', result.error.message)
        const wods = await loadLocalWods()
        return wods.find((w) => w.name === name) ?? null
      }

      return mapRawToWod(result.data as RawWod)
    },
    enabled: Boolean(name),
    retry: false,
  })
}
