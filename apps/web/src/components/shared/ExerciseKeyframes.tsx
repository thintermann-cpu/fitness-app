import { useState, useEffect } from 'react'

interface KeyframeProps {
  exerciseId: string
  frames: string[]
  interval?: number
}

export function ExerciseKeyframes({ frames, interval = 2000 }: KeyframeProps) {
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    if (frames.length <= 1) return
    const id = setInterval(() => setActiveIdx((i) => (i + 1) % frames.length), interval)
    return () => clearInterval(id)
  }, [frames, interval])

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
