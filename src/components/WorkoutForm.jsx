import { useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function WorkoutForm({ onAdded }) {
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0,10),
    type: 'Cardio',
    duration_min: 30,
    calories: '',
    notes: '',
  })
  const [loading, setLoading] = useState(false)

  const update = (k, v) => setForm(prev => ({ ...prev, [k]: v }))

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        ...form,
        duration_min: Number(form.duration_min),
        calories: form.calories === '' ? null : Number(form.calories),
      }
      const res = await fetch(`${API}/api/workouts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Failed to add workout')
      setForm({ ...form, calories: '', notes: '' })
      onAdded?.()
    } catch (e) {
      alert(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 space-y-3">
      <div className="text-white font-semibold">Add Workout</div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <input type="date" value={form.date} onChange={e=>update('date', e.target.value)} className="bg-slate-900 text-white rounded-lg px-3 py-2 border border-slate-700" required />
        <select value={form.type} onChange={e=>update('type', e.target.value)} className="bg-slate-900 text-white rounded-lg px-3 py-2 border border-slate-700">
          {['Cardio','Strength','HIIT','Yoga','Pilates','Sports','Other'].map(t=> <option key={t} value={t}>{t}</option>)}
        </select>
        <input type="number" min="1" max="1440" value={form.duration_min} onChange={e=>update('duration_min', e.target.value)} placeholder="Minutes" className="bg-slate-900 text-white rounded-lg px-3 py-2 border border-slate-700" required />
        <input type="number" min="0" value={form.calories} onChange={e=>update('calories', e.target.value)} placeholder="Calories (optional)" className="bg-slate-900 text-white rounded-lg px-3 py-2 border border-slate-700 col-span-2 sm:col-span-1" />
        <input type="text" value={form.notes} onChange={e=>update('notes', e.target.value)} placeholder="Notes (optional)" className="bg-slate-900 text-white rounded-lg px-3 py-2 border border-slate-700 col-span-2" />
      </div>
      <button disabled={loading} className="bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white px-4 py-2 rounded-lg">
        {loading ? 'Saving...' : 'Add Workout'}
      </button>
    </form>
  )
}
