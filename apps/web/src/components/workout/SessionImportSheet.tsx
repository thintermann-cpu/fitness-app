import { useState } from 'react'
import type { WorkoutBlock } from '../../lib/workoutBlocks'
import { parseSessionImport, type SessionImport } from '../../lib/sessionImport'
import { ImportSessionEditor, sessionDraftReady } from './ImportSessionEditor'

interface Props {
  isOpen: boolean
  onClose: () => void
  onStart: (blocks: WorkoutBlock[], name: string, save: boolean) => void
}

const EXAMPLE = `{
  "name": "Kurzes Beispiel",
  "parts": [
    {
      "kind": "warmup",
      "exercises": [
        { "name": "Air Squats", "seconds": 40, "note": "Tief, Brust hoch" }
      ]
    },
    {
      "kind": "amrap",
      "minutes": 8,
      "exercises": [
        { "name": "Burpees", "detail": "8" },
        { "name": "Air Squats", "detail": "12" }
      ]
    },
    {
      "kind": "breath",
      "name": "Box Breathing",
      "inhaleSec": 4,
      "holdInSec": 4,
      "exhaleSec": 4,
      "holdOutSec": 4,
      "cycles": 4
    },
    {
      "kind": "meditation",
      "name": "Sitzmeditation",
      "minutes": 5,
      "sound": "rain",
      "note": "Nur sitzen"
    }
  ]
}`

export function SessionImportSheet({ isOpen, onClose, onStart }: Props) {
  const [text, setText] = useState('')
  const [parsed, setParsed] = useState<SessionImport | null>(null)
  const [draftName, setDraftName] = useState('')
  const [draftBlocks, setDraftBlocks] = useState<WorkoutBlock[]>([])
  const [save, setSave] = useState(false)

  if (!isOpen) return null

  function apply(source: string) {
    setText(source)
    const next = source.trim() ? parseSessionImport(source) : null
    setParsed(next)
    if (next && next.errors.length === 0 && next.blocks.length > 0) {
      setDraftName(next.name)
      setDraftBlocks(next.blocks)
      return
    }
    setDraftName('')
    setDraftBlocks([])
  }

  function onFile(file: File | undefined) {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => apply(typeof reader.result === 'string' ? reader.result : '')
    reader.readAsText(file)
  }

  const ready = draftBlocks.length > 0 && sessionDraftReady(draftBlocks) && !!draftName.trim()
  const showEditor = ready && parsed != null && parsed.errors.length === 0

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="flex items-center justify-between px-4 py-3">
        <p className="text-lg font-black" style={{ color: 'var(--color-text)' }}>Session einfügen</p>
        <button type="button" onClick={onClose} aria-label="Schliessen" className="w-8 h-8 rounded-full text-sm" style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'var(--color-text-muted)' }}>✕</button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-3">
        {!showEditor && (
          <div className="rounded-2xl p-4 space-y-3" style={{ backgroundColor: 'var(--color-bg-card)' }}>
            <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
              Der Plan, den du sowieso schreibst.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              Warm-up, Kraft, Metcon, Mobilität, Atem und Sitzmeditation stehen schon im Chat oder auf dem Zettel. Das JSON ist nur die Übergabe: die App läuft die Teile der Reihe nach, mit Pause, Hinweis und dem Haken für Mobilität und Achtsamkeit. Einmal sichern, und der nächste Start geht direkt los.
            </p>
            <ol className="text-sm space-y-1" style={{ color: 'var(--color-text)' }}>
              <li>1. Plan im Chat erzeugen lassen, oder die Datei nehmen, die du schon hast.</li>
              <li>2. Hier einfügen. Namen dürfen frei sein.</li>
              <li>3. In der Übersicht prüfen, anpassen, starten.</li>
            </ol>
            <a href="/session-import" className="inline-block text-sm font-semibold" style={{ color: 'var(--color-pillar-workout)' }}>
              Vorteil und Format
            </a>
          </div>
        )}

        {showEditor ? (
          <details className="rounded-xl px-3 py-2" style={{ backgroundColor: 'var(--color-bg-card)' }}>
            <summary className="text-sm font-semibold cursor-pointer" style={{ color: 'var(--color-text-muted)' }}>
              JSON anpassen
            </summary>
            <p className="text-xs mt-2" style={{ color: 'var(--color-text-muted)' }}>
              Ein neues JSON ersetzt die Änderungen in der Übersicht.
            </p>
            <JsonInput text={text} onApply={apply} onFile={onFile} />
          </details>
        ) : (
          <JsonInput text={text} onApply={apply} onFile={onFile} />
        )}

        {!showEditor && (
          <button
            type="button"
            onClick={() => apply(EXAMPLE)}
            className="text-sm font-semibold"
            style={{ color: 'var(--color-pillar-workout)' }}
          >
            Beispiel ansehen
          </button>
        )}

        {parsed && parsed.errors.map((error) => (
          <p key={error} className="text-sm" style={{ color: '#ef4444' }}>{error}</p>
        ))}
        {parsed && parsed.warnings.map((warning) => (
          <p key={`${warning.part}-${warning.exercise}-${warning.message}`} className="text-xs" style={{ color: '#F59E0B' }}>
            Teil {warning.part} · {warning.exercise}: {warning.message}
          </p>
        ))}

        {showEditor && (
          <ImportSessionEditor
            name={draftName}
            blocks={draftBlocks}
            onName={setDraftName}
            onBlocks={setDraftBlocks}
          />
        )}

        <label className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text)' }}>
          <input type="checkbox" checked={save} onChange={(event) => setSave(event.target.checked)} />
          Auch sichern. Der nächste Start überspringt den Wizard.
        </label>
        <button
          type="button"
          disabled={!ready}
          onClick={() => {
            if (!ready) return
            onStart(draftBlocks, draftName.trim(), save)
            setText('')
            setParsed(null)
            setDraftName('')
            setDraftBlocks([])
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

function JsonInput({ text, onApply, onFile }: { text: string; onApply: (source: string) => void; onFile: (file: File | undefined) => void }) {
  return (
    <div className="space-y-2">
      <textarea
        value={text}
        onChange={(event) => onApply(event.target.value)}
        placeholder='{"name":"…","parts":[…]}'
        aria-label="Session JSON"
        className="w-full h-32 rounded-xl px-3 py-2 text-xs font-mono outline-none"
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
    </div>
  )
}
