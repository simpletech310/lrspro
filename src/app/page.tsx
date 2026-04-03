import { Navbar } from '@/components/marketing/Navbar'
import { Hero } from '@/components/marketing/Hero'
import { ServicesStrip } from '@/components/marketing/ServicesStrip'
import { HowItWorks } from '@/components/marketing/HowItWorks'
import { TrustSection } from '@/components/marketing/TrustSection'
import { Testimonials } from '@/components/marketing/Testimonials'
import { CTABanner } from '@/components/marketing/CTABanner'
import { Footer } from '@/components/marketing/Footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <ServicesStrip />
      <HowItWorks />
      <TrustSection />
      <Testimonials />
      <CTABanner />
      <Footer />
    </>
  )
}