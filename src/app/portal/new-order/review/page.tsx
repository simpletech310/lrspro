'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Service } from '@/types/database'
import { formatCurrency } from '@/lib/utils'

export default function ReviewPage() {
  const router = useRouter()
  const supabase = createClient()
  const [service, setService] = useState<Service | null>(null)
  const [orderData, setOrderData] = useState<Record<string, any>>({})
  const [priority, setPriority] = useState('standard')
  const [loading, setLoading] = useState(false)
  const [initLoading, setInitLoading] = useState(true)

  useEffect(() => {
    const serviceId = localStorage.getItem('lrs_selected_service')
    const savedData = localStorage.getItem('lrs_order_data')
    if (!serviceId || !savedData) { router.push('/portal/new-order'); return }
    setOrderData(JSON.parse(savedData))

    const fetchService = async () => {
      const { data } = await supabase.from('services').select('*').eq('id', serviceId).single()
      if (data) setService(data)
      setInitLoading(false)
    }
    fetchService()
  }, [router, supabase])

  const calculateTotal = () => {
    if (!service) return 0
    if (priority === 'rush' && service.rush_price) return service.rush_price
    if (priority === 'same_day' && service.same_day_price) return service.same_day_price
    return service.base_price
  }

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/orders/checkout', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service_slug: service?.slug, priority, order_data: orderData })
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else throw new Error(data.error || 'Failed to create checkout')
    } catch (err) {
      console.error(err)
      alert("Checkout failed. Please try again.")
      setLoading(false)
    }
  }

  if (initLoading) return <div className="py-20 text-center">Loading...</div>
  if (!service) return null

  return (
    <div className="max-w-4xl grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold text-[#0A1628]">Review & Pay</h1>
          <p className="text-slate-500 mt-1">Step 3 of 3 — Finalize your order</p>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-sm shadow-card p-6 mb-6">
          <h2 className="font-semibold text-[#0A1628] mb-4">Select Turnaround Time</h2>
          <div className="space-y-3">
            {[
              { id: 'standard', label: 'Standard Turnaround', price: service.base_price, desc: service.estimated_turnaround },
              { id: 'rush', label: 'Rush Turnaround (24 hrs)', price: service.rush_price, desc: 'Priority execution' },
              { id: 'same_day', label: 'Same Day Emergency', price: service.same_day_price, desc: 'Highest priority' },
            ].filter(o => o.price !== null && o.price !== undefined).map(opt => (
              <label key={opt.id} className={`flex items-center p-4 border rounded-sm cursor-pointer transition-colors ${priority === opt.id ? 'border-[#C9A84C] bg-[#C9A84C]/5' : 'border-slate-200 hover:border-slate-300'}`}>
                <input type="radio" name="priority" value={opt.id} checked={priority === opt.id} onChange={(e) => setPriority(e.target.value)} className="w-4 h-4 text-[#C9A84C] focus:ring-[#C9A84C]" />
                <div className="ml-4 flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium text-[#0A1628]">{opt.label}</span>
                    <span className="font-semibold text-[#0A1628]">{formatCurrency(opt.price as number)}</span>
                  </div>
                  <div className="text-sm text-slate-500">{opt.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-sm shadow-card p-6">
          <h2 className="font-semibold text-[#0A1628] mb-4">Order Details Summary</h2>
          <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
            {Object.entries(orderData).filter(([_,v]) => v).map(([k,v]) => {
              const label = service.form_schema?.fields?.find((f:any)=>f.name===k)?.label || k
              return (
                <div key={k} className="col-span-2 sm:col-span-1">
                  <span className="block text-slate-500 mb-0.5">{label}</span>
                  <span className="font-medium text-[#0A1628] break-words">{v}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="md:col-span-1">
        <div className="bg-[#0A1628] text-white rounded-sm p-6 sticky top-24">
          <h2 className="font-semibold mb-4 border-b border-white/10 pb-4">Order Summary</h2>
          <div className="space-y-3 mb-6 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-300">{service.name}</span>
              <span>{formatCurrency(service.base_price)}</span>
            </div>
            {priority !== 'standard' && (
              <div className="flex justify-between">
                <span className="text-slate-300">Expedited Priority</span>
                <span>+{formatCurrency(calculateTotal() - service.base_price)}</span>
              </div>
            )}
            <div className="border-t border-white/10 my-4" />
            <div className="flex justify-between items-end">
              <span className="font-medium">Total Due Today</span>
              <span className="font-display text-2xl text-[#C9A84C] font-bold">{formatCurrency(calculateTotal())}</span>
            </div>
          </div>
          <button onClick={handleCheckout} disabled={loading}
            className="w-full bg-[#C9A84C] text-[#0A1628] py-3.5 font-bold rounded-sm hover:bg-[#E8C96A] transition-colors disabled:opacity-50">
            {loading ? 'Processing...' : 'Proceed to Checkout'}
          </button>
          <button onClick={() => router.back()} className="w-full text-center mt-4 text-slate-400 text-sm hover:text-white pb-1">← Back to Edit Details</button>
        </div>
      </div>
    </div>
  )
}