import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { formatDate, STATUS_LABELS, STATUS_COLORS, PRIORITY_LABELS } from '@/lib/utils'
import { ReorderButton } from '@/components/portal/ReorderButton'

export default async function CasesPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data: cases } = await supabase.from('cases').select('*, service:services(id, name)').eq('client_id', user.id).order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <h1 className="font-display text-xl sm:text-2xl font-bold text-[#0A1628]">My Cases</h1>
        <Link href="/portal/new-order" className="bg-[#C9A84C] text-[#0A1628] px-4 sm:px-5 py-2 sm:py-2.5 font-semibold rounded-sm hover:bg-[#E8C96A] text-sm">New Order</Link>
      </div>
      <div className="bg-white border border-slate-200 rounded-sm shadow-card overflow-hidden">
        {cases && cases.length > 0 ? (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    {['Case #','Service','Status','Priority','Subject','Date',''].map(h=>(
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {cases.map(c => (
                    <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-mono text-sm font-medium text-[#0A1628]">{c.case_number}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{c.service?.name}</td>
                      <td className="px-4 py-3"><span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[c.status as keyof typeof STATUS_COLORS]}`}>{STATUS_LABELS[c.status as keyof typeof STATUS_LABELS]}</span></td>
                      <td className="px-4 py-3 text-sm text-slate-500 capitalize">{PRIORITY_LABELS[c.priority as keyof typeof PRIORITY_LABELS]}</td>
                      <td className="px-4 py-3 text-sm text-slate-500">{c.subject_name || '—'}</td>
                      <td className="px-4 py-3 text-sm text-slate-400">{formatDate(c.created_at)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Link href={`/portal/cases/${c.id}`} className="text-[#C9A84C] text-sm font-medium hover:underline">View →</Link>
                          {c.status === 'complete' && c.service?.id && <ReorderButton serviceId={c.service.id} />}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile card list */}
            <div className="md:hidden divide-y divide-slate-100">
              {cases.map(c => (
                <Link key={c.id} href={`/portal/cases/${c.id}`} className="block px-4 py-3.5 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-sm font-medium text-[#0A1628]">{c.case_number}</span>
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[c.status as keyof typeof STATUS_COLORS]}`}>{STATUS_LABELS[c.status as keyof typeof STATUS_LABELS]}</span>
                  </div>
                  <div className="text-sm text-slate-600 mb-1">{c.service?.name}{c.subject_name ? ` · ${c.subject_name}` : ''}</div>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="capitalize">{PRIORITY_LABELS[c.priority as keyof typeof PRIORITY_LABELS]}</span>
                    <span>{formatDate(c.created_at)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="py-20 text-center text-slate-500">No cases yet. <Link href="/portal/new-order" className="text-[#C9A84C]">Place your first order.</Link></div>
        )}
      </div>
    </div>
  )
}