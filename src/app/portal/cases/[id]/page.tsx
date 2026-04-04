import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { formatDate, formatDateTime, STATUS_LABELS, STATUS_COLORS } from '@/lib/utils'
import { ArrowLeft, Download, Clock, FileText, CheckCircle2, MapPin } from 'lucide-react'

function getEstimatedCompletion(createdAt: string, priority: string, turnaround?: string): string | null {
  const created = new Date(createdAt)
  let daysToAdd = 5 // default
  if (priority === 'same_day') daysToAdd = 1
  else if (priority === 'rush') daysToAdd = 2
  else if (turnaround) {
    const match = turnaround.match(/(\d+)/)
    if (match) daysToAdd = Math.ceil(parseInt(match[1]) / 24)
  }
  const est = new Date(created.getTime() + daysToAdd * 24 * 60 * 60 * 1000)
  return formatDate(est)
}

export default async function ClientCaseDetail({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: c } = await supabase.from('cases').select(`
    *, service:services(*), assigned_staff:profiles!assigned_staff_id(full_name),
    updates:case_updates(*), documents:case_documents(*),
    attempts:case_attempts(*)
  `).eq('id', params.id).eq('client_id', user.id).single()

  if (!c) return <div className="py-20 text-center">Case not found.</div>

  const clientDocs = c.documents?.filter((d: any) => d.is_client_visible) || []
  const clientUpdates = c.updates?.filter((u: any) => u.is_client_visible).sort((a:any, b:any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()) || []

  // Build combined timeline: updates + attempt summaries
  const attemptEntries = (c.attempts || []).map((a: any) => ({
    id: `attempt-${a.id}`,
    title: `Service Attempt #${a.attempt_num}`,
    content: `Outcome: ${a.outcome.replace(/_/g, ' ')}${a.notes ? ` — ${a.notes}` : ''}`,
    created_at: a.attempted_at || a.created_at,
    isAttempt: true,
  }))

  const updateEntries = clientUpdates.map((u: any) => ({
    id: u.id,
    title: u.title,
    content: u.content,
    created_at: u.created_at,
    isAttempt: false,
  }))

  const timeline = [...updateEntries, ...attemptEntries].sort((a, b) =>
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )

  const estDate = !['complete','cancelled','unable_to_serve'].includes(c.status)
    ? getEstimatedCompletion(c.created_at, c.priority, c.service?.estimated_turnaround)
    : null

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/portal/cases" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#0A1628] hover:border-[#0A1628] transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="font-display text-2xl font-bold text-[#0A1628]">Case {c.case_number}</h1>
          <p className="text-slate-500 text-sm">Opened {formatDate(c.created_at)}</p>
        </div>
        <div className={`ml-auto px-4 py-1.5 rounded-full text-sm font-bold ${STATUS_COLORS[c.status as keyof typeof STATUS_COLORS]}`}>
          {STATUS_LABELS[c.status as keyof typeof STATUS_LABELS]}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-sm shadow-card p-6">
            <h2 className="font-semibold text-[#0A1628] mb-6 flex items-center gap-2"><Clock size={18} className="text-[#C9A84C]" /> Real-Time Tracking</h2>
            {estDate && (
              <div className="mb-6 bg-blue-50 border border-blue-200 rounded-sm px-4 py-3 text-sm">
                <span className="font-medium text-blue-800">Estimated completion:</span>{' '}
                <span className="text-blue-700">{estDate}</span>
              </div>
            )}
            <div className="relative pl-6 border-l-2 border-slate-100 space-y-8">
              {timeline.map((entry: any, i: number) => (
                <div key={entry.id} className="relative">
                  <div className={`absolute -left-[33px] top-1 w-4 h-4 rounded-full border-2 bg-white ${i===0 ? 'border-[#C9A84C]' : entry.isAttempt ? 'border-orange-400' : 'border-slate-300'}`} />
                  {entry.isAttempt && <span className="inline-block text-xs bg-orange-100 text-orange-700 font-medium px-2 py-0.5 rounded-full mb-1">Service Attempt</span>}
                  <div className={`font-semibold ${i===0 ? 'text-[#0A1628]' : 'text-slate-600'}`}>{entry.title}</div>
                  {entry.content && <div className="text-sm text-slate-500 mt-1">{entry.content}</div>}
                  <div className="text-xs text-slate-400 mt-1.5">{formatDateTime(entry.created_at)}</div>
                </div>
              ))}
              {timeline.length === 0 && (
                <div className="text-slate-500 italic text-sm">Tracking data will appear here once our team begins processing your order.</div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#0A1628] text-white rounded-sm p-6">
            <h2 className="font-semibold mb-4 border-b border-white/10 pb-4">Service Details</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Service</span>
                <span className="font-medium">{c.service?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Priority</span>
                <span className="font-medium capitalize text-[#C9A84C]">{c.priority?.replace(/_/g, ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Subject</span>
                <span className="font-medium text-right break-words max-w-[150px]">{c.subject_name || 'N/A'}</span>
              </div>
              {c.attempts && c.attempts.length > 0 && (
                <div className="flex justify-between pt-2 border-t border-white/5">
                  <span className="text-slate-400">Attempts</span>
                  <span className="font-medium">{c.attempts.length}</span>
                </div>
              )}
              {c.assigned_staff?.full_name && (
                 <div className="flex justify-between pt-2 border-t border-white/5">
                   <span className="text-slate-400">Agent</span>
                   <span className="font-medium break-words text-right max-w-[150px]">{c.assigned_staff?.full_name}</span>
                 </div>
              )}
              {c.deadline && (
                <div className="flex justify-between pt-2 border-t border-white/5">
                  <span className="text-slate-400">Deadline</span>
                  <span className="font-medium">{formatDate(c.deadline)}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-sm shadow-card p-6">
            <h2 className="font-semibold text-[#0A1628] mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
              <FileText size={18} className="text-[#C9A84C]" /> Official Documents
            </h2>
            {clientDocs.length > 0 ? (
              <div className="space-y-3">
                {clientDocs.map((d: any) => (
                  <div key={d.id} className="group flex items-center justify-between p-3 bg-slate-50 rounded-sm border border-slate-100 hover:border-slate-300 transition-colors">
                    <div>
                      <div className="font-medium text-[#0A1628] text-sm">{d.file_name}</div>
                      <div className="text-xs text-slate-500 capitalize">{d.doc_type.replace(/_/g, ' ')}</div>
                    </div>
                    {d.storage_url && (
                      <a href={d.storage_url} target="_blank" rel="noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 text-slate-600 group-hover:bg-[#C9A84C] group-hover:text-[#0A1628] transition-colors">
                        <Download size={14} />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <CheckCircle2 size={32} className="text-slate-200 mx-auto mb-2" />
                <p className="text-slate-500 text-sm">No documents are available yet.<br />Affidavits will appear here when complete.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
