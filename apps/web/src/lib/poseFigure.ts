import { useSyncExternalStore } from 'react'
import { supabase } from './supabase'

/** Which drawn figure a mobility session shows. Default is the existing male set. */
export type PoseFigure = 'male' | 'female'

const KEY = 'carveout_pose_figure'
const EVENT = 'carveout-pose-figure'

function isFigure(value: string | null | undefined): value is PoseFigure {
  return value === 'male' || value === 'female'
}

export function readPoseFigure(): PoseFigure {
  try {
    const stored = localStorage.getItem(KEY)
    return isFigure(stored) ? stored : 'male'
  } catch {
    return 'male'
  }
}

/** Local choice applies immediately. The profile column is written when migration 033 exists. */
export async function savePoseFigure(figure: PoseFigure, userId?: string | null): Promise<void> {
  writePoseFigure(figure)
  if (!userId) return
  const { error } = await supabase
    .from('user_profiles')
    .update({ pose_figure: figure, updated_at: new Date().toISOString() })
    .eq('id', userId)
  if (error) console.warn('[pose] profile save skipped:', error.message)
}

export function writePoseFigure(figure: PoseFigure): void {
  try {
    localStorage.setItem(KEY, figure)
  } catch {
    // Private mode can block storage. The in-memory listeners still update.
  }
  window.dispatchEvent(new Event(EVENT))
}

/** Account value wins once the profile column exists. Missing column leaves the local choice. */
export function applyProfilePoseFigure(value: string | null | undefined): void {
  if (isFigure(value)) writePoseFigure(value)
}

function subscribe(onStoreChange: () => void): () => void {
  window.addEventListener(EVENT, onStoreChange)
  window.addEventListener('storage', onStoreChange)
  return () => {
    window.removeEventListener(EVENT, onStoreChange)
    window.removeEventListener('storage', onStoreChange)
  }
}

export function usePoseFigure(): PoseFigure {
  return useSyncExternalStore(subscribe, readPoseFigure, () => 'male')
}
