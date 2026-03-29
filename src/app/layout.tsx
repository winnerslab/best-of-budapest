import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Best of Budapest — Local Recommendations from Nightlife Insiders',
  description:
    'Food, nightlife, itineraries, and local favourites — built by 3 locals who work Budapest party boats, prosecco cruises, and pub crawls every week.',
  keywords: 'Budapest, local guide, nightlife Budapest, Budapest restaurants, Budapest itinerary, party boat Budapest',
  openGraph: {
    title: 'Best of Budapest',
    description: 'The Best Budapest Itinerary',
    siteName: 'Best of Budapest',
    locale: 'en_GB',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className="bg-base-black text-text-primary antialiased">
        {children}
      </body>
    </html>
  )
}
