import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

interface Stats {
  totalUsers: number
  active7d: number
  paid: number
  trials: number
}

interface RecentUser {
  id: string
  display_name: string | null
  role: string | null
  created_at: string
}

const PILLARS = [
  { id: 'workout',    label: 'Workout',    color: '#E8642A' },
  { id: 'routine',    label: 'Mein Tag',   color: '#4A90D9' },
  { id: 'stretching', label: 'Stretching', color: '#7BC67E' },
  { id: 'meditation', label: 'Meditation', color: '#9B7FD4' },
]

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-bg-card)',
        borderRadius: '12px',
        padding: '20px 24px',
        border: '1px solid var(--color-bg-elevated)',
      }}
    >
      <div style={{ color: 'var(--color-text-muted)', fontSize: '13px', marginBottom: '10px' }}>
        {label}
      </div>
      <div style={{ color, fontSize: '36px', fontWeight: 700, lineHeight: 1 }}>{value}</div>
    </div>
  )
}

function RoleBadge({ role }: { role: string | null }) {
  const r = role ?? 'user'
  const styles: Record<string, { bg: string; color: string }> = {
    admin:     { bg: 'rgba(232,100,42,0.15)',  color: 'var(--color-primary)' },
    moderator: { bg: 'rgba(74,144,217,0.15)',  color: '#4A90D9' },
    user:      { bg: 'rgba(138,132,144,0.15)', color: 'var(--color-text-muted)' },
  }
  const s = styles[r] ?? styles.user
  return (
    <span
      style={{
        fontSize: '11px', fontWeight: 600, padding: '2px 8px',
        borderRadius: '999px', backgroundColor: s.bg, color: s.color,
      }}
    >
      {r}
    </span>
  )
}

export function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({ totalUsers: 0, active7d: 0, paid: 0, trials: 0 })
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([])
  const [pillarCounts, setPillarCounts] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

      const [
        { count: totalUsers },
        { count: active7d },
        { count: paid },
        { count: trials },
        { data: recent },
        { data: allProfiles },
      ] = await Promise.all([
        supabase.from('user_profiles').select('*', { count: 'exact', head: true }),
        supabase.from('user_profiles').select('*', { count: 'exact', head: true }).gte('updated_at', sevenDaysAgo.toISOString()),
        supabase.from('user_profiles').select('*', { count: 'exact', head: true }).eq('subscription_status', 'active'),
        supabase.from('user_profiles').select('*', { count: 'exact', head: true }).eq('subscription_status', 'trialing'),
        supabase.from('user_profiles').select('id, display_name, role, created_at').order('created_at', { ascending: false }).limit(10),
        supabase.from('user_profiles').select('active_pillars'),
      ])

      setStats({
        totalUsers: totalUsers ?? 0,
        active7d: active7d ?? 0,
        paid: paid ?? 0,
        trials: trials ?? 0,
      })

      setRecentUsers(recent ?? [])

      if (allProfiles) {
        const counts: Record<string, number> = {}
        for (const p of allProfiles) {
          if (Array.isArray(p.active_pillars)) {
            for (const pillar of p.active_pillars) {
              counts[pillar] = (counts[pillar] ?? 0) + 1
            }
          }
        }
        setPillarCounts(counts)
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  const maxPillar = Math.max(...PILLARS.map(p => pillarCounts[p.id] ?? 0), 1)

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '80px' }}>
        <div
          style={{
            width: '32px', height: '32px', borderRadius: '50%',
            border: '2px solid var(--color-primary)', borderTopColor: 'transparent',
            animation: 'spin 0.8s linear infinite',
          }}
        />
      </div>
    )
  }

  return (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '28px', color: 'var(--color-text)' }}>
        Dashboard
      </h1>

      {/* Stats Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          marginBottom: '36px',
        }}
      >
        <StatCard label="Total Users"    value={stats.totalUsers} color="var(--color-text)" />
        <StatCard label="Active 7d"      value={stats.active7d}   color="#4A90D9" />
        <StatCard label="Paid"           value={stats.paid}       color="#4CAF50" />
        <StatCard label="Trials"         value={stats.trials}     color="#FFC107" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Recent Users */}
        <div>
          <h2 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '14px', color: 'var(--color-text)' }}>
            Recent Users
          </h2>
          <div
            style={{
              backgroundColor: 'var(--color-bg-card)',
              borderRadius: '12px',
              border: '1px solid var(--color-bg-elevated)',
              overflow: 'hidden',
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-bg-elevated)' }}>
                  {['Name', 'Rolle', 'Erstellt'].map(h => (
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
                {recentUsers.map((u, i) => (
                  <tr
                    key={u.id}
                    style={{ borderBottom: i < recentUsers.length - 1 ? '1px solid var(--color-bg-elevated)' : 'none' }}
                  >
                    <td style={{ padding: '10px 14px', color: 'var(--color-text)', fontSize: '13px' }}>
                      {u.display_name ?? <span style={{ color: 'var(--color-text-subtle)' }}>—</span>}
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      <RoleBadge role={u.role} />
                    </td>
                    <td style={{ padding: '10px 14px', color: 'var(--color-text-muted)', fontSize: '12px' }}>
                      {new Date(u.created_at).toLocaleDateString('de-DE')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pillar Usage */}
        <div>
          <h2 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '14px', color: 'var(--color-text)' }}>
            Pillar Usage
          </h2>
          <div
            style={{
              backgroundColor: 'var(--color-bg-card)',
              borderRadius: '12px',
              border: '1px solid var(--color-bg-elevated)',
              padding: '20px 24px',
            }}
          >
            {PILLARS.map(p => (
              <div key={p.id} style={{ marginBottom: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '7px' }}>
                  <span style={{ color: 'var(--color-text)', fontSize: '13px' }}>{p.label}</span>
                  <span style={{ color: 'var(--color-text-muted)', fontSize: '13px' }}>
                    {pillarCounts[p.id] ?? 0}
                  </span>
                </div>
                <div
                  style={{
                    height: '8px', backgroundColor: 'var(--color-bg-elevated)',
                    borderRadius: '4px', overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${((pillarCounts[p.id] ?? 0) / maxPillar) * 100}%`,
                      backgroundColor: p.color,
                      borderRadius: '4px',
                      transition: 'width 0.5s ease',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
