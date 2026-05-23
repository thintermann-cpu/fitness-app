import Stripe from 'https://esm.sh/stripe@14?target=deno'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2?target=deno'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2024-06-20',
  httpClient: Stripe.createFetchHttpClient(),
  cryptoProvider: Stripe.createSubtleCryptoProvider(),
})
const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
)

async function syncSubscription(customerId: string, subscription: Stripe.Subscription) {
  const end = new Date(subscription.current_period_end * 1000).toISOString()
  await supabase
    .from('user_profiles')
    .update({
      subscription_status: subscription.status,
      subscription_end: end,
    })
    .eq('stripe_customer_id', customerId)
}

Deno.serve(async (req) => {
  const sig = req.headers.get('stripe-signature')
  if (!sig) return new Response('No signature', { status: 400 })

  let event: Stripe.Event
  try {
    const body = await req.text()
    event = await stripe.webhooks.constructEventAsync(body, sig, webhookSecret)
  } catch (err) {
    return new Response(`Webhook error: ${err}`, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        if (session.mode !== 'subscription' || !session.subscription) break
        const sub = await stripe.subscriptions.retrieve(session.subscription as string)
        await syncSubscription(session.customer as string, sub)
        break
      }
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        await syncSubscription(sub.customer as string, sub)
        break
      }
    }
  } catch (err) {
    return new Response(`Handler error: ${err}`, { status: 500 })
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { 'Content-Type': 'application/json' },
  })
})
