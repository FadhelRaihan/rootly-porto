'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useRouter, usePathname } from 'next/navigation'

interface ThemeTransitionContextType {
  toggleTheme: () => void
  changeLanguage: (lang: 'en' | 'id', actualSetLang: (l: 'en' | 'id') => void) => void
  triggerPageTransition: () => void
  endPageTransition: () => void
  isTransitioning: boolean
  transitionType: 'theme' | 'language' | 'page' | null
  transitionTheme: 'light' | 'dark' | null
  transitionLang: 'en' | 'id' | null
}

const ThemeTransitionContext = createContext<ThemeTransitionContextType | undefined>(undefined)

export function ThemeTransitionProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme, setTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionType, setTransitionType] = useState<'theme' | 'language' | 'page' | null>(null)
  const [transitionTheme, setTransitionTheme] = useState<'light' | 'dark' | null>(null)
  const [transitionLang, setTransitionLang] = useState<'en' | 'id' | null>(null)

  // Bypass all transitions and animations inside the admin dashboard
  const isAdmin = pathname.startsWith('/admin') || pathname.startsWith('/api/admin')

  const toggleTheme = useCallback(() => {
    if (isAdmin) {
      setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
      return
    }

    if (isTransitioning) return

    const targetTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
    setTransitionType('theme')
    setTransitionTheme(targetTheme)
    setIsTransitioning(true)

    // Step 1: Wait for the curtain to close completely (350ms)
    setTimeout(() => {
      // Step 2: Switch the actual next-themes state
      setTheme(targetTheme)

      // Step 3: Hold the curtain closed briefly for style recalculation to finish (150ms)
      setTimeout(() => {
        // Step 4: Open the curtain (350ms animation starts when state goes false)
        setIsTransitioning(false)
        
        // Clean up transition state after animation finishes
        setTimeout(() => {
          setTransitionType(null)
          setTransitionTheme(null)
        }, 350)
      }, 150)
    }, 350)
  }, [resolvedTheme, setTheme, isTransitioning, isAdmin])

  const changeLanguage = useCallback((lang: 'en' | 'id', actualSetLang: (l: 'en' | 'id') => void) => {
    if (isAdmin) {
      actualSetLang(lang)
      return
    }

    if (isTransitioning) return

    setTransitionType('language')
    setTransitionLang(lang)
    setIsTransitioning(true)

    // Step 1: Wait for the curtain to close completely (350ms)
    setTimeout(() => {
      // Step 2: Change language state (runs router.refresh() under the hood)
      actualSetLang(lang)

      // Step 3: Hold the curtain closed longer (550ms) to allow next.js server components to refetch
      setTimeout(() => {
        // Step 4: Open the curtain
        setIsTransitioning(false)
        
        // Clean up transition state after animation finishes
        setTimeout(() => {
          setTransitionType(null)
          setTransitionLang(null)
        }, 350)
      }, 550)
    }, 350)
  }, [isTransitioning, isAdmin])

  const triggerPageTransition = useCallback(() => {
    if (isAdmin || isTransitioning) return

    setTransitionType('page')
    setIsTransitioning(true)

    // Full cycle for browser Back/Forward buttons where we don't control router timing
    setTimeout(() => {
      setTimeout(() => {
        setIsTransitioning(false)
        
        setTimeout(() => {
          setTransitionType(null)
        }, 350)
      }, 150)
    }, 350)
  }, [isTransitioning, isAdmin])

  const endPageTransition = useCallback(() => {
    if (isAdmin) return
    setIsTransitioning(false)
    
    setTimeout(() => {
      setTransitionType(null)
    }, 350)
  }, [isAdmin])

  // Global click interceptor to run page transition shutter BEFORE navigation occurs
  useEffect(() => {
    if (isAdmin) return

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a')
      
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href) return

      // Lock double-clicks or multiple navigation attempts while transitioning
      if (isTransitioning) {
        e.preventDefault()
        return
      }

      // Check same origin
      let targetUrl: URL
      try {
        targetUrl = new URL(anchor.href, window.location.href)
      } catch (err) {
        return
      }

      if (targetUrl.origin !== window.location.origin) return

      // Ignore special links
      if (
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('#') ||
        anchor.getAttribute('target') === '_blank' ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return
      }

      // Ignore downloads
      if (anchor.hasAttribute('download')) return

      // Ignore if it's the exact same URL (no routing needed)
      if (anchor.href === window.location.href) return

      // Prevent Next.js default navigation
      e.preventDefault()

      // Trigger shutter transition
      setTransitionType('page')
      setIsTransitioning(true)

      // Step 1: Wait for curtain to close completely (350ms)
      setTimeout(() => {
        // Step 2: Push page route change client-side
        // Note: The curtain is left closed until RouteChangeListener detects the route change and calls endPageTransition()
        router.push(href)
      }, 350)
    }

    document.addEventListener('click', handleAnchorClick, { capture: true })
    return () => document.removeEventListener('click', handleAnchorClick, { capture: true })
  }, [router, isTransitioning, isAdmin])

  return (
    <ThemeTransitionContext.Provider value={{ 
      toggleTheme, 
      changeLanguage, 
      triggerPageTransition,
      endPageTransition,
      isTransitioning, 
      transitionType, 
      transitionTheme, 
      transitionLang 
    }}>
      {children}
    </ThemeTransitionContext.Provider>
  )
}

export function useThemeTransition() {
  const context = useContext(ThemeTransitionContext)
  if (context === undefined) {
    throw new Error('useThemeTransition must be used within a ThemeTransitionProvider')
  }
  return context
}
