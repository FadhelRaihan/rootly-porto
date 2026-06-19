'use client'

import { ReactLenis } from 'lenis/react'
import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

export function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  )
}
