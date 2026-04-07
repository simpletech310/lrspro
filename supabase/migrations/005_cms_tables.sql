-- ============================================================
-- CMS Tables: service_pages, site_content, site_images
-- ============================================================

-- SERVICE PAGES: SEO/marketing content for each service detail page
CREATE TABLE IF NOT EXISTS service_pages (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id       UUID REFERENCES services(id) ON DELETE CASCADE NOT NULL,
  seo_slug         TEXT UNIQUE NOT NULL,
  headline         TEXT NOT NULL,
  tagline          TEXT NOT NULL,
  meta_title       TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  features         JSONB NOT NULL DEFAULT '[]',
  faqs             JSONB NOT NULL DEFAULT '[]',
  created_at       TIMESTAMPTZ DEFAULT now(),
  updated_at       TIMESTAMPTZ DEFAULT now()
);

CREATE TRIGGER set_service_pages_updated_at
  BEFORE UPDATE ON service_pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- SITE CONTENT: key-value store for page section content
CREATE TABLE IF NOT EXISTS site_content (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section    TEXT NOT NULL,
  key        TEXT NOT NULL,
  value      JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(section, key)
);

CREATE TRIGGER set_site_content_updated_at
  BEFORE UPDATE ON site_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- SITE IMAGES: tracks uploaded marketing images
CREATE TABLE IF NOT EXISTS site_images (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slot         TEXT UNIQUE NOT NULL,
  storage_path TEXT NOT NULL,
  alt_text     TEXT DEFAULT '',
  uploaded_at  TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- RLS Policies
-- ============================================================

ALTER TABLE service_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_images ENABLE ROW LEVEL SECURITY;

-- service_pages: public read, admin write
CREATE POLICY "service_pages_select_all" ON service_pages FOR SELECT USING (true);
CREATE POLICY "service_pages_write_admin" ON service_pages FOR ALL USING (is_admin());

-- site_content: public read, admin write
CREATE POLICY "site_content_select_all" ON site_content FOR SELECT USING (true);
CREATE POLICY "site_content_write_admin" ON site_content FOR ALL USING (is_admin());

-- site_images: public read, admin write
CREATE POLICY "site_images_select_all" ON site_images FOR SELECT USING (true);
CREATE POLICY "site_images_write_admin" ON site_images FOR ALL USING (is_admin());

-- ============================================================
-- Seed service_pages from existing SERVICE_PAGES data
-- ============================================================

INSERT INTO service_pages (service_id, seo_slug, headline, tagline, meta_title, meta_description, features, faqs)
SELECT
  s.id,
  'process-serving-riverside-ca',
  'Process Serving That Holds Up in Court.',
  'Licensed process servers delivering personal, substituted, sub-service, and posting across four Southern California counties. Every attempt GPS-verified, timestamped, and photographed — because your case depends on bulletproof service of process.',
  'Process Serving Riverside CA — Licensed, GPS-Verified | Left Right Serve & Sign Pros',
  'Professional process serving in Riverside, San Bernardino, Orange, and LA counties. GPS-documented attempts, court-ready POS-010 affidavits, and same-day rush service. Licensed, bonded, and insured.',
  '[{"title":"GPS-Verified Attempts","description":"Every service attempt is logged with GPS coordinates, timestamps, and photographic evidence — building the court-admissible record your case requires."},{"title":"Court-Ready Affidavits","description":"We prepare California POS-010 Proof of Service forms and detailed affidavits that meet all CCP requirements. Downloaded directly from your portal within 24 hours."},{"title":"Real-Time Portal Tracking","description":"Log into your client portal to track every attempt as it happens. Receive instant notifications when service is completed or a new attempt is logged — no phone calls needed."},{"title":"Rush & Same-Day Options","description":"Standard service within 1–5 business days. Rush 24-hour turnaround and same-day emergency service available when your deadlines cannot wait."}]'::jsonb,
  '[{"question":"How many attempts will you make before recommending alternative service?","answer":"We make up to 3 attempts at different times of day (morning, afternoon, evening) before recommending alternative service methods. Each attempt is fully documented with GPS coordinates, timestamps, and detailed notes about the conditions observed."},{"question":"What happens if the subject cannot be located?","answer":"If we cannot locate the subject after diligent attempts, we provide a Declaration of Due Diligence documenting every effort made. This declaration can be filed with the court to pursue alternative service methods such as service by posting or publication."},{"question":"What areas do you serve?","answer":"We serve throughout Riverside County, San Bernardino County, Orange County, and the greater Los Angeles metro area. Statewide service is available for rush and same-day orders."},{"question":"How quickly can you begin after I place an order?","answer":"Standard orders are assigned to a server within 24 hours. Rush orders are assigned immediately and attempted within 24 hours. Same-day emergency service is available for time-critical matters — place your order and we move."}]'::jsonb
FROM services s WHERE s.slug = 'process-serving'
ON CONFLICT (seo_slug) DO NOTHING;

INSERT INTO service_pages (service_id, seo_slug, headline, tagline, meta_title, meta_description, features, faqs)
SELECT
  s.id,
  'mobile-notary-riverside-ca',
  'A Certified Notary at Your Door — Not the Other Way Around.',
  'California-commissioned mobile notary public and NNA-certified loan signing agent. We travel to homes, offices, hospitals, care facilities, and correctional institutions across the Inland Empire and Greater Southern California.',
  'Mobile Notary Riverside CA — Certified Loan Signing Agent | Left Right Serve & Sign Pros',
  'Mobile notary public and NNA-certified loan signing agent in Riverside, CA. General notarizations, loan closings, apostilles, powers of attorney. Same-day and after-hours appointments available.',
  '[{"title":"We Travel to You","description":"Mobile service to your home, office, hospital, care facility, jail, or any location throughout the Inland Empire and Greater SoCal. You set the place — we show up."},{"title":"NNA-Certified Loan Signing Agent","description":"Experienced with refinances, purchases, reverse mortgages, HELOCs, and modification packages from Fidelity, First American, Chicago Title, and all major lenders and title companies."},{"title":"Same-Day & After-Hours","description":"Book a same-day or next-day appointment through the portal. Emergency and after-hours notarizations available when urgent legal matters cannot wait until morning."},{"title":"Every Document Type","description":"Deeds of trust, grant deeds, powers of attorney, trust certifications, affidavits, jurats, acknowledgments, and more. If it needs a notary seal, we handle it."}]'::jsonb,
  '[{"question":"What identification do I need for a notarization?","answer":"You will need a current, government-issued photo ID such as a California driver''s license, U.S. passport, or state-issued ID card. The name on your ID must match the name on the documents being notarized."},{"question":"Can you notarize at a hospital, nursing home, or jail?","answer":"Yes. We regularly perform mobile notarizations at hospitals, nursing homes, rehabilitation centers, and correctional facilities. Additional travel fees may apply depending on location and facility requirements."},{"question":"Is there a limit on documents per visit?","answer":"No limit. Our base price covers standard notarizations, and you can add as many documents as needed. Loan signing packages are priced separately based on the title company''s requirements."},{"question":"Do you handle loan signings for title companies?","answer":"Yes. We are an NNA-certified loan signing agent with experience handling packages from Fidelity, First American, Chicago Title, Old Republic, Stewart Title, and all major lenders."}]'::jsonb
FROM services s WHERE s.slug = 'notary'
ON CONFLICT (seo_slug) DO NOTHING;

INSERT INTO service_pages (service_id, seo_slug, headline, tagline, meta_title, meta_description, features, faqs)
SELECT
  s.id,
  'skip-trace',
  'Find the People Your Cases Depend On.',
  'Professional skip trace and subject location using FCRA and DPPA-compliant databases, public records, and investigative networks. When you need a current address before you can serve — we find it.',
  'Skip Trace & People Locate Services — FCRA Compliant | Left Right Serve & Sign Pros',
  'Professional skip trace and people locate services for attorneys and law firms. FCRA/DPPA compliant. Current addresses, phone numbers, employers, relatives. 2–5 business day turnaround. Pairs with process serving.',
  '[{"title":"Deep Database Search","description":"We search proprietary investigative databases, credit header data, utility records, public filings, and social footprints to locate your subject with a current, actionable address."},{"title":"FCRA & DPPA Compliant","description":"Every search is conducted in full compliance with the Fair Credit Reporting Act and Driver''s Privacy Protection Act. Professional, lawful, and documented."},{"title":"Two Service Tiers","description":"Basic returns current address and phone. Enhanced includes employer, relatives, associates, vehicles, property records, and prior addresses — the full picture."},{"title":"Seamless Process Serving Integration","description":"Skip trace results feed directly into our process serving workflow. Locate and serve in one operation — no need to juggle multiple vendors."}]'::jsonb,
  '[{"question":"What information do I need to start a skip trace?","answer":"At minimum, the subject''s full legal name. Date of birth, last known address, phone number, or partial SSN greatly improve results and speed. The more you provide, the faster and more accurate the search."},{"question":"What is the difference between Basic and Enhanced tiers?","answer":"Basic ($75) returns a current address and phone number. Enhanced ($149) includes a comprehensive profile: current and previous addresses, phone numbers, employer information, relatives, known associates, vehicle registrations, and property records."},{"question":"How long does a skip trace take?","answer":"Most searches are completed within 2–5 business days. Rush service returns results within 24–48 hours for an additional fee."},{"question":"What if the subject cannot be found?","answer":"If our search does not produce actionable results, we provide a detailed report of all databases and methods used. We offer a partial refund or credit toward future services at our discretion."}]'::jsonb
FROM services s WHERE s.slug = 'skip-trace'
ON CONFLICT (seo_slug) DO NOTHING;

INSERT INTO service_pages (service_id, seo_slug, headline, tagline, meta_title, meta_description, features, faqs)
SELECT
  s.id,
  'court-courier-filing',
  'Your Filing Hits the Clerk''s Desk Today.',
  'Same-day court filing, document retrieval, and courthouse runs at Riverside, San Bernardino, Orange County, and Los Angeles Superior Court locations. Conformed copies scanned and in your portal before end of business.',
  'Court Courier & Filing Service — Same Day | Left Right Serve & Sign Pros',
  'Same-day court filing and courier service across Riverside, San Bernardino, Orange, and LA counties. Document filing, conformed copies, and courthouse research. Emergency 2-hour filing available.',
  '[{"title":"Same-Day Filing","description":"Documents filed the same day they are received. Emergency 2-hour filing available when you are up against a statute of limitations or court-imposed deadline."},{"title":"Four-County Coverage","description":"We file at Riverside Superior Court (Main & Southwest), San Bernardino, Orange County, and Los Angeles Superior Court locations. Other courts available on request."},{"title":"Conformed Copies Same Day","description":"Conformed copies are scanned and uploaded to your portal the same day. Physical copies available for pickup or delivery the next business day."},{"title":"Every Filing Type","description":"Complaints, motions, responses, unlawful detainers, probate filings, family law, small claims, and more. If the clerk accepts it, we file it."}]'::jsonb,
  '[{"question":"Which courthouses do you cover?","answer":"We file at Riverside Superior Court (Main and Southwest Justice Center), San Bernardino Superior Court, Orange County Superior Court, and Los Angeles Superior Court. Additional courts available upon request."},{"question":"How do I get my conformed copies back?","answer":"Conformed copies are scanned and uploaded to your client portal the same day filing is completed. Physical copies can be mailed or picked up from our office the next business day."},{"question":"What if the court rejects my filing?","answer":"We notify you immediately with the clerk''s specific reason for rejection. We will re-file corrected documents at no additional courier fee — you only pay any new court filing fees that apply."},{"question":"Do you handle e-filing?","answer":"We specialize in over-the-counter courthouse filings. For courts that require mandatory e-filing, we can assist with submission through approved e-filing service providers."}]'::jsonb
FROM services s WHERE s.slug = 'court-courier'
ON CONFLICT (seo_slug) DO NOTHING;

INSERT INTO service_pages (service_id, seo_slug, headline, tagline, meta_title, meta_description, features, faqs)
SELECT
  s.id,
  'legal-document-service',
  'Court-Ready Documents. Prepared Right the First Time.',
  'Registered Legal Document Assistants preparing Judicial Council forms and legal filings for self-represented litigants, property managers, and small business owners. Unlawful detainers, small claims, family law, and civil complaints — accurately formatted and ready to file.',
  'Legal Document Preparation — Registered LDA | Left Right Serve & Sign Pros',
  'Legal document preparation by registered LDAs in Riverside, CA. Unlawful detainer packages, small claims, divorce, name change, and family law forms. Court-ready and rejection-proof.',
  '[{"title":"County-Registered LDA","description":"Our legal document assistants are registered with the county as required by California Business & Professions Code §6400. Professional, compliant, and accountable."},{"title":"Unlawful Detainer Specialists","description":"Complete UD packages including 3-day notices, complaints, summons, and proof of service forms — built for landlords, property managers, and their attorneys."},{"title":"Rejection-Proof Formatting","description":"All documents use current Judicial Council forms, properly formatted and compliant with local court rules. We reduce rejection risk so your filings move forward."},{"title":"Draft Review Before Filing","description":"We prepare a draft for your review and approval before finalizing. You verify every detail before the documents are filed — no surprises."}]'::jsonb,
  '[{"question":"Are you attorneys? Do you provide legal advice?","answer":"No. We are Registered Legal Document Assistants (LDAs) who prepare legal forms at the direction of self-represented litigants, as permitted under California law. We do not provide legal advice, representation, or case strategy."},{"question":"What types of documents do you prepare?","answer":"Unlawful detainer (eviction) packages, small claims complaints, answers to complaints, name changes, divorce petitions, child support modifications, fee waivers, proofs of service, and other Judicial Council forms."},{"question":"How long does document preparation take?","answer":"Most documents are prepared within 1–3 business days. We provide a draft for your review before finalizing. Rush preparation is available for urgent matters."},{"question":"Can you also file the documents at court?","answer":"Yes. We offer court courier and filing services as a bundled option. We prepare your documents and file them at the courthouse — one order, one team, no coordination headaches."}]'::jsonb
FROM services s WHERE s.slug = 'legal-document-service'
ON CONFLICT (seo_slug) DO NOTHING;

-- ============================================================
-- Seed site_content with current hardcoded values
-- ============================================================

-- Hero section
INSERT INTO site_content (section, key, value) VALUES
('hero', 'tagline', '"San Bernardino & Riverside Counties"'),
('hero', 'headline', '"Your Cases Move. Your Deadlines Don''t."'),
('hero', 'description', '"Attorneys, paralegals, and real estate professionals across Southern California trust us to serve papers, notarize documents, and locate subjects — on time, every time. Create your account and place your first order in under five minutes."'),
('hero', 'stats', '[{"number":"500+","label":"Cases"},{"number":"< 24hr","label":"Rush"},{"number":"99%","label":"Service Rate"},{"number":"4","label":"Counties"}]'),
('hero', 'badges', '[{"label":"Licensed & Bonded"},{"label":"Same-Day Rush Available"},{"label":"4-County Coverage"}]')
ON CONFLICT (section, key) DO NOTHING;

-- How It Works section
INSERT INTO site_content (section, key, value) VALUES
('how_it_works', 'tagline', '"From Order to Affidavit"'),
('how_it_works', 'heading', '"Three Steps. Total Transparency."'),
('how_it_works', 'description', '"No phone tag. No wondering where your case stands. Place your order online, and we handle the rest — with full documentation at every stage."'),
('how_it_works', 'steps', '[{"num":"01","title":"Create Your Free Account","desc":"Sign up in seconds with your name and email. Your secure client portal is ready immediately — no setup fees, no commitments."},{"num":"02","title":"Place Your Order & Pay Securely","desc":"Select a service, fill out the case details, and complete your secure payment. Your order is confirmed instantly and assigned to a licensed professional."},{"num":"03","title":"We Execute. You Track Everything.","desc":"Follow every step from your portal — real-time status updates, service attempt logs, GPS-verified documentation. Download court-ready affidavits the moment your case closes."}]')
ON CONFLICT (section, key) DO NOTHING;

-- Testimonials section
INSERT INTO site_content (section, key, value) VALUES
('testimonials', 'tagline', '"From Our Clients"'),
('testimonials', 'heading', '"Trusted by Legal Professionals Across Southern California"'),
('testimonials', 'items', '[{"quote":"We switched to Left Right Serve after years of missed deadlines with another firm. The real-time portal alone saves our paralegals hours each week — and the affidavits are always court-ready without a single revision.","author":"Maria R.","role":"Managing Partner, Family Law","firm":"Riverside, CA"},{"quote":"I handle unlawful detainer cases on tight timelines. When I need same-day service, LRS delivers. Their skip trace service located a defendant we''d been chasing for three months — in 48 hours.","author":"James T.","role":"Real Estate Litigation Attorney","firm":"Corona, CA"},{"quote":"As an escrow officer, I need notary signings done correctly and on schedule. Left Right Serve has been our go-to for over a year — professional, thorough, and never once late to a closing.","author":"Sandra K.","role":"Senior Escrow Officer","firm":"Moreno Valley, CA"}]')
ON CONFLICT (section, key) DO NOTHING;

-- Trust section
INSERT INTO site_content (section, key, value) VALUES
('trust_section', 'tagline', '"Built for the Standard You Practice"'),
('trust_section', 'heading', '"Why Firms Choose Left Right Serve"'),
('trust_section', 'description', '"When your client''s case depends on proper service, you need a team that treats every filing deadline like their own."'),
('trust_section', 'items', '[{"icon":"Shield","title":"Licensed, Bonded & Insured","desc":"Every process server on our team is registered with the State of California, bonded, and carries full E&O coverage. Your cases are in qualified hands."},{"icon":"Eye","title":"Real-Time Case Tracking","desc":"Log into your portal day or night to check the status of every case. No more calling the office. No more waiting for callbacks."},{"icon":"FileCheck","title":"Court-Ready Documentation","desc":"Affidavits of service, proof of diligent search, and all supporting documents are prepared to meet California court standards — delivered digitally within hours of completion."},{"icon":"Clock","title":"GPS-Verified Attempts","desc":"Every service attempt is logged with date, time, GPS coordinates, photos, and outcome. Bulletproof records that hold up under judicial scrutiny."}]')
ON CONFLICT (section, key) DO NOTHING;

-- CTA Banner
INSERT INTO site_content (section, key, value) VALUES
('cta_banner', 'heading', '"Your Next Case Doesn''t Have to Wait."'),
('cta_banner', 'description', '"Create your free account, place your order, and let us handle the legwork. Same-day rush service available for urgent filings and service of process."')
ON CONFLICT (section, key) DO NOTHING;

-- About page
INSERT INTO site_content (section, key, value) VALUES
('about', 'hero_heading', '"We Started Because Attorneys Deserved Better."'),
('about', 'hero_description', '"Too many law firms were stuck chasing process servers for updates, dealing with sloppy paperwork, and missing deadlines they couldn''t afford to miss. We built Left Right Serve & Sign Pros to fix that — permanently."'),
('about', 'badge_description', '"Licensed, bonded, and insured — proudly serving San Bernardino and Riverside Counties with reliable process serving, eviction notice delivery, mobile notary, and court courier services."'),
('about', 'mission_paragraphs', '["Left Right Serve & Sign Pros provides reliable process serving, eviction notice delivery, mobile notary, and court courier services throughout San Bernardino and Riverside Counties. We specialize in timely, professional service with same-day and rush options available.","Our goal is to ensure accurate, efficient delivery of legal documents while maintaining clear communication and dependable results for attorneys, property managers, and individuals. Our technology-forward approach means you always know where your case stands — log into your portal, check the status, download your affidavit. No phone calls. No guesswork."]'),
('about', 'values', '[{"icon":"Target","title":"Precision","desc":"Every service attempt documented with GPS coordinates, timestamps, photos, and detailed notes. Our records are built for judicial scrutiny."},{"icon":"Shield","title":"Accountability","desc":"Licensed, bonded, and insured in California. We carry full E&O insurance because your cases deserve qualified hands — not a hired stranger from an app."},{"icon":"Users","title":"Partnership","desc":"We don''t just serve papers. We become an extension of your team — understanding your deadlines, your preferences, and your clients'' needs."},{"icon":"Award","title":"Excellence","desc":"A 99% service completion rate across 500+ cases. Court-ready affidavits delivered within 24 hours. Same-day and rush turnaround when the clock is ticking."}]'),
('about', 'services_list', '["Licensed Process Serving — personal, substituted, sub-service, and posting across Riverside, San Bernardino, Orange, and Los Angeles counties","Certified Mobile Notary & Loan Signing Agent — on-site notarizations for closings, affidavits, powers of attorney, and more","Professional Skip Trace & Subject Location — database-powered searches to locate hard-to-find defendants and respondents","Same-Day Court Courier & Filing — document filing, retrieval, and courthouse runs at Riverside Superior Court and beyond","Legal Document Preparation (LDA Licensed) — civil complaints, responses, family law forms, and landlord/tenant filings"]'),
('about', 'coverage_counties', '["Riverside County","San Bernardino County","Orange County","Los Angeles County"]')
ON CONFLICT (section, key) DO NOTHING;

-- Contact page
INSERT INTO site_content (section, key, value) VALUES
('contact', 'business_hours', '"Mon–Fri: 8am–6pm\nSat: 9am–3pm\nSame-day emergencies: 24/7"')
ON CONFLICT (section, key) DO NOTHING;

-- Footer
INSERT INTO site_content (section, key, value) VALUES
('footer', 'description', '"Licensed process servers, certified notaries, and legal support professionals proudly serving the Inland Empire and Greater Southern California."')
ON CONFLICT (section, key) DO NOTHING;

-- Indexes
CREATE INDEX idx_service_pages_service_id ON service_pages(service_id);
CREATE INDEX idx_site_content_section ON site_content(section);
CREATE INDEX idx_site_images_slot ON site_images(slot);
