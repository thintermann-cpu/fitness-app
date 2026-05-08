import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'

export type Category = 'morning' | 'day' | 'evening'

export interface Routine {
  id: string
  category: Category
  name: string
  icon: string
  time: string | null
  link_url: string | null
  active_days: number[]
  sort_order: number
}

const ALL_DAYS = [0, 1, 2, 3, 4, 5, 6]
const WEEKDAYS = [1, 2, 3, 4, 5]

const SEED_ROUTINES: Array<Omit<Routine, 'id'>> = [
  { category: 'morning', name: 'Supplements',    icon: '💊', time: '05:05', link_url: null, active_days: ALL_DAYS, sort_order: 0 },
  { category: 'morning', name: 'Workout',         icon: '🏋️', time: '05:15', link_url: null, active_days: ALL_DAYS, sort_order: 1 },
  { category: 'morning', name: 'Stretching',      icon: '🧘', time: '05:40', link_url: null, active_days: ALL_DAYS, sort_order: 2 },
  { category: 'morning', name: 'Meditation',      icon: '🧠', time: '05:55', link_url: null, active_days: ALL_DAYS, sort_order: 3 },
  { category: 'morning', name: 'Frühstück',       icon: '🥗', time: '07:00', link_url: null, active_days: ALL_DAYS, sort_order: 4 },
  { category: 'morning', name: 'Supplements 2',   icon: '💊', time: '07:15', link_url: null, active_days: ALL_DAYS, sort_order: 5 },
  { category: 'day',     name: 'Wasser',          icon: '💧', time: '12:00', link_url: null, active_days: ALL_DAYS, sort_order: 0 },
  { category: 'day',     name: 'Mittagessen',     icon: '🥗', time: '12:30', link_url: null, active_days: WEEKDAYS, sort_order: 1 },
  { category: 'day',     name: 'Spaziergang',     icon: '🥾', time: '13:00', link_url: null, active_days: ALL_DAYS, sort_order: 2 },
  { category: 'day',     name: 'Waschen',         icon: '🛁', time: '18:00', link_url: null, active_days: WEEKDAYS, sort_order: 3 },
  { category: 'evening', name: 'Zähne putzen',    icon: '🦷', time: '21:30', link_url: null, active_days: ALL_DAYS, sort_order: 0 },
  { category: 'evening', name: 'Abend-Meditation',icon: '🌙', time: '22:00', link_url: null, active_days: ALL_DAYS, sort_order: 1 },
  { category: 'evening', name: 'Schlafenszeit',   icon: '🛌', time: '22:30', link_url: null, active_days: ALL_DAYS, sort_order: 2 },
]

async function getUserId(): Promise<string | null> {
  const { data: { user } } = await supabase.auth.getUser()
  return user?.id ?? null
}

export function useRoutines() {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['routines'],
    queryFn: async (): Promise<Routine[]> => {
      const uid = await getUserId()
      if (!uid) return []

      const { data, error } = await supabase
        .from('routines')
        .select('*')
        .eq('user_id', uid)
        .order('category')
        .order('sort_order')

      if (error) throw error

      if (!data || data.length === 0) {
        const { data: seeded, error: seedErr } = await supabase
          .from('routines')
          .insert(SEED_ROUTINES.map(r => ({ ...r, user_id: uid })))
          .select()
        if (seedErr) throw seedErr
        return (seeded ?? []) as Routine[]
      }

      return data.map(r => ({ ...r, active_days: r.active_days ?? ALL_DAYS })) as Routine[]
    },
  })

  const createMutation = useMutation({
    mutationFn: async (routine: Omit<Routine, 'id'>) => {
      const uid = await getUserId()
      if (!uid) throw new Error('Not authenticated')
      const { error } = await supabase
        .from('routines')
        .insert({ ...routine, user_id: uid })
      if (error) throw error
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['routines'] }),
  })

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Routine> & { id: string }) => {
      const { error } = await supabase.from('routines').update(updates).eq('id', id)
      if (error) throw error
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['routines'] }),
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('routines').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['routines'] }),
  })

  return {
    routines: query.data ?? [],
    isLoading: query.isLoading,
    create: createMutation.mutate,
    update: updateMutation.mutate,
    remove: deleteMutation.mutate,
  }
}
