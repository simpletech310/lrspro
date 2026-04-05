import { Navbar } from '@/components/marketing/Navbar'
import { Footer } from '@/components/marketing/Footer'
import { ServicesStrip } from '@/components/marketing/ServicesStrip'
import { CTABanner } from '@/components/marketing/CTABanner'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Legal Support Services — Process Serving, Notary, Skip Trace & More | Left Right Serve & Sign Pros',
  description: 'Full-service legal support for attorneys, law firms, and real estate professionals across Southern California. Licensed process serving, certified mobile notary, skip trace, court courier, and LDA document preparation.',
  openGraph: {
    title: 'Legal Support Services | Left Right Serve & Sign Pros',
    description: 'Licensed, documented, and delivered. Process serving, mobile notary, skip trace, court courier, and legal document prep across 4 SoCal counties.',
    images: [{ url: '/og/og-services.png', width: 1792, height: 1024 }],
  },
}

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="bg-[#0A1628] py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-px bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-sm font-medium tracking-widest uppercase">What We Do</span>
              <div className="w-8 h-px bg-[#C9A84C]" />
            </div>
            <h1 className="font-display text-white text-4xl sm:text-5xl font-bold mb-4">Every Service Your Cases Demand. One Team to Deliver Them.</h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">From the moment papers need to be served to the day your filings hit the clerk&rsquo;s desk — we handle it all with licensed professionals, GPS-documented proof, and court-ready deliverables.</p>
          </div>
        </div>
        <ServicesStrip />
        <div className="bg-white py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-display text-[#0A1628] text-2xl sm:text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-slate-500 max-w-xl mx-auto mb-10 text-sm sm:text-base">Three steps. No contracts. No minimums. Your first order can be placed in under five minutes.</p>
            <div className="grid sm:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'Create Your Account', desc: 'Sign up for free in 60 seconds. No credit card required until you place an order.' },
                { step: '02', title: 'Place & Pay Securely', desc: 'Select your service, enter case details, and check out with transparent flat-rate pricing.' },
                { step: '03', title: 'Track in Real Time', desc: 'Monitor every attempt, download affidavits, and message your assigned professional — all from your portal.' },
              ].map(({ step, title, desc }) => (
                <div key={step}>
                  <div className="text-[#C9A84C] font-display text-3xl font-bold mb-2">{step}</div>
                  <h3 className="font-display text-[#0A1628] font-bold mb-2">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
