import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { formatDate, formatDateTime, formatCurrency, STATUS_LABELS, STATUS_COLORS } from '@/lib/utils'
import { ArrowLeft, Mail, Phone, Building2, Calendar, DollarSign, Briefcase, User } from 'lucide-react'

export default async function AdminClientDetail({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data: adminProfile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (adminProfile?.role !== 'admin') redirect('/dashboard')

  const { data: client } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', params.id)
    .eq('role', 'client')
    .single()

  if (!client) return (
    <div className="py-20 text-center">
      <p className="text-slate-500">Client not found.</p>
      <Link href="/dashboard/admin/clients" className="text-[#C9A84C] text-sm mt-2 inline-block hover:underline">← Back to Clients</Link>
    </div>
  )

  const { data: cases } = await supabase
    .from('cases')
    .select('*, service:services(name), assigned_staff:profiles!assigned_staff_id(full_name)')
    .eq('client_id', params.id)
    .order('created_at', { ascending: false })

  const clientCases = cases || []
  const totalSpent = clientCases.reduce((sum, c) => sum + (c.amount_paid || 0), 0)
  const activeCases = clientCases.filter(c => !['complete', 'cancelled', 'unable_to_serve'].includes(c.status))
  const completedCases = clientCases.filter(c => c.status === 'complete')

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/admin/clients" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#0A1628] hover:border-[#0A1628] transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="font-display text-2xl font-bold text-[#0A1628]">{client.full_name}</h1>
            <p className="text-slate-500 text-sm">Client since {formatDate(client.created_at)}</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Client Info Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#0A1628] text-white rounded-sm p-6">
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/10">
              <div className="w-14 h-14 bg-[#C9A84C] rounded-full flex items-center justify-center text-[#0A1628] font-bold text-xl">
                {client.full_name?.charAt(0) || '?'}
              </div>
              <div>
                <div className="font-semibold text-lg">{client.full_name}</div>
                {client.company && <div className="text-slate-400 text-sm">{client.company}</div>}
              </div>
            </div>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <Mail size={15} className="text-slate-400 flex-shrink-0" />
                <div>
                  <div className="text-slate-400 text-xs">Email</div>
                  <a href={`mailto:${client.email}`} className="text-white hover:text-[#C9A84C] transition-colors">{client.email}</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={15} className="text-slate-400 flex-shrink-0" />
                <div>
                  <div className="text-slate-400 text-xs">Phone</div>
                  {client.phone ? (
                    <a href={`tel:${client.phone}`} className="text-white hover:text-[#C9A84C] transition-colors">{client.phone}</a>
                  ) : (
                    <span className="text-slate-500">Not provided</span>
                  )}
                </div>
              </div>
              {client.company && (
                <div className="flex items-center gap-3">
                  <Building2 size={15} className="text-slate-400 flex-shrink-0" />
                  <div>
                    <div className="text-slate-400 text-xs">Company</div>
                    <span className="text-white">{client.company}</span>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Calendar size={15} className="text-slate-400 flex-shrink-0" />
                <div>
                  <div className="text-slate-400 text-xs">Member Since</div>
                  <span className="text-white">{formatDate(client.created_at)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white border border-slate-200 rounded-sm p-4 text-center shadow-card">
              <DollarSign size={18} className="text-emerald-500 mx-auto mb-1" />
              <div className="font-display text-xl font-bold text-[#0A1628]">{formatCurrency(totalSpent)}</div>
              <div className="text-slate-500 text-xs">Total Spent</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-sm p-4 text-center shadow-card">
              <Briefcase size={18} className="text-[#C9A84C] mx-auto mb-1" />
              <div className="font-display text-xl font-bold text-[#0A1628]">{clientCases.length}</div>
              <div className="text-slate-500 text-xs">Total Cases</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-sm p-4 text-center shadow-card">
              <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-1">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
              </div>
              <div className="font-display text-xl font-bold text-[#0A1628]">{activeCases.length}</div>
              <div className="text-slate-500 text-xs">Active</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-sm p-4 text-center shadow-card">
              <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-1">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <div className="font-display text-xl font-bold text-[#0A1628]">{completedCases.length}</div>
              <div className="text-slate-500 text-xs">Completed</div>
            </div>
          </div>
        </div>

        {/* Cases Table */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-slate-200 rounded-sm shadow-card overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h2 className="font-semibold text-[#0A1628]">All Cases ({clientCases.length})</h2>
            </div>
            {clientCases.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      {['Case #', 'Service', 'Subject', 'Status', 'Staff', 'Paid', 'Date'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {clientCases.map((c: any) => (
                      <tr key={c.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3">
                          <Link href={`/dashboard/cases/${c.id}`} className="text-sm font-medium text-[#C9A84C] hover:underline">
                            {c.case_number}
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">{c.service?.name || '—'}</td>
                        <td className="px-4 py-3 text-sm text-slate-600 max-w-[150px] truncate">{c.subject_name || '—'}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold whitespace-nowrap ${STATUS_COLORS[c.status as keyof typeof STATUS_COLORS]}`}>
                            {STATUS_LABELS[c.status as keyof typeof STATUS_LABELS]}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">{c.assigned_staff?.full_name || 'Unassigned'}</td>
                        <td className="px-4 py-3 text-sm font-medium text-emerald-600 whitespace-nowrap">{formatCurrency(c.amount_paid || 0)}</td>
                        <td className="px-4 py-3 text-sm text-slate-400 whitespace-nowrap">{formatDate(c.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-16 text-center text-slate-500">
                <User size={32} className="mx-auto text-slate-200 mb-2" />
                <p>This client has no cases yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
