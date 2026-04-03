import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { formatDate, STATUS_LABELS, STATUS_COLORS, PRIORITY_COLORS, PRIORITY_LABELS } from '@/lib/utils'

export default async function DashboardHome() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  const isAdmin = profile?.role === 'admin'

  let query = supabase.from('cases').select('*, service:services(name), client:profiles!client_id(full_name,company)', { count: 'exact' })
  if (!isAdmin) query = query.eq('assigned_staff_id', user.id)
  const { data: cases, count } = await query.not('status','in','(complete,cancelled)').order('created_at', { ascending: false }).limit(20)

  const { count: totalCount } = await supabase.from('cases').select('*', { count: 'exact', head: true })
  const { count: unassignedCount } = await supabase.from('cases').select('*', { count: 'exact', head: true }).is('assigned_staff_id', null).not('status','in','(complete,cancelled)')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-[#0A1628]">Dashboard</h1>
        <p className="text-slate-500">{isAdmin ? 'All cases overview' : 'Your assigned cases'}</p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[{label:'Active Cases',value:count||0},{label:'Unassigned',value:unassignedCount||0},{label:'Total Cases (All Time)',value:totalCount||0}].map(s=>(
          <div key={s.label} className="bg-white rounded-sm border border-slate-200 p-5 shadow-card">
            <div className="text-slate-500 text-sm mb-1">{s.label}</div>
            <div className="font-display text-3xl font-bold text-[#0A1628]">{s.value}</div>
          </div>
        ))}
      </div>
      <div className="bg-white border border-slate-200 rounded-sm shadow-card overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-[#0A1628]">Active Cases</h2>
        </div>
        {cases && cases.length > 0 ? (
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {['Case #','Service','Client','Priority','Status','Date',''].map(h=>(
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {cases.map(c => (
                <tr key={c.id} className={`hover:bg-slate-50 transition-colors ${!c.assigned_staff_id ? 'bg-amber-50/50' : ''}`}>
                  <td className="px-4 py-3 font-mono text-sm font-medium text-[#0A1628]">{c.case_number}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{c.service?.name}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{c.client?.full_name}<br /><span className="text-slate-400 text-xs">{c.client?.company}</span></td>
                  <td className="px-4 py-3"><span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${PRIORITY_COLORS[c.priority as keyof typeof PRIORITY_COLORS]}`}>{PRIORITY_LABELS[c.priority as keyof typeof PRIORITY_LABELS]}</span></td>
                  <td className="px-4 py-3"><span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[c.status as keyof typeof STATUS_COLORS]}`}>{STATUS_LABELS[c.status as keyof typeof STATUS_LABELS]}</span></td>
                  <td className="px-4 py-3 text-sm text-slate-400">{formatDate(c.created_at)}</td>
                  <td className="px-4 py-3"><Link href={`/dashboard/cases/${c.id}`} className="text-[#C9A84C] text-sm font-medium hover:underline">Open →</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-16 text-center text-slate-500">No active cases.</div>
        )}
      </div>
    </div>
  )
}