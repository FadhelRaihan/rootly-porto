'use client'

import React, { useState, useEffect, Suspense, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname, useSearchParams } from 'next/navigation'

const LOG_STEPS = [
  { text: "[0.002] INITIALIZING ROOTLY SECURE PEER CONNECTIVITY...", duration: 600 },
  { text: "[0.104] ESTABLISHING SHIELDED DATABASE SESSION... [OK]", duration: 750 },
  { text: "[0.218] COMPRESSING SHADERS & PACKING ASSETS (0x2A9B)...", duration: 800 },
  { text: "[0.450] MINING SYSTEM BLOCKS & RESOLVING PROTOCOLS...", duration: 650 },
  { text: "[0.680] VERIFYING CRYPTOGRAPHIC HANDSHAKE... SECURE.", duration: 700 },
  { text: "[1.000] BOOT SEQUENCE TERMINATED. DEPLOYMENT INITIALIZED.", duration: 800 }
]

function RouteChangeListener({ onTrigger, enabled }: { onTrigger: () => void; enabled: boolean }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (enabled) {
      onTrigger()
    }
  }, [pathname, searchParams, onTrigger, enabled])

  return null
}

export function LoadingScreen() {
  const [shouldShowFullBoot, setShouldShowFullBoot] = useState(false)
  const [shouldShowHotReload, setShouldShowHotReload] = useState(false)
  
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
      // Trigger hot reload on first page load if session exists (e.g., hard refresh)
      triggerHotReload()
    } else {
      setShouldShowFullBoot(true)
      startFullBootSequence()
    }
  }, [])

  const triggerHotReload = useCallback(() => {
    setShouldShowHotReload(true)
    const timer = setTimeout(() => {
      setShouldShowHotReload(false)
    }, 800) // Hot reload duration
    return () => clearTimeout(timer)
  }, [])

  const startFullBootSequence = () => {
    let currentLogIndex = 0

    // Slower progress bar to match the longer duration (approx 4.3 seconds)
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + Math.floor(Math.random() * 5) + 1
      })
    }, 150)

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

  return (
    <>
      <Suspense fallback={null}>
        <RouteChangeListener onTrigger={triggerHotReload} enabled={isClient && isFullBootComplete} />
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

      {/* HOT RELOAD SEQUENCE (Refresh / Navigation) */}
      <AnimatePresence>
        {shouldShowHotReload && isFullBootComplete && (
          <motion.div
            key="rootly-hot-reload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(5px)' }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9998] bg-[#0E0E0D]/60 backdrop-blur-md flex items-center justify-center pointer-events-none"
          >
            <div className="flex items-center gap-3 bg-[#111110]/80 border border-[#2E2E2C] px-4 py-2 rounded-lg text-[#1D9E75] font-mono text-[10px] sm:text-xs tracking-widest uppercase shadow-2xl">
              <motion.span 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-3 h-3 border-2 border-[#1D9E75] border-t-transparent rounded-full"
              />
              <span>[ SYNCING_NODE_0x2A9B... ]</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

