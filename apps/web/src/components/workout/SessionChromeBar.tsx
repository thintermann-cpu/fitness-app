interface Props {
  onBackToConfig?: () => void
  onSkipExercise?: () => void
  isDe?: boolean
}

/** Subtle leave + skip row during an active exercise. Config left, skip right. */
export function SessionChromeBar({ onBackToConfig, onSkipExercise, isDe = true }: Props) {
  if (!onBackToConfig && !onSkipExercise) return null
  return (
    <div className="mt-4 flex w-full items-center justify-between gap-3">
      {onBackToConfig ? (
        <button
          type="button"
          onClick={onBackToConfig}
          className="min-w-0 max-w-[48%] truncate text-left text-[11px] font-medium"
          style={{ color: 'var(--color-text-muted)', background: 'none', border: 'none', padding: 0 }}
        >
          {isDe ? '← Zurück zur Config' : '← Back to config'}
        </button>
      ) : (
        <span className="min-w-0" />
      )}
      {onSkipExercise ? (
        <button
          type="button"
          onClick={onSkipExercise}
          className="shrink-0 rounded-xl px-3 py-1.5 text-xs font-semibold"
          style={{ backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text-muted)', border: 'none' }}
        >
          {isDe ? 'Übung überspringen' : 'Skip exercise'}
        </button>
      ) : (
        <span className="min-w-0" />
      )}
    </div>
  )
}
