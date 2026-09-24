import { supabase } from './supabase'
import { todayKey } from './pillarDone'

/** Hakt heutige Routinen ab, deren linked_pillar zur erledigten Säule passt. */
export async function completeLinkedRoutines(pillar: string) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return
  const today = todayKey()
  const weekday = new Date().getDay()
  const { data, error } = await supabase
    .from('routines')
    .select('id, active_days')
    .eq('user_id', user.id)
    .eq('linked_pillar', pillar)
  if (error || !data?.length) return
  const rows = data
    .filter((routine) => {
      const days = (routine.active_days as number[] | null) ?? [0, 1, 2, 3, 4, 5, 6]
      return days.includes(weekday)
    })
    .map((routine) => ({
      user_id: user.id,
      routine_id: routine.id as string,
      date: today,
      completed: true,
    }))
  if (!rows.length) return
  await supabase.from('routine_logs').upsert(rows, { onConflict: 'user_id,routine_id,date' })
}
