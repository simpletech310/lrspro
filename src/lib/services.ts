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
    headline: 'Process Serving in Riverside County',
    tagline: 'Licensed process servers delivering personal, substituted, and sub-service throughout Riverside County and Greater SoCal. GPS-verified. Court-ready affidavits.',
    metaTitle: 'Process Serving Riverside CA | Licensed Servers | Left Right Serve & Sign Pros',
    metaDescription: 'Professional process serving in Riverside County. Personal service, sub-service, and service by posting. GPS-documented attempts with court-ready affidavits. Rush and same-day available.',
    features: [
      { title: 'GPS-Verified Attempts', description: 'Every service attempt is logged with GPS coordinates, timestamps, and photographic evidence for court-admissible documentation.' },
      { title: 'Court-Ready Affidavits', description: 'We prepare California POS-010 Proof of Service forms and detailed affidavits that meet all CCP requirements.' },
      { title: 'Real-Time Tracking', description: 'Track every attempt in your client portal. Receive instant notifications when service is completed or a new attempt is logged.' },
      { title: 'Rush & Same-Day', description: 'Standard service within 1-5 business days. Rush 24-hour and same-day emergency options available for time-sensitive matters.' },
    ],
    faqs: [
      { question: 'How many attempts will you make?', answer: 'We make up to 3 attempts at different times of day before recommending alternative service methods. Each attempt is fully documented with GPS coordinates and timestamps.' },
      { question: 'What if the subject cannot be located?', answer: 'If we cannot locate the subject after diligent attempts, we provide a Declaration of Due Diligence that can be filed with the court to pursue alternative service methods such as service by publication.' },
      { question: 'What areas do you cover?', answer: 'We serve throughout Riverside County, San Bernardino County, Orange County, and the greater Los Angeles metro area. Statewide service is available for rush orders.' },
      { question: 'How quickly can you start?', answer: 'Standard orders are assigned within 24 hours. Rush orders are assigned immediately and attempted within 24 hours. Same-day emergency service is available for time-critical matters.' },
    ],
  },
  'mobile-notary-riverside-ca': {
    seoSlug: 'mobile-notary-riverside-ca',
    dbSlug: 'notary',
    headline: 'Mobile Notary Services in Riverside',
    tagline: 'California-commissioned mobile notary and certified loan signing agent. We come to you — homes, offices, hospitals, or any location in the Inland Empire.',
    metaTitle: 'Mobile Notary Riverside CA | Loan Signing Agent | Left Right Serve & Sign Pros',
    metaDescription: 'Mobile notary public in Riverside CA. General notarizations, loan signings, apostilles, and after-hours service. We travel to you. Same-day appointments available.',
    features: [
      { title: 'We Come to You', description: 'Mobile service to your home, office, hospital, care facility, or any convenient location throughout the Inland Empire and Greater SoCal.' },
      { title: 'Loan Signing Agent', description: 'Certified NNA loan signing agent experienced with refinances, purchases, reverse mortgages, and HELOC packages from all major title companies.' },
      { title: 'Same-Day Appointments', description: 'Book a same-day or next-day appointment. Emergency and after-hours notarizations available for urgent legal matters.' },
      { title: 'All Document Types', description: 'Deeds of trust, grant deeds, powers of attorney, trust documents, affidavits, jurats, acknowledgments, and more.' },
    ],
    faqs: [
      { question: 'What ID do I need for notarization?', answer: 'You will need a current, government-issued photo ID such as a driver\'s license, passport, or state ID card. The name on your ID must match the name on the documents being notarized.' },
      { question: 'Can you notarize at a hospital or jail?', answer: 'Yes, we regularly perform mobile notarizations at hospitals, nursing homes, rehabilitation centers, and correctional facilities. Additional travel fees may apply.' },
      { question: 'How many documents can be notarized in one visit?', answer: 'There is no limit on the number of documents notarized per visit. Our base price covers standard notarizations; loan signing packages are priced separately.' },
      { question: 'Do you handle loan signings?', answer: 'Yes, we are a certified NNA loan signing agent with experience handling packages from Fidelity, First American, Chicago Title, and all major lenders.' },
    ],
  },
  'skip-trace': {
    seoSlug: 'skip-trace',
    dbSlug: 'skip-trace',
    headline: 'Skip Trace & People Locate Services',
    tagline: 'FCRA and DPPA-compliant skip tracing using proprietary databases, public records, and professional investigative networks to locate individuals and verify addresses.',
    metaTitle: 'Skip Trace Services | People Locate | Left Right Serve & Sign Pros',
    metaDescription: 'Professional skip trace and people locate services. FCRA/DPPA compliant. Find current addresses, phone numbers, employers, and relatives. 2-5 business day turnaround.',
    features: [
      { title: 'Comprehensive Database Search', description: 'We search proprietary databases, public records, credit header data, utility records, and social media to locate your subject.' },
      { title: 'FCRA & DPPA Compliant', description: 'All searches are conducted in full compliance with the Fair Credit Reporting Act and Driver\'s Privacy Protection Act.' },
      { title: 'Two Service Tiers', description: 'Basic tier provides current address and phone. Enhanced tier includes full profile with employer, relatives, vehicles, and known associates.' },
      { title: 'Pairs with Process Serving', description: 'Skip trace results feed directly into our process serving workflow. Locate and serve in one seamless operation.' },
    ],
    faqs: [
      { question: 'What information do you need to start?', answer: 'At minimum, we need the subject\'s full name. Date of birth, last known address, phone number, or SSN greatly improve results. The more information you provide, the faster and more accurate the search.' },
      { question: 'What is the difference between Basic and Enhanced?', answer: 'Basic ($75) returns current address and phone number. Enhanced ($149) includes a full profile: current and previous addresses, phone numbers, employer, relatives, associates, vehicles, and property records.' },
      { question: 'How long does a skip trace take?', answer: 'Most searches are completed within 2-5 business days. Rush service is available for an additional fee and returns results within 24-48 hours.' },
      { question: 'What if the subject cannot be found?', answer: 'If our search does not produce actionable results, we provide a detailed report of all databases and methods used. We offer a partial refund or credit toward future services.' },
    ],
  },
  'court-courier-filing': {
    seoSlug: 'court-courier-filing',
    dbSlug: 'court-courier',
    headline: 'Court Courier & Filing Services',
    tagline: 'Same-day court filing and document delivery at Riverside, San Bernardino, Orange County, and Los Angeles courthouses. Conformed copies returned same day.',
    metaTitle: 'Court Courier & Filing Service | Same Day | Left Right Serve & Sign Pros',
    metaDescription: 'Same-day court filing and courier service in Riverside, San Bernardino, Orange, and LA counties. Document filing, conformed copies, and courthouse research.',
    features: [
      { title: 'Same-Day Filing', description: 'Documents filed the same day they are received. Emergency 2-hour filing available for time-critical deadlines.' },
      { title: 'Multiple Courthouses', description: 'We file at Riverside Superior Court (Main & Southwest), San Bernardino, Orange County, and Los Angeles Superior Court locations.' },
      { title: 'Conformed Copies Returned', description: 'Conformed copies are scanned and uploaded to your portal the same day, with physical copies available for pickup or delivery.' },
      { title: 'All Filing Types', description: 'Complaints, motions, responses, unlawful detainers, probate filings, family law, small claims, and more.' },
    ],
    faqs: [
      { question: 'What courts do you cover?', answer: 'We file at Riverside Superior Court (Main and Southwest Justice Center), San Bernardino Superior Court, Orange County Superior Court, and Los Angeles Superior Court. Other courts available upon request.' },
      { question: 'How do I get my conformed copies?', answer: 'Conformed copies are scanned and uploaded to your client portal the same day filing is completed. Physical copies can be mailed or picked up at our office.' },
      { question: 'What if the court rejects my filing?', answer: 'If a filing is rejected, we immediately notify you with the clerk\'s reason for rejection. We will re-file corrected documents at no additional courier fee — you only pay any new court filing fees.' },
      { question: 'Do you handle e-filing?', answer: 'We specialize in over-the-counter courthouse filings. For courts that require e-filing, we can assist with submission through approved e-filing service providers.' },
    ],
  },
  'legal-document-service': {
    seoSlug: 'legal-document-service',
    dbSlug: 'legal-document-service',
    headline: 'Legal Document Preparation',
    tagline: 'Registered Legal Document Assistants (LDA) preparing court forms for self-represented litigants. Unlawful detainers, small claims, family law, and more.',
    metaTitle: 'Legal Document Preparation | LDA Services | Left Right Serve & Sign Pros',
    metaDescription: 'Legal document preparation by registered LDAs in Riverside CA. Unlawful detainer, small claims, divorce, name change, and family law forms prepared accurately.',
    features: [
      { title: 'Registered LDA', description: 'Our legal document assistants are registered with the county as required by California Business & Professions Code §6400. Professional, compliant service.' },
      { title: 'Unlawful Detainer Specialists', description: 'We prepare complete UD packages including 3-day notices, complaints, summons, and proof of service forms for landlords and property managers.' },
      { title: 'Court-Ready Forms', description: 'All documents use current Judicial Council forms, properly formatted and ready for filing. Reduces rejection risk and saves you time.' },
      { title: 'Draft Review Process', description: 'We prepare a draft for your review before finalizing. You approve the documents before they are filed, ensuring accuracy.' },
    ],
    faqs: [
      { question: 'Are you attorneys?', answer: 'No, we are not attorneys and do not provide legal advice. We are Registered Legal Document Assistants (LDAs) who prepare legal forms at the direction of self-represented litigants, as permitted under California law.' },
      { question: 'What types of documents do you prepare?', answer: 'We prepare unlawful detainer (eviction) packages, small claims complaints, answers to complaints, name changes, divorce petitions, child support modifications, fee waivers, and proofs of service.' },
      { question: 'How long does document preparation take?', answer: 'Most documents are prepared within 1-3 business days. We provide a draft for your review before finalizing. Rush preparation is available for urgent matters.' },
      { question: 'Can you also file the documents?', answer: 'Yes! We offer court courier and filing services. We can prepare your documents and file them at the courthouse as a bundled service for maximum convenience.' },
    ],
  },
}

export function getServicePageData(seoSlug: string): ServicePageData | null {
  return SERVICE_PAGES[seoSlug] || null
}

export function getAllServiceSlugs(): string[] {
  return Object.keys(SERVICE_PAGES)
}
