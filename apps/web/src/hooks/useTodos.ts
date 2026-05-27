import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { useAuthStore } from '../store/authStore'
import { useToastStore } from '../store/toastStore'

export interface Todo {
  id: string
  list_name: string
  text: string
  completed: boolean
  created_at: string
}

export function useTodos() {
  const userId = useAuthStore((s) => s.user?.id ?? null)
  const queryClient = useQueryClient()
  const addToast = useToastStore((s) => s.addToast)
  const qk = ['todos', userId ?? 'anon'] as const

  const query = useQuery({
    queryKey: qk,
    enabled: !!userId,
    queryFn: async (): Promise<Todo[]> => {
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', userId!)
        .order('created_at')
      if (error) throw error
      return (data ?? []) as Todo[]
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: false,
  })

  const addMutation = useMutation({
    mutationFn: async ({ list_name, text }: { list_name: string; text: string }) => {
      if (!userId) throw new Error('Not authenticated')
      const { error } = await supabase
        .from('todos')
        .insert({ user_id: userId, list_name, text, completed: false })
      if (error) throw error
    },
    onMutate: async ({ list_name, text }) => {
      await queryClient.cancelQueries({ queryKey: qk })
      const previous = queryClient.getQueryData<Todo[]>(qk) ?? []
      const optimistic: Todo = {
        id: `opt-${Date.now()}`,
        list_name,
        text,
        completed: false,
        created_at: new Date().toISOString(),
      }
      queryClient.setQueryData<Todo[]>(qk, (old = []) => [...old, optimistic])
      return { previous }
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(qk, context?.previous)
      addToast({ type: 'error', message: 'Todo konnte nicht gespeichert werden.' })
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: qk }),
  })

  const completeMutation = useMutation({
    mutationFn: async ({ id, completed }: { id: string; completed: boolean }) => {
      if (!userId) throw new Error('Not authenticated')
      const { error } = await supabase.from('todos').update({ completed }).eq('id', id).eq('user_id', userId)
      if (error) throw error
    },
    onMutate: async ({ id, completed }) => {
      await queryClient.cancelQueries({ queryKey: qk })
      const previous = queryClient.getQueryData<Todo[]>(qk) ?? []
      queryClient.setQueryData<Todo[]>(qk, (old = []) =>
        old.map(t => t.id === id ? { ...t, completed } : t),
      )
      return { previous }
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(qk, context?.previous)
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: qk }),
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!userId) throw new Error('Not authenticated')
      const { error } = await supabase.from('todos').delete().eq('id', id).eq('user_id', userId)
      if (error) throw error
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: qk })
      const previous = queryClient.getQueryData<Todo[]>(qk) ?? []
      queryClient.setQueryData<Todo[]>(qk, (old = []) => old.filter(t => t.id !== id))
      return { previous }
    },
    onError: (_err, _id, context) => {
      queryClient.setQueryData(qk, context?.previous)
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: qk }),
  })

  const clearDoneMutation = useMutation({
    mutationFn: async (listName: string) => {
      if (!userId) return
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('user_id', userId)
        .eq('list_name', listName)
        .eq('completed', true)
      if (error) throw error
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: qk }),
  })

  return {
    todos: query.data ?? [],
    isLoading: query.isLoading,
    add: addMutation.mutate,
    complete: completeMutation.mutate,
    remove: deleteMutation.mutate,
    clearDone: clearDoneMutation.mutate,
    addError: addMutation.isError,
    addErrorMsg: addMutation.error
      ? ((addMutation.error as any)?.message ?? (addMutation.error as any)?.details ?? JSON.stringify(addMutation.error))
      : undefined,
    completeError: completeMutation.isError,
    deleteError: deleteMutation.isError,
  }
}
