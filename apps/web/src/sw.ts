import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies'

declare const self: ServiceWorkerGlobalScope & {
  __WB_MANIFEST: Array<{ url: string; revision: string | null }>
}

self.addEventListener('install', () => void self.skipWaiting())
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()))

cleanupOutdatedCaches()
precacheAndRoute(self.__WB_MANIFEST)

// Network-first for Supabase API calls
registerRoute(
  ({ url }) => url.hostname.includes('supabase.co'),
  new NetworkFirst({ cacheName: 'supabase-api', networkTimeoutSeconds: 5 }),
)

// Stale-while-revalidate for public JSON assets (wods.json etc.)
registerRoute(
  ({ url }) => url.origin === self.location.origin && url.pathname.endsWith('.json') && url.pathname !== '/manifest.json',
  new StaleWhileRevalidate({ cacheName: 'static-json' }),
)

// === Push Notifications (merged from public/sw.js) ===
self.addEventListener('push', (event) => {
  const data: Record<string, string> = event.data?.json() ?? {}
  const options: NotificationOptions = {
    body: data.body ?? '',
    icon: '/favicon.svg',
    badge: '/favicon.svg',
    data: { url: data.url ?? '/' },
  }
  event.waitUntil(self.registration.showNotification(data.title ?? 'CarveOut', options))
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const url: string = event.notification.data?.url ?? '/'
  event.waitUntil(
    self.clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((list) => {
        for (const c of list) {
          if (c.url === url && 'focus' in c) return (c as WindowClient).focus()
        }
        return self.clients.openWindow(url)
      }),
  )
})
