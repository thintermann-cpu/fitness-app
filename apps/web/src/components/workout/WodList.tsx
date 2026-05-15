import { useState, useCallback } from 'react'
import { useAuthStore } from '../../store/authStore'
import { getWodTypeLabel } from '../../lib/wodTypeLabels'
import { useWods } from '../../hooks/useWods'
import { WodCard } from './WodCard'

const TYPES       = ['', 'AMRAP', 'ForTime', 'EMOM', 'Tabata']
const CATEGORIES  = ['', 'Girl WOD', 'Hero WOD', 'Other Benchmark', 'CrossFit Open', 'HomeWOD', 'Core WOD']
const DIFFICULTIES = ['', 'Beginner', 'Intermediate', 'Advanced']

type DurFilter = 0 | 15 | 20 | 30
const DUR_OPTIONS: DurFilter[] = [0, 15, 20, 30]
const SEARCH_KEY = 'wod_search'

interface Props {
  onSelectWod: (wodName: string) => void
  equipmentFilter?: string[]
  silentMode?: boolean
}

export function WodList({ onSelectWod, equipmentFilter, silentMode }: Props) {
  const lang = useAuthStore((s) => s.profile?.language ?? 'de')
  const [search, setSearch]             = useState(() => sessionStorage.getItem(SEARCH_KEY) ?? '')
  const [type, setType]                 = useState('')
  const [category, setCategory]         = useState('')
  const [difficulty, setDifficulty]     = useState('')
  const [maxDur, setMaxDur]             = useState<DurFilter>(0)
  const [editorsPick, setEditorsPick]   = useState(false)
  const [page, setPage]                 = useState(0)
  const [filterOpen, setFilterOpen]     = useState(false)

  const activeFilterCount = [type, category, difficulty].filter(Boolean).length + (editorsPick ? 1 : 0)

  const { data, isLoading, isFetching, isError } = useWods({
    type:            type || undefined,
    category:        category || undefined,
    difficulty:      difficulty || undefined,
    search:          search || undefined,
    page,
    equipmentFilter: equipmentFilter?.length ? equipmentFilter : undefined,
    silentMode:      silentMode ?? false,
    maxDuration:     maxDur || undefined,
    editorsPick:     editorsPick || undefined,
  })

  const wods    = data?.data  ?? []
  const total   = data?.count ?? 0
  const hasMore = (page + 1) * 20 < total

  const handleFilterChange = useCallback((setter: (v: string) => void) => {
    return (v: string) => { setter(v); setPage(0) }
  }, [])

  const resetFilters = () => {
    setType('')
    setCategory('')
    setDifficulty('')
    setEditorsPick(false)
    setPage(0)
  }

  return (
    <div className="space-y-4">
      {/* Search + Filter row */}
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
            placeholder="Search WODs…"
            className="w-full bg-[var(--color-bg-card)] border border-white/8 rounded-xl pl-9 pr-4 py-3 text-[var(--color-text)] placeholder:text-[var(--color-text-subtle)] focus:outline-none focus:border-[#E8642A] text-sm"
          />
        </div>
        <button
          onClick={() => setFilterOpen(true)}
          className="relative flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold border transition-colors"
          style={{
            backgroundColor: activeFilterCount > 0 ? '#E8642A20' : 'var(--color-bg-card)',
            borderColor:     activeFilterCount > 0 ? '#E8642A60' : 'rgba(255,255,255,0.08)',
            color:           activeFilterCount > 0 ? '#E8642A'   : 'var(--color-text-muted)',
          }}
        >
          <span>⚙</span>
          <span>Filter</span>
          {activeFilterCount > 0 && (
            <span
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
              style={{ backgroundColor: '#E8642A' }}
            >
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Duration + Editor's Pick chips */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => { setEditorsPick((v) => !v); setPage(0) }}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
          style={
            editorsPick
              ? { backgroundColor: '#E8642A', color: 'white' }
              : { backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text-muted)' }
          }
        >
          ⭐ Pick
        </button>
        {DUR_OPTIONS.map((d) => (
          <button
            key={d}
            onClick={() => { setMaxDur(d); setPage(0) }}
            className="px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
            style={
              maxDur === d
                ? { backgroundColor: '#E8642A', color: 'white' }
                : { backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text-muted)' }
            }
          >
            {d === 0 ? 'Alle' : `≤${d} min`}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-xs text-[var(--color-text-subtle)]">
        {total > 0 ? `${total} WOD${total !== 1 ? 's' : ''}` : isLoading ? '' : 'No WODs found'}
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

      {/* Filter bottom sheet */}
      {filterOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-end"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
          onClick={() => setFilterOpen(false)}
        >
          <div
            className="rounded-t-2xl p-5 space-y-5 max-h-[80vh] overflow-y-auto"
            style={{ backgroundColor: 'var(--color-bg-card)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle */}
            <div className="w-10 h-1 rounded-full bg-white/20 mx-auto" />

            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[var(--color-text)]">Filter</h3>
              {activeFilterCount > 0 && (
                <button onClick={resetFilters} className="text-xs text-[#E8642A] font-medium">
                  Reset
                </button>
              )}
            </div>

            <FilterSection
              label="Type"
              options={TYPES}
              value={type}
              onChange={handleFilterChange(setType)}
              lang={lang}
            />
            <FilterSection
              label="Category"
              options={CATEGORIES}
              value={category}
              onChange={handleFilterChange(setCategory)}
            />
            <FilterSection
              label="Difficulty"
              options={DIFFICULTIES}
              value={difficulty}
              onChange={handleFilterChange(setDifficulty)}
            />

            <button
              onClick={() => setFilterOpen(false)}
              className="w-full py-3.5 rounded-xl bg-[#E8642A] text-white font-bold text-sm"
            >
              Show {total > 0 ? `${total} ` : ''}WODs
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

interface FilterSectionProps {
  label: string
  options: string[]
  value: string
  onChange: (v: string) => void
  labelMap?: Record<string, string>
  lang?: string
}

function FilterSection({ label, options, value, onChange, labelMap, lang = 'de' }: FilterSectionProps) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
            style={
              value === opt
                ? { backgroundColor: '#E8642A', color: 'white' }
                : { backgroundColor: 'rgba(255,255,255,0.08)', color: 'var(--color-text-muted)' }
            }
          >
            {opt ? (label === 'Type' ? getWodTypeLabel(opt, lang) : (labelMap?.[opt] ?? opt)) : `All ${label}s`}
          </button>
        ))}
      </div>
    </div>
  )
}
