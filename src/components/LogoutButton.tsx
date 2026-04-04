'use client'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { LogOut } from 'lucide-react'

export function LogoutButton({ className }: { className?: string }) {
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <button onClick={handleLogout}
      className={className || 'flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors'}>
      <LogOut size={14} /> Sign Out
    </button>
  )
}
