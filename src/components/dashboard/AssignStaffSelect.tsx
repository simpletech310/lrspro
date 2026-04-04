'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface StaffMember {
  id: string
  full_name: string
}

export function AssignStaffSelect({ caseId, currentStaffId }: { caseId: string; currentStaffId?: string }) {
  const router = useRouter()
  const [staff, setStaff] = useState<StaffMember[]>([])
  const [selected, setSelected] = useState(currentStaffId || '')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('/api/staff')
      .then(r => r.json())
      .then(d => setStaff(d.data || []))
      .catch(() => {})
  }, [])

  const handleAssign = async (staffId: string) => {
    setSelected(staffId)
    setLoading(true)
    try {
      await fetch(`/api/cases/${caseId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assigned_staff_id: staffId || null }),
      })
      router.refresh()
    } catch {} finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <label className="block text-slate-400 mb-1 text-sm">Assigned Staff</label>
      <select value={selected} onChange={e => handleAssign(e.target.value)} disabled={loading}
        className="w-full bg-[#112240] border border-white/10 text-white rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C] disabled:opacity-50">
        <option value="">Unassigned</option>
        {staff.map(s => <option key={s.id} value={s.id}>{s.full_name}</option>)}
      </select>
    </div>
  )
}
