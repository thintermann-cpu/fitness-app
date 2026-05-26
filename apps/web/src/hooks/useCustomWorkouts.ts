import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import {
  type CustomWorkout,
  loadLocalWorkouts,
  saveLocalWorkout,
  deleteLocalWorkout,
} from '../lib/customWorkouts'

interface DbRow {
  id: string
  user_id: string
  name: string
  mode: string
  config: Record<string, number>
  exercises: CustomWorkout['exercises']
  with_warmup: boolean
  created_at: string
  updated_at: string
}

function dbToWorkout(row: DbRow): CustomWorkout {
  const cfg = row.config ?? {}
  return {
    id:                   row.id,
    name:                 row.name,
    mode:                 row.mode as CustomWorkout['mode'],
    minutes:              cfg.minutes ?? 0,
    exercises:            row.exercises ?? [],
    createdAt:            row.created_at,
    restBetweenSets:      cfg.restBetweenSets,
    restBetweenExercises: cfg.restBetweenExercises,
    tabataWork:           cfg.tabataWork,
    tabataRest:           cfg.tabataRest,
    tabataRounds:         cfg.tabataRounds,
    emomInterval:         cfg.emomInterval,
    emomRounds:           cfg.emomRounds,
  }
}

function workoutToDb(w: CustomWorkout, userId: string) {
  return {
    id:       w.id,
    user_id:  userId,
    name:     w.name,
    mode:     w.mode,
    config: {
      minutes:              w.minutes,
      restBetweenSets:      w.restBetweenSets,
      restBetweenExercises: w.restBetweenExercises,
      tabataWork:           w.tabataWork,
      tabataRest:           w.tabataRest,
      tabataRounds:         w.tabataRounds,
      emomInterval:         w.emomInterval,
      emomRounds:           w.emomRounds,
    },
    exercises:   w.exercises,
    with_warmup: false,
  }
}

async function getUserId(): Promise<string | null> {
  const { data: { session } } = await supabase.auth.getSession()
  return session?.user.id ?? null
}

export function useCustomWorkouts() {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['custom_workouts'],
    staleTime: 5 * 60 * 1000,
    queryFn: async (): Promise<CustomWorkout[]> => {
      if (!isSupabaseConfigured) return loadLocalWorkouts()
      const userId = await getUserId()
      if (!userId) return loadLocalWorkouts()

      const { data, error } = await supabase
        .from('custom_workouts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('[useCustomWorkouts] SELECT error:', error.message)
        return loadLocalWorkouts()
      }
      return (data as DbRow[]).map(dbToWorkout)
    },
  })

  const addWorkout = useMutation({
    mutationFn: async (w: CustomWorkout): Promise<CustomWorkout> => {
      if (!isSupabaseConfigured) {
        saveLocalWorkout(w)
        return w
      }
      const userId = await getUserId()
      if (!userId) {
        saveLocalWorkout(w)
        return w
      }
      const { data, error } = await supabase
        .from('custom_workouts')
        .insert(workoutToDb(w, userId))
        .select()
        .single()
      if (error) {
        console.error('[useCustomWorkouts] INSERT error:', error.message)
        saveLocalWorkout(w)
        return w
      }
      return dbToWorkout(data as DbRow)
    },
    onSuccess: (data) => {
      queryClient.setQueryData<CustomWorkout[]>(['custom_workouts'], (old) =>
        old ? [data, ...old.filter((x) => x.id !== data.id)] : [data],
      )
    },
  })

  const updateWorkout = useMutation({
    mutationFn: async (w: CustomWorkout): Promise<CustomWorkout> => {
      if (!isSupabaseConfigured) {
        saveLocalWorkout(w)
        return w
      }
      const userId = await getUserId()
      if (!userId) {
        saveLocalWorkout(w)
        return w
      }
      const { data, error } = await supabase
        .from('custom_workouts')
        .update({ ...workoutToDb(w, userId), updated_at: new Date().toISOString() })
        .eq('id', w.id)
        .select()
        .single()
      if (error) {
        console.error('[useCustomWorkouts] UPDATE error:', error.message)
        saveLocalWorkout(w)
        return w
      }
      return dbToWorkout(data as DbRow)
    },
    onSuccess: (data) => {
      queryClient.setQueryData<CustomWorkout[]>(['custom_workouts'], (old) =>
        old ? old.map((x) => (x.id === data.id ? data : x)) : [data],
      )
    },
  })

  const deleteWorkout = useMutation({
    mutationFn: async (id: string): Promise<string> => {
      if (!isSupabaseConfigured) {
        deleteLocalWorkout(id)
        return id
      }
      const userId = await getUserId()
      if (!userId) {
        deleteLocalWorkout(id)
        return id
      }
      const { error } = await supabase
        .from('custom_workouts')
        .delete()
        .eq('id', id)
      if (error) {
        console.error('[useCustomWorkouts] DELETE error:', error.message)
        deleteLocalWorkout(id)
      }
      return id
    },
    onSuccess: (id) => {
      queryClient.setQueryData<CustomWorkout[]>(['custom_workouts'], (old) =>
        old ? old.filter((x) => x.id !== id) : [],
      )
    },
  })

  return { ...query, addWorkout, updateWorkout, deleteWorkout }
}
