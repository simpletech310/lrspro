import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { formatDate, formatCurrency } from '@/lib/utils'

export default async function ClientsManagement() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') redirect('/dashboard')

  const { data: clients } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'client')
    .order('created_at', { ascending: false })

  // Get case counts and spend per client
  const { data: cases } = await supabase
    .from('cases')
    .select('client_id, status, amount_paid')

  const clientsWithStats = clients?.map(c => {
    const clientCases = cases?.filter(cs => cs.client_id === c.id) || []
    const activeCases = clientCases.filter(cs => !['complete', 'cancelled'].includes(cs.status)).length
    const totalSpent = clientCases.reduce((sum, cs) => sum + (cs.amount_paid || 0), 0)
    return { ...c, activeCases, totalCases: clientCases.length, totalSpent }
  }) || []

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-[#0A1628]">Clients</h1>
        <p className="text-slate-500 mt-1">{clients?.length || 0} registered clients</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-sm shadow-card overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {['Name', 'Email', 'Company', 'Phone', 'Cases', 'Active', 'Total Spent', 'Joined'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {clientsWithStats.map(c => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <Link href={`/dashboard/admin/clients/${c.id}`} className="flex items-center gap-3 group">
                    <div className="w-8 h-8 bg-[#C9A84C] rounded-full flex items-center justify-center text-[#0A1628] font-semibold text-xs">
                      {c.full_name?.charAt(0) || '?'}
                    </div>
                    <span className="font-medium text-sm text-[#0A1628] group-hover:text-[#C9A84C] transition-colors">{c.full_name}</span>
                  </Link>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">{c.email}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{c.company || '—'}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{c.phone || '—'}</td>
                <td className="px-4 py-3 text-sm font-medium text-[#0A1628]">{c.totalCases}</td>
                <td className="px-4 py-3">
                  {c.activeCases > 0 ? (
                    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">{c.activeCases} active</span>
                  ) : (
                    <span className="text-sm text-slate-400">0</span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-emerald-600 font-medium">{formatCurrency(c.totalSpent)}</td>
                <td className="px-4 py-3 text-sm text-slate-400">{formatDate(c.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {(!clients || clients.length === 0) && (
          <div className="py-16 text-center text-slate-500">No clients have registered yet.</div>
        )}
      </div>
    </div>
  )
}
