import { useCallback } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { useAuthStore } from '../store/authStore'

/*
 * Supabase SQL — einmal im SQL-Editor ausführen:
 *
 * CREATE TABLE favorites (
 *   id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
 *   user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
 *   content_type text NOT NULL,
 *   content_id text NOT NULL,
 *   created_at timestamptz DEFAULT now(),
 *   UNIQUE(user_id, content_type, content_id)
 * );
 * ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
 * CREATE POLICY "Users manage own favorites" ON favorites
 *   FOR ALL USING (auth.uid() = user_id);
 */

export type ContentType = 'wod' | 'stretching_routine' | 'meditation'

export interface Favorite {
  id: string
  user_id: string
  content_type: ContentType | string
  content_id: string
  created_at: string
}

const STORAGE_KEY = 'carveout_favorites'

function readLocal(): Favorite[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as Favorite[] }
  catch { return [] }
}

function writeLocal(favs: Favorite[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favs))
}

export function useFavorites() {
  const userId = useAuthStore((s) => s.user?.id ?? null)
  const queryClient = useQueryClient()
  const qk = ['favorites', userId ?? 'anon'] as const

  const query = useQuery({
    queryKey: qk,
    staleTime: 5 * 60 * 1000,
    gcTime:    10 * 60 * 1000,
    queryFn: async (): Promise<Favorite[]> => {
      if (!isSupabaseConfigured) return readLocal()
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) return readLocal()
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
      if (error) return readLocal()
      const result = (data ?? []) as Favorite[]
      writeLocal(result)
      return result
    },
  })

  const favorites = query.data ?? []

  const isFavorite = useCallback(
    (content_type: string, content_id: string): boolean =>
      favorites.some(f => f.content_type === content_type && f.content_id === content_id),
    [favorites],
  )

  const toggle = useMutation({
    onMutate: async ({ content_type, content_id }: { content_type: string; content_id: string }) => {
      await queryClient.cancelQueries({ queryKey: qk })
      const prev = queryClient.getQueryData<Favorite[]>(qk) ?? []
      const isCurrentlyFav = prev.some(
        f => f.content_type === content_type && f.content_id === content_id,
      )
      if (isCurrentlyFav) {
        queryClient.setQueryData(
          qk,
          prev.filter(f => !(f.content_type === content_type && f.content_id === content_id)),
        )
      } else {
        queryClient.setQueryData(qk, [
          ...prev,
          {
            id: crypto.randomUUID(),
            user_id: '',
            content_type,
            content_id,
            created_at: new Date().toISOString(),
          } satisfies Favorite,
        ])
      }
      return { prev }
    },
    mutationFn: async ({
      content_type,
      content_id,
    }: {
      content_type: string
      content_id: string
    }): Promise<void> => {
      const current     = readLocal()
      const isCurrentlyFav = current.some(
        f => f.content_type === content_type && f.content_id === content_id,
      )

      if (isCurrentlyFav) {
        writeLocal(current.filter(
          f => !(f.content_type === content_type && f.content_id === content_id),
        ))
        if (!isSupabaseConfigured) return
        const { data: { session } } = await supabase.auth.getSession()
        if (!session?.user) return
        await supabase.from('favorites').delete()
          .eq('user_id', session.user.id)
          .eq('content_type', content_type)
          .eq('content_id', content_id)
      } else {
        writeLocal([
          ...current,
          {
            id: crypto.randomUUID(),
            user_id: '',
            content_type,
            content_id,
            created_at: new Date().toISOString(),
          },
        ])
        if (!isSupabaseConfigured) return
        const { data: { session } } = await supabase.auth.getSession()
        if (!session?.user) return
        await supabase.from('favorites').insert({
          user_id: session.user.id,
          content_type,
          content_id,
        })
      }
    },
    onError: (_err, _vars, context) => {
      if (context?.prev) queryClient.setQueryData(qk, context.prev)
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: qk })
    },
  })

  const toggleFavorite = useCallback(
    (content_type: string, content_id: string) =>
      toggle.mutate({ content_type, content_id }),
    [toggle],
  )

  return { favorites, isFavorite, toggleFavorite }
}
