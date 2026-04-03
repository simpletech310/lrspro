import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'

export function CTABanner() {
  return (
    <section className="bg-[#0A1628] py-20 border-t border-white/10">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-display text-white text-4xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">Order online in minutes or call us directly. Same-day service available for urgent matters.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/portal/new-order" className="inline-flex items-center gap-2 bg-[#C9A84C] text-[#0A1628] px-8 py-4 font-semibold rounded-sm hover:bg-[#E8C96A] transition-colors">
            Order Now <ArrowRight size={18} />
          </Link>
          <a href={`tel:${process.env.NEXT_PUBLIC_COMPANY_PHONE}`} className="inline-flex items-center gap-2 border border-white/30 text-white px-8 py-4 font-medium rounded-sm hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors">
            <Phone size={18} /> Call Us
          </a>
        </div>
      </div>
    </section>
  )
}