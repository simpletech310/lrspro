'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2, FileText, Clock, ArrowRight } from 'lucide-react'

interface OrderDetails {
  case_number: string | null
  service_name: string
  priority: string
  amount_paid: number | null
  customer_email: string | null
  payment_status: string
}

export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [order, setOrder] = useState<OrderDetails | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    localStorage.removeItem('lrs_selected_service')
    localStorage.removeItem('lrs_order_data')

    if (sessionId) {
      fetch(`/api/orders/session?session_id=${sessionId}`)
        .then(r => r.ok ? r.json() : null)
        .then(data => { if (data) setOrder(data) })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [sessionId])

  const formatCurrency = (cents: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100)

  return (
    <div className="max-w-xl mx-auto py-16 text-center">
      <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 size={40} className="text-emerald-600" />
      </div>
      <h1 className="font-display text-4xl font-bold text-[#0A1628] mb-4">Order Confirmed!</h1>
      <p className="text-slate-600 text-lg mb-8">
        Thank you for your business. Your payment was successful and your case has been created.
      </p>

      {/* Order summary */}
      {!loading && order && (
        <div className="bg-white border border-slate-200 rounded-sm shadow-card p-6 mb-8 text-left">
          <h3 className="font-semibold text-[#0A1628] mb-4 flex items-center gap-2">
            <FileText size={18} className="text-[#C9A84C]" /> Order Summary
          </h3>
          <div className="grid grid-cols-2 gap-y-3 text-sm">
            {order.case_number && (
              <>
                <span className="text-slate-500">Case Number</span>
                <span className="font-mono font-semibold text-[#0A1628]">{order.case_number}</span>
              </>
            )}
            <span className="text-slate-500">Service</span>
            <span className="font-medium text-[#0A1628]">{order.service_name}</span>
            <span className="text-slate-500">Priority</span>
            <span className="font-medium text-[#C9A84C] capitalize">{order.priority.replace(/_/g, ' ')}</span>
            {order.amount_paid && (
              <>
                <span className="text-slate-500">Amount Paid</span>
                <span className="font-semibold text-emerald-600">{formatCurrency(order.amount_paid)}</span>
              </>
            )}
            {order.customer_email && (
              <>
                <span className="text-slate-500">Confirmation sent to</span>
                <span className="text-slate-700">{order.customer_email}</span>
              </>
            )}
          </div>
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-sm p-6 mb-8 text-left shadow-card">
        <h3 className="font-semibold text-[#0A1628] mb-3 flex items-center gap-2">
          <Clock size={18} className="text-[#C9A84C]" /> What happens next?
        </h3>
        <ol className="space-y-3 text-sm text-slate-600">
          <li className="flex gap-3">
            <span className="w-6 h-6 bg-[#0A1628] text-[#C9A84C] rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">1</span>
            <span>Your case is reviewed and assigned to a licensed professional within 24 hours.</span>
          </li>
          <li className="flex gap-3">
            <span className="w-6 h-6 bg-[#0A1628] text-[#C9A84C] rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">2</span>
            <span>Track real-time progress, service attempts, and status changes from your portal.</span>
          </li>
          <li className="flex gap-3">
            <span className="w-6 h-6 bg-[#0A1628] text-[#C9A84C] rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">3</span>
            <span>Download completed affidavits and proof of service when your case is closed.</span>
          </li>
        </ol>
      </div>

      <Link href="/portal/cases" className="inline-flex items-center gap-2 bg-[#0A1628] text-[#C9A84C] px-8 py-3.5 font-semibold rounded-sm hover:bg-[#112240] transition-colors">
        Go to My Cases <ArrowRight size={18} />
      </Link>
    </div>
  )
}
