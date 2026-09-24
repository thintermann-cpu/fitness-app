import { createClient } from '@supabase/supabase-js'
import { navigatorLock } from '@supabase/auth-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY — check GitHub Secrets')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    lock: async (name, acquireTimeout, fn) => {
      try {
        return await navigatorLock(name, Math.min(acquireTimeout, 1500), fn)
      } catch (err) {
        const timedOut = !!err && typeof err === 'object' && 'isAcquireTimeout' in err
        if (!timedOut) throw err
        return await fn()
      }
    },
  },
})
export const isSupabaseConfigured = true
