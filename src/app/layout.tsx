import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'Left Right Serve & Sign Pros | Licensed Process Serving & Legal Support — Riverside, CA', template: '%s | Left Right Serve & Sign Pros' },
  description: 'Licensed, bonded, and insured process serving, certified mobile notary, skip trace, court courier, and legal document preparation across Riverside, San Bernardino, Orange, and Los Angeles counties. Real-time GPS tracking. Court-ready affidavits. Same-day rush available.',
  keywords: ['process server Riverside CA', 'mobile notary Riverside', 'skip trace California', 'court courier Riverside', 'legal document preparation', 'process serving Southern California', 'loan signing agent', 'legal support services'],
  metadataBase: new URL('https://lrsservepros.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://lrsservepros.com',
    siteName: 'Left Right Serve & Sign Pros',
    title: 'Left Right Serve & Sign Pros | Licensed Process Serving & Legal Support',
    description: 'Licensed, bonded, and insured legal support professionals trusted by attorneys across Southern California. Process serving, mobile notary, skip trace, court courier, and document prep.',
    images: [{ url: '/og/og-home.png', width: 1792, height: 1024, alt: 'Left Right Serve & Sign Pros — Licensed Legal Support' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Left Right Serve & Sign Pros | Licensed Legal Support',
    description: 'Process serving, mobile notary, skip trace, court courier, and legal document prep across Southern California.',
    images: ['/og/og-home.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://lrsservepros.com' },
}

import { Toaster } from '@/components/ui/toaster'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}