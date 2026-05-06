import './globals.css'
import { Metadata } from 'next'

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
    <html lang="id">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
