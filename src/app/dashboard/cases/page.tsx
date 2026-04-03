import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { formatDate, STATUS_LABELS, STATUS_COLORS, PRIORITY_LABELS, PRIORITY_COLORS } from '@/lib/utils'
import { CasesDataTable } from '@/components/dashboard/CasesDataTable'

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
      
      <CasesDataTable data={cases || []} />
    </div>
  )
}