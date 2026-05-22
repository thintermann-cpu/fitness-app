-- Stripe subscription fields on user_profiles
ALTER TABLE user_profiles
  ADD COLUMN IF NOT EXISTS stripe_customer_id text,
  ADD COLUMN IF NOT EXISTS subscription_end   timestamptz;

-- subscription_status already exists (text, nullable)
-- Values used: null | 'active' | 'canceled' | 'past_due' | 'trialing'

CREATE UNIQUE INDEX IF NOT EXISTS user_profiles_stripe_customer_id_idx
  ON user_profiles (stripe_customer_id)
  WHERE stripe_customer_id IS NOT NULL;
