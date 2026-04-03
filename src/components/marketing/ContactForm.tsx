'use client'
import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  service_interest: z.string().optional(),
  message: z.string().min(10, "Please provide more details in your message (at least 10 characters)"),
})

export function ContactForm() {
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name:'', email:'', phone:'', company:'', service_interest:'', message:'' },
  })

  const onSubmit = async (values: z.infer<typeof contactSchema>) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(values) })
      if (res.ok) setStatus('success')
      else setStatus('error')
    } catch { setStatus('error') }
  }

  if (status === 'success') return (
    <div className="bg-emerald-50 border border-emerald-200 rounded-sm p-8 text-center">
      <div className="text-4xl mb-3">✓</div>
      <h3 className="font-display text-[#0A1628] text-xl font-bold mb-2">Message Received!</h3>
      <p className="text-slate-600">We will respond within 1 business hour.</p>
    </div>
  )

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {([
        ['name','Full Name','text',true],
        ['email','Email','email',true],
        ['phone','Phone','tel',false],
        ['company','Company/Firm','text',false]
      ] as const).map(([field,label,type,req])=>(
        <div key={field as string}>
          <Label className="block text-[#0A1628] mb-1.5">{label as string}{req && ' *'}</Label>
          <Input type={type as string} {...form.register(field as 'name'|'email'|'phone'|'company')}
            className={`bg-slate-50 focus-visible:ring-[#C9A84C] ${form.formState.errors[field as keyof typeof form.formState.errors] ? 'border-red-500 focus-visible:ring-red-500' : ''}`} />
          {form.formState.errors[field as keyof typeof form.formState.errors] && (
            <p className="text-red-500 text-xs mt-1 font-medium">{form.formState.errors[field as keyof typeof form.formState.errors]?.message}</p>
          )}
        </div>
      ))}
      
      <div>
        <Label className="block text-[#0A1628] mb-1.5">Service Interest</Label>
        <Select onValueChange={(val) => form.setValue('service_interest', val)} defaultValue={form.getValues().service_interest}>
          <SelectTrigger className="w-full bg-slate-50 focus:ring-[#C9A84C]">
            <SelectValue placeholder="Select a service..." />
          </SelectTrigger>
          <SelectContent>
            {['Process Serving','Notary Services','Skip Trace','Court Courier & Filing','Legal Document Preparation','Multiple / General Inquiry'].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="block text-[#0A1628] mb-1.5">Message *</Label>
        <textarea rows={4} {...form.register('message')}
          placeholder="Tell us about your needs..."
          className={`w-full border rounded-sm px-4 py-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30 resize-none ${form.formState.errors.message ? 'border-red-500' : 'border-slate-200'}`} />
        {form.formState.errors.message && (
          <p className="text-red-500 text-xs mt-1 font-medium">{form.formState.errors.message.message}</p>
        )}
      </div>

      <Button type="submit" disabled={status==='loading'} size="lg"
        className="w-full bg-[#0A1628] text-[#C9A84C] font-semibold hover:bg-[#112240] disabled:opacity-50 mt-2">
        {status==='loading' ? 'Sending...' : 'Send Message'}
      </Button>
      {status==='error' && <p className="text-red-500 text-sm text-center font-medium mt-2">Something went wrong. Please try again or call us directly.</p>}
    </form>
  )
}