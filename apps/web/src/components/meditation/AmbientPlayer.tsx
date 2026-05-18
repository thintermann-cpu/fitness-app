import { useState, useRef, useEffect } from 'react'

const AMBIENT_SOUNDS = [
  { id: 'rain',       label: 'Regen'           },
  { id: 'waves',      label: 'Wellen'          },
  { id: 'forest',     label: 'Wald'            },
  { id: 'fire',       label: 'Feuer'           },
  { id: 'night',      label: 'Nacht'           },
  { id: 'wind',       label: 'Wind'            },
  { id: 'whitenoise', label: 'Weisses Rauschen'},
  { id: 'harp',       label: 'Harfe'           },
  { id: 'zen_guitar', label: 'Zen Gitarre'     },
  { id: 'deep_om',    label: 'Deep Om'         },
] as const

type SoundId = typeof AMBIENT_SOUNDS[number]['id']

const STORAGE_SOUND = 'meditation_ambient_sound'
const PILLAR_COLOR  = '#9B7FD4'

function filePath(id: SoundId) { return `/audio/ambient/${id}.mp3` }

export function AmbientPlayer() {
  const [selected,    setSelected]    = useState<SoundId | null>(
    () => (localStorage.getItem(STORAGE_SOUND) as SoundId | null),
  )
  const [playing,     setPlaying]     = useState(false)
  const [volume,      setVolume]      = useState(50)
  const [unavailable, setUnavailable] = useState<Set<SoundId>>(new Set())
  const audioRef = useRef<HTMLAudioElement>(null)

  // Play / pause / switch sound
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !selected) { audioRef.current?.pause(); return }
    if (!playing) { audio.pause(); return }
    const target = new URL(filePath(selected), window.location.href).href
    if (audio.src !== target) audio.src = filePath(selected)
    void audio.play().catch(() => setPlaying(false))
  }, [playing, selected])

  // Volume (separate — no play/pause side-effect)
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume / 100
  }, [volume])

  const handleSelect = (id: SoundId) => {
    if (unavailable.has(id)) return
    if (selected === id) {
      setPlaying((p) => !p)
    } else {
      setSelected(id)
      localStorage.setItem(STORAGE_SOUND, id)
      setPlaying(true)
    }
  }

  const handleError = () => {
    if (selected) setUnavailable((prev) => new Set([...prev, selected]))
    setPlaying(false)
  }

  return (
    <div className="rounded-2xl p-4" style={{ backgroundColor: 'var(--color-bg-card)' }}>
      <audio ref={audioRef} loop onError={handleError} />

      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: PILLAR_COLOR }}>
          Ambient Sound
        </p>
        {playing && (
          <button
            onClick={() => setPlaying(false)}
            className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
            style={{ backgroundColor: `${PILLAR_COLOR}20`, color: PILLAR_COLOR }}
          >
            ■ Stop
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {AMBIENT_SOUNDS.map((s) => {
          const isUnavail = unavailable.has(s.id)
          const isActive  = selected === s.id && playing
          return (
            <button
              key={s.id}
              onClick={() => handleSelect(s.id)}
              disabled={isUnavail}
              title={isUnavail ? 'Datei nicht verfügbar' : undefined}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition-colors disabled:opacity-35 disabled:cursor-not-allowed"
              style={{
                backgroundColor: isActive ? PILLAR_COLOR : `${PILLAR_COLOR}18`,
                color:           isActive ? 'white' : PILLAR_COLOR,
              }}
            >
              {isActive && '▶ '}{s.label}
            </button>
          )
        })}
      </div>

      {playing && (
        <div className="flex items-center gap-3 mt-1">
          <span className="text-sm">🔈</span>
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="flex-1"
            style={{ accentColor: PILLAR_COLOR }}
          />
          <span className="text-xs w-8 text-right tabular-nums" style={{ color: 'var(--color-text-muted)' }}>
            {volume}%
          </span>
        </div>
      )}
    </div>
  )
}
