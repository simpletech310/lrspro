import { Navbar } from '@/components/marketing/Navbar'
import { Footer } from '@/components/marketing/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | Left Right Serve & Sign Pros',
  description: 'Terms of Service for Left Right Serve & Sign Pros, LLC. Review the terms governing the use of our legal support services and client portal.',
}

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="bg-[#0A1628] py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h1 className="font-display text-white text-4xl sm:text-5xl font-bold mb-3">Terms of Service</h1>
            <p className="text-slate-400 text-sm">Last updated: April 4, 2026</p>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="prose prose-slate max-w-none prose-headings:font-display prose-headings:text-[#0A1628] prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-lg prose-h3:mt-6 prose-p:leading-relaxed prose-li:leading-relaxed prose-a:text-[#C9A84C] prose-a:no-underline hover:prose-a:underline">

            <p>These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the website, client portal, and professional services provided by Left Right Serve &amp; Sign Pros, LLC (&ldquo;LRS,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By creating an account, placing an order, or using our services, you agree to these Terms in full.</p>

            <h2>1. Services Overview</h2>
            <p>LRS provides professional legal support services, including but not limited to:</p>
            <ul>
              <li>Licensed process serving (personal, substituted, sub-service, and posting)</li>
              <li>Certified mobile notary and loan signing agent services</li>
              <li>Skip trace and subject location services</li>
              <li>Court courier, document filing, and retrieval</li>
              <li>Legal document preparation (LDA licensed)</li>
            </ul>
            <p>All services are performed by licensed, bonded, and insured professionals in accordance with California state law.</p>

            <h2>2. Account Registration</h2>
            <p>To place orders and access the client portal, you must create an account by providing accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. Notify us immediately if you suspect unauthorized access.</p>

            <h2>3. Orders &amp; Payment</h2>
            <ul>
              <li><strong>Placing Orders:</strong> Orders are placed through our online portal. You are responsible for providing accurate case details, subject information, and delivery addresses.</li>
              <li><strong>Payment:</strong> All payments are processed securely at the time of order. Pricing is displayed before checkout and varies by service type and turnaround time (standard, rush, or same-day).</li>
              <li><strong>Refunds:</strong> If we are unable to complete a service due to circumstances within our control, you may be eligible for a full or partial refund at our discretion. Services that have been partially completed (e.g., documented due diligence attempts) are generally non-refundable, as work has been performed.</li>
              <li><strong>Additional Charges:</strong> Certain circumstances may require additional service attempts, extended travel, or court fees. We will notify you and obtain your approval before incurring charges beyond the original order amount.</li>
            </ul>

            <h2>4. Service Execution</h2>
            <ul>
              <li><strong>Turnaround:</strong> Standard turnaround times are estimates, not guarantees. Rush and same-day orders are prioritized accordingly. Factors outside our control (court closures, subject availability, incomplete addresses) may affect completion timelines.</li>
              <li><strong>Attempts &amp; Documentation:</strong> All service attempts are documented with date, time, GPS coordinates, and outcome. If service cannot be completed, we will provide a detailed report of all attempts made.</li>
              <li><strong>Affidavits &amp; Proof of Service:</strong> Upon successful service, we prepare court-ready affidavits and proofs of service that comply with California Code of Civil Procedure requirements. These are made available through your client portal.</li>
            </ul>

            <h2>5. Client Responsibilities</h2>
            <ul>
              <li>Provide accurate and complete information for each order, including subject names, addresses, and relevant case details</li>
              <li>Ensure that all documents provided for service are properly prepared and legally sufficient</li>
              <li>Use our messaging system for professional, case-related communication only</li>
              <li>Notify us promptly of any changes to subject information or case status</li>
              <li>Do not use our services for any unlawful purpose</li>
            </ul>

            <h2>6. Intellectual Property</h2>
            <p>All content on our website and portal — including text, graphics, logos, and software — is the property of Left Right Serve &amp; Sign Pros, LLC and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from our content without written permission.</p>

            <h2>7. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, LRS shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services. Our total liability for any claim related to our services shall not exceed the amount you paid for the specific service giving rise to the claim.</p>
            <p>We are not responsible for delays or failures caused by circumstances beyond our reasonable control, including but not limited to: court closures, natural disasters, subject evasion, incorrect addresses provided by the client, or acts of government.</p>

            <h2>8. Confidentiality</h2>
            <p>We treat all client information, case details, and documents as confidential. Information is shared only with our agents and staff on a need-to-know basis for service fulfillment, and as required by law or court process. Our complete data handling practices are described in our <a href="/privacy">Privacy Policy</a>.</p>

            <h2>9. Dispute Resolution</h2>
            <p>Any disputes arising from these Terms or our services shall be resolved through good-faith negotiation. If negotiation fails, disputes shall be submitted to binding arbitration in Riverside County, California, under the rules of the American Arbitration Association. California law governs these Terms.</p>

            <h2>10. Termination</h2>
            <p>We may suspend or terminate your account if you violate these Terms, provide fraudulent information, or use our services for unlawful purposes. You may close your account at any time by contacting us. Termination does not relieve you of payment obligations for services already rendered.</p>

            <h2>11. Modifications</h2>
            <p>We reserve the right to update these Terms at any time. Material changes will be communicated via email or a prominent notice on our website. Your continued use of our services following any changes constitutes acceptance of the updated Terms.</p>

            <h2>12. Contact</h2>
            <p>For questions about these Terms, please contact:</p>
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
