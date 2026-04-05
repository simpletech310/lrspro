'use client'
import { useState, useEffect, useRef } from 'react'
import { Send, Lock, RefreshCw } from 'lucide-react'

interface Message {
  id: string
  content: string
  is_internal: boolean
  created_at: string
  sender_id: string
  sender: { full_name: string; role: string }
}

export function CaseMessages({ caseId }: { caseId: string }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [content, setContent] = useState('')
  const [isInternal, setIsInternal] = useState(false)
  const [sending, setSending] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  const fetchMessages = async () => {
    const res = await fetch(`/api/cases/${caseId}/messages`)
    if (res.ok) {
      const { data } = await res.json()
      setMessages(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchMessages()
    const interval = setInterval(fetchMessages, 10000)
    return () => clearInterval(interval)
  }, [caseId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!content.trim() || sending) return
    setSending(true)
    const res = await fetch(`/api/cases/${caseId}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: content.trim(), is_internal: isInternal }),
    })
    if (res.ok) {
      setContent('')
      fetchMessages()
    }
    setSending(false)
  }

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' ' +
           d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  }

  if (loading) return <div className="py-8 text-center text-slate-500">Loading messages...</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-[#0A1628]">Case Messages</h3>
        <button onClick={fetchMessages} className="text-slate-400 hover:text-slate-600 p-1" title="Refresh">
          <RefreshCw size={14} />
        </button>
      </div>

      <div className="h-[400px] overflow-y-auto border border-slate-100 rounded-sm p-4 space-y-4 bg-slate-50/50">
        {messages.length === 0 && (
          <div className="text-center text-slate-400 text-sm py-12">No messages yet. Start the conversation below.</div>
        )}
        {messages.map((msg) => (
          <div key={msg.id} className={`rounded-sm p-3 text-sm ${msg.is_internal ? 'bg-amber-50 border border-amber-200' : 'bg-white border border-slate-200'}`}>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-[#0A1628]">{msg.sender?.full_name || 'Unknown'}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${msg.sender?.role === 'admin' ? 'bg-purple-100 text-purple-700' : msg.sender?.role === 'staff' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
                {msg.sender?.role}
              </span>
              {msg.is_internal && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium bg-amber-100 text-amber-700 flex items-center gap-0.5">
                  <Lock size={8} /> Internal
                </span>
              )}
              <span className="text-slate-400 text-xs ml-auto">{formatTime(msg.created_at)}</span>
            </div>
            <p className="text-slate-700 whitespace-pre-wrap">{msg.content}</p>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="mt-4 space-y-3">
        <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
          <input type="checkbox" checked={isInternal} onChange={(e) => setIsInternal(e.target.checked)}
            className="w-4 h-4 text-amber-500 focus:ring-amber-500 border-slate-300 rounded" />
          <Lock size={12} className="text-amber-600" />
          <span className="text-slate-600">Internal note <span className="text-slate-400">(not visible to client)</span></span>
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
            placeholder={isInternal ? 'Type an internal note...' : 'Type a message to the client...'}
            className={`flex-1 border rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 ${isInternal ? 'border-amber-300 focus:ring-amber-300 bg-amber-50/50' : 'border-slate-200 focus:ring-[#C9A84C]'}`}
          />
          <button onClick={handleSend} disabled={sending || !content.trim()}
            className="bg-[#0A1628] text-white px-4 py-2 rounded-sm hover:bg-[#112240] disabled:opacity-50 flex items-center gap-2 text-sm font-medium">
            <Send size={14} /> Send
          </button>
        </div>
      </div>
    </div>
  )
}
