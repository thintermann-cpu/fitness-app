import { create } from 'zustand'
import type { User, Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

export interface DbProfile {
  id: string
  display_name: string | null
  language: string
  primary_pillar: string | null
  active_pillars: string[]
  equipment: string[]
  created_at: string
  updated_at: string
}

interface AuthState {
  user: User | null
  session: Session | null
  profile: DbProfile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  initialize: () => Promise<void>
  fetchProfile: () => Promise<void>
  updateProfile: (data: Partial<Omit<DbProfile, 'id' | 'created_at'>>) => Promise<void>
}

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
  loading: true,

  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    const profile = data.user ? await loadProfile(data.user.id) : null
    set({ user: data.user, session: data.session, profile })
  },

  signUp: async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    set({ user: data.user, session: data.session, profile: null })
  },

  signOut: async () => {
    await supabase.auth.signOut()
    set({ user: null, session: null, profile: null })
  },

  fetchProfile: async () => {
    const { user } = get()
    if (!user) return
    const profile = await loadProfile(user.id)
    set({ profile })
  },

  updateProfile: async (data) => {
    const { user } = get()
    if (!user) return
    await supabase
      .from('user_profiles')
      .upsert({ id: user.id, ...data, updated_at: new Date().toISOString() })
    const profile = await loadProfile(user.id)
    set({ profile })
  },

  initialize: async () => {
    const { data } = await supabase.auth.getSession()
    const profile = data.session?.user
      ? await loadProfile(data.session.user.id)
      : null
    set({
      session: data.session,
      user: data.session?.user ?? null,
      profile,
      loading: false,
    })

    supabase.auth.onAuthStateChange(async (_event, session) => {
      const profile = session?.user ? await loadProfile(session.user.id) : null
      set({ session, user: session?.user ?? null, profile })
    })
  },
}))
