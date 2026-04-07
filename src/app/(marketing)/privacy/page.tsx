import { Navbar } from '@/components/marketing/Navbar'
import { Footer } from '@/components/marketing/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Left Right Serve & Sign Pros',
  description: 'Privacy Policy for Left Right Serve & Sign Pros, LLC. Learn how we collect, use, and protect your personal information.',
  openGraph: {
    title: 'Privacy Policy | Left Right Serve & Sign Pros',
    description: 'Privacy Policy for Left Right Serve & Sign Pros, LLC. Learn how we collect, use, and protect your personal information.',
    images: [{ url: '/og/og-home.png', width: 1792, height: 1024 }],
  },
}

export default function PrivacyPage() {
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
            <h1 className="font-display text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-3">Privacy Policy</h1>
            <p className="text-slate-400 text-sm">Last updated: April 4, 2026</p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <p className="text-slate-600 leading-relaxed mb-10 text-base sm:text-lg">
              Left Right Serve &amp; Sign Pros, LLC (&ldquo;LRS,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting the privacy and security of the personal information entrusted to us by our clients, website visitors, and service recipients. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our client portal, or engage our professional services.
            </p>

            {/* Section 1 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <span className="flex-shrink-0 w-8 h-8 bg-[#0A1628] text-[#C9A84C] rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <h2 className="font-display text-[#0A1628] text-xl sm:text-2xl font-bold">Information We Collect</h2>
              </div>

              <h3 className="font-semibold text-[#0A1628] text-base sm:text-lg mb-3 ml-11">Information You Provide</h3>
              <ul className="space-y-2.5 mb-6 ml-11">
                <li className="flex items-start gap-2.5 text-slate-600 text-sm sm:text-base leading-relaxed">
                  <span className="text-[#C9A84C] mt-1.5 flex-shrink-0">&#9656;</span>
                  <span><strong className="text-[#0A1628]">Account Information:</strong> Name, email address, phone number, company or firm name when you create a client account.</span>
                </li>
                <li className="flex items-start gap-2.5 text-slate-600 text-sm sm:text-base leading-relaxed">
                  <span className="text-[#C9A84C] mt-1.5 flex-shrink-0">&#9656;</span>
                  <span><strong className="text-[#0A1628]">Case &amp; Order Information:</strong> Subject names, addresses, case numbers, court information, document details, and any other information provided to fulfill your service order.</span>
                </li>
                <li className="flex items-start gap-2.5 text-slate-600 text-sm sm:text-base leading-relaxed">
                  <span className="text-[#C9A84C] mt-1.5 flex-shrink-0">&#9656;</span>
                  <span><strong className="text-[#0A1628]">Payment Information:</strong> Payment details are processed securely through our third-party payment processor. We do not store credit card numbers on our servers.</span>
                </li>
                <li className="flex items-start gap-2.5 text-slate-600 text-sm sm:text-base leading-relaxed">
                  <span className="text-[#C9A84C] mt-1.5 flex-shrink-0">&#9656;</span>
                  <span><strong className="text-[#0A1628]">Communications:</strong> Messages sent through our case messaging system, contact form submissions, and email correspondence.</span>
                </li>
              </ul>

              <h3 className="font-semibold text-[#0A1628] text-base sm:text-lg mb-3 ml-11">Information Collected Automatically</h3>
              <ul className="space-y-2.5 ml-11">
                <li className="flex items-start gap-2.5 text-slate-600 text-sm sm:text-base leading-relaxed">
                  <span className="text-[#C9A84C] mt-1.5 flex-shrink-0">&#9656;</span>
                  <span><strong className="text-[#0A1628]">Device &amp; Usage Data:</strong> IP address, browser type, operating system, referring URLs, pages visited, and time spent on the site.</span>
                </li>
                <li className="flex items-start gap-2.5 text-slate-600 text-sm sm:text-base leading-relaxed">
                  <span className="text-[#C9A84C] mt-1.5 flex-shrink-0">&#9656;</span>
                  <span><strong className="text-[#0A1628]">Cookies:</strong> We use essential cookies to maintain your session and authentication state. We do not use advertising or tracking cookies.</span>
                </li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <span className="flex-shrink-0 w-8 h-8 bg-[#0A1628] text-[#C9A84C] rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <h2 className="font-display text-[#0A1628] text-xl sm:text-2xl font-bold">How We Use Your Information</h2>
              </div>
              <ul className="space-y-2.5 ml-11">
                {[
                  'To create and manage your client account and portal access',
                  'To process, assign, and fulfill service orders (process serving, notary, skip trace, court filing, document preparation)',
                  'To provide real-time case tracking and status updates',
                  'To generate court-ready affidavits and legal documentation',
                  'To process secure payments for services rendered',
                  'To communicate with you about your cases and account',
                  'To improve our website, services, and client experience',
                  'To comply with legal obligations and court requirements',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-slate-600 text-sm sm:text-base leading-relaxed">
                    <span className="text-[#C9A84C] mt-1.5 flex-shrink-0">&#9656;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 3 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <span className="flex-shrink-0 w-8 h-8 bg-[#0A1628] text-[#C9A84C] rounded-full flex items-center justify-center text-sm font-bold">3</span>
                <h2 className="font-display text-[#0A1628] text-xl sm:text-2xl font-bold">Information Sharing &amp; Disclosure</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4 ml-11 text-sm sm:text-base">We do not sell, rent, or trade your personal information. We may share information in the following limited circumstances:</p>
              <ul className="space-y-2.5 ml-11">
                <li className="flex items-start gap-2.5 text-slate-600 text-sm sm:text-base leading-relaxed">
                  <span className="text-[#C9A84C] mt-1.5 flex-shrink-0">&#9656;</span>
                  <span><strong className="text-[#0A1628]">Service Fulfillment:</strong> With our licensed process servers, notaries, and field agents who need case details to perform the requested service.</span>
                </li>
                <li className="flex items-start gap-2.5 text-slate-600 text-sm sm:text-base leading-relaxed">
                  <span className="text-[#C9A84C] mt-1.5 flex-shrink-0">&#9656;</span>
                  <span><strong className="text-[#0A1628]">Payment Processing:</strong> With our secure payment processor to complete transactions.</span>
                </li>
                <li className="flex items-start gap-2.5 text-slate-600 text-sm sm:text-base leading-relaxed">
                  <span className="text-[#C9A84C] mt-1.5 flex-shrink-0">&#9656;</span>
                  <span><strong className="text-[#0A1628]">Legal Compliance:</strong> When required by law, court order, or legal process — including the filing of affidavits, proofs of service, and court documents that are part of the services you have ordered.</span>
                </li>
                <li className="flex items-start gap-2.5 text-slate-600 text-sm sm:text-base leading-relaxed">
                  <span className="text-[#C9A84C] mt-1.5 flex-shrink-0">&#9656;</span>
                  <span><strong className="text-[#0A1628]">Business Operations:</strong> With service providers who assist in operating our platform (hosting, email delivery), subject to confidentiality agreements.</span>
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <span className="flex-shrink-0 w-8 h-8 bg-[#0A1628] text-[#C9A84C] rounded-full flex items-center justify-center text-sm font-bold">4</span>
                <h2 className="font-display text-[#0A1628] text-xl sm:text-2xl font-bold">Data Security</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4 ml-11 text-sm sm:text-base">We implement industry-standard security measures to protect your information, including:</p>
              <ul className="space-y-2.5 ml-11">
                {[
                  'Encrypted data transmission (TLS/SSL) across our entire platform',
                  'Secure authentication with encrypted password storage',
                  'Role-based access controls limiting data access to authorized personnel',
                  'Virus scanning on all uploaded documents',
                  'Regular security audits of our systems and infrastructure',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-slate-600 text-sm sm:text-base leading-relaxed">
                    <span className="text-[#C9A84C] mt-1.5 flex-shrink-0">&#9656;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 5 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <span className="flex-shrink-0 w-8 h-8 bg-[#0A1628] text-[#C9A84C] rounded-full flex items-center justify-center text-sm font-bold">5</span>
                <h2 className="font-display text-[#0A1628] text-xl sm:text-2xl font-bold">Data Retention</h2>
              </div>
              <p className="text-slate-600 leading-relaxed ml-11 text-sm sm:text-base">We retain case records and associated documents for a minimum of seven (7) years to comply with California legal record-keeping requirements and to support any future court proceedings related to our services. Account information is retained for the duration of your account and for a reasonable period after closure.</p>
            </section>

            {/* Section 6 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <span className="flex-shrink-0 w-8 h-8 bg-[#0A1628] text-[#C9A84C] rounded-full flex items-center justify-center text-sm font-bold">6</span>
                <h2 className="font-display text-[#0A1628] text-xl sm:text-2xl font-bold">Your Rights</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4 ml-11 text-sm sm:text-base">Under the California Consumer Privacy Act (CCPA) and applicable law, you have the right to:</p>
              <ul className="space-y-2.5 mb-4 ml-11">
                {[
                  'Request access to the personal information we hold about you',
                  'Request correction of inaccurate personal information',
                  'Request deletion of your personal information, subject to legal retention requirements',
                  'Opt out of any future marketing communications',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-slate-600 text-sm sm:text-base leading-relaxed">
                    <span className="text-[#C9A84C] mt-1.5 flex-shrink-0">&#9656;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-slate-600 leading-relaxed ml-11 text-sm sm:text-base">
                To exercise these rights, contact us at{' '}
                <a href={`mailto:${process.env.NEXT_PUBLIC_COMPANY_EMAIL}`} className="text-[#C9A84C] hover:underline">{process.env.NEXT_PUBLIC_COMPANY_EMAIL}</a>{' '}
                or call <a href={`tel:${process.env.NEXT_PUBLIC_COMPANY_PHONE}`} className="text-[#C9A84C] hover:underline">{process.env.NEXT_PUBLIC_COMPANY_PHONE}</a>.
              </p>
            </section>

            {/* Section 7 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <span className="flex-shrink-0 w-8 h-8 bg-[#0A1628] text-[#C9A84C] rounded-full flex items-center justify-center text-sm font-bold">7</span>
                <h2 className="font-display text-[#0A1628] text-xl sm:text-2xl font-bold">Third-Party Links</h2>
              </div>
              <p className="text-slate-600 leading-relaxed ml-11 text-sm sm:text-base">Our website may contain links to third-party websites or services. We are not responsible for the privacy practices of these external sites and encourage you to review their privacy policies.</p>
            </section>

            {/* Section 8 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <span className="flex-shrink-0 w-8 h-8 bg-[#0A1628] text-[#C9A84C] rounded-full flex items-center justify-center text-sm font-bold">8</span>
                <h2 className="font-display text-[#0A1628] text-xl sm:text-2xl font-bold">Children&rsquo;s Privacy</h2>
              </div>
              <p className="text-slate-600 leading-relaxed ml-11 text-sm sm:text-base">Our services are directed to business professionals and are not intended for individuals under the age of 18. We do not knowingly collect personal information from minors.</p>
            </section>

            {/* Section 9 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <span className="flex-shrink-0 w-8 h-8 bg-[#0A1628] text-[#C9A84C] rounded-full flex items-center justify-center text-sm font-bold">9</span>
                <h2 className="font-display text-[#0A1628] text-xl sm:text-2xl font-bold">Changes to This Policy</h2>
              </div>
              <p className="text-slate-600 leading-relaxed ml-11 text-sm sm:text-base">We may update this Privacy Policy from time to time. Material changes will be posted on this page with an updated revision date. Continued use of our services after changes are posted constitutes acceptance of the revised policy.</p>
            </section>

            {/* Section 10 - Contact */}
            <section className="bg-[#F8F5EE] rounded-sm p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex-shrink-0 w-8 h-8 bg-[#0A1628] text-[#C9A84C] rounded-full flex items-center justify-center text-sm font-bold">10</span>
                <h2 className="font-display text-[#0A1628] text-xl sm:text-2xl font-bold">Contact Us</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4 ml-11 text-sm sm:text-base">If you have questions about this Privacy Policy or our data practices, please contact:</p>
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
