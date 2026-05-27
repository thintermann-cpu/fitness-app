import { useState, useMemo } from 'react'
import type { StretchingExercise, StretchingRoutine } from '../../hooks/useStretching'

const PILLAR_COLOR = '#7BC67E'

type Lang = 'de' | 'en' | 'es'
type YogaCategory = 'all' | 'morgen' | 'recovery' | 'yin' | 'core' | 'abend'
type DurFilter = 0 | 15 | 25 | 30

interface YogaFlowDef {
  id: string
  name: string
  duration: number
  level: 'anfänger' | 'mittel' | 'fortgeschritten'
  focus: string
  category: Exclude<YogaCategory, 'all'>
  exerciseHints: string[]
  holdTime: number
}

const LEVEL_BADGE: Record<YogaFlowDef['level'], string> = {
  anfänger:        'Anfänger',
  mittel:          'Mittel',
  fortgeschritten: 'Fortgeschritten',
}

const CAT_OPTIONS: YogaCategory[] = ['all', 'morgen', 'recovery', 'yin', 'core', 'abend']

const CAT_LABELS: Record<YogaCategory, Record<Lang, string>> = {
  all:      { de: 'Alle',         en: 'All',              es: 'Todas' },
  morgen:   { de: 'Morgen',       en: 'Morning',          es: 'Mañana' },
  recovery: { de: 'Recovery',     en: 'Recovery',         es: 'Recuperación' },
  yin:      { de: 'Yin',          en: 'Yin',              es: 'Yin' },
  core:     { de: 'Core & Kraft', en: 'Core & Strength',  es: 'Core & Fuerza' },
  abend:    { de: 'Abend',        en: 'Evening',          es: 'Tarde' },
}

const DUR_OPTIONS: DurFilter[] = [0, 15, 25, 30]

const DUR_LABELS: Record<DurFilter, Record<Lang, string>> = {
  0:  { de: 'Alle',      en: 'All',       es: 'Todas' },
  15: { de: '≤15 Min',   en: '≤15 min',   es: '≤15 min' },
  25: { de: '20–25 Min', en: '20–25 min', es: '20–25 min' },
  30: { de: '30+ Min',   en: '30+ min',   es: '30+ min' },
}

const YOGA_FLOWS: YogaFlowDef[] = [
  // — Original 5 flows (category added) —
  {
    id: 'flow-morgen',
    name: 'Morgen-Flow',
    duration: 10,
    level: 'anfänger',
    focus: 'Sanftes Aufwärmen',
    category: 'morgen',
    exerciseHints: ['cat', 'cow', 'downward', 'child', 'mountain', 'bridge', 'savasana'],
    holdTime: 30,
  },
  {
    id: 'flow-hueft',
    name: 'Hüft-Öffner',
    duration: 15,
    level: 'mittel',
    focus: 'Hüftflexoren & Piriformis',
    category: 'recovery',
    exerciseHints: ['cat', 'pigeon', 'warrior', 'triangle', 'child'],
    holdTime: 45,
  },
  {
    id: 'flow-ruecken',
    name: 'Rücken-Relief',
    duration: 12,
    level: 'anfänger',
    focus: 'Unterer Rücken',
    category: 'recovery',
    exerciseHints: ['cat', 'child', 'cobra', 'supine', 'bridge', 'savasana'],
    holdTime: 40,
  },
  {
    id: 'flow-power',
    name: 'Power-Flow',
    duration: 20,
    level: 'mittel',
    focus: 'Kraft + Flexibilität',
    category: 'core',
    exerciseHints: ['sun', 'warrior', 'triangle', 'chair', 'chaturanga', 'upward', 'downward', 'pigeon'],
    holdTime: 30,
  },
  {
    id: 'flow-schlaf',
    name: 'Schlaf-Flow',
    duration: 10,
    level: 'anfänger',
    focus: 'Abendliche Entspannung',
    category: 'abend',
    exerciseHints: ['child', 'seated', 'supine', 'bridge', 'savasana'],
    holdTime: 45,
  },
  // — 20 neue Flows —
  {
    id: 'yoga-morning-quick',
    name: 'Schneller Morgen-Start',
    duration: 10,
    level: 'anfänger',
    focus: 'Energie-Boost',
    category: 'morgen',
    exerciseHints: ['cat', 'downward', 'warrior', 'cobra', 'child', 'mountain'],
    holdTime: 45,
  },
  {
    id: 'yoga-recovery-quick',
    name: 'Schnelle Erholung',
    duration: 10,
    level: 'anfänger',
    focus: 'Minimale Zeit, maximale Wirkung',
    category: 'recovery',
    exerciseHints: ['child', 'cat', 'pigeon', 'butterfly', 'savasana'],
    holdTime: 60,
  },
  {
    id: 'yoga-core-quick',
    name: 'Quick Core Activation',
    duration: 10,
    level: 'anfänger',
    focus: 'Core-Aktivierung',
    category: 'core',
    exerciseHints: ['mountain', 'plank', 'side', 'cobra', 'downward', 'child'],
    holdTime: 35,
  },
  {
    id: 'yoga-evening-quick',
    name: 'Kurze Abend-Auszeit',
    duration: 10,
    level: 'anfänger',
    focus: 'Entspannungsmodus',
    category: 'abend',
    exerciseHints: ['child', 'cat', 'butterfly', 'supine', 'savasana'],
    holdTime: 60,
  },
  {
    id: 'yoga-morning-sun-a',
    name: 'Sonnengruss A',
    duration: 15,
    level: 'anfänger',
    focus: 'Klassischer Sonnengruss',
    category: 'morgen',
    exerciseHints: ['mountain', 'forward', 'plank', 'cobra', 'downward', 'warrior'],
    holdTime: 45,
  },
  {
    id: 'yoga-recovery-upper',
    name: 'Schultern & Rücken Release',
    duration: 15,
    level: 'anfänger',
    focus: 'Oberkörper Release',
    category: 'recovery',
    exerciseHints: ['cat', 'child', 'thread', 'twist', 'fish', 'savasana'],
    holdTime: 60,
  },
  {
    id: 'yoga-yin-basics',
    name: 'Yin Basics',
    duration: 15,
    level: 'anfänger',
    focus: 'Einstieg in Yin Yoga',
    category: 'yin',
    exerciseHints: ['butterfly', 'pigeon', 'child', 'supine', 'savasana'],
    holdTime: 90,
  },
  {
    id: 'yoga-evening-nidra-prep',
    name: 'Yoga Nidra Vorbereitung',
    duration: 15,
    level: 'anfänger',
    focus: 'Vorbereitung Tiefenentspannung',
    category: 'abend',
    exerciseHints: ['child', 'cat', 'butterfly', 'supine', 'wall', 'savasana'],
    holdTime: 75,
  },
  {
    id: 'yoga-morning-sun-b',
    name: 'Sonnengruss B',
    duration: 20,
    level: 'mittel',
    focus: 'Kraft & Wärme',
    category: 'morgen',
    exerciseHints: ['chair', 'forward', 'plank', 'cobra', 'downward', 'warrior', 'mountain'],
    holdTime: 40,
  },
  {
    id: 'yoga-recovery-legs',
    name: 'Beine & Hüften Recovery',
    duration: 20,
    level: 'anfänger',
    focus: 'Beine und Hüften',
    category: 'recovery',
    exerciseHints: ['butterfly', 'figure', 'pigeon', 'wall', 'savasana'],
    holdTime: 75,
  },
  {
    id: 'yoga-core-foundation',
    name: 'Core Foundation',
    duration: 20,
    level: 'anfänger',
    focus: 'Rumpfstabilität',
    category: 'core',
    exerciseHints: ['mountain', 'plank', 'side', 'boat', 'cobra', 'downward', 'warrior', 'child'],
    holdTime: 40,
  },
  {
    id: 'yoga-evening-gentle',
    name: 'Sanfte Abend-Routine',
    duration: 20,
    level: 'anfänger',
    focus: 'Übergang Tag zu Nacht',
    category: 'abend',
    exerciseHints: ['child', 'cat', 'figure', 'butterfly', 'wall', 'savasana'],
    holdTime: 75,
  },
  {
    id: 'yoga-morning-vinyasa',
    name: 'Vinyasa Energie-Flow',
    duration: 25,
    level: 'mittel',
    focus: 'Kraft, Balance & Beweglichkeit',
    category: 'morgen',
    exerciseHints: ['mountain', 'sun', 'warrior', 'triangle', 'tree', 'downward', 'child'],
    holdTime: 45,
  },
  {
    id: 'yoga-recovery-full',
    name: 'Full Body Recovery',
    duration: 25,
    level: 'mittel',
    focus: 'Vollständige Körpererholung',
    category: 'recovery',
    exerciseHints: ['child', 'cat', 'thread', 'downward', 'pigeon', 'butterfly', 'savasana'],
    holdTime: 75,
  },
  {
    id: 'yoga-core-power',
    name: 'Power Core',
    duration: 25,
    level: 'mittel',
    focus: 'Intensives Core-Training',
    category: 'core',
    exerciseHints: ['mountain', 'plank', 'side', 'boat', 'downward', 'warrior', 'chair', 'child'],
    holdTime: 50,
  },
  {
    id: 'yoga-evening-stress',
    name: 'Stress-Release Abend',
    duration: 25,
    level: 'anfänger',
    focus: 'Aktiver Stress-Abbau',
    category: 'abend',
    exerciseHints: ['child', 'cat', 'forward', 'twist', 'butterfly', 'pigeon', 'savasana'],
    holdTime: 75,
  },
  {
    id: 'yoga-morning-power',
    name: 'Morning Power Flow',
    duration: 30,
    level: 'fortgeschritten',
    focus: 'Intensive Morgensequenz',
    category: 'morgen',
    exerciseHints: ['sun', 'warrior', 'eagle', 'plank', 'side', 'boat', 'cobra', 'downward', 'forward', 'mountain'],
    holdTime: 50,
  },
  {
    id: 'yoga-yin-hips',
    name: 'Hüft-Yin',
    duration: 30,
    level: 'anfänger',
    focus: 'Yin Yoga für die Hüften',
    category: 'yin',
    exerciseHints: ['butterfly', 'pigeon', 'dragon', 'savasana'],
    holdTime: 150,
  },
  {
    id: 'yoga-core-balance',
    name: 'Balance & Kraft',
    duration: 30,
    level: 'mittel',
    focus: 'Balance & Stabilisatoren',
    category: 'core',
    exerciseHints: ['mountain', 'tree', 'warrior', 'eagle', 'plank', 'side', 'boat', 'child'],
    holdTime: 50,
  },
  {
    id: 'yoga-evening-deep',
    name: 'Tiefe Nacht-Entspannung',
    duration: 30,
    level: 'anfänger',
    focus: 'Maximale Entspannung',
    category: 'abend',
    exerciseHints: ['child', 'cat', 'figure', 'butterfly', 'pigeon', 'wall', 'savasana'],
    holdTime: 110,
  },
]

interface Props {
  exercises: StretchingExercise[]
  lang: Lang
  onSelectFlow: (routine: StretchingRoutine, holdTime: number) => void
}

export function YogaTab({ exercises, lang, onSelectFlow }: Props) {
  const [catFilter, setCatFilter] = useState<YogaCategory>('all')
  const [durFilter, setDurFilter] = useState<DurFilter>(0)

  const resolvedFlows = useMemo(() => {
    return YOGA_FLOWS.map((flow) => {
      const matched = flow.exerciseHints
        .map((hint) => exercises.find((e) => e.name_en.toLowerCase().includes(hint.toLowerCase())))
        .filter((e): e is NonNullable<typeof e> => e !== undefined)
      const unique = matched.filter((e, i, arr) => arr.findIndex((x) => x.id === e.id) === i)
      const routine: StretchingRoutine = {
        id:           flow.id,
        name:         flow.name,
        description:  flow.focus,
        goal:         'yoga_flow',
        difficulty:   flow.level === 'fortgeschritten' ? 'advanced' : flow.level === 'mittel' ? 'intermediate' : 'beginner',
        duration_min: flow.duration,
        exercise_ids: unique.map((e) => e.id),
        subcategory:  'yoga_flow',
      }
      return { routine, flow, exerciseCount: unique.length }
    })
  }, [exercises])

  const filtered = useMemo(() => {
    return resolvedFlows.filter(({ flow }) => {
      if (catFilter !== 'all' && flow.category !== catFilter) return false
      if (durFilter === 15 && flow.duration > 15) return false
      if (durFilter === 25 && (flow.duration < 20 || flow.duration > 25)) return false
      if (durFilter === 30 && flow.duration < 30) return false
      return true
    })
  }, [resolvedFlows, catFilter, durFilter])

  return (
    <div className="pb-4">
      {/* Category filter */}
      <div className="px-4 pt-3 pb-1">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {CAT_OPTIONS.map((cat) => (
            <button
              key={cat}
              onClick={() => setCatFilter(cat)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
              style={
                catFilter === cat
                  ? { backgroundColor: PILLAR_COLOR, color: '#fff' }
                  : { backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text-muted)' }
              }
            >
              {CAT_LABELS[cat][lang]}
            </button>
          ))}
        </div>
      </div>

      {/* Duration filter */}
      <div className="px-4 pb-3">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {DUR_OPTIONS.map((d) => (
            <button
              key={d}
              onClick={() => setDurFilter(d)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
              style={
                durFilter === d
                  ? { backgroundColor: `${PILLAR_COLOR}33`, color: PILLAR_COLOR, border: `1px solid ${PILLAR_COLOR}60` }
                  : { backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text-muted)', border: '1px solid transparent' }
              }
            >
              {DUR_LABELS[d][lang]}
            </button>
          ))}
        </div>
      </div>

      {/* Flow count */}
      <div className="px-4 pb-2">
        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          {filtered.length} {lang === 'de' ? 'Flows' : lang === 'es' ? 'flujos' : 'flows'}
        </span>
      </div>

      {/* Flow cards */}
      <div className="px-4 space-y-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <span className="text-4xl">🧘</span>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              {lang === 'de' ? 'Keine Flows gefunden.' : lang === 'es' ? 'No se encontraron flujos.' : 'No flows found.'}
            </p>
          </div>
        ) : (
          filtered.map(({ routine, flow, exerciseCount }) => (
            <div
              key={flow.id}
              className="rounded-[var(--radius-md)] border border-white/5 p-4"
              style={{ backgroundColor: 'var(--color-bg-card)' }}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="font-semibold text-[var(--color-text)]">{flow.name}</p>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full font-semibold shrink-0"
                  style={{ backgroundColor: `${PILLAR_COLOR}20`, color: PILLAR_COLOR }}
                >
                  {LEVEL_BADGE[flow.level]}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-2.5">
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded font-medium"
                  style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: 'var(--color-text-muted)' }}
                >
                  {CAT_LABELS[flow.category][lang]}
                </span>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  {flow.focus} · {flow.duration} min
                </p>
              </div>
              <button
                onClick={() => onSelectFlow(routine, flow.holdTime)}
                disabled={exerciseCount === 0}
                className="px-4 py-1.5 rounded-xl text-xs font-bold transition-opacity active:opacity-70 disabled:opacity-30"
                style={{ backgroundColor: `${PILLAR_COLOR}22`, color: PILLAR_COLOR }}
              >
                {exerciseCount === 0
                  ? (lang === 'de' ? 'Übungen werden geladen…' : lang === 'es' ? 'Cargando…' : 'Loading exercises…')
                  : (lang === 'de' ? '▶ Flow starten' : lang === 'es' ? '▶ Iniciar flow' : '▶ Start flow')}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
