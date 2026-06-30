'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'

function ThemeTransitionEffect() {
  const { theme, resolvedTheme } = useTheme()
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const isFirstMount = React.useRef(true)

  React.useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false
      return
    }

    const html = document.documentElement
    html.classList.add('color-transition')

    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      html.classList.remove('color-transition')
    }, 300)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [theme, resolvedTheme])

  return null
}

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="system" 
      enableSystem
      {...props}
    >
      <ThemeTransitionEffect />
      {children}
    </NextThemesProvider>
  )
}
