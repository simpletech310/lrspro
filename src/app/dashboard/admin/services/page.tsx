'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { formatCurrency } from '@/lib/utils'
import { Plus, Pencil, ArrowUpDown } from 'lucide-react'

interface Service {
  id: string
  name: string
  slug: string
  base_price: number
  is_active: boolean
  sort_order: number
  icon_name: string
}

export default function ServicesAdminPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchServices()
  }, [])

  async function fetchServices() {
    const supabase = createClient()
    const { data } = await supabase
      .from('services')
      .select('id, name, slug, base_price, is_active, sort_order, icon_name')
      .order('sort_order')
    setServices(data || [])
    setLoading(false)
  }

  async function toggleActive(id: string, currentState: boolean) {
    const res = await fetch(`/api/admin/services/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_active: !currentState }),
    })
    if (res.ok) fetchServices()
  }

  async function moveService(id: string, direction: 'up' | 'down') {
    const idx = services.findIndex(s => s.id === id)
    if ((direction === 'up' && idx === 0) || (direction === 'down' && idx === services.length - 1)) return

    const newOrder = [...services]
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1
    ;[newOrder[idx], newOrder[swapIdx]] = [newOrder[swapIdx], newOrder[idx]]

    setServices(newOrder)
    await fetch('/api/admin/services/reorder', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderedIds: newOrder.map(s => s.id) }),
    })
  }

  if (loading) return <div className="p-8 text-slate-400">Loading services...</div>

  return (
    <div className="p-4 sm:p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-[#0A1628]">Services Management</h1>
        <Link href="/dashboard/admin/services/new" className="flex items-center gap-2 bg-[#C9A84C] text-[#0A1628] px-4 py-2 rounded-sm text-sm font-semibold hover:bg-[#E8C96A] transition-colors">
          <Plus size={16} /> Add Service
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase w-16">Order</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Service</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase hidden sm:table-cell">Slug</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Base Price</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, idx) => (
              <tr key={service.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-0.5">
                    <button onClick={() => moveService(service.id, 'up')} disabled={idx === 0} className="text-slate-400 hover:text-slate-600 disabled:opacity-30">
                      <ArrowUpDown size={14} />
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="font-medium text-[#0A1628] text-sm">{service.name}</span>
                </td>
                <td className="px-4 py-3 text-slate-500 text-sm hidden sm:table-cell">{service.slug}</td>
                <td className="px-4 py-3 text-sm font-medium text-[#0A1628]">{formatCurrency(service.base_price)}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleActive(service.id, service.is_active)}
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${service.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                  >
                    {service.is_active ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <Link href={`/dashboard/admin/services/${service.id}`} className="text-[#C9A84C] hover:text-[#0A1628] transition-colors">
                    <Pencil size={16} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {services.length === 0 && (
          <div className="text-center py-12 text-slate-400 text-sm">No services found. Add your first service to get started.</div>
        )}
      </div>
    </div>
  )
}
