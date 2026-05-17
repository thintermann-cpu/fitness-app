export type Pillar = 'workout' | 'routine' | 'stretching' | 'meditation'

export function getSuggestedPillar(goal?: string | null): Pillar {
  const hour = new Date().getHours()

  // Morning — always routine
  if (hour >= 5 && hour < 10) return 'routine'

  // Midday — workout default; goal shifts to stretching or meditation when relevant
  if (hour >= 10 && hour < 17) {
    if (goal === 'beweglichkeit') return 'stretching'
    if (goal === 'entspannen' && hour >= 14) return 'meditation'
    return 'workout'
  }

  // Evening — stretching default; workout goal pulls back to workout
  if (hour >= 17 && hour < 21) {
    if (goal === 'kraft' || goal === 'abnehmen') return 'workout'
    if (goal === 'entspannen') return 'meditation'
    return 'stretching'
  }

  // Night — meditation
  return 'meditation'
}
