import { useEffect, useRef, useState } from 'react'

interface Props {
  isOpen: boolean
  onComplete: () => void
  durationSec?: number
}

export function WorkoutCountdown({ isOpen, onComplete, durationSec = 10 }: Props) {
  const [remaining, setRemaining] = useState(durationSec)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    if (isOpen) setRemaining(durationSec)
  }, [isOpen, durationSec])

  useEffect(() => {
    if (!isOpen) return
    if (remaining <= 0) {
      onCompleteRef.current()
      return
    }
    const id = window.setInterval(() => {
      setRemaining((r) => Math.max(0, r - 1))
    }, 1000)
    return () => clearInterval(id)
  }, [isOpen, remaining])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.92)' }}
    >
      <p className="text-sm font-semibold mb-6 tracking-widest uppercase" style={{ color: 'var(--color-text-muted)' }}>
        Mach dich bereit…
      </p>
      <p
        className="font-black leading-none"
        style={{ fontSize: 'clamp(100px, 32vw, 144px)', color: '#10B981' }}
      >
        {remaining}
      </p>
      <button
        onClick={() => onCompleteRef.current()}
        className="mt-10 px-8 py-3.5 rounded-xl font-semibold text-sm active:scale-[0.98] transition-transform"
        style={{ backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text-muted)' }}
      >
        ▶ Überspringen
      </button>
    </div>
  )
}
