'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedSection } from '@/components/public/shared/animated-section'

export function CTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-rootly-primary to-[#12664B] relative overflow-hidden">
      {/* Subtle Neural Dotted Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
      {/* White Ambient Glow Center */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center">
        <AnimatedSection>
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6 sm:p-10 md:p-12 max-w-3xl mx-auto shadow-2xl relative overflow-hidden group hover:border-white/25 transition-all duration-300">
            {/* Header Initialization Label */}
            <div className="flex items-center justify-center gap-2 font-mono text-[8px] text-white/70 uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
              <span>{"[ SYSTEM // INITIALIZE PROJECT CONNECTION ]"}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white mb-4 leading-tight">
              Ready to build something meaningful?
            </h2>
            <p className="text-white/85 mb-8 max-w-lg mx-auto text-sm leading-relaxed">
              Let us help you turn your idea into a digital product that truly works and is engineered to last.
            </p>
            
            <div className="flex justify-center mb-8">
              <Link href="/contact">
                <Button size="lg" variant="secondary" className="text-rootly-primary hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 cursor-pointer">
                  Start a Conversation <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Console status footer */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-6 border-t border-white/10 font-mono text-[9px] text-white/50">
              <div>{"NODE_STATUS: ONLINE"}</div>
              <div className="hidden sm:inline">{"//"}</div>
              <div>{"LATENCY: 12MS"}</div>
              <div className="hidden sm:inline">{"//"}</div>
              <div>{"SECURITY: SHA-256"}</div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
