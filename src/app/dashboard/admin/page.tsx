import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { formatCurrency, formatDate, STATUS_LABELS, STATUS_COLORS } from '@/lib/utils'

export default async function AdminOverview() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') redirect('/dashboard')

  const { data: cases } = await supabase.from('cases').select('*, service:services(name), client:profiles!client_id(full_name,company), assigned_staff:profiles!assigned_staff_id(full_name)').order('created_at', { ascending: false }).limit(50)
  const unassigned = cases?.filter(c => !c.assigned_staff_id && !['complete','cancelled'].includes(c.status)) || []
  const totalRevenue = cases?.reduce((sum, c) => sum + (c.amount_paid || 0), 0) || 0

  return (
    <div className="space-y-8">
      <h1 className="font-display text-2xl font-bold text-[#0A1628]">Admin Overview</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[{label:'Total Cases',value:cases?.length||0},{label:'Unassigned',value:unassigned.length},{label:'Total Revenue',value:formatCurrency(totalRevenue)},{label:'Completion Rate',value:cases?.length ? Math.round((cases.filter(c=>c.status==='complete').length/cases.length)*100)+'%' : '0%'}].map(s=>(
          <div key={s.label} className="bg-white rounded-sm border border-slate-200 p-5">
            <div className="text-slate-500 text-sm mb-1">{s.label}</div>
            <div className="font-display text-2xl font-bold text-[#0A1628]">{s.value}</div>
          </div>
        ))}
      </div>
      {unassigned.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-sm p-6">
          <h2 className="font-semibold text-amber-800 mb-4">⚠️ Unassigned Cases ({unassigned.length})</h2>
          <div className="space-y-2">
            {unassigned.map(c => (
              <div key={c.id} className="bg-white rounded-sm p-3 flex items-center justify-between">
                <div>
                  <span className="font-mono text-sm font-medium text-[#0A1628]">{c.case_number}</span>
                  <span className="text-slate-500 text-sm ml-3">{c.service?.name} · {c.client?.full_name}</span>
                </div>
                <Link href={`/dashboard/cases/${c.id}`} className="text-[#C9A84C] text-sm font-medium">Assign →</Link>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="bg-white border border-slate-200 rounded-sm shadow-card overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100"><h2 className="font-semibold text-[#0A1628]">All Cases</h2></div>
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>{['Case #','Service','Client','Staff','Status','Date',''].map(h=>(<th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">{h}</th>))}</tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {cases?.map(c => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-mono text-sm font-medium">{c.case_number}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{c.service?.name}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{c.client?.full_name}</td>
                <td className="px-4 py-3 text-sm text-slate-500">{c.assigned_staff?.full_name || <span className="text-amber-500 font-medium">Unassigned</span>}</td>
                <td className="px-4 py-3"><span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[c.status as keyof typeof STATUS_COLORS]}`}>{STATUS_LABELS[c.status as keyof typeof STATUS_LABELS]}</span></td>
                <td className="px-4 py-3 text-sm text-slate-400">{formatDate(c.created_at)}</td>
                <td className="px-4 py-3"><Link href={`/dashboard/cases/${c.id}`} className="text-[#C9A84C] text-sm font-medium">Open →</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}