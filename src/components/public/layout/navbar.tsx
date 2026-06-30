'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import type { Service } from '@/db/schema'
import { useLenis } from 'lenis/react'
import { useTheme } from 'next-themes'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { useTranslation } from '@/context/language-context'
import { localizedField } from '@/lib/lang-utils'
import { useThemeTransition } from '@/context/theme-transition-context'

const NextImage = Image as any

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

interface NavbarProps {
  services?: Service[]
}

export function Navbar({ services }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const lenis = useLenis()
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('m.fadhelraihan@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Stop Lenis background scrolling when hamburger is open
  useEffect(() => {
    if (isMenuOpen) {
      lenis?.stop()
    } else {
      lenis?.start()
    }
    return () => {
      lenis?.start()
    }
  }, [isMenuOpen, lenis])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    let active = true
    requestAnimationFrame(() => {
      if (active) setMounted(true)
    })
    return () => {
      active = false
    }
  }, [])

  const { language, setLanguage, t } = useTranslation()
  const { changeLanguage } = useThemeTransition()

  const logoSrc = mounted && resolvedTheme === 'dark' ? '/icon/Logo-NameIconWhite.svg' : '/icon/Logo-NameIconBlack.svg'

  return (
    <>
      <header
        className={cn(
          'fixed max-w-4xl top-3 left-4 right-4 md:mx-auto rounded-full z-45 transition-all duration-300 border border-rootly-border/40',
          isScrolled
            ? 'bg-rootly-surface/90 backdrop-blur-md shadow-sm py-2'
            : 'bg-rootly-background/80 backdrop-blur-sm py-3'
        )}
        style={{ left: '50%', transform: 'translateX(-50%)', width: 'calc(100% - 2rem)' }}
      >
        <nav className="w-full mx-auto px-3 flex items-center justify-between">
          <Link href="/" className="transition-transform hover:scale-[1.02] active:scale-[0.98]">
            <NextImage src={logoSrc} width={105} height={105} alt="Logo" priority className="h-8 w-auto" />
          </Link>

          <div className="flex items-center gap-2.5">
            {/* Language Toggle - Desktop Only */}
            <div className="hidden md:flex items-center gap-0.5 border border-rootly-border rounded-full px-1 py-1 bg-rootly-surface/50">
              <button
                onClick={() => changeLanguage('en', setLanguage)}
                className={cn(
                  'text-[10px] font-bold font-mono uppercase tracking-wider px-2 py-0.5 rounded-full cursor-pointer transition-all',
                  language === 'en'
                    ? 'bg-rootly-primary/15 text-rootly-primary border border-rootly-primary/40'
                    : 'text-rootly-muted hover:text-rootly-text border border-transparent'
                )}
              >
                {t('lang.en')}
              </button>
              <button
                onClick={() => changeLanguage('id', setLanguage)}
                className={cn(
                  'text-[10px] font-bold font-mono uppercase tracking-wider px-2 py-0.5 rounded-full cursor-pointer transition-all',
                  language === 'id'
                    ? 'bg-rootly-primary/15 text-rootly-primary border border-rootly-primary/40'
                    : 'text-rootly-muted hover:text-rootly-text border border-transparent'
                )}
              >
                {t('lang.id')}
              </button>
            </div>

            {/* Theme Toggle Button - Desktop Only */}
            <div className="hidden md:block">
              <ThemeToggle />
            </div>

            {/* Premium Hamburger Toggle with pulsing server node */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-rootly-border bg-rootly-surface text-sm font-semibold text-rootly-text hover:bg-rootly-primary hover:text-white hover:border-rootly-primary transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer group"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="font-sans">{t('nav.menu')}</span>
              <Menu size={16} className="group-hover:rotate-12 transition-transform duration-300" />
            </button>
          </div>
        </nav>
      </header>

      {/* Premium Fullscreen Overlay Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-50">
            {/* Dark Blur Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Container Card */}
            <div className="absolute inset-0 flex items-start justify-center p-4 pt-10 md:pt-20 overflow-y-auto pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -25 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -25 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="bg-rootly-surface rounded-3xl shadow-2xl border border-rootly-border w-full max-w-4xl max-h-[calc(100dvh-4rem)] md:max-h-none overflow-y-auto md:overflow-visible p-5 md:p-8 pointer-events-auto no-scrollbar relative"
                data-lenis-prevent
                onClick={(e) => e.stopPropagation()}
              >
                {/* Subtle Grid overlay for menu card */}
                <div className="absolute inset-0 bg-[radial-gradient(#1d9e7503_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none rounded-3xl" />
                
                {/* Header Row */}
                <div className="flex items-center justify-between pb-4 md:pb-6 border-b border-rootly-border relative z-10">
                  <Link href="/" onClick={() => setIsMenuOpen(false)} className="transition-transform hover:scale-[1.02]">
                    <NextImage src={logoSrc} width={110} height={110} alt="Logo" className="h-8 w-auto" />
                  </Link>
                  
                  {/* Web3 command escape close button - responsive layout */}
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-rootly-border hover:border-red-200 hover:bg-red-50 text-xs font-mono font-bold text-rootly-text hover:text-red-600 transition-all duration-200 cursor-pointer group shrink-0"
                  >
                    <X size={13} className="group-hover:rotate-90 transition-transform duration-200" />
                    <span className="hidden sm:inline">[ ESC // {t('nav.close')} ]</span>
                    <span className="sm:hidden">[ ESC ]</span>
                  </button>
                </div>

                {/* Mobile Preferences (Language & Theme Toggle) */}
                <div className="flex md:hidden items-center justify-between py-3 border-b border-rootly-border relative z-10">
                  <span className="text-[9px] font-mono tracking-widest text-rootly-primary uppercase">
                    {"[ SYS // PREFERENCES ]"}
                  </span>
                  <div className="flex items-center gap-2.5">
                    {/* Language Toggle */}
                    <div className="flex items-center gap-0.5 border border-rootly-border rounded-full px-1 py-1 bg-rootly-surface/50">
                      <button
                        onClick={() => changeLanguage('en', setLanguage)}
                        className={cn(
                          'text-[10px] font-bold font-mono uppercase tracking-wider px-2 py-0.5 rounded-full cursor-pointer transition-all',
                          language === 'en'
                            ? 'bg-rootly-primary/15 text-rootly-primary border border-rootly-primary/40'
                            : 'text-rootly-muted hover:text-rootly-text border border-transparent'
                        )}
                      >
                        {t('lang.en')}
                      </button>
                      <button
                        onClick={() => changeLanguage('id', setLanguage)}
                        className={cn(
                          'text-[10px] font-bold font-mono uppercase tracking-wider px-2 py-0.5 rounded-full cursor-pointer transition-all',
                          language === 'id'
                            ? 'bg-rootly-primary/15 text-rootly-primary border border-rootly-primary/40'
                            : 'text-rootly-muted hover:text-rootly-text border border-transparent'
                        )}
                      >
                        {t('lang.id')}
                      </button>
                    </div>
                    {/* Theme Toggle */}
                    <ThemeToggle />
                  </div>
                </div>

                {/* Grid Layout (3 Columns) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 py-4 md:py-6 relative z-10">
                  {/* Column 1: Services */}
                  <div className="bg-rootly-background border border-rootly-border rounded-2xl p-4 md:p-6 flex flex-col justify-between relative group/col">
                    <div className="absolute top-4 right-4 font-mono text-[8px] text-rootly-muted">
                      {"[ SECURE_CONN ]"}
                    </div>
                    <div>
                      <span className="text-[9px] font-mono tracking-widest text-rootly-primary uppercase block mb-3 md:mb-5">{"[ SYS // CAPABILITIES ]"}</span>
                      <div className="space-y-3.5">
                        {(() => {
                          const rawServices = services && services.length > 0
                            ? services.map((s) => ({
                              label: localizedField(language, s.title, s.titleId),
                              href: `/services`,
                            }))
                            : [
                              { label: 'Web Application', href: '/services' },
                              { label: 'Mobile Application', href: '/services', isNew: true },
                              { label: 'UI/UX Design', href: '/services' },
                            ];
                          const hasMoreThanThree = rawServices.length > 3;
                          const displayServices = hasMoreThanThree ? rawServices.slice(0, 3) : rawServices;
                          return (
                            <>
                              {displayServices.map((item) => (
                                <Link
                                  key={item.label}
                                  href={item.href}
                                  onClick={() => setIsMenuOpen(false)}
                                  className="flex items-center justify-between py-2 border-b border-rootly-border/50 hover:border-rootly-primary/40 group transition-all"
                                >
                                  <span className="font-serif text-base font-regular text-rootly-text group-hover:text-rootly-primary transition-all flex items-center gap-1.5">
                                    <span className="text-[9px] font-mono opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-rootly-primary">{"\u003e"}</span>
                                    <span className="flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-0.5">
                                      {item.label}
                                      {item.isNew && (
                                        <span className="text-[8px] font-sans font-extrabold bg-rootly-primary text-white px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
                                          New
                                        </span>
                                      )}
                                    </span>
                                  </span>
                                  <ArrowUpRight size={15} className="text-rootly-muted group-hover:text-rootly-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                                </Link>
                              ))}
                              {hasMoreThanThree && (
                                <Link
                                  href="/services"
                                  onClick={() => setIsMenuOpen(false)}
                                  className="flex items-center justify-between py-2 group transition-all"
                                >
                                  <span className="font-sans text-xs font-bold text-rootly-primary hover:brightness-90 transition-colors flex items-center gap-1.5">
                                    {t('nav.seeMoreServices')}
                                  </span>
                                  <ArrowUpRight size={15} className="text-rootly-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                                </Link>
                              )}
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  </div>

                  {/* Column 2: Company */}
                  <div className="bg-rootly-background border border-rootly-border rounded-2xl p-4 md:p-6 flex flex-col justify-between relative group/col">
                    <div className="absolute top-4 right-4 font-mono text-[8px] text-rootly-muted">
                      {"[ DIR_NODES ]"}
                    </div>
                    <div>
                      <span className="text-[9px] font-mono tracking-widest text-rootly-primary uppercase block mb-3 md:mb-5">{"[ ORG // DIRECTORY ]"}</span>
                      <div className="space-y-3.5">
                        {[
                          { label: t('nav.about'), href: '/about' },
                          { label: t('nav.portfolio'), href: '/portfolio' },
                          { label: t('nav.process'), href: '/process' },
                        ].map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center justify-between py-2 border-b border-rootly-border/50 hover:border-rootly-primary/40 group transition-all"
                          >
                            <span className="font-serif text-base font-regular text-rootly-text group-hover:text-rootly-primary transition-all flex items-center gap-1.5">
                              <span className="text-[9px] font-mono opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-rootly-primary">{"\u003e"}</span>
                              <span className="transition-transform duration-300 group-hover:translate-x-0.5">{item.label}</span>
                            </span>
                            <ArrowUpRight size={15} className="text-rootly-muted group-hover:text-rootly-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Column 3: Contact */}
                  <div className="bg-rootly-background border border-rootly-border rounded-2xl p-4 md:p-6 flex flex-col justify-between min-h-[140px] md:min-h-[200px] relative group/col">
                    <div className="absolute top-4 right-4 font-mono text-[8px] text-rootly-muted">
                      {"[ ADDR_PORT ]"}
                    </div>
                    <div>
                      <span className="text-[9px] font-mono tracking-widest text-rootly-primary uppercase block mb-3 md:mb-5">{"[ ADDR // GATEWAY ]"}</span>
                      <button
                        onClick={handleCopyEmail}
                        className="font-serif text-lg font-regular text-rootly-text hover:text-rootly-primary transition-colors break-all block text-left hover:underline cursor-pointer focus:outline-none relative group"
                      >
                        <span>rootly@gmail.com</span>
                        <span className={cn(
                          "absolute left-0 -bottom-5 text-[10px] font-sans font-bold text-rootly-primary transition-all duration-200",
                          copied ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none"
                        )}>
                          {t('nav.copyClipboard')}
                        </span>
                      </button>
                    </div>
                    <div className="flex gap-3 mt-4 md:mt-6">
                      {[
                        { icon: <XIcon className="w-4 h-4" />, href: 'https://x.com' },
                        { icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>, href: 'https://linkedin.com' },
                        { icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>, href: 'https://github.com' },
                      ].map((social, i) => (
                        <a
                          key={i}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-rootly-surface flex items-center justify-center border border-rootly-border hover:bg-rootly-primary hover:text-white hover:border-rootly-primary transition-all text-rootly-text shadow-sm hover:shadow"
                        >
                          {social.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-6 border-t border-dashed border-rootly-border relative z-10">
                  <Link href="/about" onClick={() => setIsMenuOpen(false)} className="w-full sm:w-auto">
                    <Button variant="outline" className="w-full sm:w-auto border-rootly-border text-rootly-text hover:bg-rootly-background px-6 py-5 rounded-full font-semibold transition-all shadow-sm cursor-pointer">
                      {t('footer.ourStory')}
                    </Button>
                  </Link>
                  <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="w-full sm:w-auto">
                    <Button className="w-full sm:w-auto bg-rootly-primary hover:brightness-90 hover:shadow-[0_0_15px_rgba(29,158,117,0.35)] text-white px-6 py-5 rounded-full font-semibold transition-all shadow-sm hover:shadow-md cursor-pointer">
                      {t('nav.startProject')}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}