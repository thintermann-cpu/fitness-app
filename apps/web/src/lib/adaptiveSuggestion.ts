export type Pillar = 'workout' | 'routine' | 'stretching' | 'meditation'

export function getSuggestedPillar(): Pillar {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 10) return 'routine'
  if (hour >= 10 && hour < 17) return 'workout'
  if (hour >= 17 && hour < 21) return 'stretching'
  return 'meditation'
}
