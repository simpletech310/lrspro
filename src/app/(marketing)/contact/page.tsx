import { Navbar } from '@/components/marketing/Navbar'
import { Footer } from '@/components/marketing/Footer'
import { ContactForm } from '@/components/marketing/ContactForm'
import { Clock, MapPin, Phone, Mail } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us — Reach Our Team | Left Right Serve & Sign Pros',
  description: 'Contact Left Right Serve & Sign Pros for process serving, mobile notary, skip trace, court courier, and legal document services across Riverside, San Bernardino, Orange, and LA counties. We respond within 1 business hour.',
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="bg-[#0A1628] py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-px bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-sm font-medium tracking-widest uppercase">Get In Touch</span>
              <div className="w-8 h-px bg-[#C9A84C]" />
            </div>
            <h1 className="font-display text-white text-4xl sm:text-5xl font-bold mb-4">Let&rsquo;s Talk About Your Case.</h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto">Whether you need a quote, have a question about an order, or want to discuss a complex service — our team responds within one business hour.</p>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20 grid md:grid-cols-5 gap-10 sm:gap-16">
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="font-display text-[#0A1628] text-xl sm:text-2xl font-bold mb-6">Reach Us Directly</h2>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-[#0A1628]/5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone size={16} className="text-[#0A1628]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#0A1628] text-sm mb-0.5">Phone</div>
                    <a href={`tel:${process.env.NEXT_PUBLIC_COMPANY_PHONE}`} className="text-slate-600 text-sm hover:text-[#C9A84C] transition-colors">{process.env.NEXT_PUBLIC_COMPANY_PHONE}</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-[#0A1628]/5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail size={16} className="text-[#0A1628]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#0A1628] text-sm mb-0.5">Email</div>
                    <a href={`mailto:${process.env.NEXT_PUBLIC_COMPANY_EMAIL}`} className="text-slate-600 text-sm hover:text-[#C9A84C] transition-colors">{process.env.NEXT_PUBLIC_COMPANY_EMAIL}</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-[#0A1628]/5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin size={16} className="text-[#0A1628]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#0A1628] text-sm mb-0.5">Address</div>
                    <p className="text-slate-600 text-sm">2999 Kendall Dr. Suite #204<br />PMB-1004<br />San Bernardino, CA 92407</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-[#0A1628]/5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin size={16} className="text-[#0A1628]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#0A1628] text-sm mb-0.5">Coverage Area</div>
                    <p className="text-slate-600 text-sm">San Bernardino &middot; Riverside<br />Orange &middot; Los Angeles</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-[#0A1628]/5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock size={16} className="text-[#0A1628]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#0A1628] text-sm mb-0.5">Business Hours</div>
                    <p className="text-slate-600 text-sm">Mon&ndash;Fri: 8am&ndash;6pm<br />Sat: 9am&ndash;3pm<br />Same-day emergencies: 24/7</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#F8F5EE] rounded-sm p-5">
              <p className="text-sm text-slate-600 leading-relaxed"><strong className="text-[#0A1628]">Existing clients:</strong> For case-specific questions, use the messaging feature in your <a href="/login" className="text-[#C9A84C] font-medium hover:underline">client portal</a> for the fastest response.</p>
            </div>
          </div>
          <div className="md:col-span-3">
            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
