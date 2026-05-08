import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { useAuthStore } from '../store/authStore'

type Lang = 'de' | 'en' | 'es'

interface RawExercise {
  id: string
  name: Record<Lang, string>
  description: Record<Lang, string> | null
  instructions: Record<Lang, string> | null
  muscle_group: string
  difficulty: string
  duration_sec: number
  equipment: string[]
}

interface RawRoutine {
  id: string
  name: Record<Lang, string>
  description: Record<Lang, string> | null
  goal: string
  difficulty: string
  duration_min: number
  exercise_ids: string[] | null
}

export interface StretchingExercise {
  id: string
  name: string
  description: string
  instructions: string[]
  muscle_group: string
  difficulty: string
  duration_sec: number
  equipment: string[]
}

export interface StretchingRoutine {
  id: string
  name: string
  description: string
  goal: string
  difficulty: string
  duration_min: number
  exercise_ids: string[]
}

function resolve(obj: Record<Lang, string> | null | undefined, lang: Lang): string {
  if (!obj) return ''
  return obj[lang] ?? obj.en ?? ''
}

function parseInstructions(raw: Record<Lang, string> | null | undefined, lang: Lang): string[] {
  const text = resolve(raw, lang)
  if (!text) return []
  return text.split('\n').filter((s) => s.trim().length > 0)
}

function mapExercise(raw: RawExercise, lang: Lang): StretchingExercise {
  return {
    id: raw.id,
    name: resolve(raw.name, lang),
    description: resolve(raw.description, lang),
    instructions: parseInstructions(raw.instructions, lang),
    muscle_group: raw.muscle_group,
    difficulty: raw.difficulty,
    duration_sec: raw.duration_sec,
    equipment: raw.equipment ?? [],
  }
}

function mapRoutine(raw: RawRoutine, lang: Lang): StretchingRoutine {
  return {
    id: raw.id,
    name: resolve(raw.name, lang),
    description: resolve(raw.description, lang),
    goal: raw.goal,
    difficulty: raw.difficulty,
    duration_min: raw.duration_min,
    exercise_ids: raw.exercise_ids ?? [],
  }
}

export function useStretchingExercises() {
  const lang = (useAuthStore((s) => s.profile?.language) ?? 'en') as Lang

  return useQuery({
    queryKey: ['stretching_exercises', lang],
    queryFn: async (): Promise<StretchingExercise[]> => {
      const { data, error } = await supabase
        .from('stretching_exercises')
        .select('*')
        .order('muscle_group')

      if (error) throw error
      return ((data ?? []) as RawExercise[]).map((r) => mapExercise(r, lang))
    },
    staleTime: 10 * 60 * 1000,
  })
}

export function useStretchingRoutines() {
  const lang = (useAuthStore((s) => s.profile?.language) ?? 'en') as Lang

  return useQuery({
    queryKey: ['stretching_routines', lang],
    queryFn: async (): Promise<StretchingRoutine[]> => {
      const { data, error } = await supabase
        .from('stretching_routines')
        .select('*')
        .order('duration_min')

      if (error) throw error
      return ((data ?? []) as RawRoutine[]).map((r) => mapRoutine(r, lang))
    },
    staleTime: 10 * 60 * 1000,
  })
}
