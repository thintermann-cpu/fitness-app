import type { ReactNode } from 'react'

interface Props {
  isOpen: boolean
  onClose: () => void
  onApply: () => void
  onReset: () => void
  pillarColor: string
  activeCount: number
  applyLabel?: string
  resetLabel?: string
  children: ReactNode
}

export function FilterBottomSheet({
  isOpen,
  onClose,
  onApply,
  onReset,
  pillarColor,
  activeCount,
  applyLabel = 'Anwenden',
  resetLabel = 'Zurücksetzen',
  children,
}: Props) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.65)',
          zIndex: 200,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.25s ease',
        }}
      />

      {/* Sheet */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: `translateX(-50%) translateY(${isOpen ? '0' : '100%'})`,
          transition: 'transform 0.3s ease',
          width: '100%',
          maxWidth: 480,
          background: '#16161f',
          borderRadius: '20px 20px 0 0',
          zIndex: 201,
          fontFamily: 'var(--font-sans)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
      >
        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 6px' }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.12)' }} />
        </div>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 16px 12px' }}>
          <span style={{ fontSize: 16, fontWeight: 600, color: '#f0e8d8' }}>
            Filter{activeCount > 0 ? ` · ${activeCount}` : ''}
          </span>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none',
              color: 'rgba(255,255,255,0.4)', fontSize: 22,
              cursor: 'pointer', padding: '4px 8px',
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '0 16px', maxHeight: '55vh', overflowY: 'auto' }}>
          {children}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', gap: 10, padding: '16px 16px 24px' }}>
          <button
            onClick={onReset}
            style={{
              flex: 1,
              padding: '11px 0',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 12,
              color: 'rgba(255,255,255,0.5)',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
            }}
          >
            {resetLabel}
          </button>
          <button
            onClick={onApply}
            style={{
              flex: 2,
              padding: '11px 0',
              background: pillarColor,
              border: 'none',
              borderRadius: 12,
              color: 'white',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
            }}
          >
            {applyLabel}
          </button>
        </div>
      </div>
    </>
  )
}
