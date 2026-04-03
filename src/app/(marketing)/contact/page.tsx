import { Navbar } from '@/components/marketing/Navbar'
import { Footer } from '@/components/marketing/Footer'
import { ContactForm } from '@/components/marketing/ContactForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | Left Right Serve & Sign Pros',
  description: 'Contact Left Right Serve & Sign Pros for process serving, notary, skip trace, and court courier services in Riverside County, CA.',
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="bg-[#0A1628] py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="font-display text-white text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-slate-300 text-lg">Questions? Ready to order? We respond within 1 business hour.</p>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="font-display text-[#0A1628] text-2xl font-bold mb-6">Get In Touch</h2>
            <div className="space-y-4 text-slate-600">
              <div><div className="font-semibold text-[#0A1628] mb-1">Phone</div><a href="tel:+19515550123" className="hover:text-[#C9A84C]">{process.env.NEXT_PUBLIC_COMPANY_PHONE}</a></div>
              <div><div className="font-semibold text-[#0A1628] mb-1">Email</div><a href="mailto:info@lrsservepros.com" className="hover:text-[#C9A84C]">{process.env.NEXT_PUBLIC_COMPANY_EMAIL}</a></div>
              <div><div className="font-semibold text-[#0A1628] mb-1">Service Area</div><p>Riverside County · San Bernardino County<br />Orange County · Los Angeles County</p></div>
              <div><div className="font-semibold text-[#0A1628] mb-1">Hours</div><p>Mon–Fri: 8am–6pm<br />Sat: 9am–3pm<br />Emergency: 24/7 (same-day orders)</p></div>
            </div>
          </div>
          <ContactForm />
        </div>
      </main>
      <Footer />
    </>
  )
}