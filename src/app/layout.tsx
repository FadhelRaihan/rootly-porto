import './globals.css'
import { Metadata } from 'next'
import { Inria_Serif } from 'next/font/google'
import { SmoothScroll } from '@/components/public/shared/smooth-scroll'
import Script from 'next/script'

const inriaSerif = Inria_Serif({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-inria',
})

export const metadata: Metadata = {
  title: 'Rootly — Software House',
  description: 'Technology with Roots.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={`${inriaSerif.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="google-site-verification" content="2i6J4tfcd3A-Qt-saIWFFcVZTZE4yb01njXGxGcQae0" />
      </head>
      <body>
        <Script 
          src="https://cloud.umami.is/script.js" 
          data-website-id="0979ed4e-390b-4fbc-a4b6-50686f64232b"
          strategy="afterInteractive"
        />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
