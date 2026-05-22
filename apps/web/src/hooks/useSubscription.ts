import { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { supabase } from '../lib/supabase'

const PRICE_IDS = {
  monthly_chf: import.meta.env.VITE_STRIPE_PRICE_MONTHLY_CHF as string,
  annual_chf:  import.meta.env.VITE_STRIPE_PRICE_ANNUAL_CHF  as string,
  monthly_eur: import.meta.env.VITE_STRIPE_PRICE_MONTHLY_EUR as string,
  annual_eur:  import.meta.env.VITE_STRIPE_PRICE_ANNUAL_EUR  as string,
}

export type PricePlan = keyof typeof PRICE_IDS

export function useSubscription() {
  const { profile, session } = useAuthStore()
  const [loading, setLoading] = useState(false)

  const status = profile?.subscription_status ?? null
  const isActive = status === 'active' || status === 'trialing'
  const endDate = (profile as (typeof profile & { subscription_end?: string | null }) | null)
    ?.subscription_end ?? null

  async function startCheckout(plan: PricePlan) {
    if (!session) return
    setLoading(true)
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { price_id: PRICE_IDS[plan] },
      })
      if (error) throw error
      if (data?.url) window.location.href = data.url
    } finally {
      setLoading(false)
    }
  }

  return { status, isActive, endDate, loading, startCheckout }
}
