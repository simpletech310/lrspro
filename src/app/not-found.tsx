import Link from 'next/link'
import { Navbar } from '@/components/marketing/Navbar'
import { Footer } from '@/components/marketing/Footer'
import { ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="bg-[#0A1628] min-h-[60vh] flex items-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center py-20">
            <div className="font-display text-[#C9A84C] text-7xl sm:text-8xl font-bold mb-4">404</div>
            <h1 className="font-display text-white text-2xl sm:text-3xl font-bold mb-4">Page Not Found</h1>
            <p className="text-slate-400 max-w-md mx-auto mb-8 text-sm sm:text-base leading-relaxed">
              The page you are looking for may have been moved or no longer exists. Let us help you find what you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-[#C9A84C] text-[#0A1628] px-6 py-3 font-semibold rounded-sm hover:bg-[#E8C96A] transition-colors"
              >
                Back to Home <ArrowRight size={16} />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-6 py-3 font-semibold rounded-sm hover:border-white/40 transition-colors"
              >
                View Services
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-6 py-3 font-semibold rounded-sm hover:border-white/40 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
