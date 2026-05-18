export type Pillar = 'workout' | 'routine' | 'stretching' | 'meditation'

// Returns the suggested pillar for the current time + goal, skipping already-completed ones.
// Returns null if all pillars are done.
export function getSuggestedPillar(
  goal?: string | null,
  completedPillars: string[] = [],
): Pillar | null {
  const hour = new Date().getHours()

  let order: Pillar[]

  if (hour >= 5 && hour < 10) {
    order = ['routine', 'workout', 'stretching', 'meditation']
  } else if (hour >= 10 && hour < 17) {
    if (goal === 'beweglichkeit') order = ['stretching', 'workout', 'routine', 'meditation']
    else if (goal === 'entspannen' && hour >= 14) order = ['meditation', 'workout', 'stretching', 'routine']
    else order = ['workout', 'routine', 'stretching', 'meditation']
  } else if (hour >= 17 && hour < 21) {
    if (goal === 'kraft' || goal === 'abnehmen') order = ['workout', 'stretching', 'meditation', 'routine']
    else if (goal === 'entspannen') order = ['meditation', 'stretching', 'workout', 'routine']
    else order = ['stretching', 'meditation', 'workout', 'routine']
  } else {
    order = ['meditation', 'stretching', 'routine', 'workout']
  }

  return order.find((p) => !completedPillars.includes(p)) ?? null
}
