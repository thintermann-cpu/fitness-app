import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import posthog from 'posthog-js'
import './index.css'
import App from './App.tsx'

if (import.meta.env.VITE_POSTHOG_KEY) {
  posthog.init(import.meta.env.VITE_POSTHOG_KEY as string, {
    api_host: (import.meta.env.VITE_POSTHOG_HOST as string) || 'https://eu.i.posthog.com',
    person_profiles: 'never',
    persistence: 'memory',
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
