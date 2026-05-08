import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

interface UserRow {
  id: string
  display_name: string | null
  role: string | null
  created_at: string
  subscription_status: string | null
}

const PAGE_SIZE = 20

function RoleBadge({ role }: { role: string | null }) {
  const r = role ?? 'user'
  const map: Record<string, { bg: string; fg: string }> = {
    admin:     { bg: 'rgba(232,100,42,0.15)',  fg: '#E8642A' },
    moderator: { bg: 'rgba(74,144,217,0.15)',  fg: '#4A90D9' },
    user:      { bg: 'rgba(138,132,144,0.15)', fg: '#8A8490' },
  }
  const s = map[r] ?? map.user
  return (
    <span style={{ fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '999px', backgroundColor: s.bg, color: s.fg }}>
      {r}
    </span>
  )
}

function SubBadge({ status }: { status: string | null }) {
  if (!status) return <span style={{ color: 'var(--color-text-subtle)', fontSize: '13px' }}>—</span>
  const map: Record<string, string> = {
    active:   '#4CAF50',
    trialing: '#FFC107',
    canceled: '#F44336',
    past_due: '#F44336',
  }
  const color = map[status] ?? '#8A8490'
  return (
    <span style={{ fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '999px', backgroundColor: `${color}22`, color }}>
      {status}
    </span>
  )
}

export function AdminUsersPage() {
  const [users, setUsers] = useState<UserRow[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true)
      const from = page * PAGE_SIZE
      const to = from + PAGE_SIZE - 1

      const { data, count } = await supabase
        .from('user_profiles')
        .select('id, display_name, role, created_at, subscription_status', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to)

      setUsers(data ?? [])
      setTotal(count ?? 0)
      setLoading(false)
    }
    fetchUsers()
  }, [page])

  const totalPages = Math.ceil(total / PAGE_SIZE)

  return (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '28px', color: 'var(--color-text)' }}>
        Users{' '}
        <span style={{ color: 'var(--color-text-muted)', fontSize: '16px', fontWeight: 400 }}>
          ({total})
        </span>
      </h1>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '60px' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: '2px solid var(--color-primary)', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite' }} />
        </div>
      ) : (
        <>
          <div style={{ backgroundColor: 'var(--color-bg-card)', borderRadius: '12px', border: '1px solid var(--color-bg-elevated)', overflow: 'hidden', marginBottom: '16px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-bg-elevated)' }}>
                  {['Name / ID', 'Rolle', 'Erstellt am', 'Subscription'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--color-text-muted)', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ padding: '32px 16px', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '14px' }}>
                      Keine User gefunden.
                    </td>
                  </tr>
                ) : users.map((u, i) => (
                  <tr key={u.id} style={{ borderBottom: i < users.length - 1 ? '1px solid var(--color-bg-elevated)' : 'none' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ color: 'var(--color-text)', fontSize: '14px' }}>
                        {u.display_name ?? <span style={{ color: 'var(--color-text-subtle)', fontStyle: 'italic' }}>kein Name</span>}
                      </div>
                      <div style={{ color: 'var(--color-text-subtle)', fontSize: '11px', marginTop: '2px', fontFamily: 'monospace' }}>
                        {u.id}
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <RoleBadge role={u.role} />
                    </td>
                    <td style={{ padding: '12px 16px', color: 'var(--color-text-muted)', fontSize: '13px' }}>
                      {new Date(u.created_at).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <SubBadge status={u.subscription_status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
              <button
                onClick={() => setPage(p => Math.max(0, p - 1))}
                disabled={page === 0}
                style={{ padding: '7px 16px', borderRadius: '8px', border: '1px solid var(--color-bg-elevated)', backgroundColor: 'var(--color-bg-card)', color: page === 0 ? 'var(--color-text-subtle)' : 'var(--color-text)', cursor: page === 0 ? 'default' : 'pointer', fontSize: '13px' }}
              >
                ← Zurück
              </button>
              <span style={{ padding: '7px 12px', color: 'var(--color-text-muted)', fontSize: '13px' }}>
                {page + 1} / {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                style={{ padding: '7px 16px', borderRadius: '8px', border: '1px solid var(--color-bg-elevated)', backgroundColor: 'var(--color-bg-card)', color: page >= totalPages - 1 ? 'var(--color-text-subtle)' : 'var(--color-text)', cursor: page >= totalPages - 1 ? 'default' : 'pointer', fontSize: '13px' }}
              >
                Weiter →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
