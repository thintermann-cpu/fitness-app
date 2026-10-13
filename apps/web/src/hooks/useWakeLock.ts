import { useEffect, useRef } from 'react'

type Sentinel = { release(): Promise<void> }
type WakeLockNav = Navigator & {
  wakeLock?: { request(type: 'screen'): Promise<Sentinel> }
}

/** Hält den Bildschirm an, solange `active` wahr ist. Pause gibt den Lock nicht frei. */
export function useWakeLock(active: boolean) {
  const sentinel = useRef<Sentinel | null>(null)

  useEffect(() => {
    const nav = navigator as WakeLockNav
    if (!nav.wakeLock) return

    let cancelled = false

    async function acquire() {
      if (!active || cancelled || document.visibilityState === 'hidden') return
      try {
        const next = await nav.wakeLock!.request('screen')
        if (cancelled || !active) {
          await next.release().catch(() => {})
          return
        }
        const previous = sentinel.current
        sentinel.current = next
        if (previous && previous !== next) previous.release().catch(() => {})
      } catch {
        // Gerät ohne Wake Lock oder ohne Fokus.
      }
    }

    function release() {
      sentinel.current?.release().catch(() => {})
      sentinel.current = null
    }

    if (active) void acquire()
    else release()

    function onVisible() {
      if (document.visibilityState === 'visible') void acquire()
    }
    document.addEventListener('visibilitychange', onVisible)

    return () => {
      cancelled = true
      document.removeEventListener('visibilitychange', onVisible)
      release()
    }
  }, [active])
}
