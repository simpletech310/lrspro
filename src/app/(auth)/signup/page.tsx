'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
  const [form, setForm] = useState({ full_name:'', email:'', password:'', company:'', phone:'' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error: authError } = await supabase.auth.signUp({
      email: form.email, password: form.password,
      options: { data: { full_name: form.full_name } }
    })
    if (authError) { setError(authError.message); setLoading(false); return }
    router.push('/portal/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#0A1628] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[#C9A84C] rounded-sm flex items-center justify-center mx-auto mb-4">
            <span className="text-[#0A1628] font-bold text-xl">LRS</span>
          </div>
          <h1 className="font-display text-white text-3xl font-bold">Create Account</h1>
          <p className="text-slate-400 mt-2">Join our client portal</p>
        </div>
        <div className="bg-white rounded-sm shadow-elevated p-8">
          <form onSubmit={handleSignup} className="space-y-4">
            {([['full_name','Full Name','text',true],['email','Email Address','email',true],['phone','Phone','tel',false],['company','Company/Firm','text',false]] as const).map(([field,label,type,req])=>(
              <div key={field}>
                <label className="block text-sm font-medium text-[#0A1628] mb-1">{label}{req&&' *'}</label>
                <input type={type} required={req} value={form[field as keyof typeof form]} onChange={e=>setForm(p=>({...p,[field]:e.target.value}))}
                  className="w-full border border-slate-200 rounded-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30 focus:border-[#C9A84C]" />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-[#0A1628] mb-1">Password *</label>
              <input type="password" required minLength={8} value={form.password} onChange={e=>setForm(p=>({...p,password:e.target.value}))}
                className="w-full border border-slate-200 rounded-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30 focus:border-[#C9A84C]" />
            </div>
            {error && <p className="text-red-500 text-sm bg-red-50 p-3 rounded-sm">{error}</p>}
            <button type="submit" disabled={loading}
              className="w-full bg-[#0A1628] text-[#C9A84C] py-3 font-semibold rounded-sm hover:bg-[#112240] transition-colors disabled:opacity-50">
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-500">Already have an account? <Link href="/login" className="text-[#C9A84C] font-medium">Sign in</Link></p>
        </div>
      </div>
    </div>
  )
}