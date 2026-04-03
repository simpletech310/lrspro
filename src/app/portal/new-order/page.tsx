import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ServiceSelector } from '@/components/portal/ServiceSelector'

export default async function NewOrderPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data: services } = await supabase.from('services').select('*').eq('is_active', true).order('sort_order')
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-[#0A1628]">Place a New Order</h1>
        <p className="text-slate-500 mt-1">Step 1 of 3 — Select a service</p>
        <div className="flex items-center gap-2 mt-4">
          {['Select Service','Order Details','Review & Pay'].map((s,i)=>(
            <div key={s} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${i===0?'bg-[#C9A84C] text-[#0A1628]':'bg-slate-200 text-slate-400'}`}>{i+1}</div>
              <span className={`text-sm ${i===0?'text-[#0A1628] font-medium':'text-slate-400'}`}>{s}</span>
              {i<2 && <div className="w-8 h-px bg-slate-200 mx-1" />}
            </div>
          ))}
        </div>
      </div>
      <ServiceSelector services={services || []} />
    </div>
  )
}