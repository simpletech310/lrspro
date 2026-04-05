import { Navbar } from '@/components/marketing/Navbar'
import { Footer } from '@/components/marketing/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Left Right Serve & Sign Pros',
  description: 'Privacy Policy for Left Right Serve & Sign Pros, LLC. Learn how we collect, use, and protect your personal information.',
}

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="bg-[#0A1628] py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h1 className="font-display text-white text-4xl sm:text-5xl font-bold mb-3">Privacy Policy</h1>
            <p className="text-slate-400 text-sm">Last updated: April 4, 2026</p>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="prose prose-slate max-w-none prose-headings:font-display prose-headings:text-[#0A1628] prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-lg prose-h3:mt-6 prose-p:leading-relaxed prose-li:leading-relaxed prose-a:text-[#C9A84C] prose-a:no-underline hover:prose-a:underline">

            <p>Left Right Serve &amp; Sign Pros, LLC (&ldquo;LRS,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting the privacy and security of the personal information entrusted to us by our clients, website visitors, and service recipients. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our client portal, or engage our professional services.</p>

            <h2>1. Information We Collect</h2>

            <h3>Information You Provide</h3>
            <ul>
              <li><strong>Account Information:</strong> Name, email address, phone number, company or firm name when you create a client account.</li>
              <li><strong>Case &amp; Order Information:</strong> Subject names, addresses, case numbers, court information, document details, and any other information provided to fulfill your service order.</li>
              <li><strong>Payment Information:</strong> Payment details are processed securely through our third-party payment processor. We do not store credit card numbers on our servers.</li>
              <li><strong>Communications:</strong> Messages sent through our case messaging system, contact form submissions, and email correspondence.</li>
            </ul>

            <h3>Information Collected Automatically</h3>
            <ul>
              <li><strong>Device &amp; Usage Data:</strong> IP address, browser type, operating system, referring URLs, pages visited, and time spent on the site.</li>
              <li><strong>Cookies:</strong> We use essential cookies to maintain your session and authentication state. We do not use advertising or tracking cookies.</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <ul>
              <li>To create and manage your client account and portal access</li>
              <li>To process, assign, and fulfill service orders (process serving, notary, skip trace, court filing, document preparation)</li>
              <li>To provide real-time case tracking and status updates</li>
              <li>To generate court-ready affidavits and legal documentation</li>
              <li>To process secure payments for services rendered</li>
              <li>To communicate with you about your cases and account</li>
              <li>To improve our website, services, and client experience</li>
              <li>To comply with legal obligations and court requirements</li>
            </ul>

            <h2>3. Information Sharing &amp; Disclosure</h2>
            <p>We do not sell, rent, or trade your personal information. We may share information in the following limited circumstances:</p>
            <ul>
              <li><strong>Service Fulfillment:</strong> With our licensed process servers, notaries, and field agents who need case details to perform the requested service.</li>
              <li><strong>Payment Processing:</strong> With our secure payment processor to complete transactions.</li>
              <li><strong>Legal Compliance:</strong> When required by law, court order, or legal process — including the filing of affidavits, proofs of service, and court documents that are part of the services you have ordered.</li>
              <li><strong>Business Operations:</strong> With service providers who assist in operating our platform (hosting, email delivery), subject to confidentiality agreements.</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>We implement industry-standard security measures to protect your information, including:</p>
            <ul>
              <li>Encrypted data transmission (TLS/SSL) across our entire platform</li>
              <li>Secure authentication with encrypted password storage</li>
              <li>Role-based access controls limiting data access to authorized personnel</li>
              <li>Virus scanning on all uploaded documents</li>
              <li>Regular security audits of our systems and infrastructure</li>
            </ul>

            <h2>5. Data Retention</h2>
            <p>We retain case records and associated documents for a minimum of seven (7) years to comply with California legal record-keeping requirements and to support any future court proceedings related to our services. Account information is retained for the duration of your account and for a reasonable period after closure.</p>

            <h2>6. Your Rights</h2>
            <p>Under the California Consumer Privacy Act (CCPA) and applicable law, you have the right to:</p>
            <ul>
              <li>Request access to the personal information we hold about you</li>
              <li>Request correction of inaccurate personal information</li>
              <li>Request deletion of your personal information, subject to legal retention requirements</li>
              <li>Opt out of any future marketing communications</li>
            </ul>
            <p>To exercise these rights, contact us at <a href={`mailto:${process.env.NEXT_PUBLIC_COMPANY_EMAIL}`}>{process.env.NEXT_PUBLIC_COMPANY_EMAIL}</a> or call <a href={`tel:${process.env.NEXT_PUBLIC_COMPANY_PHONE}`}>{process.env.NEXT_PUBLIC_COMPANY_PHONE}</a>.</p>

            <h2>7. Third-Party Links</h2>
            <p>Our website may contain links to third-party websites or services. We are not responsible for the privacy practices of these external sites and encourage you to review their privacy policies.</p>

            <h2>8. Children&rsquo;s Privacy</h2>
            <p>Our services are directed to business professionals and are not intended for individuals under the age of 18. We do not knowingly collect personal information from minors.</p>

            <h2>9. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. Material changes will be posted on this page with an updated revision date. Continued use of our services after changes are posted constitutes acceptance of the revised policy.</p>

            <h2>10. Contact Us</h2>
            <p>If you have questions about this Privacy Policy or our data practices, please contact:</p>
            <p>
              <strong>Left Right Serve &amp; Sign Pros, LLC</strong><br />
              Email: <a href={`mailto:${process.env.NEXT_PUBLIC_COMPANY_EMAIL}`}>{process.env.NEXT_PUBLIC_COMPANY_EMAIL}</a><br />
              Phone: <a href={`tel:${process.env.NEXT_PUBLIC_COMPANY_PHONE}`}>{process.env.NEXT_PUBLIC_COMPANY_PHONE}</a><br />
              Riverside, California
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
