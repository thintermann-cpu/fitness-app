import { useEffect, useState } from 'react'

export interface CityHit {
  label: string
  timezone: string
}

interface Props {
  city: string
  timezone: string
  onPick: (hit: CityHit) => void
}

export function CityTimezoneField({ city, timezone, onPick }: Props) {
  const [query, setQuery] = useState(city)
  const [hits, setHits] = useState<CityHit[]>([])

  useEffect(() => { setQuery(city) }, [city])

  useEffect(() => {
    const name = query.trim()
    if (name.length < 2 || name === city) {
      setHits([])
      return
    }
    const timer = window.setTimeout(() => {
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=5&language=de&format=json`
      void fetch(url)
        .then((res) => res.json())
        .then((data: { results?: { name: string; admin1?: string; country?: string; timezone?: string }[] }) => {
          const next = (data.results ?? [])
            .filter((row) => row.timezone)
            .map((row) => ({
              label: [row.name, row.admin1, row.country].filter(Boolean).join(', '),
              timezone: row.timezone as string,
            }))
          setHits(next)
        })
        .catch(() => setHits([]))
    }, 250)
    return () => window.clearTimeout(timer)
  }, [query, city])

  return (
    <div className="rounded-2xl px-4 py-3 space-y-2" style={{ backgroundColor: 'var(--color-bg-card)' }}>
      <div className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>Ort</div>
      <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
        Die Uhrzeiten der Erinnerungen gelten in dieser Zeitzone{timezone ? `: ${timezone}` : ''}.
      </p>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Stadt, z. B. Zürich"
        className="w-full rounded-xl px-3 py-2 text-sm"
        style={{
          backgroundColor: 'var(--color-bg)',
          color: 'var(--color-text)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      />
      {hits.length > 0 && (
        <ul className="space-y-1">
          {hits.map((hit) => (
            <li key={`${hit.label}-${hit.timezone}`}>
              <button
                type="button"
                onClick={() => {
                  onPick(hit)
                  setQuery(hit.label)
                  setHits([])
                }}
                className="w-full text-left rounded-xl px-3 py-2 text-sm"
                style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)', border: 'none' }}
              >
                {hit.label}
                <span className="block text-xs" style={{ color: 'var(--color-text-muted)' }}>{hit.timezone}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
