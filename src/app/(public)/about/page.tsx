import { Metadata } from 'next'
import { AnimatedSection } from '@/components/public/shared/animated-section'
import { Shield, Target, Heart, Infinity, Terminal, Network } from 'lucide-react'
import { CTA } from '@/components/public/shared/cta'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'About — Rootly',
  description: 'Rootly adalah software house yang dibangun di atas fondasi nilai: grounded, purposeful, warmth, dan long-lasting.',
}

export default function AboutPage() {
  return (
    <div className="pt-20 bg-[#F7F6F2] min-h-screen text-[#1C1C1A]">
      {/* Hero */}
      <section className="py-20 relative overflow-hidden border-b border-dashed border-[#E8E6E0]">
        {/* Warm Dotted Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#1d9e7508_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <AnimatedSection>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-xs tracking-widest text-[#1D9E75] uppercase">
                {"[ SYSTEM // ROOT PROFILE CONFIGURATION ]"}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#1C1C1A] mb-6 leading-tight">
              About Rootly
            </h1>
            
            <div className="bg-white/60 backdrop-blur-sm border border-[#E8E6E0] rounded-xl p-4 sm:p-6 max-w-3xl font-mono text-xs text-[#888780] shadow-sm">
              <div className="flex items-center justify-between border-b border-dashed border-[#E8E6E0] pb-2 mb-3">
                <span className="text-[#1D9E75] font-bold">INITIALIZING CORE...</span>
                <span>VER. 2.6.0-MAINNET</span>
              </div>
              <p className="text-sm leading-relaxed text-[#1C1C1A] font-serif">
                We are a software house built on the belief that technology should serve a purpose. We anchor our ideas in solid ground, design with intent, communicate with warmth, and build architecture meant to last.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-white relative overflow-hidden border-b border-[#E8E6E0]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7">
              <AnimatedSection>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-[10px] tracking-widest text-[#1D9E75] uppercase">{"[ ORIGIN ARCHIVE ]"}</span>
                </div>
                <h2 className="text-3xl font-serif text-[#1C1C1A] mb-6">Our Story</h2>
                <div className="space-y-5 text-[#888780] leading-relaxed text-sm">
                  <p>
                    Rootly was born from a simple observation: too many software projects fail to deliver real value. They look impressive on the surface but crumble under the weight of poor architecture, short-sighted decisions, and disconnected teams.
                  </p>
                  <p>
                    We decided to build differently. We set out to create a software house that puts lasting value above short-term wins. Where honest communication replaces corporate speak. Where every feature exists because it solves a real problem.
                  </p>
                  <p>
                    The name <strong className="text-[#1C1C1A] font-semibold">Rootly</strong> comes from our philosophy: <em className="italic">build with roots</em>. Roots that dig deep into understanding your business, roots that anchor your software in solid architecture, and roots that keep your product growing strong for years to come.
                  </p>
                </div>
              </AnimatedSection>
            </div>

            {/* Right Web3 Console Graphic Visual */}
            <div className="lg:col-span-5">
              <AnimatedSection delay={0.2}>
                <div className="bg-[#1C1C1A] text-gray-300 rounded-2xl p-6 border border-[#2A2A28] shadow-2xl font-mono text-xs relative overflow-hidden group hover:border-[#1D9E75]/40 transition-all duration-300">
                  {/* Hexagon Pattern Overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(29,158,117,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                  
                  {/* Console Header */}
                  <div className="flex items-center justify-between border-b border-[#2A2A28] pb-4 mb-4">
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
                      <div className="h-1.5 w-full bg-[#2A2A28] rounded-full overflow-hidden">
                        <div className="h-full w-[99.98%] bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 py-2 border-y border-dashed border-[#2A2A28]">
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
                    <div className="bg-[#121211] p-3 rounded-lg border border-[#2A2A28] font-mono text-[9px] text-emerald-400/90 space-y-1">
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
      <section className="py-24 bg-[#F7F6F2] relative overflow-hidden border-b border-dashed border-[#E8E6E0]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Mission */}
            <AnimatedSection>
              <div className="bg-white p-8 rounded-2xl border border-[#E8E6E0] hover:border-[#1D9E75]/30 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#1D9E75]/5 rounded-bl-full pointer-events-none" />
                <span className="font-mono text-[9px] text-[#1D9E75] tracking-widest uppercase block mb-3">{"[ MISSION // TARGET PROTOCOL ]"}</span>
                <h3 className="text-2xl font-serif text-[#1C1C1A] mb-4">Our Mission</h3>
                <p className="text-[#888780] text-sm leading-relaxed">
                  To build software that solves real problems, creates lasting value, and forms genuine, transparent partnerships with our clients. We avoid corporate buzzwords to deliver raw, functional quality.
                </p>
              </div>
            </AnimatedSection>

            {/* Vision */}
            <AnimatedSection delay={0.15}>
              <div className="bg-white p-8 rounded-2xl border border-[#E8E6E0] hover:border-[#1D9E75]/30 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#1D9E75]/5 rounded-bl-full pointer-events-none" />
                <span className="font-mono text-[9px] text-[#1D9E75] tracking-widest uppercase block mb-3">{"[ VISION // FUTURE MATRIX ]"}</span>
                <h3 className="text-2xl font-serif text-[#1C1C1A] mb-4">Our Vision</h3>
                <p className="text-[#888780] text-sm leading-relaxed">
                  To be the most trusted software partner for businesses that care about quality over quantity, and substance over style. We aim to anchor every digital product on clean, long-lasting architectural code.
                </p>
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-[10px] font-mono tracking-widest text-[#1D9E75] uppercase block mb-3">{"[ CORE PARAMETERS // 04 VALUES ]"}</span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#1C1C1A] mb-4">Our Core Values</h2>
              <p className="text-[#888780] text-xs font-mono">SECURE AND STEADY PROTOCOLS FOR EVERY BUILD</p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                title: 'Grounded', 
                index: '0X01',
                icon: Shield,
                desc: 'We build software that solves actual problems, not just impressive-looking features. We stay rooted in utility.' 
              },
              { 
                title: 'Purposeful', 
                index: '0X02',
                icon: Target,
                desc: 'Every line of code serves a clear purpose and delivers measurable value to your business. No bloat.' 
              },
              { 
                title: 'Warmth', 
                index: '0X03',
                icon: Heart,
                desc: 'We communicate honestly, transparently, and treat your project like it is our own. Real developer connection.' 
              },
              { 
                title: 'Long-lasting', 
                index: '0X04',
                icon: Infinity,
                desc: 'We build for the long term with maintainable code and scalable architectures that stand the test of time.' 
              },
            ].map((value, index) => {
              const Icon = value.icon
              return (
                <AnimatedSection key={value.title} delay={index * 0.1}>
                  <div className="h-full bg-[#F7F6F2]/40 hover:bg-white p-6 rounded-xl border border-[#E8E6E0] hover:border-[#1D9E75]/40 hover:shadow-[0_0_20px_rgba(29,158,117,0.04)] transition-all duration-300 flex flex-col justify-between group">
                    <div>
                      {/* Card Header Info */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-10 h-10 rounded-lg bg-[#1D9E75]/10 flex items-center justify-center border border-[#1D9E75]/20 group-hover:bg-[#1D9E75] group-hover:text-white transition-all duration-300 text-[#1D9E75]">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-mono text-[9px] text-[#888780] tracking-wider">{`[ ${value.index} ]`}</span>
                      </div>

                      {/* Content */}
                      <h3 className="text-lg font-serif text-[#1C1C1A] mb-3 group-hover:text-[#1D9E75] transition-colors duration-300">
                        {value.title}
                      </h3>
                      <p className="text-[#888780] text-xs leading-relaxed font-sans">
                        {value.desc}
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