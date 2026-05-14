import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AudioStore {
  isMuted: boolean
  toggleMute: () => void
}

export const useAudioStore = create<AudioStore>()(
  persist(
    (set) => ({
      isMuted: false,
      toggleMute: () => set((s) => ({ isMuted: !s.isMuted })),
    }),
    { name: 'audio-mute' },
  ),
)
