import './globals.css'
import { Metadata } from 'next'
import { Inria_Serif } from 'next/font/google'

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
        {children}
      </body>
    </html>
  )
}
