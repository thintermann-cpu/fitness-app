import { create } from 'zustand'

interface SessionStore {
  isSessionActive: boolean
  setSessionActive: (v: boolean) => void
}

export const useSessionStore = create<SessionStore>()((set) => ({
  isSessionActive: false,
  setSessionActive: (v) => set({ isSessionActive: v }),
}))
