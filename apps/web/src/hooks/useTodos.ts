import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'

export interface Todo {
  id: string
  list_name: string
  text: string
  completed: boolean
  created_at: string
}

async function getUserId(): Promise<string | null> {
  const { data: { session } } = await supabase.auth.getSession()
  return session?.user?.id ?? null
}

export function useTodos() {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['todos'],
    queryFn: async (): Promise<Todo[]> => {
      const uid = await getUserId()
      if (!uid) return []
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', uid)
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
const uid = await getUserId()
      if (!uid) throw new Error('Not authenticated')
      const { error } = await supabase
        .from('todos')
        .insert({ user_id: uid, list_name, text, completed: false })
      if (error) throw error
    },
    onMutate: async ({ list_name, text }) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] })
      const previous = queryClient.getQueryData<Todo[]>(['todos']) ?? []
      const optimistic: Todo = {
        id: `opt-${Date.now()}`,
        list_name,
        text,
        completed: false,
        created_at: new Date().toISOString(),
      }
      queryClient.setQueryData<Todo[]>(['todos'], (old = []) => [...old, optimistic])
      return { previous }
    },
    onError: (err, _vars, context) => {
      console.error('[useTodos] add error:', err)
      queryClient.setQueryData(['todos'], context?.previous)
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  })

  const completeMutation = useMutation({
    mutationFn: async ({ id, completed }: { id: string; completed: boolean }) => {
      const uid = await getUserId()
      if (!uid) throw new Error('Not authenticated')
      const { error } = await supabase.from('todos').update({ completed }).eq('id', id).eq('user_id', uid)
      if (error) throw error
    },
    onError: (err) => console.error('[useTodos] complete error:', err),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const uid = await getUserId()
      if (!uid) throw new Error('Not authenticated')
      const { error } = await supabase.from('todos').delete().eq('id', id).eq('user_id', uid)
      if (error) throw error
    },
    onError: (err) => console.error('[useTodos] delete error:', err),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  })

  const clearDoneMutation = useMutation({
    mutationFn: async (listName: string) => {
      const uid = await getUserId()
      if (!uid) return
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('user_id', uid)
        .eq('list_name', listName)
        .eq('completed', true)
      if (error) throw error
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
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
