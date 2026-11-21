import { useEffect, useState } from 'react'

type OrientationLock = { lock: (orientation: string) => Promise<void>; unlock: () => Promise<void> }

function orientationApi(): OrientationLock | null {
  const api = (screen as Screen & { orientation?: OrientationLock }).orientation
  if (!api || typeof api.lock !== 'function') return null
  return api
}

/** Soft portrait preference while a session runs: try lock if the browser allows it, never force. */
export function usePreferPortrait(active: boolean): { isLandscape: boolean } {
  const [isLandscape, setIsLandscape] = useState(() => (
    typeof window !== 'undefined' && window.matchMedia('(orientation: landscape)').matches
  ))

  useEffect(() => {
    const mq = window.matchMedia('(orientation: landscape)')
    const sync = () => setIsLandscape(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (!active) return
    const api = orientationApi()
    if (!api) return
    try {
      // Browsers differ: lock may return a Promise or nothing; both are fine.
      void Promise.resolve(api.lock('portrait')).catch(() => {})
    } catch {
      // Soft path: ignore unsupported / permission errors.
    }
    return () => {
      try {
        void Promise.resolve(api.unlock()).catch(() => {})
      } catch {
        // ignore
      }
    }
  }, [active])

  return { isLandscape }
}
