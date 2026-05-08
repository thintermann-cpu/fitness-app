import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const Home = () => <div>Home</div>
const Workout = () => <div>Workout</div>
const Routine = () => <div>My Day</div>
const Stretching = () => <div>Stretching</div>
const Meditation = () => <div>Meditation</div>
const Onboarding = () => <div>Onboarding</div>
const Settings = () => <div>Settings</div>

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/workout" element={<Workout />} />
          <Route path="/routine" element={<Routine />} />
          <Route path="/stretching" element={<Stretching />} />
          <Route path="/meditation" element={<Meditation />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
