import { useState } from 'react'
import { useWods } from '../../hooks/useWods'
import { WodCard } from './WodCard'

const TYPES = ['', 'AMRAP', 'ForTime', 'EMOM', 'Tabata']
const CATEGORIES = ['', 'Girl WOD', 'Hero WOD', 'Other Benchmark', 'CrossFit Open', 'HomeWOD', 'Core WOD']
const DIFFICULTIES = ['', 'Beginner', 'Intermediate', 'Advanced']

interface Props {
  onSelectWod: (wodName: string) => void
}

export function WodList({ onSelectWod }: Props) {
  const [search, setSearch]         = useState('')
  const [type, setType]             = useState('')
  const [category, setCategory]     = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [page, setPage]             = useState(0)

  const { data, isLoading, isFetching } = useWods({
    type:       type || undefined,
    category:   category || undefined,
    difficulty: difficulty || undefined,
    search:     search || undefined,
    page,
  })

  const wods  = data?.data  ?? []
  const total = data?.count ?? 0
  const hasMore = (page + 1) * 20 < total

  function handleFilterChange(setter: (v: string) => void) {
    return (v: string) => { setter(v); setPage(0) }
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
          🔍
        </span>
        <input
          type="search"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(0) }}
          placeholder="Search WODs…"
          className="w-full bg-[var(--color-bg-card)] border border-white/8 rounded-xl pl-9 pr-4 py-3 text-[var(--color-text)] placeholder:text-[var(--color-text-subtle)] focus:outline-none focus:border-[#E8642A] text-sm"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
        <FilterChips
          label="Type"
          options={TYPES}
          value={type}
          onChange={handleFilterChange(setType)}
        />
        <FilterChips
          label="Cat"
          options={CATEGORIES}
          value={category}
          onChange={handleFilterChange(setCategory)}
        />
        <FilterChips
          label="Level"
          options={DIFFICULTIES}
          value={difficulty}
          onChange={handleFilterChange(setDifficulty)}
        />
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
    </div>
  )
}

interface FilterChipsProps {
  label: string
  options: string[]
  value: string
  onChange: (v: string) => void
}

function FilterChips({ label, options, value, onChange }: FilterChipsProps) {
  return (
    <div className="flex gap-1.5 shrink-0">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            value === opt
              ? 'bg-[#E8642A] text-white'
              : 'bg-white/8 text-[var(--color-text-muted)] hover:bg-white/12'
          }`}
        >
          {opt || `All ${label}s`}
        </button>
      ))}
    </div>
  )
}
