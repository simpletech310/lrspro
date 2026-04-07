import { Navbar } from '@/components/marketing/Navbar'
import { Hero } from '@/components/marketing/Hero'
import { ServicesStrip } from '@/components/marketing/ServicesStrip'
import { HowItWorks } from '@/components/marketing/HowItWorks'
import { TrustSection } from '@/components/marketing/TrustSection'
import { Testimonials } from '@/components/marketing/Testimonials'
import { CTABanner } from '@/components/marketing/CTABanner'
import { Footer } from '@/components/marketing/Footer'
import { getSectionContent } from '@/lib/cms'

export const revalidate = 3600

export default async function HomePage() {
  const heroContent = await getSectionContent('hero')

  return (
    <>
      <Navbar />
      <Hero
        tagline={heroContent.tagline}
        headline={heroContent.headline}
        description={heroContent.description}
        stats={heroContent.stats}
        badges={heroContent.badges}
      />

      <ServicesStrip />

      <HowItWorks />

      <TrustSection />

      <Testimonials />

      <CTABanner />
      <Footer />
    </>
  )
}
