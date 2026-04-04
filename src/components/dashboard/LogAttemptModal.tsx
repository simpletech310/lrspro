'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'
import { AttemptOutcome } from '@/types/database'

const OUTCOMES: { value: AttemptOutcome; label: string }[] = [
  { value: 'personally_served', label: 'Personally Served' },
  { value: 'sub_served', label: 'Sub-Served' },
  { value: 'no_answer', label: 'No Answer' },
  { value: 'door_answered_refused', label: 'Door Answered – Refused' },
  { value: 'wrong_address', label: 'Wrong Address' },
  { value: 'moved', label: 'Moved' },
  { value: 'vacant', label: 'Vacant' },
  { value: 'business_closed', label: 'Business Closed' },
  { value: 'other', label: 'Other' },
]

export function LogAttemptModal({ caseId, onClose }: { caseId: string; onClose: () => void }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    outcome: 'no_answer' as AttemptOutcome,
    address_used: '',
    contact_name: '',
    notes: '',
    attempted_at: new Date().toISOString().slice(0, 16),
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.address_used.trim()) { setError('Address is required'); return }
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/cases/${caseId}/attempts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || 'Failed to log attempt') }
      router.refresh()
      onClose()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-sm shadow-elevated w-full max-w-lg mx-4" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="font-semibold text-[#0A1628]">Log Service Attempt</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Outcome *</label>
            <select value={form.outcome} onChange={e => setForm(f => ({ ...f, outcome: e.target.value as AttemptOutcome }))}
              className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent">
              {OUTCOMES.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Address Used *</label>
            <input type="text" value={form.address_used} onChange={e => setForm(f => ({ ...f, address_used: e.target.value }))}
              placeholder="123 Main St, Riverside, CA 92501"
              className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Date & Time</label>
            <input type="datetime-local" value={form.attempted_at} onChange={e => setForm(f => ({ ...f, attempted_at: e.target.value }))}
              className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Contact Name</label>
            <input type="text" value={form.contact_name} onChange={e => setForm(f => ({ ...f, contact_name: e.target.value }))}
              placeholder="Person encountered (if any)"
              className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
            <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} rows={3}
              placeholder="Details about the attempt..."
              className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent" />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800">Cancel</button>
            <button type="submit" disabled={loading}
              className="bg-[#C9A84C] text-[#0A1628] px-6 py-2 text-sm font-semibold rounded-sm hover:bg-[#E8C96A] disabled:opacity-50">
              {loading ? 'Saving...' : 'Log Attempt'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
