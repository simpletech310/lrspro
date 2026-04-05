import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'

export function CTABanner() {
  return (
    <section className="bg-[#0A1628] py-16 sm:py-20 border-t border-white/10">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-display text-white text-3xl sm:text-4xl font-bold mb-4">Your Next Case Doesn't Have to Wait.</h2>
        <p className="text-slate-300 text-base sm:text-lg mb-8 sm:mb-10 max-w-2xl mx-auto">Create your free account, place your order, and let us handle the legwork. Same-day rush service available for urgent filings and service of process.</p>
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
          <Link href="/signup" className="inline-flex items-center justify-center gap-2 bg-[#C9A84C] text-[#0A1628] px-8 py-4 font-semibold rounded-sm hover:bg-[#E8C96A] transition-colors">
            Create Free Account <ArrowRight size={18} />
          </Link>
          <a href={`tel:${process.env.NEXT_PUBLIC_COMPANY_PHONE}`} className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-8 py-4 font-medium rounded-sm hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors">
            <Phone size={18} /> Speak With Our Team
          </a>
        </div>
      </div>
    </section>
  )
}
