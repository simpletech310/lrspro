import { createClient } from '@/lib/supabase/server'

// ============================================================
// Site Content
// ============================================================

const CONTENT_DEFAULTS: Record<string, Record<string, any>> = {
  hero: {
    tagline: 'San Bernardino & Riverside Counties',
    headline: 'Your Cases Move. Your Deadlines Don\'t.',
    description: 'Attorneys, paralegals, and real estate professionals across Southern California trust us to serve papers, notarize documents, and locate subjects — on time, every time. Create your account and place your first order in under five minutes.',
    stats: [{ number: '500+', label: 'Cases' }, { number: '< 24hr', label: 'Rush' }, { number: '99%', label: 'Service Rate' }, { number: '4', label: 'Counties' }],
    badges: [{ label: 'Licensed & Bonded' }, { label: 'Same-Day Rush Available' }, { label: '4-County Coverage' }],
  },
  how_it_works: {
    tagline: 'From Order to Affidavit',
    heading: 'Three Steps. Total Transparency.',
    description: 'No phone tag. No wondering where your case stands. Place your order online, and we handle the rest — with full documentation at every stage.',
    steps: [
      { num: '01', title: 'Create Your Free Account', desc: 'Sign up in seconds with your name and email. Your secure client portal is ready immediately — no setup fees, no commitments.' },
      { num: '02', title: 'Place Your Order & Pay Securely', desc: 'Select a service, fill out the case details, and complete your secure payment. Your order is confirmed instantly and assigned to a licensed professional.' },
      { num: '03', title: 'We Execute. You Track Everything.', desc: 'Follow every step from your portal — real-time status updates, service attempt logs, GPS-verified documentation. Download court-ready affidavits the moment your case closes.' },
    ],
  },
  testimonials: {
    tagline: 'From Our Clients',
    heading: 'Trusted by Legal Professionals Across Southern California',
    items: [
      { quote: 'We switched to Left Right Serve after years of missed deadlines with another firm. The real-time portal alone saves our paralegals hours each week — and the affidavits are always court-ready without a single revision.', author: 'Maria R.', role: 'Managing Partner, Family Law', firm: 'Riverside, CA' },
      { quote: 'I handle unlawful detainer cases on tight timelines. When I need same-day service, LRS delivers. Their skip trace service located a defendant we\'d been chasing for three months — in 48 hours.', author: 'James T.', role: 'Real Estate Litigation Attorney', firm: 'Corona, CA' },
      { quote: 'As an escrow officer, I need notary signings done correctly and on schedule. Left Right Serve has been our go-to for over a year — professional, thorough, and never once late to a closing.', author: 'Sandra K.', role: 'Senior Escrow Officer', firm: 'Moreno Valley, CA' },
    ],
  },
  trust_section: {
    tagline: 'Built for the Standard You Practice',
    heading: 'Why Firms Choose Left Right Serve',
    description: 'When your client\'s case depends on proper service, you need a team that treats every filing deadline like their own.',
    items: [
      { icon: 'Shield', title: 'Licensed, Bonded & Insured', desc: 'Every process server on our team is registered with the State of California, bonded, and carries full E&O coverage. Your cases are in qualified hands.' },
      { icon: 'Eye', title: 'Real-Time Case Tracking', desc: 'Log into your portal day or night to check the status of every case. No more calling the office. No more waiting for callbacks.' },
      { icon: 'FileCheck', title: 'Court-Ready Documentation', desc: 'Affidavits of service, proof of diligent search, and all supporting documents are prepared to meet California court standards — delivered digitally within hours of completion.' },
      { icon: 'Clock', title: 'GPS-Verified Attempts', desc: 'Every service attempt is logged with date, time, GPS coordinates, photos, and outcome. Bulletproof records that hold up under judicial scrutiny.' },
    ],
  },
  cta_banner: {
    heading: 'Your Next Case Doesn\'t Have to Wait.',
    description: 'Create your free account, place your order, and let us handle the legwork. Same-day rush service available for urgent filings and service of process.',
  },
  footer: {
    description: 'Licensed process servers, certified notaries, and legal support professionals proudly serving the Inland Empire and Greater Southern California.',
  },
}

export async function getSiteContent(section: string, key: string): Promise<any> {
  try {
    const supabase = createClient()
    const { data } = await supabase
      .from('site_content')
      .select('value')
      .eq('section', section)
      .eq('key', key)
      .single()

    if (data?.value !== undefined) return data.value
  } catch {}

  return CONTENT_DEFAULTS[section]?.[key] ?? null
}

export async function getSectionContent(section: string): Promise<Record<string, any>> {
  try {
    const supabase = createClient()
    const { data } = await supabase
      .from('site_content')
      .select('key, value')
      .eq('section', section)

    if (data && data.length > 0) {
      const result: Record<string, any> = {}
      data.forEach(row => { result[row.key] = row.value })
      return result
    }
  } catch {}

  return CONTENT_DEFAULTS[section] ?? {}
}

// ============================================================
// Services
// ============================================================

export interface ActiveService {
  id: string
  slug: string
  name: string
  short_description: string
  icon_name: string
  base_price: number
  is_active: boolean
  sort_order: number
}

export async function getActiveServices(): Promise<ActiveService[]> {
  try {
    const supabase = createClient()
    const { data } = await supabase
      .from('services')
      .select('id, slug, name, short_description, icon_name, base_price, is_active, sort_order')
      .eq('is_active', true)
      .order('sort_order')

    if (data && data.length > 0) return data
  } catch {}

  return []
}

// ============================================================
// Service Pages (SEO content)
// ============================================================

export interface ServicePageData {
  seoSlug: string
  headline: string
  tagline: string
  metaTitle: string
  metaDescription: string
  features: { title: string; description: string }[]
  faqs: { question: string; answer: string }[]
  dbSlug: string
}

export async function getServicePageData(seoSlug: string): Promise<ServicePageData | null> {
  try {
    const supabase = createClient()
    const { data } = await supabase
      .from('service_pages')
      .select('*, services!inner(slug)')
      .eq('seo_slug', seoSlug)
      .single()

    if (data) {
      return {
        seoSlug: data.seo_slug,
        headline: data.headline,
        tagline: data.tagline,
        metaTitle: data.meta_title,
        metaDescription: data.meta_description,
        features: data.features as { title: string; description: string }[],
        faqs: data.faqs as { question: string; answer: string }[],
        dbSlug: (data.services as any).slug,
      }
    }
  } catch {}

  // Fallback to hardcoded data
  const { getServicePageData: getFallback } = await import('@/lib/services')
  return getFallback(seoSlug)
}

export async function getAllServiceSlugs(): Promise<string[]> {
  try {
    const supabase = createClient()
    const { data } = await supabase
      .from('service_pages')
      .select('seo_slug')

    if (data && data.length > 0) return data.map(d => d.seo_slug)
  } catch {}

  const { getAllServiceSlugs: getFallback } = await import('@/lib/services')
  return getFallback()
}

// ============================================================
// Site Images
// ============================================================

const IMAGE_DEFAULTS: Record<string, { url: string; alt: string }> = {
  logo: { url: '/images/logo.png', alt: 'Left Right Serve & Sign Pros' },
  badge: { url: '/images/badge.png', alt: 'Authorized Process Server Badge' },
  hero_image: { url: '/images/process-serving.png', alt: 'Process Serving & Eviction Notice Delivery' },
  about_photo: { url: '/images/investigator.png', alt: 'Professional investigation services' },
  gavel: { url: '/images/gavel.png', alt: 'Legal services' },
  process_serving: { url: '/images/process-serving.png', alt: 'Process serving services' },
}

export async function getSiteImage(slot: string): Promise<{ url: string; alt: string }> {
  try {
    const supabase = createClient()
    const { data } = await supabase
      .from('site_images')
      .select('storage_path, alt_text')
      .eq('slot', slot)
      .single()

    if (data) {
      const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/site-images/${data.storage_path}`
      return { url, alt: data.alt_text || '' }
    }
  } catch {}

  return IMAGE_DEFAULTS[slot] ?? { url: '/images/logo.png', alt: '' }
}
