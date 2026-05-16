import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { useToastStore } from '../store/toastStore'
import { supabase } from '../lib/supabase'

const LANGUAGES = [
  { id: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { id: 'en', label: 'English', flag: '🇬🇧' },
  { id: 'es', label: 'Español', flag: '🇪🇸' },
] as const

export function ProfilePage() {
  const navigate  = useNavigate()
  const { profile, user, updateProfile, signOut } = useAuthStore()
  const { addToast } = useToastStore()

  const [name,      setName]      = useState(profile?.display_name ?? '')
  const [lang,      setLang]      = useState(profile?.language ?? 'de')
  const [saving,    setSaving]    = useState(false)
  const [pwSending, setPwSending] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      await updateProfile({ display_name: name.trim() || null, language: lang })
      addToast({ type: 'success', message: 'Profil gespeichert.' })
    } catch {
      addToast({ type: 'error', message: 'Speichern fehlgeschlagen.' })
    } finally {
      setSaving(false)
    }
  }

  const handlePasswordReset = async () => {
    if (!user?.email) return
    setPwSending(true)
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
        redirectTo: `${window.location.origin}/login`,
      })
      if (error) throw error
      addToast({ type: 'success', message: 'Passwort-Link wurde gesendet.' })
    } catch {
      addToast({ type: 'error', message: 'E-Mail konnte nicht gesendet werden.' })
    } finally {
      setPwSending(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <div
      style={{
        minHeight: '100svh',
        background: 'linear-gradient(135deg,#0D0D14 0%,#13131e 50%,#0f1622 100%)',
        fontFamily: 'var(--font-sans)',
        color: 'var(--color-text)',
        maxWidth: 480,
        margin: '0 auto',
        padding: '0 18px 80px',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 0 24px' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: 22, cursor: 'pointer', padding: '4px 8px 4px 0', lineHeight: 1 }}
          aria-label="Zurück"
        >
          ←
        </button>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: 'var(--color-text)' }}>
          Profil
        </h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Display name */}
        <section style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '16px' }}>
          <p style={{ margin: '0 0 10px', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: '#6a6258' }}>
            Name
          </p>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Dein Name"
            style={{
              width: '100%',
              padding: '10px 12px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8,
              color: 'var(--color-text)',
              fontSize: 14,
              fontFamily: 'inherit',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </section>

        {/* Language */}
        <section style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '16px' }}>
          <p style={{ margin: '0 0 10px', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: '#6a6258' }}>
            Sprache
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            {LANGUAGES.map(l => (
              <button
                key={l.id}
                onClick={() => setLang(l.id)}
                style={{
                  flex: 1,
                  padding: '9px 4px',
                  borderRadius: 10,
                  background: lang === l.id ? 'rgba(74,144,217,0.15)' : 'rgba(255,255,255,0.04)',
                  border: `1.5px solid ${lang === l.id ? '#4A90D9' : 'rgba(255,255,255,0.08)'}`,
                  color: lang === l.id ? '#4A90D9' : '#7a7268',
                  fontSize: 12,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                {l.flag} {l.label}
              </button>
            ))}
          </div>
        </section>

        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            padding: '14px',
            background: saving ? 'rgba(74,144,217,0.3)' : '#4A90D9',
            border: 'none',
            borderRadius: 12,
            color: 'white',
            fontSize: 15,
            fontWeight: 700,
            cursor: saving ? 'not-allowed' : 'pointer',
            fontFamily: 'inherit',
          }}
        >
          {saving ? 'Speichert…' : 'Speichern'}
        </button>

        {/* Security */}
        <section style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <p style={{ margin: 0, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: '#6a6258' }}>
            Sicherheit
          </p>
          {user?.email && (
            <p style={{ margin: 0, fontSize: 12, color: '#5a5248' }}>{user.email}</p>
          )}
          <button
            onClick={handlePasswordReset}
            disabled={pwSending}
            style={{
              padding: '11px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: 10,
              color: '#7a7268',
              fontSize: 13,
              cursor: pwSending ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit',
            }}
          >
            {pwSending ? 'Sendet…' : '🔑 Passwort zurücksetzen'}
          </button>
        </section>

        {/* Subscription placeholder */}
        <section style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '16px' }}>
          <p style={{ margin: '0 0 6px', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: '#6a6258' }}>
            Abo
          </p>
          <p style={{ margin: 0, fontSize: 13, color: '#5a5248' }}>
            CarveOut Free · Premium <span style={{ color: '#d4af37' }}>kommt bald ✨</span>
          </p>
        </section>

        {/* Sign out */}
        <button
          onClick={handleSignOut}
          style={{
            padding: '13px',
            background: 'transparent',
            border: '1px solid rgba(239,68,68,0.25)',
            borderRadius: 12,
            color: '#ef4444',
            fontSize: 14,
            cursor: 'pointer',
            fontFamily: 'inherit',
            marginTop: 8,
          }}
        >
          Abmelden
        </button>
      </div>
    </div>
  )
}
