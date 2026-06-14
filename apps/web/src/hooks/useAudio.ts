import { useRef, useCallback, useMemo } from 'react'
import { useAudioStore } from '../store/audioStore'

export type SoundKey = 'rain' | 'forest' | 'waves' | 'white_noise' | 'bowl' | 'fire' | 'night' | 'silence'

const AMBIENT_FILE: Partial<Record<SoundKey, string>> = {
  bowl:        '/audio/ambient/bowl.mp3',
  rain:        '/audio/ambient/rain.mp3',
  forest:      '/audio/ambient/forest.mp3',
  waves:       '/audio/ambient/waves.mp3',
  white_noise: '/audio/ambient/whitenoise.mp3',
  fire:        '/audio/ambient/fire.mp3',
  night:       '/audio/ambient/night.mp3',
}

export function useAudio() {
  const isMuted    = useAudioStore((s) => s.isMuted)
  const ctxRef     = useRef<AudioContext | null>(null)
  const bgAudioRef = useRef<HTMLAudioElement | null>(null)

  const getCtxReady = useCallback(async (): Promise<AudioContext> => {
    if (!ctxRef.current || ctxRef.current.state === 'closed') {
      ctxRef.current = new AudioContext()
    }
    if (ctxRef.current.state === 'suspended') {
      await ctxRef.current.resume()
    }
    return ctxRef.current
  }, [])

  const playGong = useCallback(async () => {
    if (isMuted) return
    try {
      const ctx = await getCtxReady()
      const osc = ctx.createOscillator()
      const g   = ctx.createGain()
      osc.connect(g)
      g.connect(ctx.destination)
      osc.type = 'sine'
      osc.frequency.setValueAtTime(432, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 3.2)
      g.gain.setValueAtTime(0.7, ctx.currentTime)
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 4.5)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 4.5)
    } catch {}
  }, [getCtxReady, isMuted])

  const playBeep = useCallback(async () => {
    if (isMuted) return
    try {
      const ctx = await getCtxReady()
      const osc = ctx.createOscillator()
      const g   = ctx.createGain()
      osc.connect(g)
      g.connect(ctx.destination)
      osc.type = 'sine'
      osc.frequency.value = 660
      g.gain.setValueAtTime(0.7, ctx.currentTime)
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.3)
    } catch {}
  }, [getCtxReady, isMuted])

  const playComplete = useCallback(async () => {
    if (isMuted) return
    try {
      const ctx   = await getCtxReady()
      const notes = [880, 698, 523]
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator()
        const g   = ctx.createGain()
        osc.connect(g)
        g.connect(ctx.destination)
        osc.type = 'sine'
        osc.frequency.value = freq
        const t = ctx.currentTime + i * 0.45
        g.gain.setValueAtTime(0, t)
        g.gain.linearRampToValueAtTime(0.4, t + 0.02)
        g.gain.exponentialRampToValueAtTime(0.001, t + 1.2)
        osc.start(t)
        osc.stop(t + 1.2)
      })
    } catch {}
  }, [getCtxReady, isMuted])

  const stopBackground = useCallback(() => {
    if (bgAudioRef.current) {
      bgAudioRef.current.pause()
      bgAudioRef.current.currentTime = 0
      bgAudioRef.current = null
    }
  }, [])

  const startBackground = useCallback((sound: SoundKey) => {
    stopBackground()
    if (isMuted || sound === 'silence') return

    const src = AMBIENT_FILE[sound]
    if (!src) return

    const audio = new Audio(src)
    audio.loop = true
    audio.volume = 0.5
    bgAudioRef.current = audio
    audio.play().catch(() => {})
  }, [isMuted, stopBackground])

  const cleanup = useCallback(() => {
    stopBackground()
    if (ctxRef.current && ctxRef.current.state !== 'closed') {
      void ctxRef.current.close()
      ctxRef.current = null
    }
  }, [stopBackground])

  return useMemo(
    () => ({ playGong, playBeep, playComplete, startBackground, stopBackground, cleanup, isMuted }),
    [playGong, playBeep, playComplete, startBackground, stopBackground, cleanup, isMuted],
  )
}
