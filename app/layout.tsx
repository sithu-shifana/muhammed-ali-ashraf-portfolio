import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Cinzel, Inter } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
})

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-cinzel',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://muhammed-ali-ashraf.vercel.app'),
  title: 'Muhammed Ali Ashraf — Mentalist · Hypnotist · Magician',
  description:
    'The art of making the impossible feel real. Muhammed Ali Ashraf is a mentalist, hypnotist and magician based in Bangalore — mind-reading, sleight of hand and psychological illusion.',
  generator: 'v0.app',
  openGraph: {
    title: 'Muhammed Ali Ashraf — Mentalist · Hypnotist · Magician',
    description: 'The art of making the impossible feel real. Based in Bangalore.',
    images: ['/images/hero.png'],
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#050408',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${cinzel.variable} ${inter.variable}`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
