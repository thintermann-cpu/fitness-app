import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY — check GitHub Secrets')
}

function storedAccessToken(): string | null {
  try {
    const ref = new URL(supabaseUrl).hostname.split('.')[0]
    const raw = localStorage.getItem(`sb-${ref}-auth-token`)
    if (!raw) return null
    const parsed = JSON.parse(raw) as { access_token?: string; currentSession?: { access_token?: string } }
    return parsed.access_token ?? parsed.currentSession?.access_token ?? null
  } catch {
    return null
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // iOS hält den Browser-Lock fest. Ohne Umgehung bleibt die Session leer und RLS liefert keine Zeilen.
    lock: async (_name, _acquireTimeout, fn) => fn(),
  },
  global: {
    fetch: (input, init) => {
      const headers = new Headers(init?.headers)
      const token = storedAccessToken()
      const url = typeof input === 'string' ? input : input instanceof Request ? input.url : String(input)
      if (token && url.includes('/rest/v1/') && headers.get('Authorization') === `Bearer ${supabaseAnonKey}`) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return fetch(input, { ...init, headers })
    },
  },
})
export const isSupabaseConfigured = true
