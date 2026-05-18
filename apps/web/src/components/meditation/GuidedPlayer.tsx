import { useState, useEffect, useRef } from 'react'

const PILLAR_COLOR = '#9B7FD4'

const TYPE_BADGE: Record<string, string> = {
  body_scan:     'Body Scan',
  breathing:     'Atem',
  focus:         'Fokus',
  sleep:         'Schlaf',
  morning:       'Morgen',
  stress_relief: 'Stressabbau',
  visualization: 'Visualisierung',
}

interface Session {
  id: string
  title: string
  duration: number
  type: string
  file: string
  available: boolean
}

export function GuidedPlayer() {
  const [sessions,  setSessions]  = useState<Session[]>([])
  const [activeId,  setActiveId]  = useState<string | null>(null)
  const [playing,   setPlaying]   = useState(false)
  const [progress,  setProgress]  = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    fetch('/audio/sessions/sessions.json')
      .then((r) => r.json())
      .then(setSessions)
      .catch(() => {})
  }, [])

  function handlePlay(s: Session) {
    if (!s.available) return
    if (activeId === s.id) {
      if (playing) {
        audioRef.current?.pause()
        setPlaying(false)
      } else {
        void audioRef.current?.play().catch(() => setPlaying(false))
        setPlaying(true)
      }
      return
    }
    audioRef.current?.pause()
    const audio = new Audio(`/audio/sessions/${s.file}`)
    audio.addEventListener('timeupdate', () => {
      setProgress(audio.duration > 0 ? audio.currentTime / audio.duration : 0)
    })
    audio.addEventListener('ended', () => { setPlaying(false); setProgress(0) })
    audioRef.current = audio
    setActiveId(s.id)
    setProgress(0)
    void audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
  }

  if (sessions.length === 0) return null

  return (
    <div className="space-y-2">
      <p className="text-[10px] font-semibold uppercase tracking-wide mb-1"
         style={{ color: 'var(--color-text-muted)' }}>
        Geführte Audio-Sessions
      </p>
      {sessions.map((s) => {
        const isActive = activeId === s.id
        return (
          <div
            key={s.id}
            className="rounded-xl p-3 border"
            style={{
              backgroundColor: isActive ? `${PILLAR_COLOR}10` : 'var(--color-bg-card)',
              borderColor: isActive ? `${PILLAR_COLOR}40` : 'transparent',
              opacity: s.available ? 1 : 0.55,
            }}
          >
            <div className="flex items-center gap-3">
              {/* Play button */}
              <button
                onClick={() => handlePlay(s)}
                disabled={!s.available}
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
                style={{
                  backgroundColor: s.available ? `${PILLAR_COLOR}22` : 'rgba(255,255,255,0.06)',
                  color: s.available ? PILLAR_COLOR : 'var(--color-text-muted)',
                  cursor: s.available ? 'pointer' : 'default',
                }}
                aria-label={isActive && playing ? 'Pausieren' : 'Abspielen'}
              >
                {isActive && playing ? '⏸' : '▶'}
              </button>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold truncate" style={{ color: 'var(--color-text)' }}>
                    {s.title}
                  </span>
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-semibold shrink-0"
                    style={{ backgroundColor: `${PILLAR_COLOR}18`, color: PILLAR_COLOR }}
                  >
                    {TYPE_BADGE[s.type] ?? s.type}
                  </span>
                </div>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                  {s.duration} min
                  {!s.available && ' · Bald verfügbar'}
                </p>
              </div>
            </div>

            {/* Progress bar for active + playing */}
            {isActive && s.available && (
              <div
                className="mt-2.5 h-1 rounded-full overflow-hidden"
                style={{ backgroundColor: `${PILLAR_COLOR}20` }}
              >
                <div
                  className="h-full rounded-full transition-all duration-1000 linear"
                  style={{ width: `${progress * 100}%`, backgroundColor: PILLAR_COLOR }}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
