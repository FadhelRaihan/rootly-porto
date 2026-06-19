'use client'

import { motion } from 'framer-motion'
import { ReactNode, useEffect, useState } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function AnimatedSection({ children, delay = 0, className }: AnimatedSectionProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 640px)')
    
    // Defer setting state to the next tick to prevent cascading renders warning
    const timer = setTimeout(() => {
      setIsMobile(media.matches)
    }, 0)

    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    media.addEventListener('change', listener)
    
    return () => {
      clearTimeout(timer)
      media.removeEventListener('change', listener)
    }
  }, [])

  // On mobile, bypass Framer Motion viewport observation and y-transitions
  // to ensure buttery-smooth native scrolling without layout thrashing.
  if (isMobile) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const fadeInUp = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
}

export const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } }
}