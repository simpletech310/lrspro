import { Navbar } from '@/components/marketing/Navbar'
import { Footer } from '@/components/marketing/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | Left Right Serve & Sign Pros',
  description: 'Terms of Service for Left Right Serve & Sign Pros, LLC. Review the terms governing the use of our legal support services and client portal.',
  openGraph: {
    title: 'Terms of Service | Left Right Serve & Sign Pros',
    description: 'Terms of Service for Left Right Serve & Sign Pros, LLC. Review the terms governing the use of our legal support services and client portal.',
    images: [{ url: '/og/og-home.png', width: 1792, height: 1024 }],
  },
}

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <div className="bg-[#0A1628] py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-px bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-sm font-medium tracking-widest uppercase">Legal</span>
            </div>
            <h1 className="font-display text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-3">Terms of Service</h1>
            <p className="text-slate-400 text-sm">Last updated: April 4, 2026</p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <p className="text-slate-600 leading-relaxed mb-10 text-base sm:text-lg">
              These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the website, client portal, and professional services provided by Left Right Serve &amp; Sign Pros, LLC (&ldquo;LRS,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By creating an account, placing an order, or using our services, you agree to these Terms in full.
            </p>

            {/* Section 1 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <span className="flex-shrink-0 w-8 h-8 bg-[#0A1628] text-[#C9A84C] rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <h2 className="font-display text-[#0A1628] text-xl sm:text-2xl font-bold">Services Overview</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4 ml-11 text-sm sm:text-base">LRS provides professional legal support services, including but not limited to:</p>
              <ul className="space-y-2.5 mb-4 ml-11">
                {[
                  'Licensed process serving (personal, substituted, sub-service, and posting)',
                  'Certified mobile notary and loan signing agent services',
                  'Skip trace and subject location services',
                  'Court courier, document filing, and retrieval',
                  'Legal document preparation (LDA licensed)',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-slate-600 text-sm sm:text-base leading-relaxed">
                    <span className="text-[#C9A84C] mt-1.5 flex-shrink-0">&#9656;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-slate-600 leading-relaxed ml-11 text-sm sm:text-base">All services are performed by licensed, bonded, and insured professionals in accordance with California state law.</p>
            </section>

            {/* Section 2 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <span className="flex-shrink-0 w-8 h-8 bg-[#0A1628] text-[#C9A84C] rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <h2 className="font-display text-[#0A1628] text-xl sm:text-2xl font-bold">Account Registration</h2>
              </div>
              <p className="text-slate-600 leading-relaxed ml-11 text-sm sm:text-base">To place orders and access the client portal, you must create an account by providing accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. Notify us immediately if you suspect unauthorized access.</p>
            </section>

            {/* Section 3 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <span className="flex-shrink-0 w-8 h-8 bg-[#0A1628] text-[#C9A84C] rounded-full flex items-center justify-center text-sm font-bold">3</span>
                <h2 className="font-display text-[#0A1628] text-xl sm:text-2xl font-bold">Orders &amp; Payment</h2>
              </div>
              <ul className="space-y-2.5 ml-11">
                <li className="flex items-start gap-2.5 text-slate-600 text-sm sm:text-base leading-relaxed">
                  <span className="text-[#C9A84C] mt-1.5 flex-shrink-0">&#9656;</span>
                  <span><strong className="text-[#0A1628]">Placing Orders:</strong> Orders are placed through our online portal. You are responsible for providing accurate case details, subject information, and delivery addresses.</span>
                </li>
                <li className="flex items-start gap-2.5 text-slate-600 text-sm sm:text-base leading-relaxed">
                  <span className="text-[#C9A84C] mt-1.5 flex-shrink-0">&#9656;</span>
                  <span><strong className="text-[#0A1628]">Payment:</strong> All payments are processed securely at the time of order. Pricing is displayed before checkout and varies by service type and turnaround time (standard, rush, or same-day).</span>
                </li>
                <li className="flex items-start gap-2.5 text-slate-600 text-sm sm:text-base leading-relaxed">
                  <span className="text-[#C9A84C] mt-1.5 flex-shrink-0">&#9656;</span>
                  <span><strong className="text-[#0A1628]">Refunds:</strong> If we are unable to complete a service due to circumstances within our control, you may be eligible for a full or partial refund at our discretion. Services that have been partially completed (e.g., documented due diligence attempts) are generally non-refundable, as work has been performed.</span>
                </li>
                <li className="flex items-start gap-2.5 text-slate-600 text-sm sm:text-base leading-relaxed">
                  <span className="text-[#C9A84C] mt-1.5 flex-shrink-0">&#9656;</span>
                  <span><strong className="text-[#0A1628]">Additional Charges:</strong> Certain circumstances may require additional service attempts, extended travel, or court fees. We will notify you and obtain your approval before incurring charges beyond the original order amount.</span>
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <span className="flex-shrink-0 w-8 h-8 bg-[#0A1628] text-[#C9A84C] rounded-full flex items-center justify-center text-sm font-bold">4</span>
                <h2 className="font-display text-[#0A1628] text-xl sm:text-2xl font-bold">Service Execution</h2>
              </div>
              <ul className="space-y-2.5 ml-11">
                <li className="flex items-start gap-2.5 text-slate-600 text-sm sm:text-base leading-relaxed">
                  <span className="text-[#C9A84C] mt-1.5 flex-shrink-0">&#9656;</span>
                  <span><strong className="text-[#0A1628]">Turnaround:</strong> Standard turnaround times are estimates, not guarantees. Rush and same-day orders are prioritized accordingly. Factors outside our control (court closures, subject availability, incomplete addresses) may affect completion timelines.</span>
                </li>
                <li className="flex items-start gap-2.5 text-slate-600 text-sm sm:text-base leading-relaxed">
                  <span className="text-[#C9A84C] mt-1.5 flex-shrink-0">&#9656;</span>
                  <span><strong className="text-[#0A1628]">Attempts &amp; Documentation:</strong> All service attempts are documented with date, time, GPS coordinates, and outcome. If service cannot be completed, we will provide a detailed report of all attempts made.</span>
                </li>
                <li className="flex items-start gap-2.5 text-slate-600 text-sm sm:text-base leading-relaxed">
                  <span className="text-[#C9A84C] mt-1.5 flex-shrink-0">&#9656;</span>
                  <span><strong className="text-[#0A1628]">Affidavits &amp; Proof of Service:</strong> Upon successful service, we prepare court-ready affidavits and proofs of service that comply with California Code of Civil Procedure requirements. These are made available through your client portal.</span>
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <span className="flex-shrink-0 w-8 h-8 bg-[#0A1628] text-[#C9A84C] rounded-full flex items-center justify-center text-sm font-bold">5</span>
                <h2 className="font-display text-[#0A1628] text-xl sm:text-2xl font-bold">Client Responsibilities</h2>
              </div>
              <ul className="space-y-2.5 ml-11">
                {[
                  'Provide accurate and complete information for each order, including subject names, addresses, and relevant case details',
                  'Ensure that all documents provided for service are properly prepared and legally sufficient',
                  'Use our messaging system for professional, case-related communication only',
                  'Notify us promptly of any changes to subject information or case status',
                  'Do not use our services for any unlawful purpose',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-slate-600 text-sm sm:text-base leading-relaxed">
                    <span className="text-[#C9A84C] mt-1.5 flex-shrink-0">&#9656;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 6 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <span className="flex-shrink-0 w-8 h-8 bg-[#0A1628] text-[#C9A84C] rounded-full flex items-center justify-center text-sm font-bold">6</span>
                <h2 className="font-display text-[#0A1628] text-xl sm:text-2xl font-bold">Intellectual Property</h2>
              </div>
              <p className="text-slate-600 leading-relaxed ml-11 text-sm sm:text-base">All content on our website and portal — including text, graphics, logos, and software — is the property of Left Right Serve &amp; Sign Pros, LLC and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from our content without written permission.</p>
            </section>

            {/* Section 7 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <span className="flex-shrink-0 w-8 h-8 bg-[#0A1628] text-[#C9A84C] rounded-full flex items-center justify-center text-sm font-bold">7</span>
                <h2 className="font-display text-[#0A1628] text-xl sm:text-2xl font-bold">Limitation of Liability</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4 ml-11 text-sm sm:text-base">To the maximum extent permitted by law, LRS shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services. Our total liability for any claim related to our services shall not exceed the amount you paid for the specific service giving rise to the claim.</p>
              <p className="text-slate-600 leading-relaxed ml-11 text-sm sm:text-base">We are not responsible for delays or failures caused by circumstances beyond our reasonable control, including but not limited to: court closures, natural disasters, subject evasion, incorrect addresses provided by the client, or acts of government.</p>
            </section>

            {/* Section 8 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <span className="flex-shrink-0 w-8 h-8 bg-[#0A1628] text-[#C9A84C] rounded-full flex items-center justify-center text-sm font-bold">8</span>
                <h2 className="font-display text-[#0A1628] text-xl sm:text-2xl font-bold">Confidentiality</h2>
              </div>
              <p className="text-slate-600 leading-relaxed ml-11 text-sm sm:text-base">
                We treat all client information, case details, and documents as confidential. Information is shared only with our agents and staff on a need-to-know basis for service fulfillment, and as required by law or court process. Our complete data handling practices are described in our{' '}
                <a href="/privacy" className="text-[#C9A84C] hover:underline">Privacy Policy</a>.
              </p>
            </section>

            {/* Section 9 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <span className="flex-shrink-0 w-8 h-8 bg-[#0A1628] text-[#C9A84C] rounded-full flex items-center justify-center text-sm font-bold">9</span>
                <h2 className="font-display text-[#0A1628] text-xl sm:text-2xl font-bold">Dispute Resolution</h2>
              </div>
              <p className="text-slate-600 leading-relaxed ml-11 text-sm sm:text-base">Any disputes arising from these Terms or our services shall be resolved through good-faith negotiation. If negotiation fails, disputes shall be submitted to binding arbitration in Riverside County, California, under the rules of the American Arbitration Association. California law governs these Terms.</p>
            </section>

            {/* Section 10 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <span className="flex-shrink-0 w-8 h-8 bg-[#0A1628] text-[#C9A84C] rounded-full flex items-center justify-center text-sm font-bold">10</span>
                <h2 className="font-display text-[#0A1628] text-xl sm:text-2xl font-bold">Termination</h2>
              </div>
              <p className="text-slate-600 leading-relaxed ml-11 text-sm sm:text-base">We may suspend or terminate your account if you violate these Terms, provide fraudulent information, or use our services for unlawful purposes. You may close your account at any time by contacting us. Termination does not relieve you of payment obligations for services already rendered.</p>
            </section>

            {/* Section 11 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <span className="flex-shrink-0 w-8 h-8 bg-[#0A1628] text-[#C9A84C] rounded-full flex items-center justify-center text-sm font-bold">11</span>
                <h2 className="font-display text-[#0A1628] text-xl sm:text-2xl font-bold">Modifications</h2>
              </div>
              <p className="text-slate-600 leading-relaxed ml-11 text-sm sm:text-base">We reserve the right to update these Terms at any time. Material changes will be communicated via email or a prominent notice on our website. Your continued use of our services following any changes constitutes acceptance of the updated Terms.</p>
            </section>

            {/* Section 12 - Contact */}
            <section className="bg-[#F8F5EE] rounded-sm p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex-shrink-0 w-8 h-8 bg-[#0A1628] text-[#C9A84C] rounded-full flex items-center justify-center text-sm font-bold">12</span>
                <h2 className="font-display text-[#0A1628] text-xl sm:text-2xl font-bold">Contact</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4 ml-11 text-sm sm:text-base">For questions about these Terms, please contact:</p>
              <div className="ml-11 space-y-1.5 text-sm sm:text-base">
                <p className="font-semibold text-[#0A1628]">Left Right Serve &amp; Sign Pros, LLC</p>
                <p className="text-slate-600">Email: <a href={`mailto:${process.env.NEXT_PUBLIC_COMPANY_EMAIL}`} className="text-[#C9A84C] hover:underline">{process.env.NEXT_PUBLIC_COMPANY_EMAIL}</a></p>
                <p className="text-slate-600">Phone: <a href={`tel:${process.env.NEXT_PUBLIC_COMPANY_PHONE}`} className="text-[#C9A84C] hover:underline">{process.env.NEXT_PUBLIC_COMPANY_PHONE}</a></p>
                <p className="text-slate-600">San Bernardino, California</p>
              </div>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
