import { useEffect, useState } from 'react'
import { useWod } from '../../hooks/useWods'
import type { Wod } from '../../hooks/useWods'
import { useAnalytics } from '../../hooks/useAnalytics'
import { useAuthStore } from '../../store/authStore'
import { getWodTypeLabel } from '../../lib/wodTypeLabels'
import { WOD_TYPE_TO_MODE } from '../../lib/timerLabels'
import { composeWorkoutScheme, parseWodExercises } from '../../lib/exerciseCatalog'
import { ExerciseListEditor } from '../wizard/ExerciseListEditor'
import type { WizardExercise } from '../../lib/customWorkouts'
import { useWodHistory } from '../../hooks/useWodHistory'
import { useCustomWorkouts } from '../../hooks/useCustomWorkouts'
import { useToast } from '../../hooks/useToast'
import { FreeTimerWizard, type KraftConfig, type TimerInitConfig } from './FreeTimerWizard'
import type { TimerMode } from '../../lib/timerLabels'
import { TimerView } from './TimerView'
import { KraftTimerView } from './KraftTimerView'
import { ScoreInput } from './ScoreInput'
import { WodHistoryList } from './WodHistoryList'
import { FavoriteButton } from '../ui/FavoriteButton'
import { WarmupTimer, type WarmupRoutineId } from './WarmupTimer'
import { WorkoutCountdown } from '../shared/WorkoutCountdown'

// ── Custom workout mode display labels ───────────────────────────────────
interface LaunchConfig {
  mode: TimerMode
  minutes: number
  exercises?: WizardExercise[]
  scheme?: string
  kraft?: KraftConfig
  tabataWork?: number
  tabataRest?: number
  tabataRounds?: number
  emomInterval?: number
  emomRounds?: number
}

const CW_MODE_LABELS: Record<string, string> = {
  fortime: 'ForTime', amrap: 'AMRAP', emom: 'EMOM',
  tabata: 'Tabata', krafttraining: 'Kraft',
}

// ── Equipment color map ───────────────────────────────────────────────────
const EQUIPMENT_COLORS: Record<string, string> = {
  Laufen:           '#06b6d4',
  Barbell:          '#f59e0b',
  Dumbbells:        '#a78bfa',
  Kettlebell:       '#f97316',
  'Pull-up Bar':    '#10b981',
  Rings:            '#3b82f6',
  Rower:            '#6366f1',
  Bike:             '#ec4899',
  'Resistance Bands': '#84cc16',
  'Jump Rope':      '#14b8a6',
  Box:              '#8b5cf6',
}

// ── Warmup routines ───────────────────────────────────────────────────────
interface WarmupExercise { name: string; desc: string; sek: number }

const WARMUP_ROUTINES: Record<string, WarmupExercise[]> = {
  Laufen: [
    { name: 'Leg Swings',      desc: 'Bein vor und zurück schwingen, je Seite',       sek: 30 },
    { name: 'High Knees',      desc: 'Knie hoch ziehen, schnelles Tempo',              sek: 40 },
    { name: 'Butt Kicks',      desc: 'Fersen zu den Gesäßbacken ziehen',               sek: 40 },
    { name: 'Walking Lunges',  desc: 'Große Schritte vorwärts, Knie fast am Boden',   sek: 40 },
    { name: 'Calf Raises',     desc: 'Auf Zehenspitzen heben und senken',              sek: 30 },
    { name: 'Easy Jog',        desc: 'Leichtes Einlaufen, lockeres Tempo',             sek: 60 },
  ],
  Barbell: [
    { name: 'Jumping Jacks',            desc: 'Arme und Beine gleichzeitig spreizen',         sek: 40 },
    { name: 'Hip Hinge',                desc: 'Langsam vorwärts beugen, Rücken gerade',       sek: 30 },
    { name: 'Shoulder Circles',         desc: 'Große Kreise mit beiden Armen',                sek: 30 },
    { name: 'Air Squats',               desc: 'Tief in die Knie, Brust hoch',                 sek: 40 },
    { name: 'Inchworms',                desc: 'Hände zum Boden, langsam vorwärts laufen',     sek: 40 },
    { name: 'Barbell PVC Pass-Through', desc: 'Leichte Stange über den Kopf, Hüfte öffnen',  sek: 40 },
  ],
  Kettlebell: [
    { name: 'Jumping Jacks',    desc: 'Arme und Beine gleichzeitig spreizen',           sek: 40 },
    { name: 'Hip Circles',      desc: 'Hüfte in großen Kreisen drehen',                 sek: 30 },
    { name: 'Arm Circles',      desc: 'Große Kreise mit beiden Armen',                  sek: 30 },
    { name: 'Goblet Squat Hold', desc: 'Knie halten, Hüfte öffnen – 3 Sek halten',    sek: 40 },
    { name: 'Good Mornings',    desc: 'Hände am Hinterkopf, Rücken gerade vorwärts',   sek: 40 },
    { name: 'KB Halos',         desc: 'Kettlebell langsam um den Kopf kreisen',         sek: 40 },
  ],
  Rower: [
    { name: 'Jumping Jacks',  desc: 'Arme und Beine gleichzeitig spreizen',             sek: 40 },
    { name: 'Hip Hinge',      desc: 'Vorwärts beugen, Rücken gerade',                   sek: 30 },
    { name: 'Torso Rotation', desc: 'Oberkörper links und rechts drehen',               sek: 30 },
    { name: 'Leg Swings',     desc: 'Bein vor und zurück schwingen',                    sek: 30 },
    { name: 'Easy Row',       desc: 'Sehr leichtes Rudern – Technik einüben',           sek: 60 },
    { name: 'Burpees',        desc: 'Körper aufwärmen, Puls erhöhen',                   sek: 40 },
  ],
  Default: [
    { name: 'Jumping Jacks', desc: 'Arme und Beine gleichzeitig spreizen',              sek: 40 },
    { name: 'High Knees',    desc: 'Knie hoch ziehen, schnelles Tempo',                 sek: 40 },
    { name: 'Burpees',       desc: 'Langsam und kontrolliert – Körper aufwärmen',       sek: 40 },
    { name: 'Leg Swings',    desc: 'Bein vor und zurück schwingen, je Seite',           sek: 30 },
    { name: 'Arm Circles',   desc: 'Große Kreise mit beiden Armen',                     sek: 30 },
    { name: 'Air Squats',    desc: 'Tief in die Knie, Brust hoch',                      sek: 40 },
  ],
}

const RUNNING_KEYWORDS = ['run', 'meter', '400m', '800m', 'mile', '1 km', 'lauf', 'laufen']

function getWarmupRoutine(wod: Wod): WarmupExercise[] {
  const equipment = wod.equipment ?? []
  const text = [wod.exercises, wod.description, equipment.join(' ')].join(' ').toLowerCase()
  const hasLaufen = equipment.some(e => e.toLowerCase() === 'laufen')
    || RUNNING_KEYWORDS.some(kw => text.includes(kw))
  if (hasLaufen) return WARMUP_ROUTINES.Laufen
  if (equipment.some(e => /barbell/i.test(e))) return WARMUP_ROUTINES.Barbell
  if (equipment.some(e => /kettlebell/i.test(e))) return WARMUP_ROUTINES.Kettlebell
  if (equipment.some(e => /rower|row/i.test(e))) return WARMUP_ROUTINES.Rower
  return WARMUP_ROUTINES.Default
}

function exercisesFromBlob(text: string): WizardExercise[] {
  return parseWodExercises(text).map((item, i) => ({
    id: `parsed-${i}-${item.id ?? 'raw'}`,
    name: item.name,
    detail: item.detail,
  }))
}

function prescriptionItems(wod: Wod): WizardExercise[] {
  const lines = wod.prescription?.lines ?? []
  if (!lines.length) return exercisesFromBlob(wod.exercises)
  return lines.map((line, i) => ({
    id: `rx-${i}-${line.name}`,
    name: line.name,
    detail: line.detail,
    sets: line.sets,
    rep_count: line.repCount,
  }))
}

function exerciseSig(items: WizardExercise[]): string {
  return items.map((item) => `${item.name}|${item.detail ?? ''}|${item.sets ?? ''}|${item.rep_count ?? ''}`).join('\n')
}

interface Props {
  wodName: string
  onBack: () => void
}

export function WodDetail({ wodName, onBack }: Props) {
  const lang = useAuthStore((s) => s.profile?.language ?? 'de')
  const { data: wod, isLoading } = useWod(wodName)
  const { personalBest, addEntry } = useWodHistory(wodName)
  const { track } = useAnalytics()
  const { data: customWorkouts = [], addWorkout, updateWorkout } = useCustomWorkouts()
  const toast = useToast()
  const customWorkout = customWorkouts.find((w) => w.name === wodName) ?? null
  const customExercises = (customWorkout && customWorkout.mode !== 'krafttraining')
    ? customWorkout.exercises.filter((e) => Boolean(e.name))
    : []
  const [showTimer, setShowTimer]           = useState(false)
  const [startOpen, setStartOpen]           = useState(false)
  const [startKey, setStartKey]             = useState(0)
  const [launch, setLaunch]                 = useState<LaunchConfig | null>(null)

  function openStartWizard() {
    setStartKey((key) => key + 1)
    setStartOpen(true)
  }

  function beginFromWizard(
    mode: TimerMode,
    minutes: number,
    withWarmup: WarmupRoutineId | false | undefined,
    kraftConfig: KraftConfig | undefined,
    exercises: WizardExercise[] | undefined,
    timerCfg: TimerInitConfig | undefined,
  ) {
    setLaunch({
      mode,
      minutes,
      exercises,
      scheme: timerCfg?.scheme,
      kraft: kraftConfig,
      tabataWork: timerCfg?.tabataWork,
      tabataRest: timerCfg?.tabataRest,
      tabataRounds: timerCfg?.tabataRounds,
      emomInterval: timerCfg?.emomInterval,
      emomRounds: timerCfg?.emomRounds,
    })
    if (exercises) setSessionItems(exercises)
    setSessionScheme(timerCfg?.scheme ?? '')
    setSessionMinutes(minutes > 0 ? minutes : sessionMinutes)
    if (withWarmup) {
      setWarmupRoutine(withWarmup)
      setShowWarmupTimer(true)
    } else setShowTimer(true)
  }
  const [showScore, setShowScore]           = useState(false)
  const [showHistory, setShowHistory]       = useState(false)
  const [showWarmup, setShowWarmup]         = useState(false)
  const [showWarmupTimer, setShowWarmupTimer] = useState(false)
  const [warmupRoutine, setWarmupRoutine] = useState<WarmupRoutineId>('standard')
  const [showWorkoutCountdown, setShowWorkoutCountdown] = useState(false)
  const [adjustOpen, setAdjustOpen]         = useState(false)
  const [sessionMinutes, setSessionMinutes] = useState(20)
  const [sessionItems, setSessionItems]     = useState<WizardExercise[]>([])
  const [sessionScheme, setSessionScheme]   = useState('')

  useEffect(() => {
    if (!wod) return
    setSessionMinutes(wod.estimated_minutes > 0 ? wod.estimated_minutes : 20)
    setSessionItems(prescriptionItems(wod))
    setSessionScheme(wod.prescription?.scheme || composeWorkoutScheme({
      runden: wod.runden,
      reps: wod.reps,
      exercises: wod.exercises,
      description: wod.description,
    }))
    setAdjustOpen(false)
    setLaunch(null)
  }, [wod?.id, wod?.exercises, wod?.estimated_minutes, wod?.runden, wod?.reps, wod?.description])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <span className="text-[var(--color-text-muted)]">Loading…</span>
      </div>
    )
  }

  if (!wod) {
    if (!customWorkout) {
      return (
        <div className="py-20 text-center">
          <p className="text-[var(--color-text-muted)]">WOD not found.</p>
          <button onClick={onBack} className="mt-4 text-[#E8642A] underline text-sm">
            Go back
          </button>
        </div>
      )
    }
    const cwMode = customWorkout.mode !== 'krafttraining'
      ? customWorkout.mode as 'fortime' | 'amrap' | 'emom' | 'tabata'
      : 'fortime'
    return (
      <div className={showTimer ? 'space-y-2' : 'space-y-5'}>
        {showTimer ? (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setShowTimer(false)}
              aria-label="Timer schliessen"
              className="text-lg leading-none"
              style={{ color: 'var(--color-text-muted)', background: 'none', border: 'none', minWidth: 36, minHeight: 36 }}
            >
              ←
            </button>
            <p className="text-sm font-bold truncate" style={{ color: 'var(--color-text)' }}>{customWorkout.name}</p>
          </div>
        ) : (
        <>
        <div className="flex items-start gap-3">
          <button onClick={onBack} className="mt-0.5 text-[var(--color-text-muted)] hover:text-[var(--color-text)] text-lg leading-none">←</button>
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-black text-[var(--color-text)]">{customWorkout.name}</h2>
            <div className="flex gap-2 mt-1 flex-wrap">
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#E8642A]/20 text-[#E8642A]">
                {CW_MODE_LABELS[customWorkout.mode] ?? customWorkout.mode}
              </span>
              {customWorkout.minutes > 0 && (
                <span className="text-xs text-[var(--color-text-muted)]">~{customWorkout.minutes} min</span>
              )}
            </div>
          </div>
        </div>

        {(customExercises.length > 0 || customWorkout.tabataRounds || customWorkout.emomRounds) && (
          <div className="bg-[var(--color-bg-card)] rounded-[var(--radius-md)] p-4 space-y-3">
            {customWorkout.scheme && (
              <p className="text-sm font-semibold text-[var(--color-text)]">{customWorkout.scheme}</p>
            )}
            {customExercises.length > 0 && (
              <div>
                <p className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide mb-2">Übungen</p>
                <div className="space-y-1">
                  {customExercises.map((ex, i) => (
                    <div key={ex.id} className="flex items-center gap-2 text-sm">
                      <span className="text-xs text-[var(--color-text-muted)] w-5 flex-shrink-0">{i + 1}.</span>
                      <span className="text-[var(--color-text)] flex-1">
                        {ex.name}
                        {ex.detail ? <span className="text-[var(--color-text-muted)]"> · {ex.detail}</span> : null}
                      </span>
                      {(ex.sets || ex.rep_count) && (
                        <span className="text-xs text-[var(--color-text-muted)]">
                          {ex.sets ?? 3}×{ex.rep_count ?? 8}{ex.weight_level ? ` · ${ex.weight_level}` : ''}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {customWorkout.tabataRounds && (
              <div>
                <p className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide mb-1">Tabata</p>
                <p className="text-sm text-[var(--color-text)] font-mono">
                  {customWorkout.tabataRounds}× {customWorkout.tabataWork}s Work / {customWorkout.tabataRest}s Pause
                </p>
              </div>
            )}
            {customWorkout.emomRounds && (
              <div>
                <p className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide mb-1">EMOM</p>
                <p className="text-sm text-[var(--color-text)] font-mono">
                  {customWorkout.emomRounds}× {customWorkout.emomInterval}min
                </p>
              </div>
            )}
          </div>
        )}

        {!showTimer ? (
          <div className="flex gap-3">
            <button
              onClick={openStartWizard}
              className="flex-1 py-3.5 rounded-xl bg-[#E8642A] text-white font-semibold text-base active:scale-[0.98] transition-transform"
            >
              ▶ Start Timer
            </button>
            <button
              onClick={() => { setWarmupRoutine('standard'); setShowWarmupTimer(true) }}
              className="px-4 py-3.5 rounded-xl font-semibold text-sm active:scale-[0.98] transition-transform"
              style={{ backgroundColor: '#E8642A18', color: '#E8642A', border: '1px solid #E8642A40' }}
            >
              🔥 Warmup
            </button>
            <button
              onClick={() => setShowScore(true)}
              className="px-4 py-3.5 rounded-xl border border-[#E8642A]/40 text-[#E8642A] font-semibold text-sm active:scale-[0.98] transition-transform"
            >
              Log
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={() => setShowTimer(false)}
              className="flex-1 py-3 rounded-xl text-sm font-semibold"
              style={{ backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text-muted)' }}
            >
              ✕ Timer schließen
            </button>
            <button
              onClick={() => setShowScore(true)}
              className="px-4 py-3 rounded-xl border border-[#E8642A]/40 text-[#E8642A] font-semibold text-sm"
            >
            Log
          </button>
        </div>
        )}
        </>
        )}

        {showTimer && (
          <div className="bg-[var(--color-bg-card)] rounded-[var(--radius-lg)] p-2">
            {(launch?.mode ?? customWorkout.mode) === 'krafttraining' ? (
              <KraftTimerView
                exercises={launch?.kraft?.exercises ?? launch?.exercises ?? customWorkout.exercises}
                restBetweenSets={launch?.kraft?.restBetweenSets ?? customWorkout.restBetweenSets ?? 90}
                restBetweenExercises={launch?.kraft?.restBetweenExercises ?? customWorkout.restBetweenExercises ?? 60}
                workoutName={customWorkout.name}
                onComplete={() => window.dispatchEvent(new CustomEvent('carveout:workout-completed'))}
              />
            ) : (
              <TimerView
                initialMode={(launch?.mode ?? cwMode) as 'fortime' | 'amrap' | 'emom' | 'tabata'}
                initialMinutes={launch?.minutes ?? customWorkout.minutes}
                scheme={launch ? launch.scheme : customWorkout.scheme}
                adHocLog
                workoutName={customWorkout.name}
                exercises={(launch?.exercises ?? customExercises).length > 0 ? (launch?.exercises ?? customExercises) : undefined}
                initialTabataWork={launch?.tabataWork ?? customWorkout.tabataWork}
                initialTabataRest={launch?.tabataRest ?? customWorkout.tabataRest}
                initialTabataRounds={launch?.tabataRounds ?? customWorkout.tabataRounds}
                initialEmomInterval={launch?.emomInterval ?? customWorkout.emomInterval}
                initialEmomRounds={launch?.emomRounds ?? customWorkout.emomRounds}
                onComplete={() => window.dispatchEvent(new CustomEvent('carveout:workout-completed'))}
              />
            )}
          </div>
        )}

        {!showTimer && (
          <button
            onClick={() => setShowHistory((v) => !v)}
            className="w-full text-left py-3 border-t border-white/8 flex items-center justify-between"
          >
            <span className="text-sm font-medium text-[var(--color-text-muted)]">My History</span>
            <span className="text-[var(--color-text-muted)]">{showHistory ? '▲' : '▼'}</span>
          </button>
        )}
        {showHistory && !showTimer && <WodHistoryList wodName={customWorkout.name} />}

        <ScoreInput
          wodName={customWorkout.name}
          isOpen={showScore}
          onClose={() => setShowScore(false)}
          onSave={(entry) => { addEntry.mutate(entry); setShowScore(false) }}
          isPending={addEntry.isPending}
        />
        <WarmupTimer
          isOpen={showWarmupTimer}
          routine={warmupRoutine}
          onClose={() => setShowWarmupTimer(false)}
          onStartWorkout={() => { setShowWarmupTimer(false); setShowWorkoutCountdown(true) }}
        />
        <WorkoutCountdown
          isOpen={showWorkoutCountdown}
          onComplete={() => { setShowWorkoutCountdown(false); setShowTimer(true) }}
        />
        <FreeTimerWizard
          key={startKey}
          isOpen={startOpen}
          onClose={() => setStartOpen(false)}
          variant="adhoc"
          title={customWorkout.name}
          initialStep={1}
          initialValues={{
            name: customWorkout.name,
            mode: customWorkout.mode,
            minutes: customWorkout.minutes,
            exercises: customWorkout.exercises,
            scheme: customWorkout.scheme,
            restBetweenSets: customWorkout.restBetweenSets,
            restBetweenExercises: customWorkout.restBetweenExercises,
            tabataWork: customWorkout.tabataWork,
            tabataRest: customWorkout.tabataRest,
            tabataRounds: customWorkout.tabataRounds,
            emomInterval: customWorkout.emomInterval,
            emomRounds: customWorkout.emomRounds,
          }}
          onStart={(mode, minutes, withWarmup, kraftConfig, exercises, _name, timerCfg) => {
            beginFromWizard(mode, minutes, withWarmup, kraftConfig, exercises, timerCfg)
          }}
        />
      </div>
    )
  } // end !wod && customWorkout

  const catalogWod = wod
  const timerMode: TimerMode = catalogWod.prescription?.kind === 'strength'
    ? 'krafttraining'
    : (WOD_TYPE_TO_MODE[catalogWod.type] ?? 'fortime')
  const catalogItems = prescriptionItems(catalogWod)
  const catalogMinutes = catalogWod.estimated_minutes > 0 ? catalogWod.estimated_minutes : 20
  const catalogScheme = catalogWod.prescription?.scheme || composeWorkoutScheme({
    runden: catalogWod.runden,
    reps: catalogWod.reps,
    exercises: catalogWod.exercises,
    description: catalogWod.description,
  })
  const sessionExercises = sessionItems
  const isAdjusted =
    sessionMinutes !== catalogMinutes
    || exerciseSig(sessionItems) !== exerciseSig(catalogItems)
    || sessionScheme !== catalogScheme

  function saveAsCustom() {
    const name = `${catalogWod.name} (angepasst)`
    const existing = customWorkouts.find((w) => w.name === name)
    const payload = {
      id: existing?.id ?? crypto.randomUUID(),
      name,
      mode: timerMode,
      minutes: sessionMinutes,
      exercises: sessionExercises,
      equipment: catalogWod.equipment ?? [],
      scheme: sessionScheme || undefined,
      createdAt: existing?.createdAt ?? new Date().toISOString(),
    }
    const mut = existing ? updateWorkout : addWorkout
    mut.mutate(payload, {
        onSuccess: () => toast.success(`Bei eigenen Workouts gespeichert: „${name}“`),
      onError: () => toast.error('Speichern fehlgeschlagen'),
    })
  }

  function resetAdjust() {
    setSessionMinutes(catalogMinutes)
    setSessionItems(catalogItems)
    setSessionScheme(catalogScheme)
  }

  return (
    <div className={showTimer ? 'space-y-2' : 'space-y-5'}>
      {showTimer ? (
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => { setShowTimer(false); setShowWarmupTimer(false) }}
            aria-label="Timer schliessen"
            className="text-lg leading-none"
            style={{ color: 'var(--color-text-muted)', background: 'none', border: 'none', minWidth: 36, minHeight: 36 }}
          >
            ←
          </button>
          <p className="text-sm font-bold truncate" style={{ color: 'var(--color-text)' }}>{wod.name}</p>
        </div>
      ) : (
      <>
      {/* Header */}
      <div className="flex items-start gap-3">
        <button
          onClick={onBack}
          className="mt-0.5 text-[var(--color-text-muted)] hover:text-[var(--color-text)] text-lg leading-none"
        >
          ←
        </button>
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-black text-[var(--color-text)]">{wod.name}</h2>
          <div className="flex gap-2 mt-1 flex-wrap">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#E8642A]/20 text-[#E8642A]">
              {getWodTypeLabel(wod.type, lang)}
            </span>
            <span className="text-xs text-[var(--color-text-muted)]">{wod.category}</span>
            {sessionMinutes > 0 && (
              <span className="text-xs text-[var(--color-text-muted)]">~{sessionMinutes} min</span>
            )}
          </div>
        </div>
        <FavoriteButton contentType="wod" contentId={wod.name} color="#E8642A" />
      </div>

      {/* Description */}
      <div className="bg-[var(--color-bg-card)] rounded-[var(--radius-md)] p-4 space-y-3">
        <p className="text-[var(--color-text)] text-sm leading-relaxed">{wod.description}</p>

        <div>
          {(sessionScheme || adjustOpen) && (
            <div className="mb-3">
              <p className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide mb-1">
                Ablauf
              </p>
              {adjustOpen ? (
                <input
                  type="text"
                  value={sessionScheme}
                  onChange={(e) => setSessionScheme(e.target.value)}
                  placeholder="z. B. 3 Runden · 21-15-9"
                  aria-label="Ablauf"
                  className="w-full rounded-xl px-3 py-2 text-sm outline-none"
                  style={{
                    backgroundColor: 'var(--color-bg)',
                    color: 'var(--color-text)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                />
              ) : (
                <p className="text-sm font-semibold text-[var(--color-text)]">{sessionScheme}</p>
              )}
            </div>
          )}
          <p className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide mb-2">
            Übungen
          </p>
          {adjustOpen ? (
            <ExerciseListEditor items={sessionItems} onChange={setSessionItems} fromCatalog />
          ) : sessionItems.length > 0 ? (
            <ol className="space-y-1">
              {sessionItems.map((item, i) => (
                <li key={item.id} className="flex items-start gap-2 text-sm">
                  <span className="text-xs text-[var(--color-text-muted)] w-5 shrink-0 mt-0.5">{i + 1}.</span>
                  <span className="text-[var(--color-text)]">
                    {item.name}
                    {item.detail ? (
                      <span className="text-[var(--color-text-muted)]"> · {item.detail}</span>
                    ) : item.sets && item.rep_count ? (
                      <span className="text-[var(--color-text-muted)]"> · {item.sets}×{item.rep_count}</span>
                    ) : null}
                  </span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Keine Übungen hinterlegt</p>
          )}
        </div>

        <div>
          <p className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide mb-2">
            Dauer
          </p>
          {adjustOpen ? (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSessionMinutes((m) => Math.max(1, m - 1))}
                className="w-9 h-9 rounded-xl text-lg font-semibold"
                style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)', border: '1px solid rgba(255,255,255,0.08)' }}
                aria-label="Dauer minus"
              >
                −
              </button>
              <span className="text-sm font-semibold text-[var(--color-text)] tabular-nums w-16 text-center">
                {sessionMinutes} min
              </span>
              <button
                type="button"
                onClick={() => setSessionMinutes((m) => Math.min(180, m + 1))}
                className="w-9 h-9 rounded-xl text-lg font-semibold"
                style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)', border: '1px solid rgba(255,255,255,0.08)' }}
                aria-label="Dauer plus"
              >
                +
              </button>
              {isAdjusted && (
                <button
                  type="button"
                  onClick={resetAdjust}
                  className="text-xs font-semibold ml-auto"
                  style={{ color: 'var(--color-text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Zurücksetzen
                </button>
              )}
            </div>
          ) : (
            <p className="text-sm font-semibold text-[var(--color-text)] tabular-nums">{sessionMinutes} min</p>
          )}
          <div className="flex gap-2 mt-3">
            <button
              type="button"
              onClick={() => setAdjustOpen((v) => !v)}
              className="flex-1 text-xs font-semibold px-3 py-2 rounded-xl"
              style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {adjustOpen ? 'Fertig' : 'Temporär anpassen'}
            </button>
            <button
              type="button"
              onClick={saveAsCustom}
              disabled={addWorkout.isPending || updateWorkout.isPending}
              className="flex-1 text-xs font-semibold px-3 py-2 rounded-xl"
              style={{ backgroundColor: '#E8642A18', color: '#E8642A', border: 'none', cursor: 'pointer' }}
            >
              {addWorkout.isPending || updateWorkout.isPending ? 'Speichert…' : 'Bei eigenen speichern'}
            </button>
          </div>
          {adjustOpen && (
            <p className="text-xs mt-2" style={{ color: 'var(--color-text-muted)' }}>
              Timer nutzt {sessionMinutes} min — nur diese Session, Katalog bleibt unverändert.
            </p>
          )}
        </div>

        {wod.reps && !sessionScheme && (
          <div>
            <p className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide mb-1">
              Reps / Scheme
            </p>
            <p className="text-sm text-[var(--color-text)] font-mono">{wod.reps}</p>
          </div>
        )}

        {wod.gewicht && (
          <div>
            <p className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide mb-1">
              Weight
            </p>
            <p className="text-sm text-[var(--color-text)]">{wod.gewicht} kg</p>
          </div>
        )}

        {customWorkout?.tabataRounds && (
          <div>
            <p className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide mb-1">Tabata</p>
            <p className="text-sm text-[var(--color-text)] font-mono">
              {customWorkout.tabataRounds}× {customWorkout.tabataWork}s Work / {customWorkout.tabataRest}s Pause
            </p>
          </div>
        )}
        {customWorkout?.emomRounds && (
          <div>
            <p className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide mb-1">EMOM</p>
            <p className="text-sm text-[var(--color-text)] font-mono">
              {customWorkout.emomRounds}× {customWorkout.emomInterval}min
            </p>
          </div>
        )}

        {/* Equipment */}
        {(wod.equipment ?? []).length > 0 && (
          <div>
            <p className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide mb-2">
              Equipment
            </p>
            <div className="flex flex-wrap gap-1.5">
              {(wod.equipment ?? []).map((eq) => {
                const eqColor = EQUIPMENT_COLORS[eq]
                return (
                  <span
                    key={eq}
                    className="text-xs px-2 py-1 rounded-full font-medium"
                    style={eqColor
                      ? { backgroundColor: `${eqColor}20`, color: eqColor }
                      : { backgroundColor: 'rgba(255,255,255,0.08)', color: 'var(--color-text-muted)' }
                    }
                  >
                    {eq}
                  </span>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Warmup accordion */}
      <div className="bg-[var(--color-bg-card)] rounded-[var(--radius-md)] overflow-hidden">
        <button
          onClick={() => setShowWarmup((v) => !v)}
          className="w-full flex items-center justify-between px-4 py-3"
        >
          <span className="text-sm font-semibold text-[var(--color-text)]">🔥 Warmup</span>
          <span className="text-[var(--color-text-muted)]">{showWarmup ? '▲' : '▼'}</span>
        </button>
        {showWarmup && (
          <div className="px-4 pb-4 space-y-3">
            {getWarmupRoutine(wod).map((ex, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-xs font-bold text-[var(--color-text-muted)] mt-0.5 w-4 shrink-0">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-medium text-[var(--color-text)]">{ex.name}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">{ex.desc} · {ex.sek}s</p>
                </div>
              </div>
            ))}
            <button
              onClick={() => { setWarmupRoutine('standard'); setShowWarmupTimer(true) }}
              className="mt-1 flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-xl transition-colors"
              style={{ backgroundColor: '#E8642A18', color: '#E8642A' }}
            >
              <span>⏱</span>
              <span>Warmup-Timer starten</span>
            </button>
          </div>
        )}
      </div>

      {/* Scaling — only when substitution_enabled */}
      {(wod.skal_leicht || wod.skal_schwer) &&
        localStorage.getItem('carveout_substitution_enabled') !== 'false' && (
        <div className="bg-[var(--color-bg-card)] rounded-[var(--radius-md)] p-4 space-y-3">
          <p className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">
            Scaling
          </p>
          {wod.skal_leicht && (
            <div>
              <p className="text-xs text-green-400 mb-0.5">Easier</p>
              <p className="text-sm text-[var(--color-text)]">{wod.skal_leicht}</p>
            </div>
          )}
          {wod.skal_schwer && (
            <div>
              <p className="text-xs text-orange-400 mb-0.5">Harder</p>
              <p className="text-sm text-[var(--color-text)]">{wod.skal_schwer}</p>
            </div>
          )}
        </div>
      )}

      {/* Personal best */}
      {personalBest && (
        <div className="bg-[#E8642A]/10 border border-[#E8642A]/20 rounded-[var(--radius-md)] p-4 flex items-center gap-3">
          <span className="text-2xl">🏆</span>
          <div>
            <p className="text-xs text-[#E8642A] font-medium uppercase tracking-wide">Personal Best</p>
            <p className="text-lg font-bold text-[var(--color-text)]">
              {personalBest.score_value}{' '}
              <span className="text-sm font-normal text-[var(--color-text-muted)] capitalize">
                ({personalBest.score_type})
              </span>
            </p>
          </div>
        </div>
      )}

      {/* CTA buttons */}
      {!showTimer ? (
        <div className="flex gap-3">
          {(() => {
            const musicUrl = localStorage.getItem('carveout_music_workout')
            return musicUrl ? (
              <button
                onClick={() => window.open(musicUrl, '_blank')}
                title="Musik öffnen"
                className="px-4 py-3.5 rounded-xl font-semibold text-sm active:scale-[0.98] transition-transform"
                style={{ backgroundColor: '#E8642A18', color: '#E8642A', border: '1px solid #E8642A40' }}
              >
                🎵
              </button>
            ) : null
          })()}
          <button
            onClick={openStartWizard}
            className="flex-1 py-3.5 rounded-xl bg-[#E8642A] text-white font-semibold text-base active:scale-[0.98] transition-transform"
          >
            ▶ Start Timer
          </button>
          <button
            onClick={() => { setWarmupRoutine('standard'); setShowWarmupTimer(true) }}
            className="px-4 py-3.5 rounded-xl font-semibold text-sm active:scale-[0.98] transition-transform"
            style={{ backgroundColor: '#E8642A18', color: '#E8642A', border: '1px solid #E8642A40' }}
          >
            🔥 Warmup
          </button>
          <button
            onClick={() => setShowScore(true)}
            className="px-4 py-3.5 rounded-xl border border-[#E8642A]/40 text-[#E8642A] font-semibold text-sm active:scale-[0.98] transition-transform"
          >
            Log
          </button>
        </div>
      ) : (
        <div className="flex gap-3">
          <button
            onClick={() => { setShowTimer(false); setShowWarmupTimer(false) }}
            className="flex-1 py-3 rounded-xl text-sm font-semibold"
            style={{ backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text-muted)' }}
          >
            ✕ Timer schließen
          </button>
          <button
            onClick={() => setShowScore(true)}
            className="px-4 py-3 rounded-xl border border-[#E8642A]/40 text-[#E8642A] font-semibold text-sm"
          >
          Log
        </button>
      </div>
      )}
      </>
      )}

      {/* Embedded timer */}
      {showTimer && launch?.mode === 'krafttraining' && launch.kraft ? (
        <div className="bg-[var(--color-bg-card)] rounded-[var(--radius-lg)] p-2">
          <KraftTimerView
            exercises={launch.kraft.exercises}
            restBetweenSets={launch.kraft.restBetweenSets}
            restBetweenExercises={launch.kraft.restBetweenExercises}
            workoutName={catalogWod.name}
            onComplete={() => {
              track('workout_completed', { wod_id: catalogWod.id, duration_min: sessionMinutes, category: catalogWod.category })
              window.dispatchEvent(new CustomEvent('carveout:workout-completed'))
            }}
          />
        </div>
      ) : showTimer ? (
        <div className="bg-[var(--color-bg-card)] rounded-[var(--radius-lg)] p-2">
          <TimerView
            key={`${launch?.mode ?? timerMode}-${launch?.minutes ?? sessionMinutes}-${launch?.scheme ?? sessionScheme}-${exerciseSig(launch?.exercises ?? sessionItems)}`}
            initialMode={(launch?.mode && launch.mode !== 'krafttraining' ? launch.mode : timerMode === 'krafttraining' ? 'fortime' : timerMode)}
            initialMinutes={launch?.minutes ?? sessionMinutes}
            scheme={(launch ? launch.scheme : sessionScheme) || undefined}
            {...((launch?.mode ?? timerMode) === 'emom'
              ? {
                  initialEmomInterval: launch?.emomInterval ?? 1,
                  initialEmomRounds: launch?.emomRounds ?? Math.max(1, launch?.minutes ?? sessionMinutes),
                }
              : {})}
            {...((launch?.mode ?? timerMode) === 'tabata'
              ? {
                  initialTabataWork: launch?.tabataWork ?? 20,
                  initialTabataRest: launch?.tabataRest ?? 10,
                  initialTabataRounds: launch?.tabataRounds ?? Math.max(1, Math.round(((launch?.minutes ?? sessionMinutes) * 60) / 30)),
                }
              : {})}
            adHocLog
            workoutName={catalogWod.name}
            exercises={(launch?.exercises ?? sessionExercises).length > 0 ? (launch?.exercises ?? sessionExercises) : (customExercises.length > 0 ? customExercises : undefined)}
            onComplete={() => {
              track('workout_completed', { wod_id: catalogWod.id, duration_min: sessionMinutes, category: catalogWod.category })
              window.dispatchEvent(new CustomEvent('carveout:workout-completed'))
            }}
          />
        </div>
      ) : null}

      {!showTimer && (
        <button
          onClick={() => setShowHistory((v) => !v)}
          className="w-full text-left py-3 border-t border-white/8 flex items-center justify-between"
        >
          <span className="text-sm font-medium text-[var(--color-text-muted)]">My History</span>
          <span className="text-[var(--color-text-muted)]">{showHistory ? '▲' : '▼'}</span>
        </button>
      )}

      {showHistory && !showTimer && <WodHistoryList wodName={wodName} />}

      {/* Score input modal */}
      <ScoreInput
        wodName={wodName}
        isOpen={showScore}
        onClose={() => setShowScore(false)}
        onSave={(entry) => {
          addEntry.mutate(entry)
          setShowScore(false)
        }}
        isPending={addEntry.isPending}
      />

      <WarmupTimer
        isOpen={showWarmupTimer}
        routine={warmupRoutine}
        onClose={() => setShowWarmupTimer(false)}
        onStartWorkout={() => { setShowWarmupTimer(false); setShowWorkoutCountdown(true) }}
      />
      <WorkoutCountdown
        isOpen={showWorkoutCountdown}
        onComplete={() => { setShowWorkoutCountdown(false); setShowTimer(true) }}
      />
      <FreeTimerWizard
        key={startKey}
        isOpen={startOpen}
        onClose={() => setStartOpen(false)}
        variant="adhoc"
        title={catalogWod.name}
        initialStep={1}
        initialValues={{
          name: catalogWod.name,
          mode: timerMode,
          minutes: sessionMinutes,
          exercises: sessionItems,
          scheme: sessionScheme,
          restBetweenSets: catalogWod.prescription?.restBetweenSets,
        }}
        onStart={(mode, minutes, withWarmup, kraftConfig, exercises, _name, timerCfg) => {
          beginFromWizard(mode, minutes, withWarmup, kraftConfig, exercises, timerCfg)
        }}
      />
    </div>
  )
}
