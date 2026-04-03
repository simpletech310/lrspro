import { Navbar } from '@/components/marketing/Navbar'
import { Footer } from '@/components/marketing/Footer'
import { ServicesStrip } from '@/components/marketing/ServicesStrip'
import { CTABanner } from '@/components/marketing/CTABanner'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Legal Support Services in Riverside, CA | Left Right Serve & Sign Pros',
  description: 'Process serving, mobile notary, skip trace, court courier, and legal document preparation in Riverside County and Greater SoCal.',
}

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="bg-[#0A1628] py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="font-display text-white text-5xl font-bold mb-4">Our Legal Support Services</h1>
            <p className="text-slate-300 text-lg">Licensed. Documented. Delivered.</p>
          </div>
        </div>
        <ServicesStrip />
        <CTABanner />
      </main>
      <Footer />
    </>
  )
}