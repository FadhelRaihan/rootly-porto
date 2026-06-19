import { Metadata } from 'next'
import { db } from '@/db'
import { services, techStacks } from '@/db/schema'
import { eq, asc } from 'drizzle-orm'
import { AnimatedSection } from '@/components/public/shared/animated-section'
import Link from 'next/link'
import { ArrowRight, Terminal, Globe, Smartphone, Building2, Palette, Code } from 'lucide-react'
import { CTA } from '@/components/public/shared/cta'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Services — Rootly',
  description: 'We build web applications, mobile apps, internal systems, and deliver exceptional UI/UX design.',
}

const iconMap: Record<string, any> = {
  Globe,
  Smartphone,
  Building2,
  Palette,
  Code
}

export default async function ServicesPage() {
  let serviceList: any[] = []
  let techList: any[] = []

  try {
    serviceList = await db.select().from(services).where(eq(services.isActive, true)).orderBy(asc(services.displayOrder))
    techList = await db.select().from(techStacks).where(eq(techStacks.isActive, true))
  } catch (error) {
    console.error('Database fetch failed in ServicesPage, using fallback:', error)
  }

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
                {"[ SYSTEM // PROTOCOL CAPABILITIES ]"}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#1C1C1A] mb-6 leading-tight">
              Our Services
            </h1>
            <p className="text-lg text-[#888780] max-w-2xl font-mono text-xs">
              WE FOCUS ON WHAT WE DO BEST: ANCHORING SYSTEMS IN CLEAN CODE AND DURABLE DIGITAL ARCHITECTURE.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-28 relative z-10">
          {serviceList.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Code
            const protocolNum = `0X0${index + 1}`
            
            return (
              <AnimatedSection key={service.id} delay={index * 0.1}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                  
                  {/* Left Column: Descriptions */}
                  <div className={`lg:col-span-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="font-mono text-[9px] text-[#1D9E75] tracking-widest uppercase">{`[ SERVICE // ${protocolNum} ]`}</span>
                    </div>
                    
                    <h2 className="text-3xl font-serif text-[#1C1C1A] mb-4">{service.title}</h2>
                    <p className="text-[#888780] text-sm leading-relaxed mb-6">{service.description}</p>
                    
                    {/* Use Cases styled as parameter diagnostics */}
                    <div className="mb-6 bg-[#F7F6F2]/50 border border-[#E8E6E0] rounded-xl p-5">
                      <h4 className="text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-3">{"[ TARGET APPLICATION CASES ]"}</h4>
                      <ul className="space-y-2">
                        {service.useCases.map((useCase: string) => (
                          <li key={useCase} className="text-xs text-[#888780] flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 bg-[#1D9E75] rounded-full shrink-0 mt-1.5" />
                            <span className="leading-normal">{useCase}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link href="/contact" className="inline-flex items-center gap-2 text-[#1D9E75] font-mono text-xs tracking-wider uppercase hover:underline group">
                      INITIALIZE PROTOCOL CONNECTION 
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  {/* Right Column: Console Graphic Visual */}
                  <div className={`lg:col-span-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="bg-[#1C1C1A] text-gray-300 rounded-2xl p-6 border border-[#2A2A28] shadow-xl font-mono text-xs relative overflow-hidden hover:border-[#1D9E75]/40 transition-all duration-300">
                      {/* Hexagon / Grid background */}
                      <div className="absolute inset-0 bg-[radial-gradient(rgba(29,158,117,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

                      {/* Header bar */}
                      <div className="flex items-center justify-between border-b border-[#2A2A28] pb-4 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                          </div>
                          <span className="text-[9px] text-gray-500 ml-2">
                            {service.icon === 'Globe' && 'web_builder.sh'}
                            {service.icon === 'Smartphone' && 'mobile_compiler.py'}
                            {service.icon === 'Building2' && 'enterprise_db.cfg'}
                            {service.icon === 'Palette' && 'design_system.canvas'}
                            {!['Globe', 'Smartphone', 'Building2', 'Palette'].includes(service.icon) && 'node_protocol.io'}
                          </span>
                        </div>
                        <span className="text-[8px] px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/25 text-emerald-400">
                          {`PORT_${protocolNum}`}
                        </span>
                      </div>

                      {/* Info & Badges */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-[#1D9E75]">
                            <IconComponent className="w-6 h-6" />
                          </div>
                          <div>
                            <span className="text-[10px] text-gray-500 block">PROTOCOL COMPLIANCE</span>
                            <span className="text-white font-bold tracking-wide uppercase">
                              {service.title.split(' ')[0]} MODULE
                            </span>
                          </div>
                        </div>

                        {/* Interactive Stats Grid */}
                        <div className="grid grid-cols-2 gap-3 py-3 border-y border-dashed border-[#2A2A28]">
                          {service.icon === 'Globe' && (
                            <>
                              <div>
                                <span className="text-gray-500 block text-[8px]">CORE FRAMEWORK</span>
                                <span className="text-white font-semibold">NEXT.JS / REACT</span>
                              </div>
                              <div>
                                <span className="text-gray-500 block text-[8px]">RENDERING BASE</span>
                                <span className="text-white font-semibold">HYBRID SSG/SSR</span>
                              </div>
                            </>
                          )}
                          {service.icon === 'Smartphone' && (
                            <>
                              <div>
                                <span className="text-gray-500 block text-[8px]">DEPLOY ARCHITECTURE</span>
                                <span className="text-white font-semibold">HYBRID FLUTTER</span>
                              </div>
                              <div>
                                <span className="text-gray-500 block text-[8px]">TARGET SYNC</span>
                                <span className="text-white font-semibold">IOS / ANDROID</span>
                              </div>
                            </>
                          )}
                          {service.icon === 'Building2' && (
                            <>
                              <div>
                                <span className="text-gray-500 block text-[8px]">PIPELINE INTEGRITY</span>
                                <span className="text-white font-semibold">JWT / SECURE SSO</span>
                              </div>
                              <div>
                                <span className="text-gray-500 block text-[8px]">DATABASE TYPE</span>
                                <span className="text-white font-semibold">POSTGRES / REST</span>
                              </div>
                            </>
                          )}
                          {service.icon === 'Palette' && (
                            <>
                              <div>
                                <span className="text-gray-500 block text-[8px]">PROTOTYPE CANVAS</span>
                                <span className="text-white font-semibold">FIGMA SYSTEM</span>
                              </div>
                              <div>
                                <span className="text-gray-500 block text-[8px]">USER ACCESSIBILITY</span>
                                <span className="text-white font-semibold">WCAG AA COMPLY</span>
                              </div>
                            </>
                          )}
                          {!['Globe', 'Smartphone', 'Building2', 'Palette'].includes(service.icon) && (
                            <>
                              <div>
                                <span className="text-gray-500 block text-[8px]">ENGINE COMPATIBILITY</span>
                                <span className="text-white font-semibold">RESTful API</span>
                              </div>
                              <div>
                                <span className="text-gray-500 block text-[8px]">SECURITY LAYER</span>
                                <span className="text-white font-semibold">SSL SECURED</span>
                              </div>
                            </>
                          )}
                        </div>

                        {/* Interactive Console Screen */}
                        <div className="bg-[#121211] p-3 rounded-lg border border-[#2A2A28] font-mono text-[9px] text-emerald-400/90 space-y-1">
                          <div className="flex items-center gap-1.5 text-gray-500">
                            <Terminal className="w-3 h-3" />
                            <span>diagnostic_output.log</span>
                          </div>
                          
                          {service.icon === 'Globe' && (
                            <>
                              <p className="text-gray-500 mt-1">{"// Rendering web assets"}</p>
                              <p>&gt; Page Load Latency: 12ms (SSG)</p>
                              <p>&gt; SEO Index Status: OPTIMIZED</p>
                            </>
                          )}
                          {service.icon === 'Smartphone' && (
                            <>
                              <p className="text-gray-500 mt-1">{"// Running device sync"}</p>
                              <p>&gt; UI Compositor Rate: 120 FPS</p>
                              <p>&gt; Native Handshake status: OK</p>
                            </>
                          )}
                          {service.icon === 'Building2' && (
                            <>
                              <p className="text-gray-500 mt-1">{"// Authenticating user roles"}</p>
                              <p>&gt; Secure Sockets: STABLE</p>
                              <p>&gt; Enterprise pipeline synced</p>
                            </>
                          )}
                          {service.icon === 'Palette' && (
                            <>
                              <p className="text-gray-500 mt-1">{"// Compiling design tokens"}</p>
                              <p>&gt; Fluid Layout Scale: ACTIVE</p>
                              <p>&gt; WCAG Contrast Check: PASS</p>
                            </>
                          )}
                          {!['Globe', 'Smartphone', 'Building2', 'Palette'].includes(service.icon) && (
                            <>
                              <p className="text-gray-500 mt-1">{"// Starting custom protocol"}</p>
                              <p>&gt; Sync status: ACTIVE</p>
                              <p>&gt; Health diagnostics: 100% OK</p>
                            </>
                          )}
                        </div>

                      </div>
                    </div>
                  </div>

                </div>
              </AnimatedSection>
            )
          })}
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-24 bg-[#F7F6F2] relative overflow-hidden border-t border-dashed border-[#E8E6E0]">
        <div className="absolute inset-0 bg-[radial-gradient(#1d9e7506_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-[10px] font-mono tracking-widest text-[#1D9E75] uppercase block mb-3">{"[ SYSTEM REGISTRY // TECH PACKAGES ]"}</span>
              <h2 className="text-3xl font-serif text-[#1C1C1A] text-center mb-4">Technologies We Use</h2>
              <p className="text-[#888780] text-xs font-mono">SUPPORTED DEVELOPMENT PROTOCOLS ON MAINNET</p>
            </div>
          </AnimatedSection>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {techList.map((tech) => (
              <span 
                key={tech.id} 
                className="px-4.5 py-2 bg-white border border-[#E8E6E0] rounded-xl text-xs font-mono text-[#1C1C1A] flex items-center gap-2 hover:border-[#1D9E75]/45 hover:shadow-xs transition-all duration-200 cursor-default"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Reusable CTA Section */}
      <CTA />
    </div>
  )
}