import { Navbar } from '@/components/marketing/Navbar'
import { Footer } from '@/components/marketing/Footer'
import { CTABanner } from '@/components/marketing/CTABanner'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Left Right Serve & Sign Pros — Riverside, CA',
  description: 'Learn about Left Right Serve & Sign Pros, LLC — licensed process servers, certified notaries, and legal support professionals serving Riverside County since 2019.',
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="bg-[#0A1628] py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h1 className="font-display text-white text-5xl font-bold mb-4">About Left Right Serve &amp; Sign Pros</h1>
            <p className="text-slate-300 text-lg max-w-2xl">Riverside County's trusted legal support professionals.</p>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-6 py-20 space-y-12">
          <div>
            <h2 className="font-display text-[#0A1628] text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-slate-600 leading-relaxed text-lg">We provide attorneys, law firms, real estate professionals, title companies, and medical practices with reliable process serving and legal support services. Our technology-forward approach means clients always know where their case stands — without having to call for an update.</p>
          </div>
          <div>
            <h2 className="font-display text-[#0A1628] text-3xl font-bold mb-4">Our Services</h2>
            <ul className="space-y-3 text-slate-600">
              {['Licensed Process Serving (personal, substituted, and posting)','Certified Mobile Notary & Loan Signing Agent','Professional Skip Trace & Subject Location','Same-Day Court Courier & Filing','Legal Document Preparation (LDA Licensed)'].map(s=>(
                <li key={s} className="flex items-start gap-3"><span className="text-[#C9A84C] mt-1">▸</span><span>{s}</span></li>
              ))}
            </ul>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[{n:'Licensed',d:'Fully licensed, bonded, and insured in the State of California'},{n:'Documented',d:'GPS-verified attempts, photo evidence, court-ready affidavits'},{n:'Reliable',d:'99% completion rate across 500+ cases served in Riverside County'}].map(({n,d})=>(
              <div key={n} className="border border-slate-200 rounded-sm p-6">
                <div className="font-display text-[#C9A84C] text-xl font-bold mb-2">{n}</div>
                <p className="text-slate-500 text-sm">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <CTABanner />
      <Footer />
    </>
  )
}