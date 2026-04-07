'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/auth/callback?next=/account` })
    setSent(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0A1628] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Image src="/images/logo.png" alt="Left Right Serve & Sign Pros" width={56} height={56} className="mx-auto mb-4 drop-shadow-lg" priority />
        </div>
        <div className="bg-white rounded-sm shadow-elevated p-6 sm:p-8">
          <h1 className="font-display text-[#0A1628] text-xl sm:text-2xl font-bold mb-2">Reset Password</h1>
          <p className="text-slate-500 mb-6 text-sm sm:text-base">Enter your email to receive a reset link.</p>
          {sent ? (
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-sm text-emerald-700">
              Check your email for a password reset link.
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-4">
              <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com"
                className="w-full border border-slate-200 rounded-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30" />
              <button type="submit" disabled={loading}
                className="w-full bg-[#0A1628] text-[#C9A84C] py-3 font-semibold rounded-sm hover:bg-[#112240] transition-colors disabled:opacity-50">
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          )}
          <p className="mt-4 text-center text-sm"><Link href="/login" className="text-[#C9A84C]">Back to Sign In</Link></p>
        </div>
      </div>
    </div>
  )
}