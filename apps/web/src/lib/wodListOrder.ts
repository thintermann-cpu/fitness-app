/** Profile gear must not enter the catalog query before the profile row exists. */
export function wodCatalogEnabled(
  signedIn: boolean,
  profileLoaded: boolean,
  userEquipment?: string[],
): boolean {
  if (signedIn && !profileLoaded) return false
  if (userEquipment?.length && !profileLoaded) return false
  return true
}

const SEED_KEY = 'wod_list_order_seed'

/** One order per browser tab. Load-more slices the same sequence. */
export function sessionListSeed(): number {
  try {
    const existing = sessionStorage.getItem(SEED_KEY)
    if (existing && /^\d+$/.test(existing)) return Number(existing)
    const seed = Math.floor(Math.random() * 0x7fffffff) + 1
    sessionStorage.setItem(SEED_KEY, String(seed))
    return seed
  } catch {
    return 1
  }
}

/** Deterministic Fisher-Yates. Same seed and list always yield the same order. */
export function shuffleWithSeed<T>(items: T[], seed: number): T[] {
  const arr = items.slice()
  let state = seed >>> 0 || 1
  for (let i = arr.length - 1; i > 0; i--) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0
    const j = state % (i + 1)
    const tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
  }
  return arr
}
