'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2 } from 'lucide-react'

export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  const [cleared, setCleared] = useState(false)
  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    if (!cleared) {
      sessionStorage.removeItem('lrs_selected_service')
      sessionStorage.removeItem('lrs_order_data')
      setCleared(true)
    }
  }, [cleared])

  return (
    <div className="max-w-xl mx-auto py-20 text-center">
      <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 size={40} className="text-emerald-600" />
      </div>
      <h1 className="font-display text-4xl font-bold text-[#0A1628] mb-4">Order Confirmed!</h1>
      <p className="text-slate-600 text-lg mb-8">
        Thank you for your business. Your payment was successful and your case has been opened.
        Our team will review your order details shortly.
      </p>
      <div className="bg-white border border-slate-200 rounded-sm p-6 mb-8 text-left shadow-card">
        <h3 className="font-semibold text-[#0A1628] mb-2">What happens next?</h3>
        <ol className="list-decimal list-inside space-y-2 text-slate-600 text-sm">
          <li>Your case is assigned to a certified professional.</li>
          <li>You will receive email updates when status changes occur.</li>
          <li>You can track progress and download complete documents at any time from your portal.</li>
        </ol>
      </div>
      <Link href="/portal/cases" className="inline-block bg-[#0A1628] text-[#C9A84C] px-8 py-3.5 font-semibold rounded-sm hover:bg-[#112240] transition-colors">
        Go to My Cases
      </Link>
    </div>
  )
}