import { useEffect, useState } from 'react'

interface Props {
  visible: boolean
  isDe?: boolean
}

/** Soft nudge when a session runs in landscape. Dismissible for the current session. */
export function PortraitHint({ visible, isDe = true }: Props) {
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (!visible) setDismissed(false)
  }, [visible])

  if (!visible || dismissed) return null

  return (
    <div
      role="status"
      className="flex items-center gap-2 px-3 py-2 text-xs font-medium"
      style={{
        backgroundColor: 'var(--color-bg-card)',
        color: 'var(--color-text-muted)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <span className="flex-1 min-w-0">
        {isDe ? 'Besser hochkant — so bleibt die Uhr gut lesbar.' : 'Portrait works better — the timer stays readable.'}
      </span>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="shrink-0 px-2 py-1 rounded-lg text-[11px] font-semibold"
        style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: 'var(--color-text-muted)', border: 'none' }}
        aria-label={isDe ? 'Hinweis schließen' : 'Dismiss hint'}
      >
        {isDe ? 'OK' : 'OK'}
      </button>
    </div>
  )
}
