'use client'

import React, { createContext, useContext, useState } from 'react'
import { useRouter } from 'next/navigation'

export type Language = 'id' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const translations: Record<Language, Record<string, string>> = {
  id: {
    'nav.home': 'Beranda',
    'nav.about': 'Tentang Kami',
    'nav.services': 'Layanan',
    'nav.portfolio': 'Portofolio',
    'nav.process': 'Proses Kerja',
    'nav.contact': 'Kontak',
    'nav.startProject': 'Mulai Proyek',
    // Hero Section
    'hero.title': 'Teknologi yang Berakar.',
    'hero.titlePart1': 'Teknologi dengan ',
    'hero.titlePart2': 'Roots.',
    'hero.subtitle': 'Kami membangun produk digital yang bernilai — dirancang untuk bertahan lama, dibuat dengan sepenuh hati, dan berakar pada kemitraan yang jujur.',
    'hero.ctaStart': 'Mulai Proyek',
    'hero.ctaWork': 'Lihat Portofolio',
    // Trust Bar
    'trust.title': 'Dipercaya oleh perusahaan inovatif',
    // Services Section
    'services.title': 'Layanan Kami',
    'services.subtitle': 'Kami fokus membangun perangkat lunak yang memecahkan masalah nyata dan bertahan bertahun-tahun, bukan hanya beberapa minggu.',
    'services.learnMore': 'Pelajari selengkapnya',
    // Featured Projects
    'featured.title': 'Karya Pilihan',
    'featured.subtitle': 'Proyek-proyek yang kami banggakan',
    'featured.viewAll': 'Lihat semua proyek',
    // Why Choose Us
    'why.title': 'Mengapa Rootly?',
    'why.subtitle': 'Kami berbeda dari agensi biasa. Inilah yang menggerakkan kami.',
    'why.grounded': 'Membumi',
    'why.groundedDesc': 'Kami membangun perangkat lunak yang memecahkan masalah nyata, bukan hanya fitur yang terlihat mengesankan.',
    'why.purposeful': 'Berorientasi Tujuan',
    'why.purposefulDesc': 'Setiap baris kode memiliki tujuan yang jelas dan memberikan nilai yang terukur.',
    'why.warmth': 'Hangat',
    'why.warmthDesc': 'Kami berkomunikasi dengan jujur dan memperlakukan proyek Anda seperti proyek kami sendiri.',
    'why.long': 'Tahan Lama',
    'why.longDesc': 'Kami membangun untuk jangka panjang, bukan kemenangan cepat yang mudah rusak di kemudian hari.',
    // Testimonials
    'testimonials.title': 'Apa Kata Klien Kami',
    // CTA Section
    'cta.title': 'Siap membangun sesuatu yang berarti?',
    'cta.subtitle': 'Mari kami bantu mewujudkan ide Anda menjadi produk digital yang benar-benar bermanfaat.',
    'cta.btn': 'Mulai Percakapan',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.portfolio': 'Portfolio',
    'nav.process': 'Process',
    'nav.contact': 'Contact',
    'nav.startProject': 'Start a Project',
    // Hero Section
    'hero.title': 'Technology with Roots.',
    'hero.titlePart1': 'Technology with ',
    'hero.titlePart2': 'Roots.',
    'hero.subtitle': 'We build digital products that matter — designed to last, crafted with care, and rooted in honest partnership.',
    'hero.ctaStart': 'Start a Project',
    'hero.ctaWork': 'View Our Work',
    // Trust Bar
    'trust.title': 'Trusted by innovative companies',
    // Services Section
    'services.title': 'What We Do',
    'services.subtitle': 'We focus on building software that solves real problems and lasts for years, not just weeks.',
    'services.learnMore': 'Learn more',
    // Featured Projects
    'featured.title': 'Featured Work',
    'featured.subtitle': 'Projects we are proud of',
    'featured.viewAll': 'View all projects',
    // Why Choose Us
    'why.title': 'Why Rootly?',
    'why.subtitle': 'We are different from typical agencies. Here is what drives us.',
    'why.grounded': 'Grounded',
    'why.groundedDesc': 'We build software that solves actual problems, not just impressive-looking features.',
    'why.purposeful': 'Purposeful',
    'why.purposefulDesc': 'Every line of code serves a clear purpose and delivers measurable value.',
    'why.warmth': 'Warmth',
    'why.warmthDesc': 'We communicate honestly and treat your project like it is our own.',
    'why.long': 'Long-lasting',
    'why.longDesc': 'We build for the long term, not quick wins that break later.',
    // Testimonials
    'testimonials.title': 'What Our Clients Say',
    // CTA Section
    'cta.title': 'Ready to build something meaningful?',
    'cta.subtitle': 'Let us help you turn your idea into a digital product that truly works.',
    'cta.btn': 'Start a Conversation',
  }
}

export function LanguageProvider({ 
  children, 
  initialLanguage = 'id' 
}: { 
  children: React.ReactNode
  initialLanguage?: Language 
}) {
  const router = useRouter()
  const [language, setLanguageState] = useState<Language>(initialLanguage)

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('rootly_lang', lang)
    // Set cookie so that server components can read it
    document.cookie = `rootly_lang=${lang}; path=/; max-age=31536000; SameSite=Lax`
    
    // Refresh the router so Server Components fetch with the new language cookie
    router.refresh()
  }

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['id']?.[key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider')
  }
  return context
}
