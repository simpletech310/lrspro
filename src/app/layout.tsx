import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'Left Right Serve & Sign Pros | Process Serving & Legal Support — Riverside, CA', template: '%s | Left Right Serve & Sign Pros' },
  description: 'Licensed process serving, mobile notary, skip trace, court courier, and legal document services in Riverside County and Greater SoCal. Real-time tracking. Same-day available.',
  keywords: ['process server Riverside CA', 'mobile notary Riverside', 'skip trace', 'court courier', 'legal document service'],
  openGraph: { type: 'website', locale: 'en_US', url: 'https://lrsservepros.com', siteName: 'Left Right Serve & Sign Pros' },
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