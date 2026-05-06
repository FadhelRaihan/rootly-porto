import { Metadata } from 'next'
import { db } from '@/db'
import { projects, projectTechStacks, techStacks, testimonials } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatedSection } from '@/components/public/shared/animated-section'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ExternalLink, Star } from 'lucide-react'

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  try {
    const allProjects = await db.select({ slug: projects.slug }).from(projects)
    return allProjects.map((p) => ({ slug: p.slug }))
  } catch {
    return [{ slug: 'tani-kita-agriculture-platform' }, { slug: 'sehat-connect-healthcare-app' }, { slug: 'logistik-id-internal-system' }]
  }
}

export const revalidate = 3600

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = await db.query.projects.findFirst({ where: eq(projects.slug, slug) })
  if (!project) return { title: 'Project Not Found' }
  return {
    title: `${project.title} — Rootly`,
    description: project.summary,
  }
}

const categoryLabels: Record<string, string> = {
  WEB_APP: 'Web App',
  MOBILE: 'Mobile',
  INTERNAL_SYSTEM: 'Internal System',
  DESIGN: 'Design',
}

export default async function PortfolioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const project = await db.query.projects.findFirst({
    where: eq(projects.slug, slug),
  })

  if (!project) notFound()

  const techs = await db
    .select({ techStack: techStacks })
    .from(projectTechStacks)
    .innerJoin(techStacks, eq(projectTechStacks.techStackId, techStacks.id))
    .where(eq(projectTechStacks.projectId, project.id))

  const testimonial = await db.query.testimonials.findFirst({
    where: eq(testimonials.projectId, project.id),
  })

  return (
    <div className="pt-20">
      <section className="py-12 bg-[#F7F6F2]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Link href="/portfolio" className="inline-flex items-center text-[#888780] hover:text-[#1D9E75] mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />Back to Portfolio
          </Link>
          <AnimatedSection>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <Badge className="bg-[#1D9E75]">{categoryLabels[project.category]}</Badge>
              <span className="text-[#888780]">{project.year}</span>
              {project.isFeatured && <Badge className="bg-[#5DCAA5]">Featured</Badge>}
            </div>
            <h1 className="text-4xl md:text-5xl font-serif text-[#1C1C1A] mb-4">{project.title}</h1>
            {project.showClient && project.client && (
              <p className="text-xl text-[#888780]">Client: {project.client}</p>
            )}
          </AnimatedSection>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <AnimatedSection delay={0.1}>
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-12" style={{ position: 'relative' }}>
              <Image src={project.thumbnailUrl} alt={project.title} fill className="object-cover" priority />
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <AnimatedSection>
                <h2 className="text-2xl font-serif text-[#1C1C1A] mb-4">The Challenge</h2>
                <p className="text-[#888780] leading-relaxed">{project.challenge}</p>
              </AnimatedSection>

              <AnimatedSection>
                <h2 className="text-2xl font-serif text-[#1C1C1A] mb-4">Our Solution</h2>
                <p className="text-[#888780] leading-relaxed">{project.solution}</p>
              </AnimatedSection>

              <AnimatedSection>
                <h2 className="text-2xl font-serif text-[#1C1C1A] mb-4">The Impact</h2>
                <p className="text-[#888780] leading-relaxed">{project.impact}</p>
              </AnimatedSection>
            </div>

            <div className="space-y-8">
              <AnimatedSection>
                <div className="bg-[#F7F6F2] p-6 rounded-lg">
                  <h3 className="text-lg font-serif text-[#1C1C1A] mb-4">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {techs.map((t) => (
                      <Badge key={t.techStack.id} variant="outline" className="border-[#E8E6E0]">
                        {t.techStack.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {project.liveUrl && (
                <AnimatedSection>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-[#1D9E75]">
                      <ExternalLink className="mr-2 w-4 h-4" />View Live Project
                    </Button>
                  </a>
                </AnimatedSection>
              )}

              {testimonial && (
                <AnimatedSection>
                  <div className="bg-[#F7F6F2] p-6 rounded-lg">
                    <div className="flex gap-1 mb-3">
                      {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#1D9E75] text-[#1D9E75]" />
                      ))}
                    </div>
                    <p className="text-[#888780] italic mb-4">{testimonial.quote}</p>
                    <div>
                      <p className="font-medium text-[#1C1C1A]">{testimonial.clientName}</p>
                      <p className="text-sm text-[#888780]">{testimonial.clientRole} at {testimonial.clientCompany}</p>
                    </div>
                  </div>
                </AnimatedSection>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#1D9E75]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-serif text-white mb-4">Have a similar project in mind?</h2>
            <p className="text-white/80 mb-8">Let us help you bring your vision to life.</p>
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="text-[#1D9E75]">Start a Conversation</Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}