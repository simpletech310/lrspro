import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { PortalNav } from '@/components/portal/PortalNav'

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data: profile } = await supabase.from('profiles').select('full_name, role').eq('id', user.id).single()

  if (!profile) redirect('/login')
  if (profile.role !== 'client' && profile.role !== 'admin') redirect('/dashboard')

  return (
    <div className="min-h-screen bg-[#F8F5EE]">
      <PortalNav fullName={profile.full_name || ''} />
      <main className="max-w-7xl mx-auto px-6 py-8 pb-24 sm:pb-8">{children}</main>
    </div>
  )
}
