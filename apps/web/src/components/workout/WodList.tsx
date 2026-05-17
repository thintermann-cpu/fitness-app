import { useState } from 'react'
import { useAuthStore } from '../../store/authStore'
import { getWodTypeLabel } from '../../lib/wodTypeLabels'
import { useWods, pickRandomWod } from '../../hooks/useWods'
import { useToast } from '../../hooks/useToast'
import { FilterBottomSheet } from '../ui/FilterBottomSheet'
import { WodCard } from './WodCard'

const PILLAR_COLOR = '#E8642A'

const TYPES        = ['', 'AMRAP', 'ForTime', 'EMOM', 'Tabata']
const CATEGORIES   = ['', 'Girl WOD', 'Hero WOD', 'Other Benchmark', 'CrossFit Open', 'HomeWOD', 'Core WOD']
const DIFFICULTIES = ['', 'Beginner', 'Intermediate', 'Advanced']
const EXCLUDE_EQUIPMENT = ['Barbell', 'Kettlebell', 'Pull-up Bar', 'Rings', 'Jump Rope', 'Box']
const MIN_DUR_OPTIONS = [0, 5, 10, 15, 20]
const MAX_DUR_OPTIONS = [0, 10, 15, 20, 30, 45]

const SEARCH_KEY = 'wod_search'

interface Props {
  onSelectWod: (wodName: string) => void
  equipmentFilter?: string[]
  silentMode?: boolean
  wodCategory?: string
}

export function WodList({ onSelectWod, equipmentFilter, silentMode, wodCategory }: Props) {
  const lang  = useAuthStore((s) => s.profile?.language ?? 'de')
  const toast = useToast()

  const [search, setSearch]   = useState(() => sessionStorage.getItem(SEARCH_KEY) ?? '')
  const [page, setPage]       = useState(0)
  const [picking, setPicking] = useState(false)

  // Committed filter state
  const [type,       setType]       = useState('')
  const [category,   setCategory]   = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [editorsPick, setEditorsPick] = useState(false)
  const [minDur,     setMinDur]     = useState(0)
  const [maxDur,     setMaxDur]     = useState(0)
  const [excludeEq,  setExcludeEq]  = useState<string[]>([])

  // Draft state (while sheet is open)
  const [filterOpen,    setFilterOpen]    = useState(false)
  const [draftType,     setDraftType]     = useState('')
  const [draftCat,      setDraftCat]      = useState('')
  const [draftDiff,     setDraftDiff]     = useState('')
  const [draftPick,     setDraftPick]     = useState(false)
  const [draftMinDur,   setDraftMinDur]   = useState(0)
  const [draftMaxDur,   setDraftMaxDur]   = useState(0)
  const [draftExclude,  setDraftExclude]  = useState<string[]>([])

  const activeFilterCount =
    (type ? 1 : 0) + (category ? 1 : 0) + (difficulty ? 1 : 0) +
    (editorsPick ? 1 : 0) + ((minDur > 0 || maxDur > 0) ? 1 : 0) +
    (excludeEq.length > 0 ? 1 : 0)

  const openFilter = () => {
    setDraftType(type); setDraftCat(category); setDraftDiff(difficulty)
    setDraftPick(editorsPick); setDraftMinDur(minDur); setDraftMaxDur(maxDur)
    setDraftExclude(excludeEq)
    setFilterOpen(true)
  }

  const applyFilter = () => {
    setType(draftType); setCategory(draftCat); setDifficulty(draftDiff)
    setEditorsPick(draftPick); setMinDur(draftMinDur); setMaxDur(draftMaxDur)
    setExcludeEq(draftExclude)
    setPage(0)
    setFilterOpen(false)
  }

  const resetFilter = () => {
    setType(''); setCategory(''); setDifficulty('')
    setEditorsPick(false); setMinDur(0); setMaxDur(0); setExcludeEq([])
    setPage(0)
    setFilterOpen(false)
  }

  const toggleDraftExclude = (eq: string) =>
    setDraftExclude((prev) => prev.includes(eq) ? prev.filter((e) => e !== eq) : [...prev, eq])

  const { data, isLoading, isFetching, isError } = useWods({
    type:             type || undefined,
    category:         category || undefined,
    difficulty:       difficulty || undefined,
    search:           search || undefined,
    page,
    equipmentFilter:  equipmentFilter?.length ? equipmentFilter : undefined,
    excludeEquipment: excludeEq.length ? excludeEq : undefined,
    silentMode:       silentMode ?? false,
    minDuration:      minDur || undefined,
    maxDuration:      maxDur || undefined,
    editorsPick:      editorsPick || undefined,
    wodCategory:      wodCategory || undefined,
  })

  const wods    = data?.data  ?? []
  const total   = data?.count ?? 0
  const hasMore = (page + 1) * 20 < total

  const handleRandomPick = async () => {
    if (picking) return
    setPicking(true)
    const wod = await pickRandomWod({
      type:             type || undefined,
      category:         category || undefined,
      difficulty:       difficulty || undefined,
      search:           search || undefined,
      equipmentFilter:  equipmentFilter?.length ? equipmentFilter : undefined,
      excludeEquipment: excludeEq.length ? excludeEq : undefined,
      silentMode:       silentMode ?? false,
      minDuration:      minDur || undefined,
      maxDuration:      maxDur || undefined,
      editorsPick:      editorsPick || undefined,
      wodCategory:      wodCategory || undefined,
    })
    setPicking(false)
    if (!wod) { toast.info('Keine WODs gefunden'); return }
    toast.success(`Zufälliger WOD: ${wod.name}`)
    onSelectWod(wod.name)
  }

  return (
    <div className="space-y-3">
      {/* Search + Dice + Filter row */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
            🔍
          </span>
          <input
            type="search"
            value={search}
            onChange={(e) => {
              const v = e.target.value
              setSearch(v)
              sessionStorage.setItem(SEARCH_KEY, v)
              setPage(0)
            }}
            placeholder="Workouts suchen…"
            className="w-full bg-[var(--color-bg-card)] border border-white/8 rounded-xl pl-9 pr-4 py-3 text-[var(--color-text)] placeholder:text-[var(--color-text-subtle)] focus:outline-none focus:border-[#E8642A] text-sm"
          />
        </div>
        <button
          onClick={() => void handleRandomPick()}
          disabled={picking}
          title="Zufälliger WOD"
          className="flex items-center justify-center w-12 rounded-xl text-lg border transition-colors shrink-0"
          style={{
            backgroundColor: 'var(--color-bg-card)',
            borderColor: 'rgba(255,255,255,0.08)',
            color: picking ? 'var(--color-text-subtle)' : 'var(--color-text-muted)',
            cursor: picking ? 'wait' : 'pointer',
          }}
        >
          {picking ? '…' : '🎲'}
        </button>
        <button
          onClick={openFilter}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold shrink-0 transition-colors"
          style={
            activeFilterCount > 0
              ? { backgroundColor: `${PILLAR_COLOR}25`, color: PILLAR_COLOR, border: `1px solid ${PILLAR_COLOR}60` }
              : { backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text-muted)', border: '1px solid rgba(255,255,255,0.08)' }
          }
        >
          <svg width="11" height="11" viewBox="0 0 12 12" fill="currentColor">
            <path d="M1 2h10L7 6.5V10l-2-1V6.5L1 2z"/>
          </svg>
          {activeFilterCount > 0 ? `Filter · ${activeFilterCount}` : 'Filter'}
        </button>
      </div>

      {/* Count */}
      <p className="text-xs text-[var(--color-text-subtle)]">
        {total > 0 ? `${total} Workout${total !== 1 ? 's' : ''}` : isLoading ? '' : 'Keine Workouts gefunden'}
      </p>

      {/* List */}
      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-24 rounded-[var(--radius-md)] bg-[var(--color-bg-card)] animate-pulse" />
          ))}
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <span className="text-4xl">⚠️</span>
          <p className="text-sm text-[var(--color-text-muted)]">WODs konnten nicht geladen werden.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {wods.map((wod) => (
            <WodCard key={wod.id} wod={wod} onClick={() => onSelectWod(wod.name)} />
          ))}
        </div>
      )}

      {/* Load more */}
      {hasMore && (
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={isFetching}
          className="w-full py-3 rounded-xl border border-[#E8642A]/40 text-[#E8642A] font-medium text-sm disabled:opacity-50 active:scale-[0.98] transition-transform"
        >
          {isFetching ? 'Loading…' : 'Load more'}
        </button>
      )}

      {/* Filter Bottom Sheet */}
      <FilterBottomSheet
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={applyFilter}
        onReset={resetFilter}
        pillarColor={PILLAR_COLOR}
        activeCount={activeFilterCount}
        applyLabel={`${total > 0 ? `${total} ` : ''}Workouts anzeigen`}
        resetLabel="Zurücksetzen"
      >
        {/* Type */}
        <SheetSection label="Typ">
          <ChipRow
            options={TYPES}
            value={draftType}
            onChange={setDraftType}
            renderLabel={(v) => v ? getWodTypeLabel(v, lang) : 'Alle Typen'}
            color={PILLAR_COLOR}
          />
        </SheetSection>

        {/* Category */}
        <SheetSection label="Kategorie">
          <ChipRow
            options={CATEGORIES}
            value={draftCat}
            onChange={setDraftCat}
            renderLabel={(v) => v || 'Alle'}
            color={PILLAR_COLOR}
          />
        </SheetSection>

        {/* Difficulty */}
        <SheetSection label="Schwierigkeit">
          <ChipRow
            options={DIFFICULTIES}
            value={draftDiff}
            onChange={setDraftDiff}
            renderLabel={(v) => v || 'Alle'}
            color={PILLAR_COLOR}
          />
        </SheetSection>

        {/* Editor's Pick */}
        <SheetSection label="Kuratiert">
          <div style={{ display: 'flex', gap: 8 }}>
            {([false, true] as const).map((v) => (
              <button
                key={String(v)}
                onClick={() => setDraftPick(v)}
                style={{
                  padding: '7px 14px', borderRadius: 20, border: 'none',
                  fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                  backgroundColor: draftPick === v ? PILLAR_COLOR : 'rgba(255,255,255,0.07)',
                  color: draftPick === v ? 'white' : 'rgba(255,255,255,0.5)',
                }}
              >
                {v ? '⭐ Editor\'s Pick' : 'Alle'}
              </button>
            ))}
          </div>
        </SheetSection>

        {/* Duration range */}
        <SheetSection label="Dauer — Von">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {MIN_DUR_OPTIONS.map((d) => (
              <button
                key={d}
                onClick={() => setDraftMinDur(d)}
                style={{
                  padding: '7px 14px', borderRadius: 20, border: 'none',
                  fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                  backgroundColor: draftMinDur === d ? PILLAR_COLOR : 'rgba(255,255,255,0.07)',
                  color: draftMinDur === d ? 'white' : 'rgba(255,255,255,0.5)',
                }}
              >
                {d === 0 ? 'Kein Min.' : `${d} min`}
              </button>
            ))}
          </div>
        </SheetSection>

        <SheetSection label="Dauer — Bis">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {MAX_DUR_OPTIONS.map((d) => (
              <button
                key={d}
                onClick={() => setDraftMaxDur(d)}
                style={{
                  padding: '7px 14px', borderRadius: 20, border: 'none',
                  fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                  backgroundColor: draftMaxDur === d ? PILLAR_COLOR : 'rgba(255,255,255,0.07)',
                  color: draftMaxDur === d ? 'white' : 'rgba(255,255,255,0.5)',
                }}
              >
                {d === 0 ? 'Kein Max.' : `≤${d} min`}
              </button>
            ))}
          </div>
        </SheetSection>

        {/* Equipment exclude */}
        <SheetSection label="Equipment ausschliessen" last>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {EXCLUDE_EQUIPMENT.map((eq) => {
              const active = draftExclude.includes(eq)
              return (
                <button
                  key={eq}
                  onClick={() => toggleDraftExclude(eq)}
                  style={{
                    padding: '7px 14px', borderRadius: 20, border: 'none',
                    fontSize: 12, fontWeight: 600, cursor: 'pointer',
                    fontFamily: 'var(--font-sans)',
                    backgroundColor: active ? '#b94c20' : 'rgba(255,255,255,0.07)',
                    color: active ? 'white' : 'rgba(255,255,255,0.5)',
                  }}
                >
                  {active ? `✕ ${eq}` : `Ohne ${eq}`}
                </button>
              )
            })}
          </div>
        </SheetSection>
      </FilterBottomSheet>
    </div>
  )
}

function SheetSection({ label, children, last }: { label: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div style={{ marginBottom: last ? 8 : 20 }}>
      <p style={{ fontSize: 11, color: '#6a6258', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>
        {label}
      </p>
      {children}
    </div>
  )
}

interface ChipRowProps {
  options: string[]
  value: string
  onChange: (v: string) => void
  renderLabel: (v: string) => string
  color: string
}

function ChipRow({ options, value, onChange, renderLabel, color }: ChipRowProps) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          style={{
            padding: '7px 14px', borderRadius: 20, border: 'none',
            fontSize: 12, fontWeight: 600, cursor: 'pointer',
            fontFamily: 'var(--font-sans)',
            backgroundColor: value === opt ? color : 'rgba(255,255,255,0.07)',
            color: value === opt ? 'white' : 'rgba(255,255,255,0.5)',
          }}
        >
          {renderLabel(opt)}
        </button>
      ))}
    </div>
  )
}
