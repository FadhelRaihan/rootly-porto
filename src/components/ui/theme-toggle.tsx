'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useThemeTransition } from '@/context/theme-transition-context'

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme } = useTheme()
  const { toggleTheme } = useThemeTransition()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    let active = true
    requestAnimationFrame(() => {
      if (active) setMounted(true)
    })
    return () => {
      active = false
    }
  }, [])

  if (!mounted) {
    // Render placeholder with same dimensions to avoid layout shift
    return (
      <div className={cn("w-10 h-10 rounded-full border border-[#E8E6E0] bg-white dark:bg-[#1C1C1A] dark:border-white/10 shrink-0", className)} />
    )
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <Button
      variant="ghost"
      onClick={toggleTheme}
      className={cn(
        "w-10 h-10 rounded-full border border-[#E8E6E0] bg-white text-[#1C1C1A] hover:bg-[#1D9E75]/10 hover:text-[#1D9E75] hover:border-[#1D9E75]/30 dark:bg-[#1C1C1A] dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white dark:hover:border-white/20 transition-all duration-300 cursor-pointer shrink-0 flex items-center justify-center p-0 shadow-sm",
        className
      )}
    >
      {isDark ? (
        <Sun className="h-[18px] w-[18px] text-amber-500 animate-spin-slow" />
      ) : (
        <Moon className="h-[18px] w-[18px] text-gray-700" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
