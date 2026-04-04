import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { formatDate } from '@/lib/utils'
import { Users, CheckCircle2, XCircle } from 'lucide-react'

export default async function StaffManagement() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') redirect('/dashboard')

  const { data: staff } = await supabase
    .from('profiles')
    .select('*')
    .in('role', ['staff', 'admin'])
    .order('full_name')

  // Get case counts per staff member
  const { data: cases } = await supabase
    .from('cases')
    .select('assigned_staff_id, status')

  const staffWithStats = staff?.map(s => {
    const staffCases = cases?.filter(c => c.assigned_staff_id === s.id) || []
    const activeCases = staffCases.filter(c => !['complete', 'cancelled'].includes(c.status)).length
    const completedCases = staffCases.filter(c => c.status === 'complete').length
    return { ...s, activeCases, completedCases, totalCases: staffCases.length }
  }) || []

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-[#0A1628]">Staff Management</h1>
          <p className="text-slate-500 mt-1">{staff?.length || 0} team members</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-sm shadow-card overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {['Name', 'Email', 'Phone', 'Role', 'Active Cases', 'Completed', 'Status', 'Joined'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {staffWithStats.map(s => (
              <tr key={s.id} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#0A1628] rounded-full flex items-center justify-center text-[#C9A84C] font-semibold text-xs">
                      {s.full_name?.charAt(0) || '?'}
                    </div>
                    <span className="font-medium text-sm text-[#0A1628]">{s.full_name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">{s.email}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{s.phone || '—'}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${s.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                    {s.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm font-medium text-[#0A1628]">{s.activeCases}</td>
                <td className="px-4 py-3 text-sm text-emerald-600">{s.completedCases}</td>
                <td className="px-4 py-3">
                  {s.is_active ? (
                    <span className="flex items-center gap-1 text-emerald-600 text-xs font-medium"><CheckCircle2 size={12} /> Active</span>
                  ) : (
                    <span className="flex items-center gap-1 text-red-500 text-xs font-medium"><XCircle size={12} /> Inactive</span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-slate-400">{formatDate(s.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {(!staff || staff.length === 0) && (
          <div className="py-16 text-center text-slate-500">No staff members found.</div>
        )}
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-sm p-6">
        <h3 className="font-semibold text-[#0A1628] mb-2">Adding New Staff</h3>
        <p className="text-slate-600 text-sm">
          To add new staff members, have them sign up at the registration page. Then update their role to &quot;staff&quot; or &quot;admin&quot; in the Supabase dashboard under Authentication → Users, or update the <code className="bg-white px-1.5 py-0.5 rounded text-xs border border-slate-200">profiles</code> table directly.
        </p>
      </div>
    </div>
  )
}
