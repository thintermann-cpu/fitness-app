import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'

export function OnboardingPage() {
  const navigate = useNavigate()

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="space-y-6 max-w-sm">
        <div className="text-5xl">💪</div>
        <h1 className="text-3xl font-bold" style={{ color: 'var(--color-text)' }}>
          Welcome to CarveOut
        </h1>
        <p style={{ color: 'var(--color-text-muted)' }}>
          Your personalized fitness journey begins here.
        </p>
        <Button onClick={() => navigate('/')} className="w-full">
          Get Started
        </Button>
      </div>
    </div>
  )
}
