import { create } from 'zustand'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface Toast {
  id: string
  type: ToastType
  message: string
  duration: number
}

interface ToastStore {
  toasts: Toast[]
  addToast: (toast: { message: string; type: ToastType; duration?: number }) => void
  removeToast: (id: string) => void
}

const MAX_TOASTS = 3

export const useToastStore = create<ToastStore>()((set) => ({
  toasts: [],
  addToast: ({ message, type, duration = 3000 }) =>
    set((s) => {
      const next = [
        ...s.toasts,
        { id: crypto.randomUUID(), message, type, duration } satisfies Toast,
      ]
      return { toasts: next.length > MAX_TOASTS ? next.slice(next.length - MAX_TOASTS) : next }
    }),
  removeToast: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}))
