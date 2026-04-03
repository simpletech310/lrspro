'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password })
    if (authError) { setError(authError.message); setLoading(false); return }
    if (data.user) {
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', data.user.id).single()
      if (profile?.role === 'admin' || profile?.role === 'staff') router.push('/dashboard')
      else router.push('/portal/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-[#0A1628] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[#C9A84C] rounded-sm flex items-center justify-center mx-auto mb-4">
            <span className="text-[#0A1628] font-bold text-xl">LRS</span>
          </div>
          <h1 className="font-display text-white text-3xl font-bold">Welcome Back</h1>
          <p className="text-slate-400 mt-2">Sign in to your portal</p>
        </div>
        <div className="bg-white rounded-sm shadow-elevated p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#0A1628] mb-1">Email Address</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                className="w-full border border-slate-200 rounded-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30 focus:border-[#C9A84C]"
                placeholder="you@lawfirm.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0A1628] mb-1">Password</label>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
                className="w-full border border-slate-200 rounded-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30 focus:border-[#C9A84C]" />
            </div>
            {error && <p className="text-red-500 text-sm bg-red-50 p-3 rounded-sm">{error}</p>}
            <button type="submit" disabled={loading}
              className="w-full bg-[#0A1628] text-[#C9A84C] py-3 font-semibold rounded-sm hover:bg-[#112240] transition-colors disabled:opacity-50">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <div className="mt-6 flex justify-between text-sm">
            <Link href="/forgot-password" className="text-slate-500 hover:text-[#C9A84C]">Forgot password?</Link>
            <Link href="/signup" className="text-[#C9A84C] font-medium">Create account</Link>
          </div>
        </div>
      </div>
    </div>
  )
}