'use client'
import { useState, useEffect, useRef } from 'react'
import { Send, RefreshCw } from 'lucide-react'

interface Message {
  id: string
  content: string
  created_at: string
  sender_id: string
  sender: { full_name: string; role: string }
}

export function ClientCaseMessages({ caseId, currentUserId }: { caseId: string; currentUserId: string }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [content, setContent] = useState('')
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
      body: JSON.stringify({ content: content.trim() }),
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

  if (loading) return <div className="py-6 text-center text-slate-400 text-sm">Loading messages...</div>

  return (
    <div className="bg-white border border-slate-200 rounded-sm shadow-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-[#0A1628] flex items-center gap-2">Messages</h2>
        <button onClick={fetchMessages} className="text-slate-400 hover:text-slate-600 p-1" title="Refresh">
          <RefreshCw size={14} />
        </button>
      </div>

      <div className="h-[300px] overflow-y-auto border border-slate-100 rounded-sm p-4 space-y-3 bg-slate-50/30">
        {messages.length === 0 && (
          <div className="text-center text-slate-400 text-sm py-8">No messages yet. Send a message to your case team below.</div>
        )}
        {messages.map((msg) => {
          const isMe = msg.sender_id === currentUserId
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] rounded-sm p-3 text-sm ${isMe ? 'bg-[#0A1628] text-white' : 'bg-white border border-slate-200 text-slate-700'}`}>
                {!isMe && (
                  <div className="font-semibold text-xs mb-1 text-[#C9A84C]">{msg.sender?.full_name} ({msg.sender?.role})</div>
                )}
                <p className="whitespace-pre-wrap">{msg.content}</p>
                <div className={`text-[10px] mt-1.5 ${isMe ? 'text-slate-400' : 'text-slate-400'}`}>{formatTime(msg.created_at)}</div>
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
          placeholder="Type a message..."
          className="flex-1 border border-slate-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
        />
        <button onClick={handleSend} disabled={sending || !content.trim()}
          className="bg-[#C9A84C] text-[#0A1628] px-4 py-2 rounded-sm hover:bg-[#E8C96A] disabled:opacity-50 flex items-center gap-2 text-sm font-semibold">
          <Send size={14} /> Send
        </button>
      </div>
    </div>
  )
}
