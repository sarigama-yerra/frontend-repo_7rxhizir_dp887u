import { useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function MetricForm({ onAdded }) {
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0,10),
    weight_kg: '',
    body_fat_pct: '',
    resting_hr: ''
  })
  const [loading, setLoading] = useState(false)

  const update = (k, v) => setForm(prev => ({ ...prev, [k]: v }))

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        date: form.date,
        weight_kg: form.weight_kg === '' ? null : Number(form.weight_kg),
        body_fat_pct: form.body_fat_pct === '' ? null : Number(form.body_fat_pct),
        resting_hr: form.resting_hr === '' ? null : Number(form.resting_hr),
      }
      const res = await fetch(`${API}/api/metrics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Failed to add metric')
      setForm({ ...form, weight_kg: '', body_fat_pct: '', resting_hr: '' })
      onAdded?.()
    } catch (e) {
      alert(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 space-y-3">
      <div className="text-white font-semibold">Add Measurement</div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <input type="date" value={form.date} onChange={e=>update('date', e.target.value)} className="bg-slate-900 text-white rounded-lg px-3 py-2 border border-slate-700" required />
        <input type="number" min="0" step="0.1" value={form.weight_kg} onChange={e=>update('weight_kg', e.target.value)} placeholder="Weight (kg)" className="bg-slate-900 text-white rounded-lg px-3 py-2 border border-slate-700" />
        <input type="number" min="0" max="100" step="0.1" value={form.body_fat_pct} onChange={e=>update('body_fat_pct', e.target.value)} placeholder="Body fat %" className="bg-slate-900 text-white rounded-lg px-3 py-2 border border-slate-700" />
        <input type="number" min="0" max="300" value={form.resting_hr} onChange={e=>update('resting_hr', e.target.value)} placeholder="Resting HR" className="bg-slate-900 text-white rounded-lg px-3 py-2 border border-slate-700" />
      </div>
      <button disabled={loading} className="bg-green-600 hover:bg-green-500 disabled:opacity-60 text-white px-4 py-2 rounded-lg">
        {loading ? 'Saving...' : 'Add Measurement'}
      </button>
    </form>
  )
}
