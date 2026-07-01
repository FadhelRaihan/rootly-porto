import { Metadata } from 'next'
import { AnimatedSection } from '@/components/public/shared/animated-section'
import { Shield, Target, Heart, Infinity, Terminal, Network } from 'lucide-react'
import { CTA } from '@/components/public/shared/cta'
import { getServerTranslation } from '@/lib/i18n-server'

export const metadata: Metadata = {
  title: 'About',
  description: 'Rootly is a specialized software house built on the foundations of grounded values, purposeful engineering, warmth, and long-lasting digital craftsmanship.',
}

export default async function AboutPage() {
  const { t } = await getServerTranslation()
  return (
    <div className="pt-20 bg-rootly-background min-h-screen text-rootly-text">
      {/* Hero */}
      <section className="py-20 relative overflow-hidden border-b border-dashed border-rootly-border">
        {/* Warm Dotted Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#1d9e7508_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <AnimatedSection>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-xs tracking-widest text-rootly-primary uppercase">
                {"[ SYSTEM // ROOT PROFILE CONFIGURATION ]"}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-rootly-text mb-6 leading-tight">
              {t('about.title')}
            </h1>
            
            <div className="bg-rootly-surface/60 backdrop-blur-sm border border-rootly-border rounded-xl p-4 sm:p-6 max-w-3xl font-mono text-xs text-rootly-muted shadow-sm">
              <div className="flex items-center justify-between border-b border-dashed border-rootly-border pb-2 mb-3">
                <span className="text-rootly-primary font-bold">INITIALIZING CORE...</span>
                <span>VER. 2.6.0-MAINNET</span>
              </div>
              <p className="text-sm leading-relaxed text-rootly-text font-serif">
                {t('about.hero')}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-rootly-surface relative overflow-hidden border-b border-rootly-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7">
              <AnimatedSection>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-[10px] tracking-widest text-rootly-primary uppercase">{"[ ORIGIN ARCHIVE ]"}</span>
                </div>
                <h2 className="text-3xl font-serif text-rootly-text mb-6">{t('about.story.title')}</h2>
                <div className="space-y-5 text-rootly-muted leading-relaxed text-sm">
                  <p>{t('about.story.p1')}</p>
                  <p>{t('about.story.p2')}</p>
                  <p>{t('about.story.p3')}</p>
                </div>
              </AnimatedSection>
            </div>

            {/* Right Web3 Console Graphic Visual */}
            <div className="lg:col-span-5">
              <AnimatedSection delay={0.2}>
                <div className="bg-rootly-deep-bg text-gray-300 rounded-2xl p-6 border border-rootly-border/60 shadow-2xl font-mono text-xs relative overflow-hidden group hover:border-rootly-primary/40 transition-all duration-300">
                  {/* Hexagon Pattern Overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(29,158,117,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                  
                  {/* Console Header */}
                  <div className="flex items-center justify-between border-b border-rootly-border/60 pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                      </div>
                      <span className="text-[10px] text-gray-500 ml-2">rootly-node-monitor.sh</span>
                    </div>
                    <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 animate-pulse">
                      ONLINE
                    </span>
                  </div>

                  {/* System Grid Visualizer */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-gray-500 mb-1">
                        <span>NODE CORE STATUS</span>
                        <span className="text-emerald-400">99.98% UPTIME</span>
                      </div>
                      <div className="h-1.5 w-full bg-rootly-surface/50 rounded-full overflow-hidden">
                        <div className="h-full w-[99.98%] bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 py-2 border-y border-dashed border-rootly-border/60">
                      <div>
                        <span className="text-gray-500 block text-[9px]">PROTOCOL SECURE</span>
                        <span className="text-white font-bold flex items-center gap-1.5 mt-0.5">
                          <Shield className="w-3.5 h-3.5 text-emerald-400" />
                          HYBRID CORE
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 block text-[9px]">CONNECTION FLOW</span>
                        <span className="text-white font-bold flex items-center gap-1.5 mt-0.5">
                          <Network className="w-3.5 h-3.5 text-emerald-400" />
                          ACTIVE NODES
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5 font-mono text-[10px] text-gray-400">
                      <div className="flex justify-between">
                        <span className="text-gray-500">ROOT ARCHITECTURE:</span>
                        <span>MODULAR SOLID</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">TRANSPARENCY ID:</span>
                        <span>0x4f8e...9a2c</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">DECENTRALIZED SYNC:</span>
                        <span className="text-emerald-400">100% OPERATIONAL</span>
                      </div>
                    </div>

                    {/* Simulation Console Screen */}
                    <div className="bg-rootly-deep-bg/80 p-3 rounded-lg border border-rootly-border/60 font-mono text-[9px] text-emerald-400/90 space-y-1">
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <Terminal className="w-3 h-3" />
                        <span>system_diagnostic.log</span>
                      </div>
                      <p className="text-gray-500 mt-1">{"// Roots established successfully"}</p>
                      <p>&gt; Connection secure: Client sync OK</p>
                      <p>&gt; Executing: Quality-First-Build protocol</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-rootly-background relative overflow-hidden border-b border-dashed border-rootly-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Mission */}
            <AnimatedSection>
              <div className="bg-rootly-surface p-8 rounded-2xl border border-rootly-border hover:border-rootly-primary/30 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-rootly-primary/5 rounded-bl-full pointer-events-none" />
                <span className="font-mono text-[9px] text-rootly-primary tracking-widest uppercase block mb-3">{"[ MISSION // TARGET PROTOCOL ]"}</span>
                <h3 className="text-2xl font-serif text-rootly-text mb-4">{t('about.mission.title')}</h3>
                <p className="text-rootly-muted text-sm leading-relaxed">
                  {t('about.mission.desc')}
                </p>
              </div>
            </AnimatedSection>

            {/* Vision */}
            <AnimatedSection delay={0.15}>
              <div className="bg-rootly-surface p-8 rounded-2xl border border-rootly-border hover:border-rootly-primary/30 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-rootly-primary/5 rounded-bl-full pointer-events-none" />
                <span className="font-mono text-[9px] text-rootly-primary tracking-widest uppercase block mb-3">{"[ VISION // FUTURE MATRIX ]"}</span>
                <h3 className="text-2xl font-serif text-rootly-text mb-4">{t('about.vision.title')}</h3>
                <p className="text-rootly-muted text-sm leading-relaxed">
                  {t('about.vision.desc')}
                </p>
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-rootly-surface relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-[10px] font-mono tracking-widest text-rootly-primary uppercase block mb-3">{"[ CORE PARAMETERS // 04 VALUES ]"}</span>
              <h2 className="text-3xl sm:text-4xl font-serif text-rootly-text mb-4">{t('about.coreValues')}</h2>
              <p className="text-rootly-muted text-xs font-mono">SECURE AND STEADY PROTOCOLS FOR EVERY BUILD</p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { titleKey: 'about.value1.title', descKey: 'about.value1.desc', index: '0X01', icon: Shield },
              { titleKey: 'about.value2.title', descKey: 'about.value2.desc', index: '0X02', icon: Target },
              { titleKey: 'about.value3.title', descKey: 'about.value3.desc', index: '0X03', icon: Heart },
              { titleKey: 'about.value4.title', descKey: 'about.value4.desc', index: '0X04', icon: Infinity },
            ].map((value, i) => {
              const Icon = value.icon
              return (
                <AnimatedSection key={value.titleKey} delay={i * 0.1}>
                  <div className="h-full bg-rootly-background/40 hover:bg-rootly-surface p-6 rounded-xl border border-rootly-border hover:border-rootly-primary/40 hover:shadow-[0_0_20px_rgba(29,158,117,0.04)] transition-all duration-300 flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-10 h-10 rounded-lg bg-rootly-primary/10 flex items-center justify-center border border-rootly-primary/20 group-hover:bg-rootly-primary group-hover:text-white transition-all duration-300 text-rootly-primary">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-mono text-[9px] text-rootly-muted tracking-wider">{`[ ${value.index} ]`}</span>
                      </div>
                      <h3 className="text-lg font-serif text-rootly-text mb-3 group-hover:text-rootly-primary transition-colors duration-300">
                        {t(value.titleKey)}
                      </h3>
                      <p className="text-rootly-muted text-xs leading-relaxed font-sans">
                        {t(value.descKey)}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* Reusable CTA Section */}
      <CTA />
    </div>
  )
}