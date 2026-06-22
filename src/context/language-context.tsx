'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { translations, Language } from '@/lib/translations'

export type { Language }

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ 
  children, 
  initialLanguage = 'id' 
}: { 
  children: React.ReactNode
  initialLanguage?: Language 
}) {
  const router = useRouter()
  const [language, setLanguageState] = useState<Language>(initialLanguage)

  useEffect(() => {
    const stored = localStorage.getItem('rootly_lang') as Language | null
    if (stored && stored !== language) {
      setLanguageState(stored)
    }
  }, [])

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
