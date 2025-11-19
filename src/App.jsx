import Dashboard from './components/Dashboard'
import WorkoutForm from './components/WorkoutForm'
import MetricForm from './components/MetricForm'

function App() {
  const refresh = () => {
    // Simple event-based refresh by reloading children via key
    setKey(k => k + 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.08),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(16,185,129,0.08),transparent_35%)]" />

      <div className="relative px-6 py-10 max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Fitness Tracker</h1>
            <p className="text-slate-300">Log workouts, track your body metrics, and watch your progress.</p>
          </div>
          <a href="/test" className="text-slate-400 hover:text-slate-200 text-sm underline">System Check</a>
        </header>

        <main className="space-y-8">
          <Dashboard key={`dash-${Date.now()}`} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <WorkoutForm onAdded={() => window.location.reload()} />
            <MetricForm onAdded={() => window.location.reload()} />
          </div>
        </main>

        <footer className="mt-10 text-center text-slate-500 text-sm">
          Built with love for better habits.
        </footer>
      </div>
    </div>
  )
}

export default App
