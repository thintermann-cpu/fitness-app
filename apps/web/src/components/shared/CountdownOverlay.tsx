import { useState, useEffect } from 'react'

interface Props {
  isOpen: boolean
  onComplete: () => void
}

export function CountdownOverlay({ isOpen, onComplete }: Props) {
  const [count, setCount] = useState(5)

  useEffect(() => {
    if (!isOpen) {
      setCount(5)
      return
    }
    setCount(5)
    let n = 5
    const id = setInterval(() => {
      n -= 1
      setCount(n)
      if (n <= 0) {
        clearInterval(id)
        setTimeout(onComplete, 600)
      }
    }, 1000)
    return () => clearInterval(id)
  // onComplete ref is stable — intentionally omit from deps to avoid restart on re-render
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.88)' }}
    >
      <p
        className="font-black leading-none tabular-nums select-none"
        style={{
          fontSize: 'clamp(120px, 35vw, 180px)',
          color: count <= 2 ? '#E8642A' : 'white',
          transition: 'color 0.2s',
        }}
      >
        {count > 0 ? count : 'Los!'}
      </p>
      {count > 0 && (
        <p className="text-white/40 text-base font-semibold mt-6 tracking-widest uppercase select-none">
          Bereit machen…
        </p>
      )}
    </div>
  )
}
