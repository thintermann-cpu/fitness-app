import { useEffect, useState } from 'react'
import type { Toast as ToastData } from '../../store/toastStore'

const CONFIG = {
  success: { bg: 'rgba(20,83,45,0.97)',  border: '#22c55e', icon: '✓', color: '#4ade80' },
  error:   { bg: 'rgba(127,29,29,0.97)', border: '#ef4444', icon: '✕', color: '#f87171' },
  info:    { bg: 'rgba(30,58,138,0.97)', border: '#60a5fa', icon: 'ℹ', color: '#93c5fd' },
  warning: { bg: 'rgba(120,53,15,0.97)', border: '#f59e0b', icon: '⚠', color: '#fbbf24' },
}

interface Props {
  toast: ToastData
  onDismiss: () => void
}

export function Toast({ toast, onDismiss }: Props) {
  const [visible,  setVisible]  = useState(false)
  const [leaving,  setLeaving]  = useState(false)

  const cfg = CONFIG[toast.type]

  useEffect(() => {
    const enterTimer = setTimeout(() => setVisible(true), 16)

    let exitTimer: ReturnType<typeof setTimeout>
    const autoTimer = setTimeout(() => {
      setLeaving(true)
      exitTimer = setTimeout(onDismiss, 200)
    }, toast.duration)

    return () => {
      clearTimeout(enterTimer)
      clearTimeout(autoTimer)
      clearTimeout(exitTimer)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast.id, toast.duration])

  const handleDismiss = () => {
    if (leaving) return
    setLeaving(true)
    setTimeout(onDismiss, 200)
  }

  const shown = visible && !leaving

  return (
    <div
      role="alert"
      onClick={handleDismiss}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        width: '100%',
        padding: '10px 14px',
        borderRadius: 12,
        border: `1px solid ${cfg.border}`,
        backgroundColor: cfg.bg,
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        cursor: 'pointer',
        userSelect: 'none',
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : 'translateY(-14px)',
        transition: 'opacity 0.2s ease, transform 0.2s ease',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Icon */}
      <span style={{ color: cfg.color, fontSize: 15, fontWeight: 'bold', flexShrink: 0, lineHeight: 1 }}>
        {cfg.icon}
      </span>

      {/* Message */}
      <span style={{ color: 'rgba(255,255,255,0.92)', fontSize: 13, lineHeight: 1.4, flex: 1 }}>
        {toast.message}
      </span>

      {/* Close */}
      <button
        onClick={(e) => { e.stopPropagation(); handleDismiss() }}
        aria-label="Schließen"
        style={{
          background: 'none',
          border: 'none',
          color: 'rgba(255,255,255,0.35)',
          cursor: 'pointer',
          fontSize: 16,
          padding: '0 2px',
          flexShrink: 0,
          lineHeight: 1,
        }}
      >
        ×
      </button>
    </div>
  )
}
