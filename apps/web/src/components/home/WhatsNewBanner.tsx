import { useEffect, useState } from 'react'

interface WhatsNewData {
  version: string
  emoji: string
  title: string
  text: string
}

export function WhatsNewBanner() {
  const [data,      setData]      = useState<WhatsNewData | null>(null)
  const [dismissed, setDismissed] = useState(true)

  useEffect(() => {
    fetch('/whats-new.json')
      .then((r) => r.json())
      .then((d: WhatsNewData) => {
        const key = `carveout_whats_new_dismissed_v${d.version}`
        if (localStorage.getItem(key) !== 'true') {
          setData(d)
          setDismissed(false)
        }
      })
      .catch(() => {})
  }, [])

  if (dismissed || !data) return null

  const dismiss = () => {
    localStorage.setItem(`carveout_whats_new_dismissed_v${data.version}`, 'true')
    setDismissed(true)
  }

  return (
    <div
      className="flex items-start gap-3 px-3.5 py-3 rounded-xl"
      style={{ backgroundColor: 'rgba(74,144,217,0.12)', border: '1px solid rgba(74,144,217,0.25)' }}
    >
      <span className="text-xl flex-shrink-0 mt-0.5">{data.emoji}</span>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold" style={{ color: '#4A90D9' }}>{data.title}</p>
        <p className="text-xs mt-0.5 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{data.text}</p>
      </div>
      <button
        onClick={dismiss}
        className="text-lg leading-none flex-shrink-0 mt-0.5"
        style={{ color: 'var(--color-text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
        aria-label="Schliessen"
      >
        ×
      </button>
    </div>
  )
}
