import { useQuery } from '@tanstack/react-query'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

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
  runden?: string
  reps?: string
  gewicht?: string
  skal_leicht?: string
  skal_schwer?: string
  quelle?: string
}

export interface WodFilters {
  type?: string
  category?: string
  difficulty?: string
  search?: string
  page?: number
  equipmentFilter?: string[]
}

const PAGE_SIZE = 20

interface RawWod {
  id: string
  name: string
  typ: string
  kategorie: string
  beschreibung: string
  uebungen: string
  equipment: string
  dauer: string
  schwierigkeit: string
  runden?: string
  reps?: string
  gewicht?: string
  skal_leicht?: string
  skal_schwer?: string
  quelle?: string
}

function mapRawToWod(raw: RawWod): Wod {
  return {
    id: raw.id,
    name: raw.name,
    type: raw.typ,
    category: raw.kategorie,
    description: raw.beschreibung,
    exercises: raw.uebungen,
    equipment: raw.equipment ? raw.equipment.split(',').map((s) => s.trim()) : [],
    difficulty: raw.schwierigkeit,
    estimated_minutes: parseInt(raw.dauer) || 0,
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

async function fetchLocalWods(filters: WodFilters): Promise<{ data: Wod[]; count: number }> {
  let wods = await loadLocalWods()

  if (filters.type) wods = wods.filter((w) => w.type === filters.type)
  if (filters.category) wods = wods.filter((w) => w.category === filters.category)
  if (filters.difficulty) wods = wods.filter((w) => w.difficulty === filters.difficulty)
  if (filters.search) {
    const q = filters.search.toLowerCase()
    wods = wods.filter(
      (w) =>
        w.name.toLowerCase().includes(q) ||
        w.exercises.toLowerCase().includes(q) ||
        w.description.toLowerCase().includes(q),
    )
  }
  if (filters.equipmentFilter?.length) {
    const allowed = new Set(filters.equipmentFilter.map((e) => e.toLowerCase()))
    wods = wods.filter(
      (w) => w.equipment.length === 0 || w.equipment.every((eq) => allowed.has(eq.toLowerCase())),
    )
  }

  const count = wods.length
  const page = filters.page ?? 0
  const data = wods.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
  return { data, count }
}

const SUPABASE_TIMEOUT_MS = 5000

function raceTimeout<T>(promise: PromiseLike<T>, ms: number): Promise<T | null> {
  return Promise.race([
    Promise.resolve(promise),
    new Promise<null>((resolve) => setTimeout(() => resolve(null), ms)),
  ])
}

export function useWods(filters: WodFilters = {}) {
  return useQuery({
    queryKey: ['wods', filters],
    queryFn: async () => {
      if (!isSupabaseConfigured) {
        return fetchLocalWods(filters)
      }

      let query = supabase.from('wods').select('*', { count: 'exact' })

      if (filters.type) query = query.eq('type', filters.type)
      if (filters.category) query = query.eq('category', filters.category)
      if (filters.difficulty) query = query.eq('difficulty', filters.difficulty)
      if (filters.search) query = query.ilike('name', `%${filters.search}%`)

      const page = filters.page ?? 0
      const result = await raceTimeout(
        query.range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1).order('name'),
        SUPABASE_TIMEOUT_MS,
      )

      if (!result || result.error) {
        if (result?.error) console.error('[useWods]', result.error.message)
        return fetchLocalWods(filters)
      }

      return { data: (result.data ?? []) as Wod[], count: result.count ?? 0 }
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

      return result.data as Wod
    },
    enabled: Boolean(name),
    retry: false,
  })
}
