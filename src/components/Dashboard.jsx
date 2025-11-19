import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Stat({ label, value, hint }) {
  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
      <div className="text-slate-400 text-xs uppercase tracking-wide">{label}</div>
      <div className="text-white text-2xl font-semibold mt-1">{value}</div>
      {hint && <div className="text-slate-400 text-xs mt-1">{hint}</div>}
    </div>
  )
}

export default function Dashboard() {
  const [workouts, setWorkouts] = useState([])
  const [metrics, setMetrics] = useState([])

  const load = async () => {
    const [w, m] = await Promise.all([
      fetch(`${API}/api/workouts`).then(r => r.json()).catch(() => []),
      fetch(`${API}/api/metrics`).then(r => r.json()).catch(() => []),
    ])
    setWorkouts(Array.isArray(w) ? w : [])
    setMetrics(Array.isArray(m) ? m : [])
  }

  useEffect(() => {
    load()
  }, [])

  const totalWorkouts = workouts.length
  const totalMinutes = workouts.reduce((acc, w) => acc + (w.duration_min || 0), 0)
  const latestWeight = metrics.findLast?.(() => true)?.weight_kg || (metrics.length ? metrics[metrics.length-1].weight_kg : null)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Stat label="Total Workouts" value={totalWorkouts} />
        <Stat label="Total Minutes" value={totalMinutes} />
        <Stat label="Latest Weight" value={latestWeight ? `${latestWeight} kg` : '—'} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
          <div className="text-white font-semibold mb-3">Recent Workouts</div>
          <div className="space-y-2 max-h-72 overflow-auto pr-2">
            {workouts.slice().reverse().map(w => (
              <div key={w.id} className="flex items-center justify-between bg-slate-900/50 rounded-lg p-3">
                <div>
                  <div className="text-white font-medium">{w.type}</div>
                  <div className="text-slate-400 text-sm">{new Date(w.date).toLocaleDateString()} • {w.duration_min} min</div>
                </div>
                {w.calories != null && (
                  <div className="text-blue-300 text-sm">{w.calories} kcal</div>
                )}
              </div>
            ))}
            {!workouts.length && (
              <div className="text-slate-400 text-sm">No workouts yet. Add one below.</div>
            )}
          </div>
        </div>

        <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
          <div className="text-white font-semibold mb-3">Body Metrics</div>
          <div className="space-y-2 max-h-72 overflow-auto pr-2">
            {metrics.slice().reverse().map(m => (
              <div key={m.id} className="flex items-center justify-between bg-slate-900/50 rounded-lg p-3">
                <div>
                  <div className="text-white font-medium">{new Date(m.date).toLocaleDateString()}</div>
                  <div className="text-slate-400 text-sm">{m.weight_kg ? `${m.weight_kg} kg` : '—'} • {m.body_fat_pct ? `${m.body_fat_pct}% BF` : '—'} • {m.resting_hr ? `${m.resting_hr} bpm` : '—'}</div>
                </div>
              </div>
            ))}
            {!metrics.length && (
              <div className="text-slate-400 text-sm">No measurements yet. Add one below.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
