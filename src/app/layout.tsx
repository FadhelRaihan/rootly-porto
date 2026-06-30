import './globals.css'
import { Metadata } from 'next'
import { Inria_Serif, Inter } from 'next/font/google'
import { SmoothScroll } from '@/components/public/shared/smooth-scroll'
import Script from 'next/script'
import { ThemeProvider } from '@/context/theme-provider'
import { LanguageProvider } from '@/context/language-context'
import { getServerTranslation } from '@/lib/i18n-server'

const inriaSerif = Inria_Serif({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-inria',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://rootly-self.vercel.app/'),
  title: {
    default: 'Rootly — Software House',
    template: '%s | Rootly',
  },
  description: 'We build resilient digital products designed to last. Crafted with software-craftsmanship care and rooted in quality.',
  openGraph: {
    title: 'Rootly — Software House',
    description: 'We build resilient digital products designed to last. Crafted with software-craftsmanship care and rooted in decentralized values.',
    url: 'https://rootly.id',
    siteName: 'Rootly',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Rootly — Technology with Roots',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rootly — Software House',
    description: 'We build resilient digital products designed to last. Crafted with software-craftsmanship care and rooted in quality.',
    images: ['/og-image.png'],
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { language } = await getServerTranslation()

  return (
    <html lang={language} className={`${inriaSerif.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://cloud.umami.is" />
        <meta name="google-site-verification" content="2i6J4tfcd3A-Qt-saIWFFcVZTZE4yb01njXGxGcQae0" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var isAdmin = window.location.pathname.startsWith('/admin');
                var hasSeenLoader = sessionStorage.getItem('rootly_boot_sequence_complete');
                if (!isAdmin && !hasSeenLoader) {
                  document.documentElement.classList.add('boot-active');
                  
                  // Inject style immediately to force dark background & hide content before stylesheet loads
                  var style = document.createElement('style');
                  style.id = 'boot-theme-style';
                  style.innerHTML = 'html, body { background-color: #0E0E0D !important; color: #F0EFEB !important; } #app-content { display: none !important; }';
                  document.head.appendChild(style);
                } else {
                  document.documentElement.classList.add('boot-bypassed');
                  
                  // Hide the loading screen immediately to prevent any flash on returning visits
                  var style = document.createElement('style');
                  style.id = 'boot-hide-loader';
                  style.innerHTML = '#rootly-full-boot { display: none !important; }';
                  document.head.appendChild(style);
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body>
        <Script 
          src="https://cloud.umami.is/script.js" 
          data-website-id="0979ed4e-390b-4fbc-a4b6-50686f64232b"
          strategy="afterInteractive"
        />
        <LanguageProvider initialLanguage={language}>
          <ThemeProvider>
            <SmoothScroll>
              {children}
            </SmoothScroll>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
