'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Service } from '@/types/database'

export default function OrderDetailsPage() {
  const router = useRouter()
  const supabase = createClient()
  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<Record<string, any>>({})

  useEffect(() => {
    const serviceId = sessionStorage.getItem('lrs_selected_service')
    if (!serviceId) { router.push('/portal/new-order'); return }
    const fetchService = async () => {
      const { data } = await supabase.from('services').select('*').eq('id', serviceId).single()
      if (data) {
        setService(data)
        const defaults: Record<string, any> = {}
        data.form_schema?.fields?.forEach((f: any) => { if (f.default) defaults[f.name] = f.default })
        setFormData(defaults)
      }
      setLoading(false)
    }
    fetchService()
  }, [router, supabase])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sessionStorage.setItem('lrs_order_data', JSON.stringify(formData))
    router.push('/portal/new-order/review')
  }

  if (loading) return <div className="py-20 text-center">Loading...</div>
  if (!service) return null

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-[#0A1628]">Order Details: {service.name}</h1>
        <p className="text-slate-500 mt-1">Step 2 of 3 — Enter case information</p>
        <div className="flex items-center gap-2 mt-4">
          {['Select Service','Order Details','Review & Pay'].map((s,i)=>(
            <div key={s} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${i===1?'bg-[#C9A84C] text-[#0A1628]':'bg-slate-200 text-slate-400'}`}>{i+1}</div>
              <span className={`text-sm ${i===1?'text-[#0A1628] font-medium':'text-slate-400'}`}>{s}</span>
              {i<2 && <div className="w-8 h-px bg-slate-200 mx-1" />}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-sm shadow-card p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {service.form_schema?.fields?.map((field: any) => (
              <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                <label className="block text-sm font-medium text-[#0A1628] mb-1">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                {field.type === 'select' ? (
                  <select required={field.required} value={formData[field.name] || ''}
                    onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                    className="w-full border border-slate-200 rounded-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30 bg-white">
                    <option value="">Select option...</option>
                    {field.options?.map((o: string) => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea required={field.required} value={formData[field.name] || ''} rows={4}
                    onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                    className="w-full border border-slate-200 rounded-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30 resize-none" />
                ) : (
                  <input type={field.type} required={field.required} value={formData[field.name] || ''}
                    onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                    className="w-full border border-slate-200 rounded-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30" />
                )}
              </div>
            ))}
          </div>
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <button type="button" onClick={() => router.back()} className="text-slate-500 font-medium hover:text-[#0A1628]">← Back</button>
            <button type="submit" className="bg-[#0A1628] text-[#C9A84C] px-8 py-3 font-semibold rounded-sm hover:bg-[#112240] transition-colors">
              Continue to Review
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}