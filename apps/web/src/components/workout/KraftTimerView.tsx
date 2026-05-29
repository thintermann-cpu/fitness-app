import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import type { WizardExercise } from '../../lib/customWorkouts'
import { useWodHistory } from '../../hooks/useWodHistory'
import { useSessionStore } from '../../store/sessionStore'
import { useAuthStore } from '../../store/authStore'
import { CountdownOverlay } from '../shared/CountdownOverlay'

type WakeLockNav = Navigator & { wakeLock?: { request(t: string): Promise<{ release(): Promise<void> }> } }

let kraftAudioCtx: AudioContext | null = null
function beepKraft(freq: number, gainVal: number, dur: number) {
  try {
    if (!kraftAudioCtx) kraftAudioCtx = new AudioContext()
    if (kraftAudioCtx.state === 'suspended') void kraftAudioCtx.resume()
    const osc = kraftAudioCtx.createOscillator()
    const g   = kraftAudioCtx.createGain()
    osc.connect(g); g.connect(kraftAudioCtx.destination)
    const t = kraftAudioCtx.currentTime
    osc.frequency.value = freq
    g.gain.setValueAtTime(gainVal, t)
    g.gain.exponentialRampToValueAtTime(0.001, t + dur)
    osc.start(t); osc.stop(t + dur)
  } catch {}
}

interface Props {
  exercises: WizardExercise[]
  restBetweenSets: number       // seconds
  restBetweenExercises: number  // seconds
  workoutName?: string
  onComplete?: () => void
  onShowHistory?: () => void
}

type KraftPhase = 'idle' | 'work' | 'rest' | 'done'

function formatSecs(s: number): string {
  const m = Math.floor(s / 60)
  const r = s % 60
  return m > 0 ? `${m}:${String(r).padStart(2, '0')}` : `${r}s`
}

const WEIGHT_COLORS = {
  leicht: '#10B981',
  mittel: '#F59E0B',
  schwer: '#EF4444',
}

export function KraftTimerView({ exercises, restBetweenSets, restBetweenExercises, workoutName, onComplete, onShowHistory: _onShowHistory }: Props) {
  const [phase,       setPhase]       = useState<KraftPhase>('idle')
  const [exIdx,       setExIdx]       = useState(0)
  const [setIdx,      setSetIdx]      = useState(0)
  const [timeLeft,    setTimeLeft]    = useState(0)
  const [showCountdown, setShowCountdown] = useState(false)
  const restTypeRef      = useRef<'set' | 'exercise'>('set')
  const wakeLockRef      = useRef<{ release: () => Promise<void> } | null>(null)
  const navigate         = useNavigate()
  const { addEntry }     = useWodHistory()
  const setSessionActive = useSessionStore((s) => s.setSessionActive)
  const lang             = useAuthStore((s) => s.profile?.language ?? 'de')

  useEffect(() => {
    const nav = navigator as WakeLockNav
    if (!nav.wakeLock) return
    const isActive = phase === 'work' || phase === 'rest'
    if (isActive) {
      nav.wakeLock.request('screen').then((s) => { wakeLockRef.current = s }).catch(() => {})
    } else {
      wakeLockRef.current?.release().catch(() => {})
      wakeLockRef.current = null
    }
    return () => { wakeLockRef.current?.release().catch(() => {}); wakeLockRef.current = null }
  }, [phase])

  useEffect(() => {
    setSessionActive(phase !== 'idle')
    return () => setSessionActive(false)
  }, [phase, setSessionActive])

  // Countdown beep in last 3 seconds of rest phase
  useEffect(() => {
    if (phase !== 'rest' || timeLeft <= 0 || timeLeft > 3) return
    beepKraft(880, 0.55, 0.12)
  }, [phase, timeLeft])

  const ex = exercises[exIdx]
  const totalSets    = ex?.sets ?? 3
  const reps         = ex?.rep_count ?? 8
  const weight       = ex?.weight_level
  const isLastSet    = setIdx >= totalSets - 1
  const isLastEx     = exIdx >= exercises.length - 1

  // Countdown timer (set-rest or exercise-rest)
  useEffect(() => {
    if (phase !== 'rest') return
    if (timeLeft <= 0) {
      advanceFromRest()
      return
    }
    const id = window.setInterval(() => {
      setTimeLeft((t) => Math.max(0, t - 1))
    }, 1000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, timeLeft])

  function advanceFromRest() {
    if (restTypeRef.current === 'set') {
      setSetIdx((s) => s + 1)
      setPhase('work')
    } else {
      setExIdx((i) => i + 1)
      setSetIdx(0)
      setPhase('work')
    }
  }

  function startWorkout() {
    setExIdx(0)
    setSetIdx(0)
    setPhase('work')
  }

  function handleSetDone() {
    if (isLastSet && isLastEx) {
      finishWorkout()
      return
    }
    if (isLastSet) {
      restTypeRef.current = 'exercise'
      setTimeLeft(restBetweenExercises)
    } else {
      restTypeRef.current = 'set'
      setTimeLeft(restBetweenSets)
    }
    setPhase('rest')
  }

  function skipRest() {
    setTimeLeft(0)
  }

  function skipExercise() {
    if (isLastEx) {
      finishWorkout()
      return
    }
    setExIdx((i) => i + 1)
    setSetIdx(0)
    setPhase('work')
  }

  function finishWorkout() {
    setPhase('done')
    if ('vibrate' in navigator) navigator.vibrate([500, 100, 500])
    const totalSetsDone = exercises.reduce((acc, e) => acc + (e.sets ?? 3), 0)
    addEntry.mutate({
      wod_name: workoutName ?? 'Krafttraining',
      score_type: 'reps',
      score_value: String(totalSetsDone),
    })
    onComplete?.()
  }

  const totalExercises = exercises.length
  const progressPct = totalExercises > 0
    ? Math.round(((exIdx + (setIdx + (phase === 'done' ? 1 : 0)) / totalSets) / totalExercises) * 100)
    : 0

  // ── Idle ──────────────────────────────────────────────────────────────────
  if (phase === 'idle') {
    return (
      <div className="flex flex-col items-center gap-5 py-4">
        <CountdownOverlay
          isOpen={showCountdown}
          onComplete={() => { setShowCountdown(false); startWorkout() }}
        />
        <div className="text-center space-y-1">
          <p className="text-4xl">💪</p>
          <p className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
            {workoutName ?? 'Krafttraining'}
          </p>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            {totalExercises} Übung{totalExercises !== 1 ? 'en' : ''} ·{' '}
            {exercises.reduce((a, e) => a + (e.sets ?? 3), 0)} Sätze gesamt
          </p>
        </div>

        {/* Exercise overview */}
        <div className="w-full space-y-2">
          {exercises.map((e, i) => (
            <div
              key={e.id}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
              style={{ backgroundColor: 'var(--color-bg-card)' }}
            >
              <span className="text-xs font-bold w-5 text-center" style={{ color: 'var(--color-text-muted)' }}>
                {i + 1}
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{e.name}</p>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  {e.sets ?? 3} × {e.rep_count ?? 8} Wdh.
                  {e.weight_level && ` · ${e.weight_level}`}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setShowCountdown(true)}
          className="w-full py-4 rounded-2xl font-bold text-white text-base active:scale-[0.98] transition-transform"
          style={{ backgroundColor: '#10B981' }}
        >
          ▶ Los geht's
        </button>
      </div>
    )
  }

  // ── Done ──────────────────────────────────────────────────────────────────
  if (phase === 'done') {
    const totalSetsAll = exercises.reduce((a, e) => a + (e.sets ?? 3), 0)
    return (
      <div className="flex flex-col items-center gap-5 py-8 text-center">
        <p style={{ fontSize: 64, lineHeight: 1 }}>🎉</p>
        <div>
          <p className="text-2xl font-black" style={{ color: '#10B981' }}>{lang === 'de' ? 'Gut gemacht!' : 'Well done!'}</p>
          {workoutName && (
            <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>{workoutName}</p>
          )}
        </div>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          {totalSetsAll} {lang === 'de' ? 'Sätze abgeschlossen' : 'sets completed'}
        </p>
        <div className="flex flex-col gap-3 w-full mt-2">
          <button
            onClick={() => navigate('/home')}
            className="py-3.5 rounded-2xl font-bold text-base text-white"
            style={{ backgroundColor: '#E8642A' }}
          >
            {lang === 'de' ? 'Zurück zu Mein Tag' : 'Back to My Day'}
          </button>
          <button
            onClick={() => navigate('/history')}
            className="py-2.5 rounded-2xl font-semibold text-sm"
            style={{ backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text-muted)' }}
          >
            {lang === 'de' ? 'Verlauf anzeigen' : 'View History'}
          </button>
        </div>
      </div>
    )
  }

  // ── Work / Rest ───────────────────────────────────────────────────────────
  const isRest = phase === 'rest'
  const restLabel = restTypeRef.current === 'set'
    ? `Pause — Satz ${setIdx + 1} von ${totalSets} ✓`
    : `Übungspause — ${ex?.name}`

  return (
    <div className="flex flex-col items-center gap-5 py-4">
      {/* Progress bar */}
      <div className="w-full h-1 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${progressPct}%`, backgroundColor: '#10B981' }}
        />
      </div>

      {/* Exercise + set info */}
      <div className="w-full text-center space-y-1">
        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#10B981' }}>
          Übung {exIdx + 1} / {totalExercises}
        </p>
        <p className="text-2xl font-black" style={{ color: 'var(--color-text)' }}>
          {ex?.name ?? '—'}
        </p>
        {weight && (
          <span
            className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: `${WEIGHT_COLORS[weight]}20`,
              color: WEIGHT_COLORS[weight],
            }}
          >
            {weight.charAt(0).toUpperCase() + weight.slice(1)}
          </span>
        )}
      </div>

      {/* Main display */}
      {isRest ? (
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{restLabel}</p>
          <p
            className="font-mono font-black"
            style={{ fontSize: 'clamp(72px, 22vw, 100px)', color: '#3B82F6' }}
          >
            {formatSecs(timeLeft)}
          </p>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            {restTypeRef.current === 'set'
              ? `Nächstes: Satz ${setIdx + 2} / ${totalSets}`
              : `Nächstes: ${exercises[exIdx + 1]?.name ?? '—'}`}
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-1">
          <p className="text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>
            Satz {setIdx + 1} / {totalSets}
          </p>
          <p
            className="font-black"
            style={{ fontSize: 'clamp(80px, 25vw, 110px)', color: '#10B981' }}
          >
            {reps}
          </p>
          <p className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>
            Wiederholungen
          </p>
        </div>
      )}

      {/* Buttons */}
      {isRest ? (
        <button
          onClick={skipRest}
          className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors"
          style={{ backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text-muted)' }}
        >
          Pause überspringen →
        </button>
      ) : (
        <div className="flex gap-3 w-full">
          <button
            onClick={handleSetDone}
            className="flex-1 py-4 rounded-2xl font-bold text-white text-base active:scale-[0.98] transition-transform"
            style={{ backgroundColor: '#10B981' }}
          >
            ✓ Satz geschafft
          </button>
          {!isLastEx && (
            <button
              onClick={skipExercise}
              className="px-4 py-4 rounded-2xl text-sm font-semibold active:scale-[0.98] transition-transform"
              style={{ backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text-muted)' }}
            >
              Übung
              <br />
              überspringen
            </button>
          )}
        </div>
      )}
    </div>
  )
}
