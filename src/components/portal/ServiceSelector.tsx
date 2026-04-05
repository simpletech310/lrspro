'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FileText, Stamp, Search, Truck, FileEdit } from 'lucide-react'
import { Service } from '@/types/database'
import { formatCurrency } from '@/lib/utils'

const ICONS: Record<string, React.ElementType> = { FileText, Stamp, Search, Truck, FileEdit }

export function ServiceSelector({ services }: { services: Service[] }) {
  const [selected, setSelected] = useState<string | null>(null)
  const router = useRouter()

  const handleContinue = () => {
    if (!selected) return
    localStorage.setItem('lrs_selected_service', selected)
    router.push('/portal/new-order/details')
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map(s => {
          const Icon = ICONS[s.icon_name || 'FileText'] || FileText
          const isSelected = selected === s.id
          return (
            <button key={s.id} onClick={() => setSelected(s.id)}
              className={`text-left p-6 border-2 rounded-sm transition-all ${isSelected ? 'border-[#C9A84C] bg-[#C9A84C]/5 shadow-card' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${isSelected ? 'bg-[#0A1628]' : 'bg-slate-100'}`}>
                <Icon size={20} className={isSelected ? 'text-[#C9A84C]' : 'text-slate-600'} />
              </div>
              <h3 className="font-semibold text-[#0A1628] mb-1">{s.name}</h3>
              <p className="text-slate-500 text-sm mb-3 line-clamp-2">{s.short_description}</p>
              <div className="flex items-center justify-between">
                <span className="text-[#C9A84C] font-semibold text-sm">From {formatCurrency(s.base_price)}</span>
                <span className="text-slate-400 text-xs">{s.estimated_turnaround}</span>
              </div>
              {isSelected && <div className="mt-3 text-[#C9A84C] text-xs font-semibold">✓ Selected</div>}
            </button>
          )
        })}
      </div>
      <button onClick={handleContinue} disabled={!selected}
        className="bg-[#0A1628] text-[#C9A84C] px-8 py-3 font-semibold rounded-sm hover:bg-[#112240] transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
        Continue to Details →
      </button>
    </div>
  )
}