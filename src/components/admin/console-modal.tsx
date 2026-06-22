import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import React from 'react'

interface ConsoleModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  title: string
  subtitle?: string
  maxWidth?: string // default: 'sm:max-w-3xl'
  children: React.ReactNode
}

export function ConsoleModal({
  isOpen,
  onOpenChange,
  title,
  subtitle,
  maxWidth = 'sm:max-w-3xl',
  children,
}: ConsoleModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent 
        className={`${maxWidth} bg-rootly-admin-bg border-rootly-admin-border border-dashed text-rootly-text`}
        data-lenis-prevent
      >
        {isOpen && (
          <>
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-rootly-text font-mono">
                {title}
              </DialogTitle>
              {subtitle && (
                <p className="text-[10px] text-gray-500 uppercase mt-1 font-mono">{subtitle}</p>
              )}
            </DialogHeader>
            {children}
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
