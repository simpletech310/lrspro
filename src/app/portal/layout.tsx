import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LogoutButton } from '@/components/LogoutButton'

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data: profile } = await supabase.from('profiles').select('full_name, role').eq('id', user.id).single()

  if (!profile) redirect('/login')
  if (profile.role !== 'client' && profile.role !== 'admin') redirect('/dashboard')

  return (
    <div className="min-h-screen bg-[#F8F5EE]">
      <header className="bg-[#0A1628] text-white">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/portal/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#C9A84C] rounded-sm flex items-center justify-center">
              <span className="text-[#0A1628] font-bold text-sm">LRS</span>
            </div>
            <span className="text-sm font-medium hidden sm:block">Client Portal</span>
          </Link>
          <nav className="flex items-center gap-4 sm:gap-6 text-sm">
            <Link href="/portal/dashboard" className="text-slate-300 hover:text-white hidden sm:block">Dashboard</Link>
            <Link href="/portal/cases" className="text-slate-300 hover:text-white">Cases</Link>
            <Link href="/portal/documents" className="text-slate-300 hover:text-white hidden sm:block">Documents</Link>
            <Link href="/portal/new-order" className="bg-[#C9A84C] text-[#0A1628] px-4 py-1.5 rounded-sm font-semibold text-sm hover:bg-[#E8C96A]">New Order</Link>
          </nav>
          <div className="flex items-center gap-3">
            <span className="text-slate-400 text-sm hidden sm:block">{profile?.full_name}</span>
            <Link href="/portal/account" className="w-8 h-8 bg-[#112240] rounded-full flex items-center justify-center text-[#C9A84C] font-semibold text-sm">
              {profile?.full_name?.charAt(0) || 'U'}
            </Link>
            <LogoutButton className="text-slate-400 hover:text-white text-xs hidden sm:flex items-center gap-1" />
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  )
}
