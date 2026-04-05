export interface ServicePageData {
  seoSlug: string
  dbSlug: string
  headline: string
  tagline: string
  metaTitle: string
  metaDescription: string
  features: { title: string; description: string }[]
  faqs: { question: string; answer: string }[]
}

export const SERVICE_PAGES: Record<string, ServicePageData> = {
  'process-serving-riverside-ca': {
    seoSlug: 'process-serving-riverside-ca',
    dbSlug: 'process-serving',
    headline: 'Process Serving That Holds Up in Court.',
    tagline: 'Licensed process servers delivering personal, substituted, sub-service, and posting across four Southern California counties. Every attempt GPS-verified, timestamped, and photographed — because your case depends on bulletproof service of process.',
    metaTitle: 'Process Serving Riverside CA — Licensed, GPS-Verified | Left Right Serve & Sign Pros',
    metaDescription: 'Professional process serving in Riverside, San Bernardino, Orange, and LA counties. GPS-documented attempts, court-ready POS-010 affidavits, and same-day rush service. Licensed, bonded, and insured.',
    features: [
      { title: 'GPS-Verified Attempts', description: 'Every service attempt is logged with GPS coordinates, timestamps, and photographic evidence — building the court-admissible record your case requires.' },
      { title: 'Court-Ready Affidavits', description: 'We prepare California POS-010 Proof of Service forms and detailed affidavits that meet all CCP requirements. Downloaded directly from your portal within 24 hours.' },
      { title: 'Real-Time Portal Tracking', description: 'Log into your client portal to track every attempt as it happens. Receive instant notifications when service is completed or a new attempt is logged — no phone calls needed.' },
      { title: 'Rush & Same-Day Options', description: 'Standard service within 1–5 business days. Rush 24-hour turnaround and same-day emergency service available when your deadlines cannot wait.' },
    ],
    faqs: [
      { question: 'How many attempts will you make before recommending alternative service?', answer: 'We make up to 3 attempts at different times of day (morning, afternoon, evening) before recommending alternative service methods. Each attempt is fully documented with GPS coordinates, timestamps, and detailed notes about the conditions observed.' },
      { question: 'What happens if the subject cannot be located?', answer: 'If we cannot locate the subject after diligent attempts, we provide a Declaration of Due Diligence documenting every effort made. This declaration can be filed with the court to pursue alternative service methods such as service by posting or publication.' },
      { question: 'What areas do you serve?', answer: 'We serve throughout Riverside County, San Bernardino County, Orange County, and the greater Los Angeles metro area. Statewide service is available for rush and same-day orders.' },
      { question: 'How quickly can you begin after I place an order?', answer: 'Standard orders are assigned to a server within 24 hours. Rush orders are assigned immediately and attempted within 24 hours. Same-day emergency service is available for time-critical matters — place your order and we move.' },
    ],
  },
  'mobile-notary-riverside-ca': {
    seoSlug: 'mobile-notary-riverside-ca',
    dbSlug: 'notary',
    headline: 'A Certified Notary at Your Door — Not the Other Way Around.',
    tagline: 'California-commissioned mobile notary public and NNA-certified loan signing agent. We travel to homes, offices, hospitals, care facilities, and correctional institutions across the Inland Empire and Greater Southern California.',
    metaTitle: 'Mobile Notary Riverside CA — Certified Loan Signing Agent | Left Right Serve & Sign Pros',
    metaDescription: 'Mobile notary public and NNA-certified loan signing agent in Riverside, CA. General notarizations, loan closings, apostilles, powers of attorney. Same-day and after-hours appointments available.',
    features: [
      { title: 'We Travel to You', description: 'Mobile service to your home, office, hospital, care facility, jail, or any location throughout the Inland Empire and Greater SoCal. You set the place — we show up.' },
      { title: 'NNA-Certified Loan Signing Agent', description: 'Experienced with refinances, purchases, reverse mortgages, HELOCs, and modification packages from Fidelity, First American, Chicago Title, and all major lenders and title companies.' },
      { title: 'Same-Day & After-Hours', description: 'Book a same-day or next-day appointment through the portal. Emergency and after-hours notarizations available when urgent legal matters cannot wait until morning.' },
      { title: 'Every Document Type', description: 'Deeds of trust, grant deeds, powers of attorney, trust certifications, affidavits, jurats, acknowledgments, and more. If it needs a notary seal, we handle it.' },
    ],
    faqs: [
      { question: 'What identification do I need for a notarization?', answer: 'You will need a current, government-issued photo ID such as a California driver\'s license, U.S. passport, or state-issued ID card. The name on your ID must match the name on the documents being notarized.' },
      { question: 'Can you notarize at a hospital, nursing home, or jail?', answer: 'Yes. We regularly perform mobile notarizations at hospitals, nursing homes, rehabilitation centers, and correctional facilities. Additional travel fees may apply depending on location and facility requirements.' },
      { question: 'Is there a limit on documents per visit?', answer: 'No limit. Our base price covers standard notarizations, and you can add as many documents as needed. Loan signing packages are priced separately based on the title company\'s requirements.' },
      { question: 'Do you handle loan signings for title companies?', answer: 'Yes. We are an NNA-certified loan signing agent with experience handling packages from Fidelity, First American, Chicago Title, Old Republic, Stewart Title, and all major lenders.' },
    ],
  },
  'skip-trace': {
    seoSlug: 'skip-trace',
    dbSlug: 'skip-trace',
    headline: 'Find the People Your Cases Depend On.',
    tagline: 'Professional skip trace and subject location using FCRA and DPPA-compliant databases, public records, and investigative networks. When you need a current address before you can serve — we find it.',
    metaTitle: 'Skip Trace & People Locate Services — FCRA Compliant | Left Right Serve & Sign Pros',
    metaDescription: 'Professional skip trace and people locate services for attorneys and law firms. FCRA/DPPA compliant. Current addresses, phone numbers, employers, relatives. 2–5 business day turnaround. Pairs with process serving.',
    features: [
      { title: 'Deep Database Search', description: 'We search proprietary investigative databases, credit header data, utility records, public filings, and social footprints to locate your subject with a current, actionable address.' },
      { title: 'FCRA & DPPA Compliant', description: 'Every search is conducted in full compliance with the Fair Credit Reporting Act and Driver\'s Privacy Protection Act. Professional, lawful, and documented.' },
      { title: 'Two Service Tiers', description: 'Basic returns current address and phone. Enhanced includes employer, relatives, associates, vehicles, property records, and prior addresses — the full picture.' },
      { title: 'Seamless Process Serving Integration', description: 'Skip trace results feed directly into our process serving workflow. Locate and serve in one operation — no need to juggle multiple vendors.' },
    ],
    faqs: [
      { question: 'What information do I need to start a skip trace?', answer: 'At minimum, the subject\'s full legal name. Date of birth, last known address, phone number, or partial SSN greatly improve results and speed. The more you provide, the faster and more accurate the search.' },
      { question: 'What is the difference between Basic and Enhanced tiers?', answer: 'Basic ($75) returns a current address and phone number. Enhanced ($149) includes a comprehensive profile: current and previous addresses, phone numbers, employer information, relatives, known associates, vehicle registrations, and property records.' },
      { question: 'How long does a skip trace take?', answer: 'Most searches are completed within 2–5 business days. Rush service returns results within 24–48 hours for an additional fee.' },
      { question: 'What if the subject cannot be found?', answer: 'If our search does not produce actionable results, we provide a detailed report of all databases and methods used. We offer a partial refund or credit toward future services at our discretion.' },
    ],
  },
  'court-courier-filing': {
    seoSlug: 'court-courier-filing',
    dbSlug: 'court-courier',
    headline: 'Your Filing Hits the Clerk\'s Desk Today.',
    tagline: 'Same-day court filing, document retrieval, and courthouse runs at Riverside, San Bernardino, Orange County, and Los Angeles Superior Court locations. Conformed copies scanned and in your portal before end of business.',
    metaTitle: 'Court Courier & Filing Service — Same Day | Left Right Serve & Sign Pros',
    metaDescription: 'Same-day court filing and courier service across Riverside, San Bernardino, Orange, and LA counties. Document filing, conformed copies, and courthouse research. Emergency 2-hour filing available.',
    features: [
      { title: 'Same-Day Filing', description: 'Documents filed the same day they are received. Emergency 2-hour filing available when you are up against a statute of limitations or court-imposed deadline.' },
      { title: 'Four-County Coverage', description: 'We file at Riverside Superior Court (Main & Southwest), San Bernardino, Orange County, and Los Angeles Superior Court locations. Other courts available on request.' },
      { title: 'Conformed Copies Same Day', description: 'Conformed copies are scanned and uploaded to your portal the same day. Physical copies available for pickup or delivery the next business day.' },
      { title: 'Every Filing Type', description: 'Complaints, motions, responses, unlawful detainers, probate filings, family law, small claims, and more. If the clerk accepts it, we file it.' },
    ],
    faqs: [
      { question: 'Which courthouses do you cover?', answer: 'We file at Riverside Superior Court (Main and Southwest Justice Center), San Bernardino Superior Court, Orange County Superior Court, and Los Angeles Superior Court. Additional courts available upon request.' },
      { question: 'How do I get my conformed copies back?', answer: 'Conformed copies are scanned and uploaded to your client portal the same day filing is completed. Physical copies can be mailed or picked up from our office the next business day.' },
      { question: 'What if the court rejects my filing?', answer: 'We notify you immediately with the clerk\'s specific reason for rejection. We will re-file corrected documents at no additional courier fee — you only pay any new court filing fees that apply.' },
      { question: 'Do you handle e-filing?', answer: 'We specialize in over-the-counter courthouse filings. For courts that require mandatory e-filing, we can assist with submission through approved e-filing service providers.' },
    ],
  },
  'legal-document-service': {
    seoSlug: 'legal-document-service',
    dbSlug: 'legal-document-service',
    headline: 'Court-Ready Documents. Prepared Right the First Time.',
    tagline: 'Registered Legal Document Assistants preparing Judicial Council forms and legal filings for self-represented litigants, property managers, and small business owners. Unlawful detainers, small claims, family law, and civil complaints — accurately formatted and ready to file.',
    metaTitle: 'Legal Document Preparation — Registered LDA | Left Right Serve & Sign Pros',
    metaDescription: 'Legal document preparation by registered LDAs in Riverside, CA. Unlawful detainer packages, small claims, divorce, name change, and family law forms. Court-ready and rejection-proof.',
    features: [
      { title: 'County-Registered LDA', description: 'Our legal document assistants are registered with the county as required by California Business & Professions Code §6400. Professional, compliant, and accountable.' },
      { title: 'Unlawful Detainer Specialists', description: 'Complete UD packages including 3-day notices, complaints, summons, and proof of service forms — built for landlords, property managers, and their attorneys.' },
      { title: 'Rejection-Proof Formatting', description: 'All documents use current Judicial Council forms, properly formatted and compliant with local court rules. We reduce rejection risk so your filings move forward.' },
      { title: 'Draft Review Before Filing', description: 'We prepare a draft for your review and approval before finalizing. You verify every detail before the documents are filed — no surprises.' },
    ],
    faqs: [
      { question: 'Are you attorneys? Do you provide legal advice?', answer: 'No. We are Registered Legal Document Assistants (LDAs) who prepare legal forms at the direction of self-represented litigants, as permitted under California law. We do not provide legal advice, representation, or case strategy.' },
      { question: 'What types of documents do you prepare?', answer: 'Unlawful detainer (eviction) packages, small claims complaints, answers to complaints, name changes, divorce petitions, child support modifications, fee waivers, proofs of service, and other Judicial Council forms.' },
      { question: 'How long does document preparation take?', answer: 'Most documents are prepared within 1–3 business days. We provide a draft for your review before finalizing. Rush preparation is available for urgent matters.' },
      { question: 'Can you also file the documents at court?', answer: 'Yes. We offer court courier and filing services as a bundled option. We prepare your documents and file them at the courthouse — one order, one team, no coordination headaches.' },
    ],
  },
}

export function getServicePageData(seoSlug: string): ServicePageData | null {
  return SERVICE_PAGES[seoSlug] || null
}

export function getAllServiceSlugs(): string[] {
  return Object.keys(SERVICE_PAGES)
}
