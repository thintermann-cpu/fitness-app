import { useState } from 'react'
import { copyText, downloadText, slugFilename } from '../../lib/sessionExport'

interface Props {
  isOpen: boolean
  title: string
  json: string
  filename?: string
  accent?: string
  onClose: () => void
}

export function JsonExportSheet({
  isOpen,
  title,
  json,
  filename,
  accent = '#E8642A',
  onClose,
}: Props) {
  const [copied, setCopied] = useState(false)
  if (!isOpen) return null

  async function handleCopy() {
    const ok = await copyText(json)
    if (!ok) return
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  function handleDownload() {
    downloadText(filename || slugFilename(title), json)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <button
        type="button"
        className="absolute inset-0 bg-black/60"
        aria-label="Schliessen"
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-lg max-h-[85vh] flex flex-col rounded-t-2xl sm:rounded-2xl p-4 gap-3"
        style={{ backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text)' }}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
              Session-JSON
            </p>
            <h2 className="text-base font-bold truncate">{title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-sm"
            style={{ backgroundColor: 'var(--color-bg-elevated)', color: 'var(--color-text-muted)' }}
            aria-label="Schliessen"
          >
            ✕
          </button>
        </div>
        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          Gleiches Format wie „Session einfügen“. Kopieren oder als Datei speichern.
        </p>
        <textarea
          readOnly
          value={json}
          className="w-full flex-1 min-h-[220px] rounded-xl px-3 py-2.5 text-xs font-mono outline-none resize-none"
          style={{
            backgroundColor: 'var(--color-bg)',
            color: 'var(--color-text)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => void handleCopy()}
            className="flex-1 py-3 rounded-xl text-sm font-bold text-white"
            style={{ backgroundColor: accent }}
          >
            {copied ? 'Kopiert' : 'Kopieren'}
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="flex-1 py-3 rounded-xl text-sm font-semibold"
            style={{ backgroundColor: 'var(--color-bg-elevated)', color: 'var(--color-text)' }}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  )
}
