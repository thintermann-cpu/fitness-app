import { useState, useEffect } from 'react'

interface KeyframeProps {
  exerciseId: string
  frames: string[]
  interval?: number
}

export function ExerciseKeyframes({ exerciseId, frames, interval = 2000 }: KeyframeProps) {
  const sequence = frames.join('\n')
  const [state, setState] = useState({ sequence, exerciseId, idx: 0 })
  if (state.sequence !== sequence || state.exerciseId !== exerciseId) {
    setState({ sequence, exerciseId, idx: 0 })
  }
  const activeIdx = state.sequence === sequence && state.exerciseId === exerciseId ? state.idx : 0

  useEffect(() => {
    const count = sequence === '' ? 0 : sequence.split('\n').length
    if (count <= 1) return
    const id = window.setInterval(() => {
      setState((prev) => (
        prev.sequence === sequence && prev.exerciseId === exerciseId
          ? { ...prev, idx: (prev.idx + 1) % count }
          : prev
      ))
    }, interval)
    return () => window.clearInterval(id)
  }, [sequence, exerciseId, interval])

  if (frames.length === 0) return null

  return (
    <div className="relative w-full h-full">
      {frames.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          draggable={false}
          className="absolute inset-0 w-full h-full object-contain"
          style={{
            opacity: i === activeIdx ? 1 : 0,
            transition: 'opacity 500ms ease',
          }}
        />
      ))}
    </div>
  )
}
