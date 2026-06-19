import React from 'react'
import { db } from '@/db'
import { projects, services, testimonials, techStacks } from '@/db/schema'
import { eq, and, asc } from 'drizzle-orm'
import Link from 'next/link'
import Image from 'next/image'
// import { Metadata } from 'next'
import { AnimatedSection } from '@/components/public/shared/animated-section'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, CheckCircle2, Sparkles, Cpu, Layers, Network } from 'lucide-react'

export const revalidate = 3600

// export const metadata: Metadata = {
//   title: 'Rootly — Software House | Technology with Roots',
//   description: 'Rootly adalah software house yang membangun web app, mobile app, dan sistem digital dengan pendekatan hangat, jujur, dan berakar pada nilai.',
//   openGraph: {
//     title: 'Rootly — Technology with Roots',
//     description: 'We build digital products that matter.',
//     url: 'https://rootly.id',
//     siteName: 'Rootly',
//     locale: 'en_US',
//     type: 'website',
//   },
// }

async function getData() {
  const featuredProjects = await db
    .select()
    .from(projects)
    .where(eq(projects.isFeatured, true))
    .orderBy(asc(projects.displayOrder))
    .limit(3)

  const activeServices = await db
    .select()
    .from(services)
    .where(eq(services.isActive, true))
    .orderBy(asc(services.displayOrder))
    .limit(4)

  const featuredTestimonials = await db
    .select()
    .from(testimonials)
    .where(and(eq(testimonials.isFeatured, true), eq(testimonials.isActive, true)))
    .orderBy(asc(testimonials.displayOrder))

  const clientProjects = await db
    .select({ client: projects.client })
    .from(projects)
    .where(eq(projects.showClient, true))
    .orderBy(asc(projects.displayOrder))

  const dbProjects = await db
    .select({
      id: projects.id,
      serviceId: projects.serviceId,
      category: projects.category,
    })
    .from(projects)

  const activeTech = await db
    .select()
    .from(techStacks)
    .where(eq(techStacks.isActive, true))

  return { featuredProjects, activeServices, featuredTestimonials, clientProjects, dbProjects, activeTech }
}


const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe: ({ className }: { className?: string }) => <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>,
  Smartphone: ({ className }: { className?: string }) => <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M12 18h.01" /></svg>,
  Building2: ({ className }: { className?: string }) => <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" /><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" /><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" /><path d="M10 6h4" /><path d="M10 10h4" /><path d="M10 14h4" /><path d="M10 18h4" /></svg>,
  Palette: ({ className }: { className?: string }) => <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="13.5" cy="6.5" r="2.5" /><circle cx="19" cy="13" r="2" /><circle cx="6" cy="12" r="2" /><circle cx="10" cy="18" r="2" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z" /></svg>,
}

export default async function HomePage() {
  const { featuredProjects, activeServices, featuredTestimonials, clientProjects, dbProjects, activeTech } = await getData()

  const clients = clientProjects
    .map(p => p.client)
    .filter((client): client is string => typeof client === 'string' && client.trim() !== '')

  const displayClients = clients.length > 0
    ? Array.from(new Set(clients))
    : ['TaniKita', 'SehatConnect', 'LogistikID']

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center bg-[#F7F6F2] relative overflow-hidden">
        {/* Subtle Dotted Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#1d9e7506_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
        {/* Ambient Pulsing Glow Circle */}
        <div className="absolute top-1/2 left-1/3 transform -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#1D9E75]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column (Typography & Call to Action) */}
            <div className="lg:col-span-7">
              <AnimatedSection>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1D9E75]/10 border border-[#1D9E75]/15 text-[#1D9E75] rounded-full text-xs font-semibold tracking-wider uppercase mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1D9E75] animate-pulse" />
                  Protocol Node v2.0.4 // Active
                </div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#1C1C1A] leading-tight mb-6">
                  Engineering Digital Ecosystems. Technology with <span className="text-[#1D9E75] font-inria">Rootly.</span>
                </h1>
                
                <p className="text-base sm:text-lg text-[#888780] mb-8 max-w-xl leading-relaxed">
                  We build digital products designed to last, crafted with software-craftsmanship care, and rooted in decentralized resilience.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Link href="/contact">
                    <Button size="lg" className="bg-[#1D9E75] hover:bg-[#1a8c66] shadow-sm cursor-pointer text-sm sm:text-base">
                      Start a Project
                    </Button>
                  </Link>
                  <Link href="/portfolio">
                    <Button size="lg" variant="outline" className="border-[#E8E6E0] bg-white text-gray-700 hover:text-black hover:border-gray-400 shadow-2xs cursor-pointer text-sm sm:text-base">
                      View Our Work
                    </Button>
                  </Link>
                </div>
              </AnimatedSection>
            </div>
            
            {/* Right Column (Glassmorphic Web3 Status Dashboard) */}
            <div className="lg:col-span-5 hidden lg:block">
              <AnimatedSection delay={0.2}>
                <div className="bg-white/40 backdrop-blur-md border border-[#E8E6E0] rounded-2xl p-6 shadow-sm relative overflow-hidden group hover:border-[#1D9E75]/30 transition-all duration-300">
                  {/* Decorative corner lights */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#1D9E75]/5 rounded-full blur-xl pointer-events-none group-hover:bg-[#1D9E75]/10 transition-colors" />
                  
                  {/* Dashboard Header */}
                  <div className="flex items-center justify-between border-b border-[#E8E6E0]/60 pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <span className="w-2 h-2 rounded-full bg-emerald-500 absolute" />
                      <span className="text-xs font-mono font-bold text-[#1C1C1A]">SYSTEM REPORT // ROOTLY</span>
                    </div>
                    <Badge variant="outline" className="border-[#E8E6E0] bg-white/60 text-gray-500 text-[9px] font-mono tracking-wider px-2 py-0.5 rounded">
                      VER: 0x2A9B
                    </Badge>
                  </div>
                  
                  {/* Dashboard Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div className="border border-[#E8E6E0]/50 rounded-xl p-3 bg-white/50">
                      <span className="text-[9px] text-[#888780] font-mono block uppercase">Client Satisfaction</span>
                      <span className="text-xl font-bold text-[#1C1C1A] mt-1 block font-serif">100%</span>
                      <span className="text-[9px] text-emerald-600 font-mono flex items-center gap-1 mt-0.5">
                        <span>●</span> Operational
                      </span>
                    </div>
                    <div className="border border-[#E8E6E0]/50 rounded-xl p-3 bg-white/50">
                      <span className="text-[9px] text-[#888780] font-mono block uppercase">Latency</span>
                      <span className="text-xl font-bold text-[#1C1C1A] mt-1 block font-serif">14ms</span>
                      <span className="text-[9px] text-emerald-600 font-mono flex items-center gap-1 mt-0.5">
                        <span>●</span> Optimized
                      </span>
                    </div>
                    <div className="border border-[#E8E6E0]/50 rounded-xl p-3 bg-white/50">
                      <span className="text-[9px] text-[#888780] font-mono block uppercase">Active Shipped</span>
                      <span className="text-xl font-bold text-[#1C1C1A] mt-1 block font-serif">24+ Nodes</span>
                      <span className="text-[9px] text-gray-400 font-mono flex items-center gap-1 mt-0.5">
                        <span>●</span> Production
                      </span>
                    </div>
                    <div className="border border-[#E8E6E0]/50 rounded-xl p-3 bg-white/50">
                      <span className="text-[9px] text-[#888780] font-mono block uppercase">Environment</span>
                      <span className="text-xl font-bold text-[#1C1C1A] mt-1 block font-serif">RSC / Next</span>
                      <span className="text-[9px] text-gray-400 font-mono flex items-center gap-1 mt-0.5">
                        <span>●</span> Compiler Core
                      </span>
                    </div>
                  </div>
                  
                  {/* Console Log area */}
                  <div className="border border-[#E8E6E0]/50 rounded-xl p-3 bg-black/5 text-[#1C1C1A]/80 font-mono text-[10px] leading-relaxed relative">
                    <div className="flex items-center justify-between border-b border-[#E8E6E0]/50 pb-1.5 mb-1.5 text-[#888780]">
                      <span>CONSOLE FEED</span>
                      <span className="text-[9px] animate-pulse">● LIVE</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex gap-1.5">
                        <span className="text-[#1D9E75]">&gt;</span>
                        <span>Compiling system nodes... [OK]</span>
                      </div>
                      <div className="flex gap-1.5">
                        <span className="text-[#1D9E75]">&gt;</span>
                        <span>Checking active pipelines... [SECURE]</span>
                      </div>
                      <div className="flex gap-1.5">
                        <span className="text-[#1D9E75]">&gt;</span>
                        <span>Resolving user-interfaces... done.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar (Web3 Dotted Node Marquee) */}
      <section className="py-14 bg-white border-y border-dashed border-[#E8E6E0] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <p className="text-center text-[#888780] text-xs font-mono tracking-widest uppercase mb-8">{"// CONNECTED NODE COLLABORATORS"}</p>

          <style dangerouslySetInnerHTML={{
            __html: `
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .marquee-wrapper {
              position: relative;
              width: 100%;
              overflow: hidden;
            }
            .marquee-wrapper::before,
            .marquee-wrapper::after {
              content: '';
              position: absolute;
              top: 0;
              bottom: 0;
              width: 8rem;
              z-index: 10;
              pointer-events: none;
            }
            .marquee-wrapper::before {
              left: 0;
              background: linear-gradient(to right, white, transparent);
            }
            .marquee-wrapper::after {
              right: 0;
              background: linear-gradient(to left, white, transparent);
            }
            .marquee-content {
              display: flex;
              width: max-content;
              animation: marquee 25s linear infinite;
              gap: 1.5rem;
              will-change: transform;
            }
            .marquee-wrapper:hover .marquee-content {
              animation-play-state: paused;
            }
          `}} />

          {/* Infinite Marquee Node Flow (Desktop & Mobile Unified) */}
          <div className="marquee-wrapper">
            <div className="marquee-content py-2">
              <div className="flex gap-6 items-center shrink-0">
                {[...displayClients, ...displayClients, ...displayClients].map((client, i) => (
                  <div 
                    key={`m1-${i}`} 
                    className="flex items-center gap-2.5 px-4 py-2 border border-[#E8E6E0] rounded-full bg-[#F7F6F2] hover:bg-white transition-all duration-300 hover:border-[#1D9E75]/45 hover:shadow-xs group cursor-default"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-[#1C1C1A] tracking-wide font-serif">{client}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-6 items-center shrink-0" aria-hidden="true">
                {[...displayClients, ...displayClients, ...displayClients].map((client, i) => (
                  <div 
                    key={`m2-${i}`} 
                    className="flex items-center gap-2.5 px-4 py-2 border border-[#E8E6E0] rounded-full bg-[#F7F6F2] hover:bg-white transition-all duration-300 hover:border-[#1D9E75]/45 hover:shadow-xs group cursor-default"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-[#1C1C1A] tracking-wide font-serif">{client}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-[#F7F6F2] relative overflow-hidden">
        {/* Subtle Warm Dotted Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#1d9e7506_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-[10px] font-mono tracking-widest text-[#1D9E75] uppercase block mb-3">{"[ 01 // CORE CAPABILITIES ]"}</span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#1C1C1A] mb-4">What We Do</h2>
              <p className="text-[#888780] max-w-2xl mx-auto text-sm">
                We focus on building software that solves real problems and lasts for years, not just weeks.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {activeServices.map((service, index) => {
              const IconComponent = iconMap[service.icon] || iconMap.Globe
              
              // Calculate dynamic project count for this service directly from the DB
              const projectCount = dbProjects.filter((project) => {
                if (project.serviceId === service.id) return true;
                const serviceIconToCategoryMap: Record<string, string> = {
                  Globe: 'WEB_APP',
                  Smartphone: 'MOBILE',
                  Building2: 'INTERNAL_SYSTEM',
                  Palette: 'DESIGN',
                };
                return project.category === serviceIconToCategoryMap[service.icon];
              }).length;

              return (
                <AnimatedSection key={service.id} delay={index * 0.1}>
                  <Link href="/services" className="block h-full">
                    <div className="bg-white h-full p-8 rounded-2xl border border-[#E8E6E0] hover:border-[#1D9E75]/50 hover:shadow-[0_0_20px_rgba(29,158,117,0.06)] transition-all duration-300 group flex flex-col justify-between cursor-pointer relative overflow-hidden">
                      {/* Node Index & Status */}
                      <div className="absolute top-4 right-4 flex items-center gap-1.5 font-mono text-[9px] text-[#888780]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>{"[ NODE 0" + (index + 1) + " ]"}</span>
                      </div>

                      <div className="mt-2">
                        <div className="w-12 h-12 bg-[#1D9E75]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#1D9E75] transition-colors">
                          <IconComponent className="text-[#1D9E75] group-hover:text-white" />
                        </div>
                        <h3 className="text-xl font-serif text-[#1C1C1A] mb-3">{service.title}</h3>
                        <p className="text-[#888780] text-sm mb-6 leading-relaxed">{service.summary}</p>
                      </div>

                      {/* Bottom Row: Aligned Side-by-Side with dashed separator */}
                      <div className="flex items-center justify-between pt-4 border-t border-dashed border-[#E8E6E0]">
                        <span className="text-[10px] font-mono font-bold text-[#1C1C1A]">{"[ DEPLOYS: 0" + projectCount + " ]"}</span>
                        <span className="text-[#1D9E75] text-xs font-semibold inline-flex items-center group-hover:underline">
                          Learn more <ArrowRight className="ml-1 w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* Warm Cyber Grid Section (Tech Stack) */}
      <section className="py-20 bg-white border-b border-[#E8E6E0] relative overflow-hidden">
        {/* Subtle Warm Dotted Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#1d9e750b_1.5px,transparent_1.5px)] bg-[size:24px_24px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="text-[10px] font-mono tracking-widest text-[#1D9E75] uppercase block mb-3">{"[ 02 // ENGINE DEPENDENCIES ]"}</span>
              <h2 className="text-3xl md:text-4xl font-serif text-[#1C1C1A] mb-4">Our Technology Stack</h2>
              <p className="text-[#888780] max-w-xl mx-auto text-sm">
                We orchestrate a verified suite of modern programming languages, libraries, and deployment pipelines.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-2 sm:gap-3 max-w-4xl mx-auto">
              {activeTech.map((tech) => (
                <div 
                  key={tech.id}
                  className="flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl border border-[#E8E6E0] bg-[#F7F6F2] text-[#1C1C1A] hover:border-[#1D9E75]/45 hover:bg-white hover:shadow-[0_0_15px_rgba(29,158,117,0.06)] hover:-translate-y-0.5 transition-all duration-300 group cursor-default shadow-2xs justify-center sm:justify-start"
                >
                  <div className="w-6 sm:w-6.5 h-6 sm:h-6.5 rounded-md sm:rounded-lg bg-white border border-[#E8E6E0] flex items-center justify-center overflow-hidden shrink-0 transition-colors group-hover:border-[#1D9E75]/35 relative">
                    {tech.iconUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img 
                        src={tech.iconUrl} 
                        alt={tech.name} 
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain"
                      />
                    ) : (
                      <span className="text-[8px] sm:text-[9px] font-bold text-gray-400 font-mono">
                        {tech.name.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-[11px] sm:text-xs font-semibold text-[#1C1C1A] group-hover:text-[#1D9E75] transition-colors">
                      {tech.name}
                    </span>
                    <span className="hidden sm:inline-block text-[8px] font-mono text-[#888780] bg-white border border-[#E8E6E0]/60 px-1.5 py-0.5 rounded-md uppercase tracking-wider scale-90 group-hover:border-[#1D9E75]/20 group-hover:text-[#1D9E75] transition-colors">
                      {tech.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-[#F7F6F2] relative overflow-hidden">
        {/* Subtle Warm Dotted Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#1d9e7506_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <AnimatedSection>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12 sm:mb-16">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#1D9E75] uppercase block mb-3">{"[ 03 // DEPLOYED SYSTEM ARCHIVES ]"}</span>
                <h2 className="text-3xl sm:text-4xl font-serif text-[#1C1C1A] mb-4">Featured Work</h2>
              </div>
              <Link href="/portfolio">
                <Button variant="ghost" className="text-[#1D9E75] cursor-pointer p-0 sm:p-4">View all projects <ArrowRight className="ml-2 w-4 h-4" /></Button>
              </Link>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <AnimatedSection key={project.id} delay={index * 0.1}>
                <Link href={`/portfolio/${project.slug}`} className="group block h-full">
                  <div className="bg-white text-[#1C1C1A] p-5 rounded-2xl border border-[#E8E6E0] hover:border-[#1D9E75]/50 hover:shadow-[0_0_25px_rgba(29,158,117,0.06)] transition-all duration-300 group flex flex-col justify-between h-full relative overflow-hidden">
                    <div>
                      {/* Image Container with Badges */}
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-5">
                        {/* Top Category Badge */}
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[#1C1C1A] text-[9px] font-mono font-bold px-3 py-1.5 rounded-lg z-20 border border-[#E8E6E0] uppercase tracking-wider">
                          {"[ " + project.category.replace('_', ' ') + " ]"}
                        </div>

                        {/* Floating Right Sparkle Icon */}
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md p-2 rounded-xl z-20 border border-[#E8E6E0] text-[#1D9E75]">
                          <Sparkles className="w-4 h-4" />
                        </div>

                        <Image
                          src={project.thumbnailUrl}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                      </div>

                      {/* Build Hash & Index */}
                      <div className="font-mono text-[9px] text-[#888780] mb-2 block">
                        {"[ BUILD // #00" + (index + 1) + " ]"}
                      </div>

                      {/* Title & Client Area */}
                      <h3 className="text-lg sm:text-xl font-bold text-[#1C1C1A] mb-2 group-hover:text-[#1D9E75] transition-colors line-clamp-2">
                        {project.title}
                      </h3>
                      
                      <div className="flex items-center gap-2 text-[#888780] text-xs mb-4">
                        <div className="w-5 h-5 rounded-full bg-[#1D9E75]/10 flex items-center justify-center text-[9px] font-bold text-[#1D9E75] border border-[#1D9E75]/20">
                          C
                        </div>
                        <span className="font-medium line-clamp-1">{project.client || 'Rootly Partner'}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-1" />
                      </div>
                    </div>

                    {/* Bottom Rolling Panel */}
                    <div className="relative h-[76px] w-full overflow-hidden mt-2 rounded-xl border border-[#E8E6E0] bg-[#F7F6F2]">
                      <div className="absolute inset-0 transition-transform duration-500 ease-in-out transform translate-y-0 group-hover:-translate-y-1/2 flex flex-col w-full h-[200%]">
                        {/* Layer A: Stats Panel */}
                        <div className="flex justify-between w-full h-[76px] items-center px-4 shrink-0 bg-[#F7F6F2]">
                          <div>
                            <span className="text-[9px] text-[#888780] uppercase tracking-widest block mb-1">Tech Stack</span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="w-2 h-2 rounded-full bg-[#1D9E75] animate-pulse" />
                              <span className="text-xs font-semibold text-[#1C1C1A]">
                                {project.id === 'proj01' && 'Next.js'}
                                {project.id === 'proj02' && 'Flutter'}
                                {project.id === 'proj03' && 'Node.js'}
                                {!['proj01', 'proj02', 'proj03'].includes(project.id) && 'Fullstack'}
                              </span>
                            </div>
                          </div>
                          <div className="text-[#1D9E75] text-xs font-extrabold bg-[#1D9E75]/10 px-3 py-1.5 rounded-lg border border-[#1D9E75]/20">
                            Year {project.year}
                          </div>
                        </div>
                        
                        {/* Layer B: Project Description */}
                        <div className="flex items-center w-full h-[76px] px-4 bg-[#1D9E75]/5">
                          <p className="line-clamp-2 text-xs text-[#1C1C1A] font-regular italic leading-relaxed">
                            {project.summary}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-[#1C1C1A] text-white relative overflow-hidden">
        {/* Subtle Cyber Dotted Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
        {/* Ambient Glow Orb */}
        <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-[#1D9E75]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-[10px] font-mono tracking-widest text-[#1D9E75] uppercase block mb-3">{"[ 04 // PROTOCOL CONSENSUS & PHILOSOPHY ]"}</span>
              <h2 className="text-3xl sm:text-4xl font-serif mb-4">Why Rootly?</h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-sm">We are different from typical agencies. Here is what drives us.</p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Grounded', desc: 'We build software that solves actual problems, not just impressive-looking features.', icon: Cpu },
              { title: 'Purposeful', desc: 'Every line of code serves a clear purpose and delivers measurable value.', icon: Layers },
              { title: 'Warmth', desc: 'We communicate honestly and treat your project like it is our own.', icon: Network },
              { title: 'Long-lasting', desc: 'We build for the long term, not quick wins that break later.', icon: CheckCircle2 },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <AnimatedSection key={item.title} delay={index * 0.1}>
                  <div className="bg-white/[0.03] backdrop-blur-xs border border-white/10 rounded-2xl p-6 hover:border-[#1D9E75]/40 hover:bg-white/[0.06] hover:shadow-[0_0_20px_rgba(29,158,117,0.08)] transition-all duration-300 group relative">
                    {/* Index tag */}
                    <div className="absolute top-4 right-4 font-mono text-[9px] text-gray-500">
                      {"[ SYS // 0" + (index + 1) + " ]"}
                    </div>

                    <div className="w-11 h-11 border border-[#1D9E75]/30 bg-[#1D9E75]/10 text-[#1D9E75] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#1D9E75] group-hover:text-white transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    <h3 className="text-xl font-serif mb-3 text-white">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#F7F6F2] relative overflow-hidden">
        {/* Subtle Warm Dotted Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#1d9e7506_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-[10px] font-mono tracking-widest text-[#1D9E75] uppercase block mb-3">{"[ 05 // VERIFIED CLIENT CONSENSUS FEEDBACK ]"}</span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#1C1C1A] mb-4">What Our Clients Say</h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredTestimonials.map((testimonial, index) => (
              <AnimatedSection key={testimonial.id} delay={index * 0.1}>
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8E6E0] hover:border-[#1D9E75]/50 hover:shadow-[0_0_25px_rgba(29,158,117,0.06)] transition-all duration-300 group flex flex-col justify-between relative overflow-hidden">
                  
                  {/* Card Header Row: Flex layout instead of absolute positioning */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 relative z-10">
                    {/* Console Rating Badge */}
                    <div className="inline-block px-2.5 py-1 bg-[#1D9E75]/10 border border-[#1D9E75]/25 rounded-md text-[#1D9E75] text-[9px] font-mono font-bold uppercase tracking-wider self-start">
                      {"[ SCORE // " + "★".repeat(testimonial.rating || 5) + " ]"}
                    </div>

                    {/* Cryptographic Signature Verification Badge */}
                    <div className="flex items-center gap-1.5 font-mono text-[9px] text-[#888780] self-start sm:self-auto">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>{"[ "}</span>
                      <span className="hidden sm:inline">{"SIGNATURE // "}</span>
                      <span>{"0x" + (testimonial.id ? testimonial.id.slice(0, 4) : "8a2f") + "...5C ]"}</span>
                    </div>
                  </div>

                  <div className="mt-2">
                    {/* Quote wrapped in terminal border */}
                    <p className="text-[#1C1C1A] mb-6 italic border-l-2 border-[#1D9E75] pl-4 text-sm leading-relaxed">
                      {"\"" + testimonial.quote + "\""}
                    </p>
                  </div>

                  {/* Client passport metadata footer */}
                  <div className="flex items-center gap-4 mt-2 pt-4 border-t border-dashed border-[#E8E6E0]">
                    {testimonial.clientPhoto && (
                      <div className="relative w-12 h-12 rounded-xl border border-[#E8E6E0] bg-[#F7F6F2] overflow-hidden shrink-0">
                        <Image 
                          src={testimonial.clientPhoto} 
                          alt={testimonial.clientName} 
                          fill
                          className="object-cover" 
                        />
                      </div>
                    )}
                    <div className="font-mono text-[11px] text-[#888780] overflow-hidden grid grid-cols-[auto_1fr] gap-x-2 gap-y-0.5 leading-normal">
                      <span className="text-gray-400 whitespace-nowrap">ID  //</span>
                      <span className="font-bold text-[#1C1C1A] truncate">{testimonial.clientName}</span>

                      <span className="text-gray-400 whitespace-nowrap">ORG //</span>
                      <span className="text-[#888780] break-words">{testimonial.clientCompany}</span>

                      <span className="text-gray-400 whitespace-nowrap">POS //</span>
                      <span className="text-[#888780] break-words">{testimonial.clientRole}</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#1D9E75] to-[#12664B] relative overflow-hidden">
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
                  <Button size="lg" variant="secondary" className="text-[#1D9E75] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 cursor-pointer">
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
    </div>
  )
}