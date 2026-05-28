import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../../lib/supabase'
import { useTodayPillars } from '../../hooks/useTodayPillars'
import { useAuthStore } from '../../store/authStore'

type Lang = 'de' | 'en' | 'es'

const ALL_PILLARS = ['workout', 'routine', 'stretching', 'meditation']

const PILLARS = [
  { id: 'routine',    label: { de: 'Routine',         en: 'Routine',       es: 'Rutina'        }, emoji: '📋', color: '#4A90D9' },
  { id: 'workout',    label: { de: 'Training',        en: 'Workout',       es: 'Entrenamiento' }, emoji: '💪', color: '#E8642A' },
  { id: 'stretching', label: { de: 'Stretch & Yoga',  en: 'Stretch & Yoga', es: 'Estiramiento'  }, emoji: '🤸', color: '#7BC67E' },
  { id: 'meditation', label: { de: 'Meditation',      en: 'Meditation',    es: 'Meditación'    }, emoji: '🧘', color: '#9B7FD4' },
] as const

const PILLAR_ROUTES: Record<string, string> = {
  routine: '/routine', workout: '/workout', stretching: '/stretching', meditation: '/meditation',
}

const HEADER: Record<Lang, (done: number, total: number) => string> = {
  de: (done, total) => `Aktueller Stand von heute · ${done} von ${total}`,
  en: (done, total) => `Today's overview · ${done} of ${total}`,
  es: (done, total) => `Estado de hoy · ${done} de ${total}`,
}

function todayDateStr(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const DONE_LABEL: Record<Lang, string> = {
  de: 'Heute erledigt ✓',
  en: 'Mark as done ✓',
  es: 'Marcar como hecho ✓',
}
const CANCEL_LABEL: Record<Lang, string> = {
  de: 'Abbrechen',
  en: 'Cancel',
  es: 'Cancelar',
}
const ALREADY_DONE: Record<Lang, string> = {
  de: 'Bereits erledigt',
  en: 'Already done',
  es: 'Ya completado',
}

export function TodayPillarTracker() {
  const navigate            = useNavigate()
  const { profile }         = useAuthStore()
  const lang                = (profile?.language ?? 'de') as Lang
  const { data, isLoading } = useTodayPillars()
  const queryClient         = useQueryClient()
  const userId              = useAuthStore((s) => s.user?.id)

  const [contextPillar, setContextPillar]   = useState<string | null>(null)
  const pressTimerRef    = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const longFiredRef     = useRef(false)

  const activePillars  = profile?.active_pillars?.length ? profile.active_pillars : ALL_PILLARS
  const visiblePillars = PILLARS.filter(p => activePillars.includes(p.id))
  const doneCount      = isLoading ? 0 : visiblePillars.filter(p => (data?.[p.id as keyof typeof data] as boolean | undefined) ?? false).length

  const markDone = useMutation({
    mutationFn: async (pillar: string) => {
      if (!userId) return
      const { error } = await supabase
        .from('pillar_manual_logs')
        .upsert({ user_id: userId, pillar, date: todayDateStr(), source: 'manual' })
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['today_pillars', userId] })
      setContextPillar(null)
    },
  })

  function handlePointerDown(pillarId: string) {
    longFiredRef.current = false
    pressTimerRef.current = setTimeout(() => {
      longFiredRef.current = true
      setContextPillar(pillarId)
    }, 500)
  }

  function handlePointerUp() {
    clearTimeout(pressTimerRef.current)
  }

  function handleClick(pillarId: string) {
    if (longFiredRef.current) return
    navigate(PILLAR_ROUTES[pillarId])
  }

  const ctxPillarData = contextPillar ? PILLARS.find(p => p.id === contextPillar) : null
  const ctxIsDone     = contextPillar ? ((data?.[contextPillar as keyof typeof data] as boolean | undefined) ?? false) : false

  return (
    <>
    <section
      className="rounded-2xl p-4"
      style={{ backgroundColor: 'var(--color-bg-card)' }}
    >
      <p className="text-xs font-semibold mb-3" style={{ color: 'var(--color-text-muted)' }}>
        {isLoading ? '…' : HEADER[lang](doneCount, visiblePillars.length)}
      </p>
      <div className={`grid gap-2`} style={{ gridTemplateColumns: `repeat(${visiblePillars.length}, 1fr)` }}>
        {visiblePillars.map((p) => {
          const isDone = (data?.[p.id as keyof typeof data] as boolean | undefined) ?? false
          return (
            <button
              key={p.id}
              onPointerDown={() => handlePointerDown(p.id)}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              onClick={() => handleClick(p.id)}
              className="flex flex-col items-center gap-1.5 py-3 px-1 rounded-xl transition-colors active:scale-[0.97]"
              style={{
                backgroundColor: isDone ? `${p.color}20` : 'var(--color-bg-elevated)',
                border: `1px solid ${isDone ? `${p.color}60` : 'transparent'}`,
                userSelect: 'none',
                WebkitUserSelect: 'none',
              }}
            >
              <span className="text-lg leading-none">{p.emoji}</span>
              {isDone ? (
                <span className="text-xs font-bold leading-none" style={{ color: p.color }}>✓</span>
              ) : (
                <span
                  className="w-1 h-1 rounded-full"
                  style={{ backgroundColor: 'var(--color-text-subtle)' }}
                />
              )}
              <span
                className="text-[9px] font-medium leading-tight text-center"
                style={{ color: isDone ? p.color : 'var(--color-text-muted)' }}
              >
                {p.label[lang]}
              </span>
            </button>
          )
        })}
      </div>
    </section>

    {/* Long-press context menu */}
    {contextPillar && ctxPillarData && (
      <div
        style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'flex-end', backgroundColor: 'rgba(0,0,0,0.55)' }}
        onClick={() => setContextPillar(null)}
      >
        <div
          style={{ width: '100%', padding: '20px 20px 32px', background: 'var(--color-bg-card)', borderRadius: '16px 16px 0 0', display: 'flex', flexDirection: 'column', gap: 12 }}
          onClick={e => e.stopPropagation()}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <span style={{ fontSize: 24 }}>{ctxPillarData.emoji}</span>
            <span style={{ fontWeight: 600, color: 'var(--color-text)', fontSize: 16 }}>{ctxPillarData.label[lang]}</span>
          </div>
          {ctxIsDone ? (
            <p style={{ textAlign: 'center', padding: '10px 0', color: ctxPillarData.color, fontWeight: 600 }}>
              {ALREADY_DONE[lang]}
            </p>
          ) : (
            <button
              onClick={() => markDone.mutate(contextPillar)}
              disabled={markDone.isPending}
              style={{ padding: '14px', borderRadius: 12, border: 'none', background: ctxPillarData.color, color: '#fff', fontWeight: 700, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit' }}
            >
              {DONE_LABEL[lang]}
            </button>
          )}
          <button
            onClick={() => setContextPillar(null)}
            style={{ padding: '12px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)', background: 'transparent', color: 'var(--color-text-muted)', fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}
          >
            {CANCEL_LABEL[lang]}
          </button>
        </div>
      </div>
    )}
    </>
  )
}
