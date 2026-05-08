import { useWodHistory } from '../../hooks/useWodHistory'

interface Props {
  wodName?: string
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

const SCORE_LABEL: Record<string, string> = {
  time: '⏱',
  rounds: '🔄',
  reps: '🔢',
  weight: '⚖️',
}

export function WodHistoryList({ wodName }: Props) {
  const { data, isLoading } = useWodHistory(wodName)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <span className="text-[var(--color-text-muted)]">Loading history…</span>
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-2">
        <span className="text-4xl">📋</span>
        <p className="text-[var(--color-text-muted)] text-sm">No workouts logged yet.</p>
        <p className="text-[var(--color-text-subtle)] text-xs">Complete a WOD and save your result.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {data.map((entry) => (
        <div
          key={entry.id}
          className="bg-[var(--color-bg-card)] rounded-[var(--radius-md)] border border-white/5 p-4"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-semibold text-[var(--color-text)]">
                {entry.wod_name}
              </p>
              {entry.notes && (
                <p className="text-sm text-[var(--color-text-muted)] mt-0.5">{entry.notes}</p>
              )}
            </div>
            <div className="text-right shrink-0">
              <p className="text-[#E8642A] font-bold text-lg">
                {SCORE_LABEL[entry.score_type] ?? ''} {entry.score_value}
              </p>
              <p className="text-xs text-[var(--color-text-subtle)] capitalize">
                {entry.score_type}
              </p>
            </div>
          </div>
          <p className="mt-2 text-xs text-[var(--color-text-subtle)]">
            {formatDate(entry.completed_at)}
          </p>
        </div>
      ))}
    </div>
  )
}
