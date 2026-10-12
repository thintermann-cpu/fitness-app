import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSessionStore } from '../../store/sessionStore'
import { useAuthStore } from '../../store/authStore'
import {
  blockColor,
  blockLabel,
  chainEntryName,
  gateAfter,
  isWorkBlock,
  type BlockGate,
  type WorkoutBlock,
} from '../../lib/workoutBlocks'
import { TimerView } from './TimerView'
import { KraftTimerView } from './KraftTimerView'
import type { WizardExercise } from '../../lib/customWorkouts'

interface Props {
  blocks: WorkoutBlock[]
  workoutName?: string
  onSessionEnd?: () => void
}

function formatSecs(total: number) {
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function withParsedSets(exercises: WizardExercise[]): WizardExercise[] {
  return exercises.map((exercise) => {
    if (exercise.sets && exercise.rep_count) return exercise
    const match = `${exercise.detail ?? ''} ${exercise.name}`.match(/(\d+)\s*[x×]\s*(\d+)/)
    if (!match) return { ...exercise, sets: exercise.sets ?? 3, rep_count: exercise.rep_count ?? 8 }
    return {
      ...exercise,
      sets: exercise.sets ?? Number(match[1]),
      rep_count: exercise.rep_count ?? Number(match[2]),
    }
  })
}

function firstWorkIndex(blocks: WorkoutBlock[]): number {
  const index = blocks.findIndex(isWorkBlock)
  return index < 0 ? 0 : index
}

export function BlockSession({ blocks, workoutName, onSessionEnd }: Props) {
  const navigate = useNavigate()
  const lang = useAuthStore((s) => s.profile?.language ?? 'de')
  const setSessionActive = useSessionStore((s) => s.setSessionActive)
  const opening = blocks[0]?.kind === 'pause' ? gateAfter(blocks, -1) : null
  const [index, setIndex] = useState(() => (opening ? -1 : firstWorkIndex(blocks)))
  const [gate, setGate] = useState<BlockGate | null>(opening)
  const [left, setLeft] = useState(() => opening?.pauseSec ?? 0)
  const [finished, setFinished] = useState(false)
  const gateLock = useRef(false)

  useLayoutEffect(() => {
    setSessionActive(true)
    return () => setSessionActive(false)
  }, [index, gate, finished, setSessionActive])

  useEffect(() => {
    if (!gate || finished) return
    if (left <= 0) {
      if (gateLock.current) return
      gateLock.current = true
      if (gate.nextIndex < 0) {
        setGate(null)
        setFinished(true)
        onSessionEnd?.()
      } else {
        setIndex(gate.nextIndex)
        setGate(null)
      }
      return
    }
    const id = window.setTimeout(() => setLeft((value) => value - 1), 1000)
    return () => window.clearTimeout(id)
  }, [gate, left, finished, onSessionEnd])

  function finish() {
    gateLock.current = true
    setGate(null)
    setFinished(true)
    onSessionEnd?.()
  }

  function continueNext() {
    if (!gate || gateLock.current) return
    gateLock.current = true
    if (gate.nextIndex < 0) {
      finish()
      return
    }
    setIndex(gate.nextIndex)
    setGate(null)
  }

  function skipNext() {
    if (!gate || gateLock.current) return
    if (gate.skipIndex == null) {
      finish()
      return
    }
    const following = gateAfter(blocks, gate.skipIndex)
    if (!following) {
      finish()
      return
    }
    gateLock.current = false
    setGate(following)
    setLeft(following.pauseSec)
  }

  function handoff(fromIndex: number) {
    const next = gateAfter(blocks, fromIndex)
    gateLock.current = false
    if (!next) {
      finish()
      return
    }
    setGate(next)
    setLeft(next.pauseSec)
  }

  if (finished) {
    const isDe = lang === 'de'
    return (
      <div className="flex flex-col items-center gap-5 py-8 text-center">
        <p style={{ fontSize: 64, lineHeight: 1 }}>🎉</p>
        <p className="text-2xl font-black" style={{ color: '#10B981' }}>{isDe ? 'Gut gemacht!' : 'Well done!'}</p>
        {workoutName && <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{workoutName}</p>}
        <div className="flex flex-col gap-3 w-full mt-2">
          <button
            onClick={() => navigate('/stretching')}
            className="py-3.5 rounded-2xl font-bold text-base text-white"
            style={{ backgroundColor: 'var(--color-pillar-stretching)' }}
          >
            {isDe ? 'Cooldown · Mobilität' : 'Cooldown · Mobility'}
          </button>
          <button
            onClick={() => navigate('/home')}
            className="py-3.5 rounded-2xl font-bold text-base text-white"
            style={{ backgroundColor: '#E8642A' }}
          >
            {isDe ? 'Zurück zu Mein Tag' : 'Back to My Day'}
          </button>
        </div>
      </div>
    )
  }

  if (gate) {
    const next = gate.nextIndex >= 0 ? blocks[gate.nextIndex] : undefined
    const nextLabel = next ? blockLabel(next) : ''
    return (
      <div className="flex flex-col items-center gap-4 py-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#60A5FA' }}>Pause</p>
        <p className="font-mono font-black" style={{ fontSize: 'clamp(72px, 22vw, 100px)', color: '#60A5FA' }}>
          {formatSecs(left)}
        </p>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          {next ? `Als Nächstes: ${nextLabel}` : 'Letzte Pause'}
        </p>
        <div className="flex flex-col gap-3 w-full mt-2">
          {next && (
            <button
              type="button"
              onClick={continueNext}
              className="py-3.5 rounded-2xl font-bold text-base text-white"
              style={{ backgroundColor: blockColor(next) }}
            >
              Weiter mit {nextLabel}
            </button>
          )}
          {next && (
            <button
              type="button"
              onClick={skipNext}
              className="py-3 rounded-2xl font-semibold text-sm"
              style={{ backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text-muted)' }}
            >
              Überspringen
            </button>
          )}
        </div>
      </div>
    )
  }

  const block = blocks[index]
  if (!block || block.kind === 'pause') return null
  const entryName = chainEntryName(workoutName, block)
  if (block.kind === 'krafttraining') {
    return (
      <KraftTimerView
        key={block.id}
        autoStart
        exercises={withParsedSets(block.exercises)}
        restBetweenSets={block.restBetweenSets}
        restBetweenExercises={block.restBetweenExercises}
        workoutName={entryName}
        onChainedFinish={() => handoff(index)}
      />
    )
  }

  const mode = block.kind
  return (
    <TimerView
      key={block.id}
      adHocLog
      initialMode={mode}
      initialMinutes={mode === 'emom' ? block.intervalMin * block.rounds : mode === 'tabata' ? Math.max(1, Math.round((block.workSec + block.restSec) * block.rounds / 60)) : block.minutes}
      exercises={block.exercises}
      scheme={block.scheme}
      workoutName={entryName}
      initialEmomInterval={mode === 'emom' ? block.intervalMin : undefined}
      initialEmomRounds={mode === 'emom' ? block.rounds : undefined}
      initialTabataWork={mode === 'tabata' ? block.workSec : undefined}
      initialTabataRest={mode === 'tabata' ? block.restSec : undefined}
      initialTabataRounds={mode === 'tabata' ? block.rounds : undefined}
      onChainedFinish={() => handoff(index)}
    />
  )
}
