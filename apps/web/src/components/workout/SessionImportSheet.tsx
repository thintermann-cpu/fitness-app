import { useState } from 'react'
import { blockLabel, blockSummary, type WorkoutBlock } from '../../lib/workoutBlocks'
import { parseSessionImport, type SessionImport } from '../../lib/sessionImport'

interface Props {
  isOpen: boolean
  onClose: () => void
  onStart: (blocks: WorkoutBlock[], name: string, save: boolean) => void
}

export function SessionImportSheet({ isOpen, onClose, onStart }: Props) {
  const [text, setText] = useState('')
  const [parsed, setParsed] = useState<SessionImport | null>(null)
  const [save, setSave] = useState(false)

  if (!isOpen) return null

  function apply(source: string) {
    setText(source)
    setParsed(source.trim() ? parseSessionImport(source) : null)
  }

  function onFile(file: File | undefined) {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => apply(typeof reader.result === 'string' ? reader.result : '')
    reader.readAsText(file)
  }

  const ready = !!parsed && parsed.errors.length === 0 && parsed.blocks.length > 0

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="flex items-center justify-between px-4 py-3">
        <p className="text-lg font-black" style={{ color: 'var(--color-text)' }}>Session einfügen</p>
        <button type="button" onClick={onClose} aria-label="Schliessen" className="w-8 h-8 rounded-full text-sm" style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'var(--color-text-muted)' }}>✕</button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-3">
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          JSON aus dem Chatbot einfügen oder als Datei laden. Freie Übungsnamen sind erlaubt. Ohne Katalogtreffer gibt es keine Abbildung und keinen hinterlegten Kurztext. Der Hinweis aus dem JSON bleibt.
        </p>
        <textarea
          value={text}
          onChange={(event) => apply(event.target.value)}
          placeholder='{"name":"…","parts":[…]}'
          aria-label="Session JSON"
          className="w-full h-40 rounded-xl px-3 py-2 text-xs font-mono outline-none"
          style={{ backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text)', border: '1px solid rgba(255,255,255,0.08)' }}
        />
        <label className="block text-sm font-semibold" style={{ color: 'var(--color-pillar-workout)' }}>
          Datei laden
          <input
            type="file"
            accept="application/json,.json,text/plain"
            className="block mt-1 text-xs font-normal"
            style={{ color: 'var(--color-text-muted)' }}
            onChange={(event) => onFile(event.target.files?.[0])}
          />
        </label>

        {parsed && parsed.errors.map((error) => (
          <p key={error} className="text-sm" style={{ color: '#ef4444' }}>{error}</p>
        ))}
        {parsed && parsed.warnings.map((warning) => (
          <p key={`${warning.part}-${warning.exercise}-${warning.message}`} className="text-xs" style={{ color: '#F59E0B' }}>
            Teil {warning.part} · {warning.exercise}: {warning.message}
          </p>
        ))}
        {parsed && ready && (
          <div className="space-y-2">
            <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>{parsed.name}</p>
            {parsed.blocks.map((block, index) => (
              <div key={block.id} className="rounded-xl px-3 py-2" style={{ backgroundColor: 'var(--color-bg-card)' }}>
                <p className="text-xs font-bold" style={{ color: block.kind === 'pause' ? '#60A5FA' : 'var(--color-text)' }}>
                  {index + 1}. {blockLabel(block)}
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{blockSummary(block)}</p>
              </div>
            ))}
          </div>
        )}

        <label className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text)' }}>
          <input type="checkbox" checked={save} onChange={(event) => setSave(event.target.checked)} />
          Auch sichern
        </label>
        <button
          type="button"
          disabled={!ready}
          onClick={() => {
            if (!parsed || !ready) return
            onStart(parsed.blocks, parsed.name, save)
            setText('')
            setParsed(null)
            setSave(false)
          }}
          className="w-full py-3.5 rounded-2xl font-bold text-base text-white"
          style={{ backgroundColor: '#E8642A', opacity: ready ? 1 : 0.4 }}
        >
          Starten
        </button>
      </div>
    </div>
  )
}
