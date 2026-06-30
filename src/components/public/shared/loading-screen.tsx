'use client'

import React, { useState, useEffect, Suspense, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname, useSearchParams } from 'next/navigation'
import { useThemeTransition } from '@/context/theme-transition-context'

const LOG_STEPS = [
  { text: "[0.002] INITIALIZING ROOTLY SECURE PEER CONNECTIVITY...", duration: 200 },
  { text: "[0.104] ESTABLISHING SHIELDED DATABASE SESSION... [OK]", duration: 300 },
  { text: "[0.218] COMPRESSING SHADERS & PACKING ASSETS (0x2A9B)...", duration: 300 },
  { text: "[0.450] MINING SYSTEM BLOCKS & RESOLVING PROTOCOLS...", duration: 200 },
  { text: "[0.680] VERIFYING CRYPTOGRAPHIC HANDSHAKE... SECURE.", duration: 300 },
  { text: "[1.000] BOOT SEQUENCE TERMINATED. DEPLOYMENT INITIALIZED.", duration: 300 }
]

function RouteChangeListener({ enabled }: { enabled: boolean }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { isTransitioning, transitionType, endPageTransition, triggerPageTransition } = useThemeTransition()
  const lastPathRef = React.useRef<string | null>(null)
  const lastSearchRef = React.useRef<string | null>(null)

  useEffect(() => {
    if (!enabled) {
      lastPathRef.current = pathname
      lastSearchRef.current = searchParams.toString()
      return
    }

    const currentSearch = searchParams.toString()
    const pathChanged = lastPathRef.current !== null && lastPathRef.current !== pathname
    const searchChanged = lastSearchRef.current !== null && lastSearchRef.current !== currentSearch

    if (pathChanged || searchChanged) {
      if (isTransitioning && transitionType === 'page') {
        // Link-clicked transition is already active (curtain closed). Hold briefly for render and open it.
        setTimeout(() => {
          endPageTransition()
        }, 150)
      } else {
        // Browser back/forward navigation or refresh. Run the full transition cycle.
        triggerPageTransition()
      }
    }

    lastPathRef.current = pathname
    lastSearchRef.current = currentSearch
  }, [pathname, searchParams, enabled, isTransitioning, transitionType, endPageTransition, triggerPageTransition])

  return null
}

export function LoadingScreen() {
  const [shouldShowFullBoot, setShouldShowFullBoot] = useState(false)
  const { triggerPageTransition } = useThemeTransition()

  const [logs, setLogs] = useState<string[]>([])
  const [progress, setProgress] = useState(0)

  const [isFullBootComplete, setIsFullBootComplete] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Run on mount to check session and setup initial state
  useEffect(() => {
    setIsClient(true)

    // Clean up dynamic loader-hiding style once mounted
    const hideLoaderStyle = document.getElementById('boot-hide-loader')
    if (hideLoaderStyle) hideLoaderStyle.remove()

    const isAdmin = window.location.pathname.startsWith('/admin')
    if (isAdmin) {
      setIsFullBootComplete(true)
      return
    }

    const hasSeenLoader = sessionStorage.getItem('rootly_boot_sequence_complete')

    if (hasSeenLoader) {
      setIsFullBootComplete(true)
    } else {
      setShouldShowFullBoot(true)
      startFullBootSequence()
    }

    function startFullBootSequence() {
      let currentLogIndex = 0

      // Slower progress bar to match the longer duration (approx 4.3 seconds)
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval)
            return 100
          }
          return prev + Math.floor(Math.random() * 15) + 5
        })
      }, 100)

      const processNextLog = () => {
        if (currentLogIndex < LOG_STEPS.length) {
          const step = LOG_STEPS[currentLogIndex]

          setTimeout(() => {
            setLogs(prev => [...prev, step.text])
            currentLogIndex++
            processNextLog()
          }, step.duration)
        } else {
          setTimeout(() => {
            setProgress(100)
            setTimeout(() => {
              setIsFullBootComplete(true)
              setShouldShowFullBoot(false)
              sessionStorage.setItem('rootly_boot_sequence_complete', 'true')

              // Remove the dynamically injected boot styles to restore normal page styles
              const bootStyle = document.getElementById('boot-theme-style')
              if (bootStyle) bootStyle.remove()

              // Remove the block class so the app content can be displayed
              document.documentElement.classList.remove('boot-active')
              document.documentElement.classList.add('boot-bypassed')
            }, 600) // Hold briefly at 100%
          }, 400)
        }
      }

      // Start boot sequence
      setTimeout(processNextLog, 400)

      return () => clearInterval(progressInterval)
    }
  }, [])

  return (
    <>
      <Suspense fallback={null}>
        <RouteChangeListener enabled={isClient && isFullBootComplete} />
      </Suspense>

      {/* FULL BOOT SEQUENCE (First Visit) */}
      <AnimatePresence>
        {!isFullBootComplete && (
          <motion.div
            id="rootly-full-boot"
            key="rootly-full-boot"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[9999] bg-[#0E0E0D] text-[#F0EFEB] flex flex-col justify-end p-6 sm:p-12 font-mono overflow-hidden"
          >
            {/* Subtle Cyber Dotted Grid Background */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            {/* Top Header Badge */}
            <div className="absolute top-8 left-6 sm:left-12 flex items-center gap-3 text-[10px] tracking-widest text-[#1D9E75] uppercase">
              <span className="w-2 h-2 bg-[#1D9E75] rounded-full animate-pulse shadow-[0_0_8px_#1D9E75]" />
              <span>ROOTLY SYSTEM CORE v2.0.4</span>
            </div>

            <div className="relative z-10 w-full max-w-4xl mx-auto space-y-8">
              {/* Terminal Logs */}
              <div className="flex flex-col gap-2 text-[11px] sm:text-xs md:text-sm">
                {logs.map((log, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-gray-500 shrink-0">&gt;</span>
                    <span className={i === LOG_STEPS.length - 1 ? 'text-[#1D9E75] font-bold' : 'text-gray-300'}>
                      {log}
                    </span>
                  </motion.div>
                ))}
                {/* Blinking Cursor */}
                <div className="flex items-center gap-3 h-5">
                  <span className="text-gray-500 shrink-0">&gt;</span>
                  <span className="w-2.5 h-4 bg-[#1D9E75] animate-pulse" />
                </div>
              </div>

              {/* Progress Bar & Status */}
              <div className="pt-8 border-t border-white/10 border-dashed">
                <div className="flex justify-between text-[10px] sm:text-xs text-gray-500 mb-3 tracking-widest">
                  <span>SYSTEM_MOUNT_PROGRESS</span>
                  <span className="text-[#1D9E75] font-bold">{Math.min(progress, 100)}%</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden relative">
                  <motion.div
                    className="absolute top-0 left-0 bottom-0 bg-[#1D9E75]"
                    initial={{ width: '0%' }}
                    animate={{ width: `${Math.min(progress, 100)}%` }}
                    transition={{ ease: "linear", duration: 0.2 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

