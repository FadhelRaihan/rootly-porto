import { Metadata } from 'next'
import { db } from '@/db'
import { projects, projectTechStacks, techStacks, testimonials } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatedSection } from '@/components/public/shared/animated-section'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ExternalLink, Star } from 'lucide-react'
import { CTA } from '@/components/public/shared/cta'
import { getServerTranslation } from '@/lib/i18n-server'
import { localizedField, localizedCategory } from '@/lib/lang-utils'

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
  const { language } = await getServerTranslation()
  const { slug } = await params
  const project = await db.query.projects.findFirst({ where: eq(projects.slug, slug) })
  if (!project) return { title: 'Project Not Found' }
  return {
    title: `${localizedField(language, project.title, project.titleId)} — Rootly`,
    description: localizedField(language, project.summary, project.summaryId),
  }
}

export default async function PortfolioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { language } = await getServerTranslation()
  const { slug } = await params

  const project = await db.query.projects.findFirst({
    where: eq(projects.slug, slug),
  })

  if (!project) notFound()

  const [techs, testimonial] = await Promise.all([
    db
      .select({ techStack: techStacks })
      .from(projectTechStacks)
      .innerJoin(techStacks, eq(projectTechStacks.techStackId, techStacks.id))
      .where(eq(projectTechStacks.projectId, project.id)),
    db.query.testimonials.findFirst({
      where: eq(testimonials.projectId, project.id),
    })
  ])

  return (
    <div className="pt-20 bg-rootly-background min-h-screen text-rootly-text">
      {/* Hero */}
      <section className="py-14 relative overflow-hidden border-b border-dashed border-rootly-border">
        {/* Warm Dotted Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#1d9e7508_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <Link href="/portfolio" className="inline-flex items-center text-rootly-muted hover:text-rootly-primary mb-8 font-mono text-xs uppercase tracking-wider group">
            <ArrowLeft className="w-3.5 h-3.5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Registry
          </Link>
          
          <AnimatedSection>
            <div className="flex flex-wrap items-center gap-3 mb-5 font-mono text-[10px] text-rootly-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{"[ " + localizedCategory(project.category, language).toUpperCase() + " ]"}</span>
              <span>{"//"}</span>
              <span>{`YEAR ${project.year}`}</span>
              {project.isFeatured && (
                <>
                  <span>{"//"}</span>
                  <span className="text-rootly-primary font-bold">{"[ FEATURED_CORE ]"}</span>
                </>
              )}
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-rootly-text mb-4 leading-tight">
              {localizedField(language, project.title, project.titleId)}
            </h1>
            
            {project.showClient && (project.client || project.clientId) && (
              <div className="flex items-center gap-2 font-mono text-xs text-rootly-muted">
                <span className="text-rootly-muted">PARTNER //</span>
                <span className="font-bold text-rootly-text">{localizedField(language, project.client || '', project.clientId)}</span>
              </div>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 bg-rootly-surface relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          
          {/* Main Visual Image Frame */}
          <AnimatedSection delay={0.1}>
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-16 border border-rootly-border p-1 bg-rootly-background shadow-sm">
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <Image src={project.thumbnailUrl} alt={localizedField(language, project.title, project.titleId)} fill sizes="(max-width: 1200px) 100vw, 1200px" className="object-cover" priority />
              </div>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-12">
              <AnimatedSection>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-[9px] text-rootly-primary tracking-widest uppercase">{"[ PHASE 01 // PROBLEM STATEMENT ]"}</span>
                </div>
                <h2 className="text-2xl font-serif text-rootly-text mb-4">The Challenge</h2>
                <p className="text-rootly-muted text-sm leading-relaxed font-sans whitespace-pre-line">{localizedField(language, project.challenge, project.challengeId)}</p>
              </AnimatedSection>

              <AnimatedSection>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-[9px] text-rootly-primary tracking-widest uppercase">{"[ PHASE 02 // ARCHITECTURE IMPLEMENTATION ]"}</span>
                </div>
                <h2 className="text-2xl font-serif text-rootly-text mb-4">Our Solution</h2>
                <p className="text-rootly-muted text-sm leading-relaxed font-sans whitespace-pre-line">{localizedField(language, project.solution, project.solutionId)}</p>
              </AnimatedSection>

              <AnimatedSection>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-[9px] text-rootly-primary tracking-widest uppercase">{"[ PHASE 03 // METRIC RESULTS ]"}</span>
                </div>
                <h2 className="text-2xl font-serif text-rootly-text mb-4">The Impact</h2>
                <p className="text-rootly-muted text-sm leading-relaxed font-sans whitespace-pre-line">{localizedField(language, project.impact, project.impactId)}</p>
              </AnimatedSection>
            </div>

            {/* Right Sidebar Details Column */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Tech Registry Widget */}
              <AnimatedSection>
                <div className="bg-rootly-background/50 p-6 rounded-2xl border border-rootly-border">
                  <span className="font-mono text-[9px] text-rootly-primary tracking-widest uppercase block mb-4">{"[ SYSTEM // REGISTERED TECH ]"}</span>
                  <h3 className="text-lg font-serif text-rootly-text mb-4">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {techs.map((t) => (
                      <span 
                        key={t.techStack.id} 
                        className="px-3 py-1.5 bg-rootly-surface border border-rootly-border rounded-lg text-xs font-mono text-rootly-text flex items-center gap-1.5 hover:border-rootly-primary/35 transition-all duration-200"
                      >
                        <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                        {t.techStack.name}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* Action Live URL Button */}
              {project.liveUrl && (
                <AnimatedSection>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full bg-rootly-primary hover:brightness-90 text-white font-mono text-xs tracking-widest uppercase py-6 rounded-xl hover:shadow-[0_0_20px_rgba(29,158,117,0.2)] transition-all duration-300">
                      <ExternalLink className="mr-2 w-4 h-4" />
                      EXECUTE LIVE ENVIRONMENT //
                    </Button>
                  </a>
                </AnimatedSection>
              )}

              {/* Client Testimonial Registry Widget */}
              {testimonial && (
                <AnimatedSection>
                  <div className="bg-rootly-background/50 p-6 rounded-2xl border border-rootly-border relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-rootly-primary/5 rounded-bl-full pointer-events-none" />
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[9px] text-rootly-primary tracking-widest uppercase">{"[ TESTIMONY // VERIFIED ]"}</span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-rootly-primary text-rootly-primary" />
                        ))}
                      </div>
                    </div>

                    <p className="text-rootly-muted text-xs italic leading-relaxed mb-6 font-sans border-l border-rootly-primary pl-3">
                      {"\"" + localizedField(language, testimonial.quote, testimonial.quoteId) + "\""}
                    </p>

                    {/* Aligned client passport footer */}
                    <div className="font-mono text-[10px] text-rootly-muted grid grid-cols-[50px_1fr] gap-x-2 gap-y-0.5 border-t border-dashed border-rootly-border pt-4 leading-normal">
                      <span className="text-rootly-muted whitespace-nowrap">ID  //</span>
                      <span className="font-bold text-rootly-text truncate">{localizedField(language, testimonial.clientName, testimonial.clientNameId)}</span>

                      <span className="text-rootly-muted whitespace-nowrap">ORG //</span>
                      <span className="text-rootly-muted break-words">{localizedField(language, testimonial.clientCompany, testimonial.clientCompanyId)}</span>

                      <span className="text-rootly-muted whitespace-nowrap">POS //</span>
                      <span className="text-rootly-muted break-words">{localizedField(language, testimonial.clientRole, testimonial.clientRoleId)}</span>
                    </div>
                  </div>
                </AnimatedSection>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* Reusable CTA Section */}
      <CTA />
    </div>
  )
}