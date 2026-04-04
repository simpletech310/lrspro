import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LogoutButton } from '@/components/LogoutButton'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data: profile } = await supabase.from('profiles').select('full_name, role').eq('id', user.id).single()

  if (!profile) redirect('/login')
  if (profile.role === 'client') redirect('/portal/dashboard')

  const isAdmin = profile.role === 'admin'

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <aside className="w-64 bg-[#0A1628] text-white flex-shrink-0 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-white/10">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#C9A84C] rounded-sm flex items-center justify-center">
              <span className="text-[#0A1628] font-bold text-sm">LRS</span>
            </div>
            <div>
              <div className="text-sm font-semibold">Staff Portal</div>
              <div className="text-[#C9A84C] text-xs capitalize">{profile.role}</div>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {[{href:'/dashboard',label:'Dashboard'},{href:'/dashboard/cases',label:'All Cases'}].map(l=>(
            <Link key={l.href} href={l.href} className="flex items-center gap-3 px-3 py-2.5 rounded-sm text-slate-300 hover:text-white hover:bg-white/10 text-sm transition-colors">{l.label}</Link>
          ))}
          {isAdmin && (
            <>
              <div className="pt-4 pb-1 px-3 text-xs text-slate-500 uppercase tracking-wider">Admin</div>
              {[{href:'/dashboard/admin',label:'Overview'},{href:'/dashboard/admin/staff',label:'Staff'},{href:'/dashboard/admin/clients',label:'Clients'}].map(l=>(
                <Link key={l.href} href={l.href} className="flex items-center gap-3 px-3 py-2.5 rounded-sm text-slate-300 hover:text-white hover:bg-white/10 text-sm transition-colors">{l.label}</Link>
              ))}
            </>
          )}
        </nav>
        <div className="p-4 border-t border-white/10 space-y-3">
          <div className="text-slate-400 text-xs">{profile.full_name}</div>
          <LogoutButton />
        </div>
      </aside>
      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-[#0A1628] text-white px-4 h-14 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#C9A84C] rounded-sm flex items-center justify-center">
            <span className="text-[#0A1628] font-bold text-xs">LRS</span>
          </div>
          <span className="text-sm font-semibold">Staff</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/dashboard" className="text-slate-300 hover:text-white">Home</Link>
          <Link href="/dashboard/cases" className="text-slate-300 hover:text-white">Cases</Link>
          {isAdmin && <Link href="/dashboard/admin" className="text-slate-300 hover:text-white">Admin</Link>}
          <LogoutButton className="text-slate-400 hover:text-white text-sm" />
        </nav>
      </div>
      <main className="flex-1 overflow-auto">
        <div className="p-8 md:p-8 pt-20 md:pt-8">{children}</div>
      </main>
    </div>
  )
}
