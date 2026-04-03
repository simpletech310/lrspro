import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { formatCurrency, formatDate, STATUS_LABELS, STATUS_COLORS } from '@/lib/utils'
import { ArrowRight, Plus, FileText, CheckCircle2 } from 'lucide-react'

export default async function PortalDashboard() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  const { data: cases, count } = await supabase.from('cases').select('*, service:services(name,slug)', { count: 'exact' })
    .eq('client_id', user.id).order('created_at', { ascending: false }).limit(10)

  const active = cases?.filter(c => !['complete','cancelled','unable_to_serve'].includes(c.status)) || []
  const completed = cases?.filter(c => c.status === 'complete') || []
  const totalSpent = cases?.reduce((sum, c) => sum + (c.amount_paid || 0), 0) || 0

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-[#0A1628]">Welcome back, {profile?.full_name?.split(' ')[0]}</h1>
          <p className="text-slate-500 mt-1">Here's your case overview</p>
        </div>
        <Link href="/portal/new-order" className="inline-flex items-center gap-2 bg-[#C9A84C] text-[#0A1628] px-5 py-2.5 font-semibold rounded-sm hover:bg-[#E8C96A] transition-colors">
          <Plus size={16} /> New Order
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[{label:'Active Cases',value:active.length,color:'text-[#0A1628]'},{label:'Completed',value:completed.length,color:'text-emerald-600'},{label:'Total Spent',value:formatCurrency(totalSpent),color:'text-[#C9A84C]'}].map(s=>(
          <div key={s.label} className="bg-white border border-slate-200 rounded-sm p-5 shadow-card">
            <div className="text-slate-500 text-sm mb-1">{s.label}</div>
            <div className={`font-display text-3xl font-bold ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-sm shadow-card">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-semibold text-[#0A1628]">Recent Cases</h2>
          <Link href="/portal/cases" className="text-[#C9A84C] text-sm flex items-center gap-1">View all <ArrowRight size={14} /></Link>
        </div>
        {cases && cases.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {cases.slice(0,8).map(c => (
              <Link key={c.id} href={`/portal/cases/${c.id}`} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
                <FileText size={18} className="text-slate-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-medium text-[#0A1628]">{c.case_number}</span>
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[c.status as keyof typeof STATUS_COLORS]}`}>{STATUS_LABELS[c.status as keyof typeof STATUS_LABELS]}</span>
                  </div>
                  <div className="text-slate-500 text-sm truncate">{c.service?.name} {c.subject_name ? `· ${c.subject_name}` : ''}</div>
                </div>
                <div className="text-right text-sm text-slate-400 flex-shrink-0">{formatDate(c.created_at)}</div>
                <ArrowRight size={16} className="text-slate-300 flex-shrink-0" />
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <CheckCircle2 size={48} className="text-slate-200 mx-auto mb-4" />
            <p className="text-slate-500 font-medium">No cases yet</p>
            <p className="text-slate-400 text-sm mt-1">Ready to get started?</p>
            <Link href="/portal/new-order" className="inline-block mt-4 bg-[#0A1628] text-[#C9A84C] px-6 py-2.5 rounded-sm font-medium text-sm">Place your first order</Link>
          </div>
        )}
      </div>
    </div>
  )
}