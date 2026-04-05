'use client'
import { useState } from 'react'

export function RoleEditor({ staffId, currentRole, isSelf }: { staffId: string; currentRole: string; isSelf: boolean }) {
  const [role, setRole] = useState(currentRole)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const handleChange = async (newRole: string) => {
    if (newRole === role || isSelf) return
    setSaving(true)
    setToast(null)
    try {
      const res = await fetch(`/api/admin/staff/${staffId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to update role')
      }
      setRole(newRole)
      setToast({ message: 'Role updated', type: 'success' })
    } catch (err: any) {
      setToast({ message: err.message, type: 'error' })
    } finally {
      setSaving(false)
      setTimeout(() => setToast(null), 2000)
    }
  }

  return (
    <div className="relative">
      <select
        value={role}
        onChange={(e) => handleChange(e.target.value)}
        disabled={saving || isSelf}
        className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer disabled:cursor-default focus:ring-2 focus:ring-[#C9A84C] ${
          role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
        }`}
      >
        <option value="staff">staff</option>
        <option value="admin">admin</option>
      </select>
      {toast && (
        <span className={`absolute left-full ml-2 top-0 text-xs whitespace-nowrap px-2 py-1 rounded ${toast.type === 'error' ? 'text-red-600' : 'text-emerald-600'}`}>
          {toast.message}
        </span>
      )}
    </div>
  )
}
