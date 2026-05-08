import { useState } from 'react'

type Category = 'SQL' | 'Config' | 'Stripe' | 'Ops'
type Status = 'open' | 'done'

interface ManualTask {
  id: number
  title: string
  category: Category
  status: Status
  description: string
  code?: string
}

const TASKS: ManualTask[] = [
  {
    id: 1,
    title: 'Supabase Redirect-URLs konfigurieren',
    category: 'Config',
    status: 'open',
    description: 'Site URL und erlaubte Redirect-URLs in Supabase Authentication Settings setzen.',
    code: `-- Supabase Dashboard → Authentication → URL Configuration
Site URL:        https://carveout.app
Redirect URLs:   https://carveout.app/**`,
  },
  {
    id: 2,
    title: 'User-Rolle auf admin setzen',
    category: 'SQL',
    status: 'open',
    description: 'Führe diesen SQL-Befehl im Supabase SQL Editor aus, um einen User zum Admin zu machen.',
    code: `UPDATE public.user_profiles
SET role = 'admin'
WHERE id = (
  SELECT id FROM auth.users WHERE email = 'xxx@example.com'
);`,
  },
  {
    id: 3,
    title: 'role-Spalte in user_profiles anlegen',
    category: 'SQL',
    status: 'open',
    description: 'Falls die Spalte noch nicht existiert, hier das Migration-SQL.',
    code: `ALTER TABLE public.user_profiles
  ADD COLUMN IF NOT EXISTS role TEXT
  DEFAULT 'user'
  CHECK (role IN ('admin', 'moderator', 'user'));

-- RLS: Admins können alle Profile lesen
CREATE POLICY "Admins can read all profiles"
  ON public.user_profiles
  FOR SELECT
  USING (
    (SELECT role FROM public.user_profiles WHERE id = auth.uid()) IN ('admin', 'moderator')
  );`,
  },
  {
    id: 4,
    title: 'WOD-Übersetzungen EN/ES',
    category: 'Ops',
    status: 'open',
    description: '803 WODs sind aktuell nur auf Deutsch. EN und ES Übersetzungen fehlen noch komplett.',
    code: `-- Aktuelle Sprachverteilung prüfen:
SELECT language, COUNT(*) FROM public.wods GROUP BY language;

-- TODO: Übersetzungen per Script oder manuell importieren`,
  },
  {
    id: 5,
    title: 'Stripe Webhook konfigurieren',
    category: 'Stripe',
    status: 'open',
    description: 'Stripe Webhook Endpoint für Subscription-Events einrichten.',
    code: `-- Stripe Dashboard → Developers → Webhooks → Add endpoint
Endpoint URL:  https://carveout.app/api/stripe/webhook

Events to listen:
  - customer.subscription.created
  - customer.subscription.updated
  - customer.subscription.deleted
  - invoice.payment_succeeded
  - invoice.payment_failed

-- Webhook Secret als STRIPE_WEBHOOK_SECRET in .env eintragen`,
  },
  {
    id: 6,
    title: 'GDPR Cookie-Banner einbauen',
    category: 'Config',
    status: 'open',
    description: 'Consent-Banner für Analytics/Tracking vor dem ersten Laden anzeigen.',
    code: `// Empfehlung: cookie-consent oder react-cookie-consent
npm install react-cookie-consent

// In App.tsx einbinden:
import CookieConsent from "react-cookie-consent"

<CookieConsent
  location="bottom"
  buttonText="Akzeptieren"
  declineButtonText="Ablehnen"
  enableDeclineButton
  style={{ background: "#16161F", color: "#F0EDE8" }}
  buttonStyle={{ background: "#E8642A", color: "#fff", borderRadius: "8px" }}
>
  Wir verwenden Cookies für eine bessere Nutzererfahrung.
</CookieConsent>`,
  },
]

const CATEGORIES: Array<Category | 'Alle'> = ['Alle', 'SQL', 'Config', 'Stripe', 'Ops']

const CATEGORY_COLORS: Record<Category, { bg: string; fg: string }> = {
  SQL:    { bg: 'rgba(74,144,217,0.15)',  fg: '#4A90D9' },
  Config: { bg: 'rgba(155,127,212,0.15)', fg: '#9B7FD4' },
  Stripe: { bg: 'rgba(99,214,166,0.15)',  fg: '#63D6A6' },
  Ops:    { bg: 'rgba(255,193,7,0.15)',   fg: '#FFC107' },
}

function CategoryBadge({ category }: { category: Category }) {
  const s = CATEGORY_COLORS[category]
  return (
    <span style={{ fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '999px', backgroundColor: s.bg, color: s.fg }}>
      {category}
    </span>
  )
}

function StatusBadge({ status }: { status: Status }) {
  return (
    <span style={{
      fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '999px',
      backgroundColor: status === 'done' ? 'rgba(76,175,80,0.15)' : 'rgba(232,100,42,0.12)',
      color: status === 'done' ? '#4CAF50' : 'var(--color-primary)',
    }}>
      {status === 'done' ? '✓ done' : 'open'}
    </span>
  )
}

function exportAsMarkdown(tasks: ManualTask[]) {
  const lines: string[] = ['# CarveOut – Manual Tasks\n']
  for (const t of tasks) {
    lines.push(`## ${t.title}`)
    lines.push(`**Kategorie:** ${t.category} | **Status:** ${t.status}\n`)
    lines.push(t.description)
    if (t.code) {
      lines.push(`\n\`\`\`\n${t.code}\n\`\`\``)
    }
    lines.push('')
  }
  const blob = new Blob([lines.join('\n')], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'carveout-manual-tasks.md'
  a.click()
  URL.revokeObjectURL(url)
}

export function AdminTasksPage() {
  const [filter, setFilter] = useState<Category | 'Alle'>('Alle')
  const [expanded, setExpanded] = useState<number | null>(null)
  const [localStatus, setLocalStatus] = useState<Record<number, Status>>({})

  const filtered = TASKS.filter(t => filter === 'Alle' || t.category === filter)

  function getStatus(t: ManualTask): Status {
    return localStatus[t.id] ?? t.status
  }

  function toggleStatus(id: number, current: Status) {
    setLocalStatus(prev => ({ ...prev, [id]: current === 'open' ? 'done' : 'open' }))
  }

  const exportTasks = TASKS.map(t => ({ ...t, status: getStatus(t) }))

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-text)', marginBottom: '4px' }}>
            Manual Tasks
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '13px' }}>
            Einmalige Setup-Aufgaben, SQL-Snippets und Ops-Todos.
          </p>
        </div>
        <button
          onClick={() => exportAsMarkdown(exportTasks)}
          style={{
            padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--color-bg-elevated)',
            backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text)',
            fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
          }}
        >
          ↓ Export as Markdown
        </button>
      </div>

      {/* Filter */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              padding: '6px 14px', borderRadius: '999px', fontSize: '13px', fontWeight: filter === cat ? 600 : 400,
              border: `1px solid ${filter === cat ? 'var(--color-primary)' : 'var(--color-bg-elevated)'}`,
              backgroundColor: filter === cat ? 'rgba(232,100,42,0.12)' : 'var(--color-bg-card)',
              color: filter === cat ? 'var(--color-primary)' : 'var(--color-text-muted)',
              cursor: 'pointer', transition: 'all 0.15s',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filtered.map(task => {
          const status = getStatus(task)
          const isExpanded = expanded === task.id

          return (
            <div
              key={task.id}
              style={{
                backgroundColor: 'var(--color-bg-card)',
                borderRadius: '12px',
                border: `1px solid ${isExpanded ? 'var(--color-bg-elevated)' : 'var(--color-bg-elevated)'}`,
                overflow: 'hidden',
                opacity: status === 'done' ? 0.6 : 1,
                transition: 'opacity 0.2s',
              }}
            >
              {/* Header Row */}
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px', cursor: 'pointer' }}
                onClick={() => setExpanded(isExpanded ? null : task.id)}
              >
                {/* Toggle done */}
                <button
                  onClick={e => { e.stopPropagation(); toggleStatus(task.id, status) }}
                  title={status === 'done' ? 'Als open markieren' : 'Als done markieren'}
                  style={{
                    width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                    border: `2px solid ${status === 'done' ? '#4CAF50' : 'var(--color-text-subtle)'}`,
                    backgroundColor: status === 'done' ? '#4CAF50' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: '#fff', fontSize: '11px', fontWeight: 700,
                    transition: 'all 0.15s',
                  }}
                >
                  {status === 'done' ? '✓' : ''}
                </button>

                <span style={{
                  flex: 1, fontSize: '14px', fontWeight: 500, color: 'var(--color-text)',
                  textDecoration: status === 'done' ? 'line-through' : 'none',
                }}>
                  {task.title}
                </span>

                <CategoryBadge category={task.category} />
                <StatusBadge status={status} />
                <span style={{ color: 'var(--color-text-subtle)', fontSize: '16px', marginLeft: '4px', transition: 'transform 0.2s', transform: isExpanded ? 'rotate(180deg)' : 'none' }}>
                  ▾
                </span>
              </div>

              {/* Expanded content */}
              {isExpanded && (
                <div style={{ borderTop: '1px solid var(--color-bg-elevated)', padding: '16px 18px' }}>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '13px', marginBottom: task.code ? '14px' : '0', lineHeight: '1.6' }}>
                    {task.description}
                  </p>
                  {task.code && (
                    <pre style={{
                      backgroundColor: 'var(--color-bg)',
                      border: '1px solid var(--color-bg-elevated)',
                      borderRadius: '8px',
                      padding: '14px 16px',
                      fontSize: '12px',
                      color: '#A8D8A8',
                      overflowX: 'auto',
                      lineHeight: '1.7',
                      fontFamily: '"JetBrains Mono", "Fira Code", "Courier New", monospace',
                      margin: 0,
                      whiteSpace: 'pre',
                    }}>
                      {task.code}
                    </pre>
                  )}
                  <button
                    onClick={() => {
                      if (task.code) navigator.clipboard.writeText(task.code)
                    }}
                    style={{
                      marginTop: '10px', padding: '5px 12px', borderRadius: '6px',
                      border: '1px solid var(--color-bg-elevated)', backgroundColor: 'transparent',
                      color: 'var(--color-text-muted)', fontSize: '12px', cursor: 'pointer',
                    }}
                  >
                    📋 Kopieren
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
