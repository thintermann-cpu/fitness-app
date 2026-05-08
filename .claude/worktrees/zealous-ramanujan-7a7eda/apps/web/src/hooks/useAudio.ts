import { useRef, useCallback } from 'react'

export type SoundKey = 'rain' | 'forest' | 'waves' | 'white_noise' | 'bowl' | 'silence'

export function useAudio() {
  const ctxRef    = useRef<AudioContext | null>(null)
  const stopBgRef = useRef<(() => void) | null>(null)

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
  }, [getCtxReady])

  const playBeep = useCallback(async () => {
    try {
      const ctx = await getCtxReady()
      const osc = ctx.createOscillator()
      const g   = ctx.createGain()
      osc.connect(g)
      g.connect(ctx.destination)
      osc.type = 'sine'
      osc.frequency.value = 660
      g.gain.setValueAtTime(0.25, ctx.currentTime)
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.3)
    } catch {}
  }, [getCtxReady])

  const playComplete = useCallback(async () => {
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
  }, [getCtxReady])

  const stopBackground = useCallback(() => {
    if (stopBgRef.current) {
      try { stopBgRef.current() } catch {}
      stopBgRef.current = null
    }
  }, [])

  const startBackground = useCallback(async (sound: SoundKey) => {
    if (stopBgRef.current) {
      try { stopBgRef.current() } catch {}
      stopBgRef.current = null
    }
    if (!sound || sound === 'silence') return

    try {
      const ctx = await getCtxReady()

      if (sound === 'bowl') {
        const osc = ctx.createOscillator()
        const g   = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.value = 432
        g.gain.value = 0.04
        osc.connect(g)
        g.connect(ctx.destination)
        osc.start()
        stopBgRef.current = () => {
          try {
            g.gain.linearRampToValueAtTime(0, ctx.currentTime + 1)
            osc.stop(ctx.currentTime + 1)
          } catch {}
        }
        return
      }

      const sr         = ctx.sampleRate
      const seconds    = 15
      const bufferSize = sr * seconds
      const buffer     = ctx.createBuffer(1, bufferSize, sr)
      const data       = buffer.getChannelData(0)

      if (sound === 'white_noise') {
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1
      } else if (sound === 'rain' || sound === 'forest') {
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0
        for (let i = 0; i < bufferSize; i++) {
          const w = Math.random() * 2 - 1
          b0 = 0.99886 * b0 + w * 0.0555179
          b1 = 0.99332 * b1 + w * 0.0750759
          b2 = 0.96900 * b2 + w * 0.1538520
          b3 = 0.86650 * b3 + w * 0.3104856
          b4 = 0.55000 * b4 + w * 0.5329522
          b5 = -0.7616 * b5 - w * 0.0168980
          data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11
          b6 = w * 0.115926
        }
      } else if (sound === 'waves') {
        for (let i = 0; i < bufferSize; i++) {
          const wave = Math.sin(2 * Math.PI * 0.08 * i / sr)
          data[i]    = (Math.random() * 2 - 1) * (0.4 + 0.6 * Math.max(0, wave)) * 0.25
        }
      }

      const source = ctx.createBufferSource()
      source.buffer = buffer
      source.loop   = true

      const g = ctx.createGain()
      g.gain.value = sound === 'white_noise' ? 0.12 : 0.18

      source.connect(g)
      g.connect(ctx.destination)
      source.start()

      stopBgRef.current = () => {
        try {
          g.gain.linearRampToValueAtTime(0, ctx.currentTime + 1)
          source.stop(ctx.currentTime + 1)
        } catch {}
      }
    } catch {}
  }, [getCtxReady])

  const cleanup = useCallback(() => {
    if (stopBgRef.current) {
      try { stopBgRef.current() } catch {}
      stopBgRef.current = null
    }
    if (ctxRef.current && ctxRef.current.state !== 'closed') {
      void ctxRef.current.close()
      ctxRef.current = null
    }
  }, [])

  return { playGong, playBeep, playComplete, startBackground, stopBackground, cleanup }
}
