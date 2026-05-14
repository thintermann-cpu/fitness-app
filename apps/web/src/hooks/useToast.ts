import { useToastStore } from '../store/toastStore'
import type { ToastType } from '../store/toastStore'

export function useToast() {
  const addToast = useToastStore((s) => s.addToast)
  return {
    success: (message: string, duration?: number) => addToast({ message, type: 'success', duration }),
    error:   (message: string, duration?: number) => addToast({ message, type: 'error',   duration }),
    info:    (message: string, duration?: number) => addToast({ message, type: 'info',    duration }),
    warning: (message: string, duration?: number) => addToast({ message, type: 'warning', duration }),
    show:    (message: string, type: ToastType = 'info', duration?: number) =>
               addToast({ message, type, duration }),
  }
}
