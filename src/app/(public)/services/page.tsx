import { Metadata } from 'next'
import { db } from '@/db'
import { services, techStacks } from '@/db/schema'
import { eq, asc } from 'drizzle-orm'
import { AnimatedSection } from '@/components/public/shared/animated-section'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Services — Rootly',
  description: 'We build web applications, mobile apps, internal systems, and deliver exceptional UI/UX design.',
}

const iconMap: Record<string, any> = {
  Globe: ({ className }: { className?: string }) => <svg className={className} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>,
  Smartphone: ({ className }: { className?: string }) => <svg className={className} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg>,
  Building2: ({ className }: { className?: string }) => <svg className={className} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>,
  Palette: ({ className }: { className?: string }) => <svg className={className} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="19" cy="13" r="2"/><circle cx="6" cy="12" r="2"/><circle cx="10" cy="18" r="2"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z"/></svg>,
  Code: ({ className }: { className?: string }) => <svg className={className} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16,18 22,12 16,6"/><polyline points="8,6 2,12 8,18"/></svg>,
  Database: ({ className }: { className?: string }) => <svg className={className} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
}

export default async function ServicesPage() {
  const serviceList = await db.select().from(services).where(eq(services.isActive, true)).orderBy(asc(services.displayOrder))
  const techList = await db.select().from(techStacks).where(eq(techStacks.isActive, true))

  return (
    <div className="pt-20">
      <section className="py-20 bg-[#F7F6F2]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <AnimatedSection>
            <h1 className="text-5xl font-serif text-[#1C1C1A] mb-6">Our Services</h1>
            <p className="text-xl text-[#888780] max-w-2xl">
              We focus on what we do best: building software that works and lasts.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-24">
          {serviceList.map((service, index) => {
            const IconComponent = iconMap[service.icon] || iconMap.Code
            return (
              <AnimatedSection key={service.id} delay={index * 0.1}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="w-16 h-16 bg-[#1D9E75]/10 rounded-xl flex items-center justify-center mb-6">
                      <IconComponent className="text-[#1D9E75]" />
                    </div>
                    <h2 className="text-3xl font-serif text-[#1C1C1A] mb-4">{service.title}</h2>
                    <p className="text-[#888780] mb-6">{service.description}</p>
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-[#1C1C1A] mb-3">Use cases:</h4>
                      <ul className="space-y-2">
                        {service.useCases.map((useCase: string) => (
                          <li key={useCase} className="text-[#888780] flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-[#1D9E75] rounded-full" />{useCase}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link href="/contact" className="inline-flex items-center text-[#1D9E75] font-medium hover:underline">
                      Discuss your project <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                  <div className={`aspect-[4/3] bg-[#F7F6F2] rounded-lg flex items-center justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <IconComponent className="text-[#1D9E75] opacity-30" />
                  </div>
                </div>
              </AnimatedSection>
            )
          })}
        </div>
      </section>

      <section className="py-20 bg-[#F7F6F2]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <AnimatedSection>
            <h2 className="text-3xl font-serif text-[#1C1C1A] text-center mb-12">Technologies We Use</h2>
          </AnimatedSection>
          <div className="flex flex-wrap justify-center gap-4">
            {techList.map((tech) => (
              <span key={tech.id} className="px-4 py-2 bg-white border border-[#E8E6E0] rounded-full text-sm text-[#1C1C1A]">
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}