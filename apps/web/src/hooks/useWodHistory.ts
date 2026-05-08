import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

export interface WodHistoryEntry {
  id: string
  wod_name: string
  score_type: 'time' | 'rounds' | 'reps' | 'weight'
  score_value: string
  notes?: string
  completed_at: string
}

const STORAGE_KEY = 'carveout_wod_history'

function readLocal(): WodHistoryEntry[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as WodHistoryEntry[]
  } catch {
    return []
  }
}

function writeLocal(entries: WodHistoryEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

export function useWodHistory(wodName?: string) {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['wod_history', wodName ?? '_all'],
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    queryFn: async (): Promise<WodHistoryEntry[]> => {
      if (!isSupabaseConfigured) {
        const all = readLocal()
        return wodName ? all.filter((e) => e.wod_name === wodName) : all
      }

      let q = supabase
        .from('wod_history')
        .select('*')
        .order('completed_at', { ascending: false })

      if (wodName) q = q.eq('wod_name', wodName)

      const { data, error } = await q
      if (error) {
        const all = readLocal()
        return wodName ? all.filter((e) => e.wod_name === wodName) : all
      }
      return (data ?? []) as WodHistoryEntry[]
    },
  })

  const addEntry = useMutation({
    mutationFn: async (
      entry: Omit<WodHistoryEntry, 'id' | 'completed_at'>,
    ): Promise<WodHistoryEntry> => {
      const newEntry: WodHistoryEntry = {
        ...entry,
        id: crypto.randomUUID(),
        completed_at: new Date().toISOString(),
      }

      if (!isSupabaseConfigured) {
        const all = readLocal()
        writeLocal([newEntry, ...all])
        return newEntry
      }

      const { data, error } = await supabase
        .from('wod_history')
        .insert(newEntry)
        .select()
        .single()

      if (error) {
        const all = readLocal()
        writeLocal([newEntry, ...all])
        return newEntry
      }

      return data as WodHistoryEntry
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['wod_history'] })
    },
  })

  const personalBest = (query.data ?? []).reduce<WodHistoryEntry | null>((best, entry) => {
    if (!best) return entry
    if (entry.score_type === 'time') {
      return parseFloat(entry.score_value) < parseFloat(best.score_value) ? entry : best
    }
    return parseFloat(entry.score_value) > parseFloat(best.score_value) ? entry : best
  }, null)

  return { ...query, addEntry, personalBest }
}
