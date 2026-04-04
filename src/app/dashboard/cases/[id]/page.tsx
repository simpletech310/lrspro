import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { formatDate, formatDateTime, STATUS_LABELS, STATUS_COLORS, formatCurrency } from '@/lib/utils'
import { CaseActions } from '@/components/dashboard/CaseActions'
import { AssignStaffSelect } from '@/components/dashboard/AssignStaffSelect'

export default async function StaffCaseDetail({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data: profile } = await supabase.from('profiles').select('role, full_name').eq('id', user.id).single()

  const { data: c } = await supabase.from('cases').select(`
    *, client:profiles!client_id(*), assigned_staff:profiles!assigned_staff_id(*), service:services(*),
    attempts:case_attempts(*, staff:profiles(*)), updates:case_updates(*, author:profiles(*)),
    documents:case_documents(*), checklist:case_checklist_items(*)
  `).eq('id', params.id).order('created_at', { referencedTable: 'case_updates', ascending: false }).single()

  if (!c) return <div>Case not found</div>

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="font-display text-2xl font-bold text-[#0A1628]">Case {c.case_number}</h1>
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${STATUS_COLORS[c.status as keyof typeof STATUS_COLORS]}`}>
              {STATUS_LABELS[c.status as keyof typeof STATUS_LABELS]}
            </span>
          </div>
          <p className="text-slate-500 text-sm">Service: {c.service?.name} | Opened: {formatDate(c.created_at)}</p>
        </div>
        <Link href="/dashboard/cases" className="text-sm text-slate-500 hover:text-[#0A1628]">← Back to Cases</Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 relative">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-sm shadow-card p-6">
            <h2 className="font-semibold text-[#0A1628] mb-4 pb-2 border-b border-slate-100">Case Details</h2>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              {[
                ['Subject Name', c.subject_name],
                ['Subject Address', c.subject_address ? `${c.subject_address}, ${c.subject_city}, ${c.subject_state} ${c.subject_zip}` : ''],
                ['Court Name', c.court_name],
                ['Court Case #', c.court_case_number],
                ['Plaintiff', c.plaintiff_name],
                ['Defendant', c.defendant_name],
                ['Instructions', c.special_instructions],
                ['Deadline', c.deadline ? formatDate(c.deadline) : 'None'],
                ['Client Note', c.documents_description]
              ].filter(([_, v]) => v).map(([k, v]) => (
                <div key={k as string} className={['Instructions','Client Note','Subject Address'].includes(k as string) ? 'sm:col-span-2' : ''}>
                  <span className="block text-slate-500 mb-0.5">{k as string}</span>
                  <span className="font-medium text-[#0A1628] break-words">{v as string}</span>
                </div>
              ))}
            </div>
          </div>

          <CaseActions
             caseId={c.id}
             status={c.status}
             checklist={c.checklist}
             attempts={c.attempts}
             documents={c.documents}
             userRole={profile?.role as string}
             staffId={user.id}
          />
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#0A1628] text-white rounded-sm p-6">
            <h2 className="font-semibold mb-4 pb-2 border-b border-white/10">Assignment & Client</h2>
            <div className="space-y-4 text-sm">
              <div>
                <span className="block text-slate-400 mb-1">Client</span>
                <span className="font-medium">{c.client?.full_name}</span>
                {c.client?.company && <span className="block text-slate-500">{c.client.company}</span>}
                {c.client?.email && <span className="block text-slate-500">{c.client.email}</span>}
                {c.client?.phone && <span className="block text-slate-500">{c.client.phone}</span>}
              </div>
              <div className="pt-2 border-t border-white/5">
                {profile?.role === 'admin' ? (
                  <AssignStaffSelect caseId={c.id} currentStaffId={c.assigned_staff_id} />
                ) : (
                  <>
                    <span className="block text-slate-400 mb-1">Assigned Staff</span>
                    <span className="font-medium text-[#C9A84C]">{c.assigned_staff?.full_name || 'Unassigned'}</span>
                  </>
                )}
              </div>
              <div className="pt-2 border-t border-white/5">
                <span className="block text-slate-400 mb-1">Amount Paid</span>
                <span className="font-medium text-emerald-400">{formatCurrency(c.amount_paid || 0)}</span>
              </div>
              <div className="pt-2 border-t border-white/5">
                <span className="block text-slate-400 mb-1">Priority</span>
                <span className="font-medium text-[#C9A84C] capitalize">{c.priority?.replace(/_/g, ' ')}</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-sm shadow-card p-6">
            <h2 className="font-semibold text-[#0A1628] mb-4 pb-2 border-b border-slate-100">Timeline</h2>
            <div className="relative pl-4 border-l-2 border-slate-100 space-y-6">
              {c.updates?.map((u: any) => (
                <div key={u.id} className="relative">
                  <div className="absolute -left-[23px] top-1 w-4 h-4 rounded-full bg-white border-2 border-[#C9A84C]" />
                  <div className="text-sm font-semibold text-[#0A1628]">{u.title}</div>
                  {u.content && <div className="text-sm text-slate-600 mt-1">{u.content}</div>}
                  <div className="text-xs text-slate-400 mt-1">{formatDateTime(u.created_at)} by {u.author?.full_name || 'System'}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
