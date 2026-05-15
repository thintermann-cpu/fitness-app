import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../../lib/supabase'

interface AdminWod {
  id: string
  name: string
  typ: string
  kategorie: string
  is_editors_pick: boolean
}

const PAGE_SIZE = 50

export function AdminWodsPage() {
  const [wods, setWods]       = useState<AdminWod[]>([])
  const [total, setTotal]     = useState(0)
  const [page, setPage]       = useState(0)
  const [search, setSearch]   = useState('')
  const [loading, setLoading] = useState(true)
  const [toggling, setToggling] = useState<Set<string>>(new Set())

  const fetchWods = useCallback(async (p: number, q: string) => {
    setLoading(true)
    let query = supabase
      .from('wods')
      .select('id, name, typ, kategorie, is_editors_pick', { count: 'exact' })
      .order('name')
      .range(p * PAGE_SIZE, (p + 1) * PAGE_SIZE - 1)

    if (q) query = query.ilike('name', `%${q}%`)

    const { data, count, error } = await query
    if (!error) {
      setWods((data ?? []) as AdminWod[])
      setTotal(count ?? 0)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    void fetchWods(page, search)
  }, [fetchWods, page, search])

  async function togglePick(wod: AdminWod) {
    setToggling((prev) => new Set(prev).add(wod.id))
    const next = !wod.is_editors_pick
    const { error } = await supabase
      .from('wods')
      .update({ is_editors_pick: next })
      .eq('id', wod.id)
    if (!error) {
      setWods((prev) => prev.map((w) => w.id === wod.id ? { ...w, is_editors_pick: next } : w))
    }
    setToggling((prev) => { const s = new Set(prev); s.delete(wod.id); return s })
  }

  const picksCount = wods.filter((w) => w.is_editors_pick).length

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-text)' }}>WODs</h1>
        <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
          {total} total · {picksCount} picks auf dieser Seite
        </span>
      </div>

      {/* Search */}
      <div style={{ marginBottom: '16px' }}>
        <input
          type="search"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(0) }}
          placeholder="WOD suchen…"
          style={{
            width: '100%',
            maxWidth: '360px',
            padding: '9px 14px',
            borderRadius: '10px',
            border: '1px solid var(--color-bg-elevated)',
            backgroundColor: 'var(--color-bg-card)',
            color: 'var(--color-text)',
            fontSize: '14px',
            outline: 'none',
          }}
        />
      </div>

      {/* Table */}
      <div
        style={{
          backgroundColor: 'var(--color-bg-card)',
          borderRadius: '12px',
          border: '1px solid var(--color-bg-elevated)',
          overflow: 'hidden',
        }}
      >
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
            Laden…
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-bg-elevated)' }}>
                {['Name', 'Typ', 'Kategorie', 'Editor\'s Pick'].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: 'left', padding: '10px 14px',
                      color: 'var(--color-text-muted)', fontSize: '11px',
                      fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {wods.map((wod, i) => (
                <tr
                  key={wod.id}
                  style={{
                    borderBottom: i < wods.length - 1 ? '1px solid var(--color-bg-elevated)' : 'none',
                    backgroundColor: wod.is_editors_pick ? 'rgba(232,100,42,0.04)' : 'transparent',
                  }}
                >
                  <td style={{ padding: '10px 14px', color: 'var(--color-text)', fontSize: '13px', fontWeight: 500 }}>
                    {wod.name}
                  </td>
                  <td style={{ padding: '10px 14px', color: 'var(--color-text-muted)', fontSize: '12px' }}>
                    {wod.typ}
                  </td>
                  <td style={{ padding: '10px 14px', color: 'var(--color-text-muted)', fontSize: '12px' }}>
                    {wod.kategorie}
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    <button
                      onClick={() => void togglePick(wod)}
                      disabled={toggling.has(wod.id)}
                      style={{
                        padding: '4px 12px',
                        borderRadius: '999px',
                        border: 'none',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: toggling.has(wod.id) ? 'wait' : 'pointer',
                        opacity: toggling.has(wod.id) ? 0.5 : 1,
                        backgroundColor: wod.is_editors_pick ? '#E8642A' : 'rgba(255,255,255,0.08)',
                        color: wod.is_editors_pick ? 'white' : 'var(--color-text-muted)',
                        transition: 'background-color 0.15s',
                      }}
                    >
                      {wod.is_editors_pick ? '⭐ Pick' : '+ Pick'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {total > PAGE_SIZE && (
        <div style={{ display: 'flex', gap: '8px', marginTop: '16px', alignItems: 'center' }}>
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            style={{
              padding: '7px 16px', borderRadius: '8px', border: '1px solid var(--color-bg-elevated)',
              backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text)', fontSize: '13px',
              cursor: page === 0 ? 'default' : 'pointer', opacity: page === 0 ? 0.4 : 1,
            }}
          >
            ← Zurück
          </button>
          <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
            {page + 1} / {Math.ceil(total / PAGE_SIZE)}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={(page + 1) * PAGE_SIZE >= total}
            style={{
              padding: '7px 16px', borderRadius: '8px', border: '1px solid var(--color-bg-elevated)',
              backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text)', fontSize: '13px',
              cursor: (page + 1) * PAGE_SIZE >= total ? 'default' : 'pointer',
              opacity: (page + 1) * PAGE_SIZE >= total ? 0.4 : 1,
            }}
          >
            Weiter →
          </button>
        </div>
      )}
    </div>
  )
}
