export type DonePillar = 'workout' | 'routine' | 'stretching' | 'meditation'

const KEY = 'carveout_pillar_done'

export function todayKey(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function read(): { date: string; pillars: Partial<Record<DonePillar, boolean>> } {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? '{}') as {
      date?: string
      pillars?: Partial<Record<DonePillar, boolean>>
    }
    if (raw.date !== todayKey()) return { date: todayKey(), pillars: {} }
    return { date: raw.date, pillars: raw.pillars ?? {} }
  } catch {
    return { date: todayKey(), pillars: {} }
  }
}

export function markPillarDone(pillar: DonePillar) {
  const current = read()
  current.pillars[pillar] = true
  localStorage.setItem(KEY, JSON.stringify(current))
}

export function localPillarDone(pillar: DonePillar): boolean {
  return read().pillars[pillar] === true
}
