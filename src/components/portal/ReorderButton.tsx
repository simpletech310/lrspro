'use client'
import { useRouter } from 'next/navigation'
import { RotateCcw } from 'lucide-react'

export function ReorderButton({ serviceId }: { serviceId: string }) {
  const router = useRouter()

  const handleReorder = () => {
    localStorage.setItem('lrs_selected_service', serviceId)
    router.push('/portal/new-order/details')
  }

  return (
    <button onClick={handleReorder} className="text-slate-500 hover:text-[#C9A84C] text-sm font-medium flex items-center gap-1" title="Reorder this service">
      <RotateCcw size={12} /> Reorder
    </button>
  )
}
