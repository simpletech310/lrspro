'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Service } from '@/types/database'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'

export default function OrderDetailsPage() {
  const router = useRouter()
  const supabase = createClient()
  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const serviceId = sessionStorage.getItem('lrs_selected_service')
    if (!serviceId) { router.push('/portal/new-order'); return }
    const fetchService = async () => {
      const { data } = await supabase.from('services').select('*').eq('id', serviceId).single()
      if (data) setService(data)
      setLoading(false)
    }
    fetchService()
  }, [router, supabase])

  // Build dynamic Zod Schema based on service form_schema
  const dynamicSchema = useMemo(() => {
    if (!service?.form_schema?.fields) return z.object({})
    const shape: Record<string, z.ZodTypeAny> = {}
    service.form_schema.fields.forEach((f: any) => {
      let validator: z.ZodTypeAny = z.string()
      if (f.required) validator = (validator as z.ZodString).min(1, `${f.label} is required`)
      else validator = validator.optional()
      shape[f.name] = validator
    })
    return z.object(shape)
  }, [service])

  const form = useForm<Record<string, any>>({
    resolver: zodResolver(dynamicSchema) as any,
    defaultValues: useMemo(() => {
      const defaults: Record<string, any> = {}
      service?.form_schema?.fields?.forEach((f: any) => { 
        if (f.default) defaults[f.name] = f.default 
        else defaults[f.name] = ''
      })
      // Load saved if went back from review
      const saved = sessionStorage.getItem('lrs_order_data')
      if (saved) {
        try { Object.assign(defaults, JSON.parse(saved)) } catch {}
      }
      return defaults
    }, [service])
  })

  // Reset form when schema loads
  useEffect(() => {
    if (service) form.reset(form.formState.defaultValues)
  }, [service, form])

  const onSubmit = (values: Record<string, any>) => {
    sessionStorage.setItem('lrs_order_data', JSON.stringify(values))
    router.push('/portal/new-order/review')
  }

  if (loading) return (
    <div className="max-w-3xl space-y-8">
      <Skeleton className="h-12 w-3/4" />
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-[400px] w-full" />
    </div>
  )
  if (!service) return null

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-[#0A1628]">Order Details: {service.name}</h1>
        <p className="text-slate-500 mt-2">Step 2 of 3 — Securely enter your case information</p>
        <div className="flex items-center gap-2 mt-6">
          {['Select Service','Order Details','Review & Pay'].map((s,i)=>(
            <div key={s} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${i===1?'bg-[#C9A84C] text-[#0A1628] shadow-sm':'bg-slate-200 text-slate-400'}`}>{i+1}</div>
              <span className={`text-sm ${i===1?'text-[#0A1628] font-medium':'text-slate-400'}`}>{s}</span>
              {i<2 && <div className="w-8 h-px bg-slate-200 mx-1" />}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-sm shadow-card p-8">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {service.form_schema?.fields?.map((field: any) => (
              <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                <Label className="text-[#0A1628] mb-2 block font-medium">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </Label>
                {field.type === 'select' ? (
                  <Select onValueChange={(val) => form.setValue(field.name, val)} defaultValue={form.getValues()[field.name] || ''}>
                    <SelectTrigger className={`w-full bg-slate-50 focus:ring-[#C9A84C] ${form.formState.errors[field.name] ? 'border-red-500' : ''}`}>
                      <SelectValue placeholder="Select option..." />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options?.map((o: string) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                    </SelectContent>
                  </Select>
                ) : field.type === 'textarea' ? (
                  <textarea 
                    {...form.register(field.name)} 
                    rows={4}
                    className={`w-full border rounded-sm px-4 py-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30 resize-none ${form.formState.errors[field.name] ? 'border-red-500' : 'border-slate-200'}`} />
                ) : (
                  <Input 
                     type={field.type} 
                     {...form.register(field.name)}
                     className={`bg-slate-50 focus-visible:ring-[#C9A84C] ${form.formState.errors[field.name] ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                  />
                )}
                {form.formState.errors[field.name] && (
                  <p className="text-red-500 text-xs mt-1 font-medium">{form.formState.errors[field.name]?.message as string}</p>
                )}
              </div>
            ))}
          </div>
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <Button type="button" variant="ghost" onClick={() => router.back()} className="text-slate-500 hover:text-[#0A1628]">
              ← Back
            </Button>
            <Button type="submit" size="lg" className="bg-[#0A1628] text-[#C9A84C] hover:bg-[#112240]">
              Continue to Review
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}