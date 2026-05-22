import { useEffect, useRef, useState } from 'react'
import { useSubscription, type PricePlan } from '../../hooks/useSubscription'
import { useAuthStore } from '../../store/authStore'

interface Props { lang: 'de' | 'en' }

const T = {
  de: {
    label: 'PREIS',
    headline: 'Vier Apps in einer. Ein fairer Preis.',
    monthly: { period: 'Pro Monat', badge: null,               savings: null,              cta: 'Jetzt starten' },
    yearly:  { period: 'Pro Jahr',  badge: 'Beliebteste Wahl', savings: '2 Monate gratis', cta: 'Jetzt starten' },
    perMonth: '= 5.– / Monat',
    features:       ['Alle 4 Säulen', 'Unbegrenzte Sessions', 'DE / EN / ES', 'Offline-fähig'],
    featuresYearly: ['Alle 4 Säulen', 'Unbegrenzte Sessions', 'DE / EN / ES', 'Offline-fähig', 'Priority Updates'],
    lifetime: 'Limitierter Lifetime Pass für Early Adopters — Details folgen.',
    loginRequired: 'Bitte erst einloggen.',
    chf: 'CHF',
    eur: 'EUR',
  },
  en: {
    label: 'PRICING',
    headline: 'Four apps in one. One fair price.',
    monthly: { period: 'Per month', badge: null,             savings: null,           cta: 'Start now' },
    yearly:  { period: 'Per year',  badge: 'Most popular',  savings: '2 months free', cta: 'Start now' },
    perMonth: '= 5.– / month',
    features:       ['All 4 pillars', 'Unlimited sessions', 'DE / EN / ES', 'Offline-ready'],
    featuresYearly: ['All 4 pillars', 'Unlimited sessions', 'DE / EN / ES', 'Offline-ready', 'Priority updates'],
    lifetime: 'Limited Lifetime Pass for Early Adopters — details coming soon.',
    loginRequired: 'Please log in first.',
    chf: 'CHF',
    eur: 'EUR',
  },
}

const PRICES = {
  chf: { monthly: 'CHF 8.–', yearly: 'CHF 60.–', perMonth: '= CHF 5.– / Monat' },
  eur: { monthly: 'EUR 8.–', yearly: 'EUR 60.–', perMonth: '= EUR 5.– / Monat' },
}

export function PricingSection({ lang }: Props) {
  const t   = T[lang]
  const ref = useRef<HTMLDivElement>(null)
  const [currency, setCurrency] = useState<'chf' | 'eur'>('chf')
  const { startCheckout, loading } = useSubscription()
  const { session } = useAuthStore()
  const prices = PRICES[currency]

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('lp-visible'); obs.disconnect() } },
      { threshold: 0.1 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  function handleCheckout(plan: 'monthly' | 'annual') {
    if (!session) { alert(t.loginRequired); return }
    const key: PricePlan = `${plan}_${currency}` as PricePlan
    startCheckout(key)
  }

  return (
    <section id="pricing" className="px-5 md:px-10 py-20 max-w-3xl mx-auto">
      <div ref={ref} className="lp-fade">
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#E8642A' }}>{t.label}</p>
        <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: 'var(--color-text)' }}>{t.headline}</h2>

        {/* Currency toggle */}
        <div className="flex gap-2 mb-8">
          {(['chf', 'eur'] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCurrency(c)}
              className="px-4 py-1.5 rounded-full text-sm font-bold transition-colors"
              style={currency === c
                ? { backgroundColor: '#E8642A', color: '#fff' }
                : { backgroundColor: 'rgba(255,255,255,0.06)', color: 'var(--color-text-muted)' }
              }
            >
              {t[c]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Monthly */}
          <div
            className="rounded-2xl p-6 space-y-4"
            style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div>
              <p className="text-4xl font-black" style={{ color: 'var(--color-text)' }}>{prices.monthly}</p>
              <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>{t.monthly.period}</p>
            </div>
            <ul className="space-y-1.5">
              {t.features.map((f) => (
                <li key={f} className="text-sm flex items-center gap-2" style={{ color: 'var(--color-text-muted)' }}>
                  <span style={{ color: '#7BC67E' }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleCheckout('monthly')}
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-sm transition-opacity disabled:opacity-50"
              style={{ backgroundColor: 'rgba(255,255,255,0.10)', color: 'var(--color-text)' }}
            >
              {t.monthly.cta}
            </button>
          </div>

          {/* Yearly */}
          <div
            className="rounded-2xl p-6 space-y-4 relative"
            style={{ backgroundColor: 'var(--color-bg-elevated)', border: '1px solid #E8642A40' }}
          >
            {t.yearly.badge && (
              <span
                className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold text-white whitespace-nowrap"
                style={{ backgroundColor: '#E8642A' }}
              >
                {t.yearly.badge}
              </span>
            )}
            <div>
              <div className="flex items-start gap-2">
                <p className="text-4xl font-black" style={{ color: 'var(--color-text)' }}>{prices.yearly}</p>
                {t.yearly.savings && (
                  <span className="mt-1 px-2 py-0.5 rounded-full text-xs font-bold" style={{ backgroundColor: '#E8642A22', color: '#E8642A' }}>
                    {t.yearly.savings}
                  </span>
                )}
              </div>
              <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
                {t.yearly.period} <span style={{ color: 'var(--color-text-subtle)' }}>({prices.perMonth})</span>
              </p>
            </div>
            <ul className="space-y-1.5">
              {t.featuresYearly.map((f) => (
                <li key={f} className="text-sm flex items-center gap-2" style={{ color: 'var(--color-text-muted)' }}>
                  <span style={{ color: '#7BC67E' }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleCheckout('annual')}
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-sm transition-opacity disabled:opacity-50"
              style={{ backgroundColor: '#E8642A', color: '#fff' }}
            >
              {t.yearly.cta}
            </button>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs" style={{ color: 'var(--color-text-subtle)' }}>{t.lifetime}</p>
        </div>
      </div>
    </section>
  )
}
