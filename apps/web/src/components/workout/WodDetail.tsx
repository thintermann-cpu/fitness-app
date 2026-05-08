import { useState } from 'react'
import { useWod } from '../../hooks/useWods'
import type { Wod } from '../../hooks/useWods'
import { useWodHistory } from '../../hooks/useWodHistory'
import { TimerView } from './TimerView'
import { ScoreInput } from './ScoreInput'
import { WodHistoryList } from './WodHistoryList'

type TimerMode = 'fortime' | 'amrap' | 'emom' | 'tabata'

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
    { name: 'Jumping Jacks',           desc: 'Arme und Beine gleichzeitig spreizen',          sek: 40 },
    { name: 'Hip Hinge',               desc: 'Langsam vorwärts beugen, Rücken gerade',        sek: 30 },
    { name: 'Shoulder Circles',        desc: 'Große Kreise mit beiden Armen',                 sek: 30 },
    { name: 'Air Squats',              desc: 'Tief in die Knie, Brust hoch',                  sek: 40 },
    { name: 'Inchworms',               desc: 'Hände zum Boden, langsam vorwärts laufen',      sek: 40 },
    { name: 'Barbell PVC Pass-Through', desc: 'Leichte Stange über den Kopf, Hüfte öffnen',  sek: 40 },
  ],
  Kettlebell: [
    { name: 'Jumping Jacks', desc: 'Arme und Beine gleichzeitig spreizen',              sek: 40 },
    { name: 'Hip Circles',   desc: 'Hüfte in großen Kreisen drehen',                    sek: 30 },
    { name: 'Arm Circles',   desc: 'Große Kreise mit beiden Armen',                     sek: 30 },
    { name: 'Goblet Squat Hold', desc: 'Knie halten, Hüfte öffnen – 3 Sek halten',     sek: 40 },
    { name: 'Good Mornings', desc: 'Hände am Hinterkopf, Rücken gerade vorwärts',       sek: 40 },
    { name: 'KB Halos',      desc: 'Kettlebell langsam um den Kopf kreisen',             sek: 40 },
  ],
  Rower: [
    { name: 'Jumping Jacks',   desc: 'Arme und Beine gleichzeitig spreizen',            sek: 40 },
    { name: 'Hip Hinge',       desc: 'Vorwärts beugen, Rücken gerade',                  sek: 30 },
    { name: 'Torso Rotation',  desc: 'Oberkörper links und rechts drehen',              sek: 30 },
    { name: 'Leg Swings',      desc: 'Bein vor und zurück schwingen',                   sek: 30 },
    { name: 'Easy Row',        desc: 'Sehr leichtes Rudern – Technik einüben',          sek: 60 },
    { name: 'Burpees',         desc: 'Körper aufwärmen, Puls erhöhen',                  sek: 40 },
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

const TYPE_TO_TIMER_MODE: Record<string, TimerMode> = {
  ForTime: 'fortime',
  AMRAP: 'amrap',
  EMOM: 'emom',
  Tabata: 'tabata',
}

interface Props {
  wodName: string
  onBack: () => void
}

export function WodDetail({ wodName, onBack }: Props) {
  const { data: wod, isLoading } = useWod(wodName)
  const { personalBest, addEntry } = useWodHistory(wodName)
  const [showTimer, setShowTimer]     = useState(false)
  const [showScore, setShowScore]     = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [showWarmup, setShowWarmup]   = useState(false)

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

  const timerMode = TYPE_TO_TIMER_MODE[wod.type] ?? 'fortime'

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
              {wod.type}
            </span>
            <span className="text-xs text-[var(--color-text-muted)]">{wod.category}</span>
            {wod.estimated_minutes > 0 && (
              <span className="text-xs text-[var(--color-text-muted)]">~{wod.estimated_minutes} min</span>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-[var(--color-bg-card)] rounded-[var(--radius-md)] p-4 space-y-3">
        <p className="text-[var(--color-text)] text-