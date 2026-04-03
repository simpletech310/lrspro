'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

export default function LoginPage() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setLoading(true)
    setError('')
    const { data, error: authError } = await supabase.auth.signInWithPassword(values)
    
    if (authError) { 
      setError(authError.message)
      setLoading(false)
      return 
    }
    
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <Label className="text-[#0A1628] mb-1.5 block">Email Address</Label>
              <Input type="email" {...form.register('email')}
                className={`bg-slate-50 focus-visible:ring-[#C9A84C] ${form.formState.errors.email ? 'border-red-500' : ''}`}
                placeholder="you@lawfirm.com" />
              {form.formState.errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{form.formState.errors.email.message}</p>}
            </div>
            <div>
              <Label className="text-[#0A1628] mb-1.5 block">Password</Label>
              <Input type="password" {...form.register('password')}
                className={`bg-slate-50 focus-visible:ring-[#C9A84C] ${form.formState.errors.password ? 'border-red-500' : ''}`} />
              {form.formState.errors.password && <p className="text-red-500 text-xs mt-1 font-medium">{form.formState.errors.password.message}</p>}
            </div>
            {error && <p className="text-red-500 text-sm bg-red-50 p-3 rounded-sm font-medium">{error}</p>}
            
            <Button type="submit" disabled={loading} size="lg"
              className="w-full bg-[#0A1628] text-[#C9A84C] font-semibold hover:bg-[#112240] disabled:opacity-50">
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
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