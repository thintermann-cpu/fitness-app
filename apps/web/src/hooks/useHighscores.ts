import { useQuery } from '@tanstack/react-query'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import type { WodHistoryEntry } from './useWodHistory'

const STORAGE_KEY = 'carveout_wod_history'

function readLocalHistory(): WodHistoryEntry[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as WodHistoryEntry[]
  } catch {
    return []
  }
}

export function useHighscores(wodName: string) {
  return useQuery({
    queryKey: ['highscores', wodName],
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    queryFn: async (): Promise<WodHistoryEntry[]> => {
      if (!isSupabaseConfigured) {
        const all = readLocalHistory()
        return all
          .filter((e) => e.wod_name === wodName)
          .sort((a, b) => parseFloat(b.score_value) - parseFloat(a.score_value))
          .slice(0, 10)
      }

      const { data, error } = await supabase
        .from('wod_history')
        .select('id, wod_name, score_type, score_value, completed_at')
        .eq('wod_name', wodName)
        .order('score_value', { ascending: false })
        .limit(10)

      if (error) return []
      return (data ?? []) as WodHistoryEntry[]
    },
    enabled: Boolean(wodName),
  })
}
