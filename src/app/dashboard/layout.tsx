import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LogoutButton } from '@/components/LogoutButton'
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'

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
        <DashboardSidebar isAdmin={isAdmin} />
        <div className="p-4 border-t border-white/10 space-y-3">
          <div className="text-slate-400 text-xs">{profile.full_name}</div>
          <LogoutButton />
        </div>
      </aside>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-[#0A1628] text-white px-4 h-14 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#C9A84C] rounded-sm flex items-center justify-center">
            <span className="text-[#0A1628] font-bold text-xs">LRS</span>
          </div>
          <span className="text-sm font-semibold">Staff Portal</span>
        </Link>
        <LogoutButton className="text-slate-400 hover:text-white text-sm" />
      </div>
      {/* Mobile bottom nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A1628] border-t border-white/10 flex items-center justify-around h-16 safe-bottom">
        <Link href="/dashboard" className="flex flex-col items-center gap-1 text-slate-400 hover:text-white py-2 px-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span className="text-[10px]">Home</span>
        </Link>
        <Link href="/dashboard/cases" className="flex flex-col items-center gap-1 text-slate-400 hover:text-white py-2 px-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/></svg>
          <span className="text-[10px]">Cases</span>
        </Link>
        {isAdmin && (
          <Link href="/dashboard/admin" className="flex flex-col items-center gap-1 text-slate-400 hover:text-white py-2 px-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            <span className="text-[10px]">Admin</span>
          </Link>
        )}
      </div>
      <main className="flex-1 overflow-auto">
        <div className="p-6 md:p-8 pt-20 md:pt-8 pb-24 md:pb-8">{children}</div>
      </main>
    </div>
  )
}
