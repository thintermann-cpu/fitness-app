import { useState } from 'react'
import { useWod } from '../../hooks/useWods'
import type { Wod } from '../../hooks/useWods'
import { useAuthStore } from '../../store/authStore'
import { getWodTypeLabel } from '../../lib/wodTypeLabels'
import { WOD_TYPE_TO_MODE } from '../../lib/timerLabels'
import { useWodHistory } from '../../hooks/useWodHistory'
import { TimerView } from './TimerView'
import { ScoreInput } from './ScoreInput'
import { WodHistoryList } from './WodHistoryList'
import { FavoriteButton } from '../ui/FavoriteButton'
import { WarmupTimer } from './WarmupTimer'

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
  const text = [wod.exercises, wod.description, wod.equipment.join(' ')].join(' ').toLowerCase()
  const hasLaufen = wod.equipment.some(e => e.toLowerCase() === 'laufen')
    || RUNNING_KEYWORDS.some(kw => text.includes(kw))
  if (hasLaufen) return WARMUP_ROUTINES.Laufen
  if (wod.equipment.some(e => /barbell/i.test(e))) return WARMUP_ROUTINES.Barbell
  if (wod.equipment.some(e => /kettlebell/i.test(e))) return WARMUP_ROUTINES.Kettlebell
  if (wod.equipment.some(e => /rower|row/i.test(e))) return WARMUP_ROUTINES.Rower
  return WARMUP_ROUTINES.Default
}

interface Props {
  wodName: string
  onBack: () => void
}

export function WodDetail({ wodName, onBack }: Props) {
  const lang = useAuthStore((s) => s.profile?.language ?? 'de')
  const { data: wod, isLoading } = useWod(wodName)
  const { personalBest, addEntry } = useWodHistory(wodName)
  const [showTimer, setShowTimer]           = useState(false)
  const [showScore, setShowScore]           = useState(false)
  const [showHistory, setShowHistory]       = useState(false)
  const [showWarmup, setShowWarmup]         = useState(false)
  const [showWarmupTimer, setShowWarmupTimer] = useState(false)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <span className="text-[var(--color-text-muted)]">Loading…</span>
      </div>
    )
  }

  if (!wod) {
    return (
      <div className="py-20 text-center">
        <p className="text-[var(--color-text-muted)]">WOD not found.</p>
        <button onClick={onBack} className="mt-4 text-[#E8642A] underline text-sm">
          Go back
        </button>
      </div>
    )
  }

  const timerMode = WOD_TYPE_TO_MODE[wod.type] ?? 'fortime'

  return (
    <div className="space-y-5">
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
            {wod.estimated_minutes > 0 && (
              <span className="text-xs text-[var(--color-text-muted)]">~{wod.estimated_minutes} min</span>
            )}
          </div>
        </div>
        <FavoriteButton contentType="wod" contentId={wod.name} color="#E8642A" />
      </div>

      {/* Description */}
      <div className="bg-[var(--color-bg-card)] rounded-[var(--radius-md)] p-4 space-y-3">
        <p className="text-[var(--color-text)] text-sm leading-relaxed">{wod.description}</p>

        {wod.exercises && (
          <div>
            <p className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide mb-1">
              Exercises
            </p>
            <p className="text-sm text-[var(--color-text)]">{wod.exercises}</p>
          </div>
        )}

        {wod.reps && (
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

        {/* Equipment */}
        {wod.equipment.length > 0 && (
          <div>
            <p className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide mb-2">
              Equipment
            </p>
            <div className="flex flex-wrap gap-1.5">
              {wod.equipment.map((eq) => {
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
              onClick={() => setShowWarmupTimer(true)}
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
      <div className="flex gap-3">
        <button
          onClick={() => setShowTimer((v) => !v)}
          className="flex-1 py-3.5 rounded-xl bg-[#E8642A] text-white font-semibold text-base active:scale-[0.98] transition-transform"
        >
          {showTimer ? 'Hide Timer' : '▶ Start Timer'}
        </button>
        <button
          onClick={() => setShowScore(true)}
          className="px-5 py-3.5 rounded-xl border border-[#E8642A]/40 text-[#E8642A] font-semibold text-sm active:scale-[0.98] transition-transform"
        >
          Log
        </button>
      </div>

      {/* Embedded timer */}
      {showTimer && (
        <div className="bg-[var(--color-bg-card)] rounded-[var(--radius-lg)] p-4">
          <TimerView
            initialMode={timerMode}
            initialMinutes={wod.estimated_minutes || 20}
            onComplete={() => setShowScore(true)}
          />
        </div>
      )}

      {/* History toggle */}
      <button
        onClick={() => setShowHistory((v) => !v)}
        className="w-full text-left py-3 border-t border-white/8 flex items-center justify-between"
      >
        <span className="text-sm font-medium text-[var(--color-text-muted)]">My History</span>
        <span className="text-[var(--color-text-muted)]">{showHistory ? '▲' : '▼'}</span>
      </button>

      {showHistory && <WodHistoryList wodName={wodName} />}

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
        onClose={() => setShowWarmupTimer(false)}
      />
    </div>
  )
}
