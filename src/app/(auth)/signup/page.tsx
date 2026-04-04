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

const signupSchema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export default function SignupPage() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: { full_name: '', email: '', phone: '', company: '', password: '' },
  })

  const onSubmit = async (values: z.infer<typeof signupSchema>) => {
    setLoading(true)
    setError('')
    const { error: authError } = await supabase.auth.signUp({
      email: values.email, password: values.password,
      options: { data: { full_name: values.full_name, phone: values.phone, company: values.company } }
    })
    
    if (authError) { 
      setError(authError.message)
      setLoading(false)
      return 
    }
    
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {([
              ['full_name','Full Name','text',true],
              ['email','Email Address','email',true],
              ['phone','Phone','tel',false],
              ['company','Company/Firm','text',false]
            ] as const).map(([field,label,type,req])=>(
              <div key={field}>
                <Label className="text-[#0A1628] mb-1.5 block">{label}{req&&' *'}</Label>
                <Input type={type} {...form.register(field as "full_name" | "email" | "phone" | "company")}
                  className={`bg-slate-50 focus-visible:ring-[#C9A84C] ${form.formState.errors[field as keyof typeof form.formState.errors] ? 'border-red-500 focus-visible:ring-red-500' : ''}`} />
                {form.formState.errors[field as keyof typeof form.formState.errors] && (
                   <p className="text-red-500 text-xs mt-1 font-medium">{form.formState.errors[field as keyof typeof form.formState.errors]?.message}</p>
                )}
              </div>
            ))}
            <div>
              <Label className="text-[#0A1628] mb-1.5 block">Password *</Label>
              <Input type="password" {...form.register('password')}
                className={`bg-slate-50 focus-visible:ring-[#C9A84C] ${form.formState.errors.password ? 'border-red-500 focus-visible:ring-red-500' : ''}`} />
              {form.formState.errors.password && <p className="text-red-500 text-xs mt-1 font-medium">{form.formState.errors.password.message}</p>}
            </div>
            
            <p className="text-xs text-slate-500 leading-relaxed">
              By creating an account, you agree to our{' '}
              <Link href="/terms" className="text-[#C9A84C] hover:underline">Terms of Service</Link> and{' '}
              <Link href="/privacy" className="text-[#C9A84C] hover:underline">Privacy Policy</Link>.
            </p>

            {error && <p className="text-red-500 text-sm bg-red-50 p-3 rounded-sm font-medium">{error}</p>}

            <Button type="submit" disabled={loading} size="lg"
              className="w-full bg-[#0A1628] text-[#C9A84C] font-semibold hover:bg-[#112240] disabled:opacity-50 mt-4">
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-500">Already have an account? <Link href="/login" className="text-[#C9A84C] font-medium">Sign in</Link></p>
        </div>
      </div>
    </div>
  )
}