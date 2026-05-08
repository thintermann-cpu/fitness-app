import { supabase } from './supabase'

const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY ?? ''

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)))
}

export async function subscribeToPush(): Promise<boolean> {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) return false
  if (!VAPID_PUBLIC_KEY) {
    console.warn('VITE_VAPID_PUBLIC_KEY not configured')
    return false
  }

  const permission = await Notification.requestPermission()
  if (permission !== 'granted') return false

  const registration = await navigator.serviceWorker.register('/sw.js')
  await navigator.serviceWorker.ready

  const existing = await registration.pushManager.getSubscription()
  const subscription =
    existing ??
    (await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
    }))

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return false

  const { error } = await supabase
    .from('push_subscriptions')
    .upsert({ user_id: user.id, subscription: subscription.toJSON() }, { onConflict: 'user_id' })

  return !error
}

export async function unsubscribeFromPush(): Promise<void> {
  if (!('serviceWorker' in navigator)) return

  const registration = await navigator.serviceWorker.getRegistration('/sw.js')
  if (registration) {
    const subscription = await registration.pushManager.getSubscription()
    await subscription?.unsubscribe()
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (user) {
    await supabase.from('push_subscriptions').delete().eq('user_id', user.id)
  }
}

export async function getPushSubscriptionStatus(): Promise<boolean> {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) return false
  if (Notification.permission !== 'granted') return false

  const registration = await navigator.serviceWorker.getRegistration('/sw.js')
  if (!registration) return false

  const subscription = await registration.pushManager.getSubscription()
  return !!subscription
}
