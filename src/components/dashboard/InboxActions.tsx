'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Trash2 } from 'lucide-react'

export function InboxActions({ id, isRead }: { id: string; isRead: boolean }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const toggleRead = async () => {
    setLoading(true)
    await fetch(`/api/contact/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_read: !isRead }),
    })
    router.refresh()
    setLoading(false)
  }

  const handleDelete = async () => {
    if (!confirm('Delete this submission? This cannot be undone.')) return
    setLoading(true)
    await fetch(`/api/contact/${id}`, { method: 'DELETE' })
    router.refresh()
  }

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={toggleRead}
        disabled={loading}
        title={isRead ? 'Mark unread' : 'Mark read'}
        className="p-1.5 rounded-sm text-slate-400 hover:text-[#0A1628] hover:bg-slate-100 disabled:opacity-50"
      >
        {isRead ? <EyeOff size={14} /> : <Eye size={14} />}
      </button>
      <button
        onClick={handleDelete}
        disabled={loading}
        title="Delete"
        className="p-1.5 rounded-sm text-slate-400 hover:text-red-600 hover:bg-red-50 disabled:opacity-50"
      >
        <Trash2 size={14} />
      </button>
    </div>
  )
}
