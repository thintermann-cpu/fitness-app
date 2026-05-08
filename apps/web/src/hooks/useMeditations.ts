import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { useAuthStore } from '../store/authStore'

type Lang = 'de' | 'en' | 'es'

interface RawMeditation {
  id: string
  name: Record<Lang, string>
  description: Record<Lang, string> | null
  instructions: Record<Lang, string> | null
  category: string
  duration_min: number
  difficulty: string
  background_sound: string | null
}

interface RawBreathworkTechnique {
  id: string
  name: Record<Lang, string>
  description: Record<Lang, string> | null
  inhale_sec: number
  hold_in_sec: number
  exhale_sec: number
  hold_out_sec: number
  cycles: number
  difficulty: string
}

export interface Meditation {
  id: string
  name: string
  description: string
  instructions: string[]
  category: string
  duration_min: number
  difficulty: string
  background_sound: string | null
}

export interface BreathworkTechnique {
  id: string
  name: string
  description: string
  inhale_sec: number
  hold_in_sec: number
  exhale_sec: number
  hold_out_sec: number
  cycles: number
  difficulty: string
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

function mapMeditation(raw: RawMeditation, lang: Lang): Meditation {
  return {
    id:               raw.id,
    name:             resolve(raw.name, lang),
    description:      resolve(raw.description, lang),
    instructions:     parseInstructions(raw.instructions, lang),
    category:         raw.category,
    duration_min:     raw.duration_min,
    difficulty:       raw.difficulty,
    background_sound: raw.background_sound,
  }
}

function mapTechnique(raw: RawBreathworkTechnique, lang: Lang): BreathworkTechnique {
  return {
    id:          raw.id,
    name:        resolve(raw.name, lang),
    description: resolve(raw.description, lang),
    inhale_sec:  raw.inhale_sec,
    hold_in_sec: raw.hold_in_sec,
    exhale_sec:  raw.exhale_sec,
    hold_out_sec: raw.hold_out_sec,
    cycles:      raw.cycles,
    difficulty:  raw.difficulty,
  }
}

export function useMeditations() {
  const lang = (useAuthStore((s) => s.profile?.language) ?? 'en') as Lang

  return useQuery({
    queryKey: ['meditations', lang],
    queryFn: async (): Promise<Meditation[]> => {
      const { data, error } = await supabase
        .from('meditations')
        .select('*')
        .order('duration_min')

      if (error) {
        console.error('[useMeditations]', error.message)
        throw error
      }
      return ((data ?? []) as RawMeditation[]).map((r) => mapMeditation(r, lang))
    },
    staleTime: 10 * 60 * 1000,
    retry: 1,
  })
}

export function useBreathworkTechniques() {
  const lang = (useAuthStore((s) => s.profile?.language) ?? 'en') as Lang

  return useQuery({
    queryKey: ['breathwork_techniques', lang],
    queryFn: async (): Promise<BreathworkTechnique[]> => {
      const { data, error } = await supabase
        .from('breathwork_techniques')
        .select('*')
        .order('difficulty')

      if (error) {
        console.error('[useBreathworkTechniques]', error.message)
        throw error
      }
      return ((data ?? []) as RawBreathworkTechnique[]).map((r) => mapTechnique(r, lang))
    },
    staleTime: 10 * 60 * 1000,
    retry: 1,
  })
}
