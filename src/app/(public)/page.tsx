import React from 'react'
import { db } from '@/db'
import { projects, services, testimonials } from '@/db/schema'
import { eq, and, asc } from 'drizzle-orm'
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { AnimatedSection } from '@/components/public/shared/animated-section'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle2, Star } from 'lucide-react'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Rootly — Software House | Technology with Roots',
  description: 'Rootly adalah software house yang membangun web app, mobile app, dan sistem digital dengan pendekatan hangat, jujur, dan berakar pada nilai.',
  openGraph: {
    title: 'Rootly — Technology with Roots',
    description: 'We build digital products that matter.',
    url: 'https://rootly.id',
    siteName: 'Rootly',
    locale: 'en_US',
    type: 'website',
  },
}

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

  return { featuredProjects, activeServices, featuredTestimonials }
}


const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe: ({ className }: { className?: string }) => <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>,
  Smartphone: ({ className }: { className?: string }) => <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg>,
  Building2: ({ className }: { className?: string }) => <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>,
  Palette: ({ className }: { className?: string }) => <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="19" cy="13" r="2"/><circle cx="6" cy="12" r="2"/><circle cx="10" cy="18" r="2"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z"/></svg>,
}

export default async function HomePage() {
  const { featuredProjects, activeServices, featuredTestimonials } = await getData()

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center bg-[#F7F6F2]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-20">
          <AnimatedSection>
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-serif text-[#1C1C1A] leading-tight mb-6">
                Technology with <span className="text-[#1D9E75]">roots.</span>
              </h1>
              <p className="text-xl text-[#888780] mb-8 max-w-2xl">
                We build digital products that matter — designed to last, crafted with care, and rooted in honest partnership.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-[#1D9E75] hover:bg-[#1a8c66]">Start a Project</Button>
                </Link>
                <Link href="/portfolio">
                  <Button size="lg" variant="outline" className="border-[#1D9E75] text-[#1D9E75] hover:bg-[#1D9E75] hover:text-white">View Our Work</Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 bg-white border-y border-[#E8E6E0]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <p className="text-center text-[#888780] text-sm mb-8">Trusted by innovative companies</p>
          <div className="flex justify-center items-center gap-12 flex-wrap opacity-60">
            <span className="text-xl font-serif text-[#1C1C1A]">TaniKita</span>
            <span className="text-xl font-serif text-[#1C1C1A]">SehatConnect</span>
            <span className="text-xl font-serif text-[#1C1C1A]">LogistikID</span>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-[#F7F6F2]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif text-[#1C1C1A] mb-4">What We Do</h2>
              <p className="text-[#888780] max-w-2xl mx-auto">
                We focus on building software that solves real problems and lasts for years, not just weeks.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {activeServices.map((service, index) => {
              const IconComponent = iconMap[service.icon] || iconMap.Globe
              return (
                <AnimatedSection key={service.id} delay={index * 0.1}>
                  <div className="bg-white p-8 rounded-lg border border-[#E8E6E0] hover:border-[#1D9E75] transition-colors group">
                    <div className="w-12 h-12 bg-[#1D9E75]/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#1D9E75] transition-colors">
                      <IconComponent className="text-[#1D9E75] group-hover:text-white" />
                    </div>
                    <h3 className="text-xl font-serif text-[#1C1C1A] mb-3">{service.title}</h3>
                    <p className="text-[#888780] text-sm mb-4">{service.summary}</p>
                    <Link href="/services" className="text-[#1D9E75] text-sm font-medium inline-flex items-center hover:underline">
                      Learn more <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <AnimatedSection>
            <div className="flex justify-between items-end mb-16">
              <div>
                <h2 className="text-4xl font-serif text-[#1C1C1A] mb-4">Featured Work</h2>
                <p className="text-[#888780]">Projects we are proud of</p>
              </div>
              <Link href="/portfolio">
                <Button variant="ghost" className="text-[#1D9E75]">View all projects <ArrowRight className="ml-2 w-4 h-4" /></Button>
              </Link>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <AnimatedSection key={project.id} delay={index * 0.1}>
                <Link href={`/portfolio/${project.slug}`} className="group block">
                  <div className="relative aspect-[4/3] mb-4 overflow-hidden rounded-lg" style={{ position: 'relative' }}>
                    <Image
                      src={project.thumbnailUrl}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-[#1D9E75] uppercase tracking-wider">{project.category.replace('_', ' ')}</span>
                    <span className="text-xs text-[#888780]">• {project.year}</span>
                  </div>
                  <h3 className="text-xl font-serif text-[#1C1C1A] group-hover:text-[#1D9E75] transition-colors">{project.title}</h3>
                  <p className="text-[#888780] text-sm mt-2 line-clamp-2">{project.summary}</p>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-[#1C1C1A] text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif mb-4">Why Rootly?</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">We are different from typical agencies. Here is what drives us.</p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Grounded', desc: 'We build software that solves actual problems, not just impressive-looking features.' },
              { title: 'Purposeful', desc: 'Every line of code serves a clear purpose and delivers measurable value.' },
              { title: 'Warmth', desc: 'We communicate honestly and treat your project like it is our own.' },
              { title: 'Long-lasting', desc: 'We build for the long term, not quick wins that break later.' },
            ].map((item, index) => (
              <AnimatedSection key={item.title} delay={index * 0.1}>
                <div className="p-6">
                  <div className="w-10 h-10 bg-[#1D9E75] rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="text-white" />
                  </div>
                  <h3 className="text-xl font-serif mb-3">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#F7F6F2]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif text-[#1C1C1A] mb-4">What Our Clients Say</h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredTestimonials.map((testimonial, index) => (
              <AnimatedSection key={testimonial.id} delay={index * 0.1}>
                <div className="bg-white p-8 rounded-lg border border-[#E8E6E0]">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#1D9E75] text-[#1D9E75]" />
                    ))}
                  </div>
                  <p className="text-[#1C1C1A] mb-6 italic">{testimonial.quote}</p>
                  <div className="flex items-center gap-3">
                    {testimonial.clientPhoto && (
                      <Image src={testimonial.clientPhoto} alt={testimonial.clientName} width={48} height={48} className="rounded-full" />
                    )}
                    <div>
                      <p className="font-medium text-[#1C1C1A]">{testimonial.clientName}</p>
                      <p className="text-sm text-[#888780]">{testimonial.clientRole} at {testimonial.clientCompany}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#1D9E75]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-4xl font-serif text-white mb-4">Ready to build something meaningful?</h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">Let us help you turn your idea into a digital product that truly works.</p>
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="text-[#1D9E75]">Start a Conversation</Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}