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
const MON_WED_FRI = [1, 3, 5]

export const SUGGESTED_ROUTINES: Record<string, Array<Omit<Routine, 'id'>>> = {
  de: [
    { category: 'morning', name: 'Morgenroutine',        icon: '🌅', time: '07:00', link_url: null, active_days: WEEKDAYS,    sort_order: 0 },
    { category: 'day',     name: 'Post-Workout Stretch',  icon: '💪', time: '12:00', link_url: null, active_days: MON_WED_FRI, sort_order: 0 },
    { category: 'evening', name: 'Abend-Reflexion',       icon: '📖', time: '21:00', link_url: null, active_days: ALL_DAYS,    sort_order: 0 },
    { category: 'day',     name: 'Wasser trinken',        icon: '💧', time: '12:00', link_url: null, active_days: ALL_DAYS,    sort_order: 1 },
  ],
  en: [
    { category: 'morning', name: 'Morning Routine',       icon: '🌅', time: '07:00', link_url: null, active_days: WEEKDAYS,    sort_order: 0 },
    { category: 'day',     name: 'Post-Workout Stretch',  icon: '💪', time: '12:00', link_url: null, active_days: MON_WED_FRI, sort_order: 0 },
    { category: 'evening', name: 'Evening Reflection',    icon: '📖', time: '21:00', link_url: null, active_days: ALL_DAYS,    sort_order: 0 },
    { category: 'day',     name: 'Drink Water',           icon: '💧', time: '12:00', link_url: null, active_days: ALL_DAYS,    sort_order: 1 },
  ],
  es: [
    { category: 'morning', name: 'Rutina Matutina',                    icon: '🌅', time: '07:00', link_url: null, active_days: WEEKDAYS,    sort_order: 0 },
    { category: 'day',     name: 'Estiramiento Post-Entrenamiento',    icon: '💪', time: '12:00', link_url: null, active_days: MON_WED_FRI, sort_order: 0 },
    { category: 'evening', name: 'Reflexión Vespertina',               icon: '📖', time: '21:00', link_url: null, active_days: ALL_DAYS,    sort_order: 0 },
    { category: 'day',     name: 'Beber Agua',                         icon: '💧', time: '12:00', link_url: null, active_days: ALL_DAYS,    sort_order: 1 },
  ],
}

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

      return (data ?? []).map(r => ({ ...r, active_days: r.active_days ?? ALL_DAYS })) as Routine[]
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
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
