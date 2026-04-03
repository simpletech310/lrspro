import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { formatDate, STATUS_LABELS, STATUS_COLORS, PRIORITY_LABELS, PRIORITY_COLORS } from '@/lib/utils'

export default async function AllCasesPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: cases } = await supabase.from('cases').select('*, service:services(name), client:profiles!client_id(full_name, company), assigned_staff:profiles!assigned_staff_id(full_name)').order('created_at', { ascending: false }).limit(200)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-display text-2xl font-bold text-[#0A1628]">All Cases</h1>
          <p className="text-slate-500">View and filter across the entire system.</p>
        </div>
      </div>
      
      <div className="bg-white border border-slate-200 rounded-sm shadow-card overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {['Case #','Service','Client','Staff','Status','Priority','Date',''].map(h=>(
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {cases && cases.map(c => (
              <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 font-mono text-sm font-medium text-[#0A1628]">{c.case_number}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{c.service?.name}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{c.client?.full_name}</td>
                <td className="px-4 py-3 text-sm text-slate-500">{c.assigned_staff?.full_name || <span className="text-amber-500">Unassigned</span>}</td>
                <td className="px-4 py-3"><span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[c.status as keyof typeof STATUS_COLORS]}`}>{STATUS_LABELS[c.status as keyof typeof STATUS_LABELS]}</span></td>
                <td className="px-4 py-3"><span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${PRIORITY_COLORS[c.priority as keyof typeof PRIORITY_COLORS]}`}>{PRIORITY_LABELS[c.priority as keyof typeof PRIORITY_LABELS]}</span></td>
                <td className="px-4 py-3 text-sm text-slate-400">{formatDate(c.created_at)}</td>
                <td className="px-4 py-3"><Link href={`/dashboard/cases/${c.id}`} className="text-[#C9A84C] text-sm font-medium hover:underline">Open →</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}