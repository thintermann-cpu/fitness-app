import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { useAuthStore } from '../store/authStore'
import type { WizardExercise } from '../lib/customWorkouts'

export interface WodHistoryEntry {
  id: string
  wod_name: string
  score_type: 'time' | 'rounds' | 'reps' | 'weight'
  score_value: string
  notes?: string
  completed_at: string
  exercises?: WizardExercise[]
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
  const userId      = useAuthStore((s) => s.user?.id ?? null)
  const queryClient = useQueryClient()
  const userScope   = isSupabaseConfigured ? (userId ?? 'anon') : 'local'

  const query = useQuery({
    queryKey: ['wod_history', userScope, wodName ?? '_all'],
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: isSupabaseConfigured ? !!userId : true,
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
      console.log('[useWodHistory] SELECT:', { error: error?.message, rowCount: data?.length, wodName })
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

      const payload = { ...newEntry, ...(userId ? { user_id: userId } : {}) }
      console.log('[useWodHistory] INSERT attempt', payload)

      const { data, error } = await supabase
        .from('wod_history')
        .insert(payload)
        .select()
        .single()

      if (error) {
        console.error('[useWodHistory] insert error:', error.message, error.code, 'user_id:', userId)
        const all = readLocal()
        writeLocal([newEntry, ...all])
        // Mark as local-only so onSuccess skips the Supabase refetch
        return Object.assign({ ...newEntry }, { _fromLocal: true }) as WodHistoryEntry
      }

      return data as WodHistoryEntry
    },
    onSuccess: (data) => {
      const prepend = (old: WodHistoryEntry[] | undefined) =>
        old ? [data, ...old.filter((e) => e.id !== data.id)] : [data]
      queryClient.setQueryData(['wod_history', userScope, '_all'], prepend)
      queryClient.setQueryData(['wod_history', userScope, data.wod_name], prepend)
      // Only re-fetch from Supabase when the entry actually reached the DB.
      // If INSERT failed and fell back to localStorage, a refetch would overwrite
      // the setQueryData cache with Supabase results that don't contain the entry.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!(data as any)._fromLocal) {
        void queryClient.invalidateQueries({ queryKey: ['wod_history'] })
      }
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
