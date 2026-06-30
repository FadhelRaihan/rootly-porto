'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useThemeTransition } from '@/context/theme-transition-context'
import { useTheme } from 'next-themes'

export function ThemeCurtain() {
  const { isTransitioning, transitionType, transitionTheme, transitionLang } = useThemeTransition()
  const { resolvedTheme } = useTheme()

  // Select colors based on transition type:
  // - For theme transitions, color matches the target theme.
  // - For language or page transitions, color matches the current active theme.
  const isTargetDark = transitionType === 'theme' 
    ? transitionTheme === 'dark' 
    : resolvedTheme === 'dark'

  const bgColor = isTargetDark ? 'bg-[#0E0E0D]' : 'bg-[#F7F6F2]'
  const textColor = isTargetDark ? 'text-[#F0EFEB]' : 'text-[#1C1C1A]'
  const borderColor = isTargetDark ? 'border-white/10' : 'border-[#E8E6E0]'

  // Select messages based on transition type
  let headerTitle = 'COLOR_ENGINE_SYS'
  let commandText = '[ RECONFIGURING_THEME_NODES... ]'
  let subtext = 'Please stand by // Syncing resources'

  if (transitionType === 'language') {
    headerTitle = 'LOCALE_ENGINE_SYS'
    if (transitionLang === 'id') {
      commandText = '[ SWITCHING_TO_INDONESIAN... ]'
    } else {
      commandText = '[ SWITCHING_TO_ENGLISH... ]'
    }
    subtext = 'Please stand by // Compiling dictionary'
  } else if (transitionType === 'page') {
    headerTitle = 'ROUTE_ENGINE_SYS'
    commandText = '[ SYNCHRONIZING_LOCATIONS... ]'
    subtext = 'Establishing safe pathway // Syncing assets'
  }

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
          className={`fixed inset-0 z-[99999] ${bgColor} ${textColor} flex flex-col items-center justify-center font-mono overflow-hidden pointer-events-auto`}
        >
          {/* Dotted Grid Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(29,158,117,0.03)_1.5px,transparent_1.5px)] bg-[size:24px_24px] pointer-events-none" />

          {/* Shutter Status Display */}
          <div className={`relative flex flex-col items-center gap-4 px-6 py-4 rounded-xl border border-dashed ${borderColor} bg-transparent max-w-sm sm:max-w-md w-[90%] z-10 shadow-2xl`}>
            {/* Pulsing Node Shard */}
            <div className="flex items-center gap-2 text-[10px] tracking-widest text-[#1D9E75] uppercase">
              <span className="w-1.5 h-1.5 bg-[#1D9E75] rounded-full animate-ping" />
              <span className="w-1.5 h-1.5 bg-[#1D9E75] rounded-full absolute" />
              <span>{headerTitle}</span>
            </div>

            {/* Main Shutter Command */}
            <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold select-none">
              <span className="animate-pulse text-center">
                {commandText}
              </span>
            </div>

            {/* Subtext info */}
            <span className={`text-[8px] sm:text-[9px] uppercase tracking-wider select-none ${isTargetDark ? 'text-gray-500' : 'text-gray-400'}`}>
              {subtext}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
