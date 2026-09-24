import { create } from 'zustand'
import type { User, Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

export type WorkoutLocation = 'home' | 'gym' | 'bodyweight' | 'outdoor'

export const DEFAULT_EQUIPMENT_BY_LOCATION: Record<WorkoutLocation, string[]> = {
  home:       ['Dumbbells', 'Kettlebell', 'Pull-up Bar', 'Resistance Bands'],
  gym:        ['Barbell', 'Dumbbells', 'Pull-up Bar', 'Rings', 'Rower', 'Bike', 'Kettlebell'],
  bodyweight: ['Bodyweight'],
  outdoor:    ['Bodyweight', 'Pull-up Bar', 'Laufen'],
}

export interface DbProfile {
  id: string
  display_name: string | null
  language: string
  primary_pillar: string | null
  active_pillars: string[]
  equipment: string[]
  equipment_by_location: Record<WorkoutLocation, string[]> | null
  goal: string | null
  role: 'admin' | 'moderator' | 'user' | null
  subscription_status: string | null
  substitution_enabled: boolean
  created_at: string
  updated_at: string
}

interface AuthState {
  user: User | null
  session: Session | null
  profile: DbProfile | null
  /** False while the signed-in user's profile row is still loading. */
  profileLoaded: boolean
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  initialize: () => Promise<void>
  fetchProfile: () => Promise<void>
  updateProfile: (data: Partial<Omit<DbProfile, 'id' | 'created_at'>>) => Promise<void>
}

// supabase-js serializes auth calls across tabs via an exclusive navigator.locks lock
// (lock:sb-<project-ref>-auth-token). If another tab's call never settles, that lock
// is held forever and every other tab's getSession() queues behind it indefinitely —
// this timeout keeps the app from being stuck on the loading gate in that case.
const AUTH_INIT_TIMEOUT_MS = 8000

async function loadProfile(userId: string): Promise<DbProfile | null> {
  const { data } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single()
  return data ?? null
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  profile: null,
  profileLoaded: false,
  loading: true,

  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    set({
      user: data.user,
      session: data.session,
      loading: false,
      profileLoaded: !data.user,
    })
    if (!data.user) return
    loadProfile(data.user.id)
      .then((profile) => set({ profile, profileLoaded: true }))
      .catch(() => set({ profileLoaded: true }))
  },

  signUp: async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    set({ user: data.user, session: data.session, profile: null, profileLoaded: true })
  },

  signOut: async () => {
    await supabase.auth.signOut()
    set({ user: null, session: null, profile: null, profileLoaded: true })
  },

  fetchProfile: async () => {
    const { user } = get()
    if (!user) return
    const profile = await loadProfile(user.id)
    set({ profile, profileLoaded: true })
  },

  updateProfile: async (data) => {
    const { user } = get()
    if (!user) return
    const { error } = await supabase
      .from('user_profiles')
      .upsert({ id: user.id, ...data, updated_at: new Date().toISOString() })
    if (error) throw error
    const profile = await loadProfile(user.id)
    set({ profile })
  },

  initialize: async () => {
    try {
      const timeout = new Promise<'timeout'>((resolve) =>
        setTimeout(() => resolve('timeout'), AUTH_INIT_TIMEOUT_MS),
      )
      const result = await Promise.race([supabase.auth.getSession(), timeout])

      if (result === 'timeout') {
        console.error('[authStore] getSession() timed out after', AUTH_INIT_TIMEOUT_MS, 'ms — auth lock likely stuck on another tab')
        set({ loading: false, profileLoaded: true })
      } else {
        const session = result.data.session
        const user    = session?.user ?? null

        // Unblock rendering immediately — profile loads async in background
        set({ session, user, loading: false, profileLoaded: !user })

        if (user) {
          loadProfile(user.id)
            .then((profile) => set({ profile, profileLoaded: true }))
            .catch(() => set({ profileLoaded: true }))
        }
      }

      supabase.auth.onAuthStateChange((_event, newSession) => {
        const userId = newSession?.user?.id
        set({
          session: newSession,
          user: newSession?.user ?? null,
          loading: false,
          profile: userId ? get().profile : null,
          profileLoaded: !userId,
        })
        if (!userId) return
        // Leave the auth lock before querying. Awaiting here deadlocks getSession on the next refresh.
        setTimeout(() => {
          loadProfile(userId)
            .then((profile) => set({ profile, profileLoaded: true }))
            .catch(() => set({ profileLoaded: true }))
        }, 0)
      })
    } catch {
      set({ loading: false, profileLoaded: true })
    }
  },
}))
