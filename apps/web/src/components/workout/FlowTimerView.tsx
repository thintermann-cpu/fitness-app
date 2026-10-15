import { useEffect, useMemo, useRef, useState } from 'react'
import type { FlowExercise, FlowRole } from '../../lib/workoutBlocks'
import { useWodHistory } from '../../hooks/useWodHistory'
import { useStretchingLogs } from '../../hooks/useStretchingLogs'
import { useWakeLock } from '../../hooks/useWakeLock'
import { useAudio } from '../../hooks/useAudio'
import { markPillarDone } from '../../lib/pillarDone'
import { useSessionStore } from '../../store/sessionStore'
import { CountdownOverlay } from '../shared/CountdownOverlay'

interface Props {
  exercises: FlowExercise[]
  restSec: number
  role: FlowRole
  workoutName?: string
  onChainedFinish?: () => void
}

interface Station {
  key: string
  name: string
  seconds: number
  note?: string
}

function stationsOf(exercises: FlowExercise[]): Station[] {
  return exercises.flatMap((exercise) => {
    const base: Station = {
      key: exercise.id,
      name: exercise.name,
      seconds: exercise.seconds,
      note: exercise.note,
    }
    if (exercise.sides === 2) {
      return [
        base,
        { ...base, key: `${exercise.id}-b`, name: `${exercise.name} · andere Seite` },
      ]
    }
    return [base]
  })
}

function formatSecs(total: number) {
  const m = Math.floor(total / 60)
  const s = total % 60
  return m > 0 ? `${m}:${String(s).padStart(2, '0')}` : `${s}s`
}

export function FlowTimerView({ exercises, restSec, role, workoutName, onChainedFinish }: Props) {
  const stations = useMemo(() => stationsOf(exercises), [exercises])
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<'work' | 'rest'>('work')
  const [left, setLeft] = useState(() => stations[0]?.seconds ?? 0)
  const [showCountdown, setShowCountdown] = useState(true)
  const [started, setStarted] = useState(false)
  const [paused, setPaused] = useState(false)
  const [nonce, setNonce] = useState(0)
  useWakeLock(true)
  const logged = useRef(false)
  const { addEntry } = useWodHistory()
  const { addLog } = useStretchingLogs()
  const audio = useAudio()
  const audioRef = useRef(audio)
  audioRef.current = audio
  const setSessionActive = useSessionStore((s) => s.setSessionActive)
  const color = role === 'mobility' ? '#7BC67E' : role === 'warmup' ? '#F59E0B' : '#E8642A'
  const title = role === 'mobility' ? 'Mobilität' : role === 'warmup' ? 'Warm-up' : 'Ablauf'
  const station = stations[index]

  useEffect(() => {
    setSessionActive(true)
    return () => setSessionActive(false)
  }, [setSessionActive])

  useEffect(() => {
    if (!started || showCountdown || paused) return
    if (left < 1 || left > 3) return
    void audio.playBeep()
  }, [left, started, showCountdown, paused, audio])

  useEffect(() => {
    if (!started || showCountdown || paused) return
    if (left > 0) {
      const id = window.setTimeout(() => setLeft((value) => value - 1), 1000)
      return () => window.clearTimeout(id)
    }
    if (phase === 'rest') {
      void audioRef.current.playBeep()
      const next = index + 1
      setIndex(next)
      setPhase('work')
      setLeft(stations[next]?.seconds ?? 0)
      return
    }
    if (index >= stations.length - 1) {
      complete()
      return
    }
    void audioRef.current.playBeep()
    if (restSec > 0) {
      setPhase('rest')
      setLeft(restSec)
      return
    }
    void audioRef.current.playBeep()
    const next = index + 1
    setIndex(next)
    setLeft(stations[next]?.seconds ?? 0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left, phase, started, showCountdown, paused, nonce])

  function complete() {
    if (logged.current) return
    logged.current = true
    void audioRef.current.playGong()
    const totalSec = stations.reduce((sum, item) => sum + item.seconds, 0) + Math.max(0, stations.length - 1) * restSec
    if (role === 'mobility') {
      markPillarDone('stretching')
      addLog.mutate({
        routine_id: null,
        duration_min: Math.max(1, Math.ceil(totalSec / 60)),
        display_name: workoutName ?? 'Mobilität',
      })
    } else if (role === 'flow') {
      const minutes = Math.floor(totalSec / 60)
      const seconds = totalSec % 60
      addEntry.mutate({
        wod_name: workoutName ?? 'Ablauf',
        score_type: 'time',
        score_value: `${minutes}:${String(seconds).padStart(2, '0')}`,
        exercises: exercises.map((exercise) => ({
          id: exercise.id,
          name: exercise.name,
          note: exercise.note,
          detail: exercise.sides === 2 ? `${exercise.seconds}s · beide Seiten` : `${exercise.seconds}s`,
        })),
      })
    }
    onChainedFinish?.()
  }

  function skipRest() {
    setPaused(false)
    setLeft(0)
    setNonce((value) => value + 1)
  }

  function skipUpcoming() {
    setPaused(false)
    const upcoming = index + 1
    if (upcoming >= stations.length - 1) {
      complete()
      return
    }
    const after = upcoming + 1
    setPhase('work')
    setIndex(after)
    setLeft(stations[after]?.seconds ?? 0)
    setNonce((value) => value + 1)
  }

  function skipStation() {
    setPaused(false)
    if (index >= stations.length - 1) {
      complete()
      return
    }
    setPhase('work')
    setIndex(index + 1)
    setLeft(stations[index + 1]?.seconds ?? 0)
    setNonce((value) => value + 1)
  }

  return (
    <div className="flex flex-col items-center gap-5 py-4">
      <CountdownOverlay isOpen={showCountdown} onComplete={() => { setShowCountdown(false); setStarted(true) }} />
      <p className="text-xs font-semibold uppercase tracking-widest" style={{ color }}>{title}</p>
      <div className="w-full text-center space-y-1">
        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          {phase === 'rest' ? 'Pause' : `Übung ${index + 1} / ${stations.length}`}
        </p>
        <p className="text-2xl font-black" style={{ color: 'var(--color-text)' }}>
          {phase === 'rest' ? (stations[index + 1]?.name ?? '—') : (station?.name ?? '—')}
        </p>
        {phase === 'work' && station?.note && (
          <p className="text-sm px-4" style={{ color: 'var(--color-text-muted)' }}>{station.note}</p>
        )}
      </div>
      <p className="font-mono font-black" style={{ fontSize: 'clamp(72px, 22vw, 100px)', color }}>
        {formatSecs(left)}
      </p>
      <div className="flex flex-col gap-3 w-full">
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          className="py-3.5 rounded-2xl font-bold text-base text-white"
          style={{ backgroundColor: color }}
        >
          {paused ? 'Fortsetzen' : 'Pause'}
        </button>
        {phase === 'rest' ? (
          <>
            <button type="button" onClick={skipRest} className="px-6 py-2.5 rounded-xl text-sm font-semibold" style={{ backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text-muted)' }}>
              Pause überspringen →
            </button>
            <button type="button" onClick={skipUpcoming} className="px-6 py-2.5 rounded-xl text-sm font-semibold" style={{ backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text-muted)' }}>
              Übung überspringen
            </button>
          </>
        ) : (
          <button type="button" onClick={skipStation} className="px-6 py-2.5 rounded-xl text-sm font-semibold" style={{ backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text-muted)' }}>
            Übung überspringen
          </button>
        )}
      </div>
    </div>
  )
}
