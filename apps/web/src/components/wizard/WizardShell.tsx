import { useEffect } from 'react'

interface Props {
  isOpen: boolean
  onClose: () => void
  title: string
  stepCount: number
  currentStep: number
  onBack: () => void
  onNext: () => void
  nextLabel?: string
  canNext?: boolean
  children: React.ReactNode
}

export function WizardShell({
  isOpen,
  onClose,
  title,
  stepCount,
  currentStep,
  onBack,
  onNext,
  nextLabel = 'Weiter',
  canNext = true,
  children,
}: Props) {
  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 border-b flex-shrink-0"
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
      >
        <button
          onClick={currentStep === 0 ? onClose : onBack}
          aria-label={currentStep === 0 ? 'Schließen' : 'Zurück'}
          className="flex items-center justify-center text-xl leading-none flex-shrink-0"
          style={{ minWidth: 36, minHeight: 36, color: 'var(--color-text-muted)' }}
        >
          {currentStep === 0 ? '✕' : '←'}
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold truncate" style={{ color: 'var(--color-text)' }}>
            {title}
          </p>
          <div className="flex gap-1 mt-1.5">
            {Array.from({ length: stepCount }).map((_, i) => (
              <div
                key={i}
                className="h-0.5 flex-1 rounded-full transition-colors duration-300"
                style={{
                  backgroundColor: i <= currentStep ? '#E8642A' : 'rgba(255,255,255,0.12)',
                }}
              />
            ))}
          </div>
        </div>
        <span
          className="text-xs flex-shrink-0"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {currentStep + 1}/{stepCount}
        </span>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 py-5">
        {children}
      </div>

      {/* Footer */}
      <div
        className="px-4 py-4 border-t flex-shrink-0"
        style={{
          borderColor: 'rgba(255,255,255,0.08)',
          paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))',
        }}
      >
        <button
          onClick={onNext}
          disabled={!canNext}
          className="w-full py-3.5 rounded-xl font-semibold text-base transition-opacity active:scale-[0.98]"
          style={{
            backgroundColor: '#E8642A',
            color: 'white',
            opacity: canNext ? 1 : 0.4,
          }}
        >
          {nextLabel}
        </button>
      </div>
    </div>
  )
}
