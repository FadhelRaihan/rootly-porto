import { Metadata } from 'next'
import { db } from '@/db'
import { projects } from '@/db/schema'
import { asc } from 'drizzle-orm'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatedSection } from '@/components/public/shared/animated-section'
import { SlidingTabs } from '@/components/public/portfolio/SlidingTabs'
import { Sparkles } from 'lucide-react'
import { CTA } from '@/components/public/shared/cta'
import { getServerTranslation } from '@/lib/i18n-server'
import { localizedField, localizedCategory } from '@/lib/lang-utils'

export const metadata: Metadata = {
  title: 'Portfolio — Rootly',
  description: 'See our recent projects in web development, mobile apps, and internal systems.',
}

export default async function PortfolioPage({ searchParams }: { searchParams: Promise<{ category?: string; page?: string }> }) {
  const { language } = await getServerTranslation()
  const { category } = await searchParams
  let allProjects: any[] = []

  try {
    allProjects = await db
      .select()
      .from(projects)
      .orderBy(asc(projects.displayOrder))
  } catch (error) {
    console.error('Database fetch failed in PortfolioPage, using fallback:', error)
  }

  const filteredProjects = category
    ? allProjects.filter((p) => p.category === category)
    : allProjects

  const categories = ['WEB_APP', 'MOBILE', 'INTERNAL_SYSTEM', 'DESIGN']
  const localizedLabels = Object.fromEntries(categories.map(c => [c, localizedCategory(c, language)]))

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
                {"[ SYSTEM // REGISTRY OF WORK ]"}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-rootly-text mb-6 leading-tight">
              Our Work
            </h1>
            <p className="text-lg text-rootly-muted max-w-2xl font-mono text-xs">
              A SELECTION OF COMPLETED BUILDS AND DEPLOYED SYSTEMS, EACH PROVING RIGOROUS QUALITY.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-12 bg-rootly-surface border-b border-rootly-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SlidingTabs 
            categories={categories} 
            categoryLabels={localizedLabels} 
            allProjectsCount={allProjects.length} 
            categoryCounts={{
              WEB_APP: allProjects.filter(p => p.category === 'WEB_APP').length,
              MOBILE: allProjects.filter(p => p.category === 'MOBILE').length,
              INTERNAL_SYSTEM: allProjects.filter(p => p.category === 'INTERNAL_SYSTEM').length,
              DESIGN: allProjects.filter(p => p.category === 'DESIGN').length,
            }}
          />
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-rootly-surface">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <AnimatedSection key={project.id} delay={index * 0.1}>
                <Link href={`/portfolio/${project.slug}`} className="group block h-full">
                  <div className="bg-rootly-surface text-rootly-text p-5 rounded-2xl border border-rootly-border hover:border-rootly-primary/50 hover:shadow-[0_0_25px_rgba(29,158,117,0.06)] transition-all duration-300 group flex flex-col justify-between h-full relative overflow-hidden">
                    <div>
                      {/* Image Container with Badges */}
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-5">
                        {/* Top Category Badge */}
                        <div className="absolute top-3 left-3 bg-rootly-surface/90 backdrop-blur-md text-rootly-text text-[9px] font-mono font-bold px-3 py-1.5 rounded-lg z-20 border border-rootly-border uppercase tracking-wider">
                          {"[ " + localizedCategory(project.category, language).toUpperCase() + " ]"}
                        </div>

                        {/* Floating Right Sparkle Icon */}
                        <div className="absolute top-3 right-3 bg-rootly-surface/90 backdrop-blur-md p-2 rounded-xl z-20 border border-rootly-border text-rootly-primary">
                          <Sparkles className="w-4 h-4" />
                        </div>

                        <Image
                          src={project.thumbnailUrl}
                          alt={localizedField(language, project.title, project.titleId)}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                      </div>

                      {/* Build Hash & Index */}
                      <div className="font-mono text-[9px] text-rootly-muted mb-2 block">
                        {"[ BUILD // #00" + (index + 1) + " ]"}
                      </div>

                      {/* Title & Client Area */}
                      <h3 className="text-lg sm:text-xl font-bold text-rootly-text mb-2 group-hover:text-rootly-primary transition-colors line-clamp-2">
                        {localizedField(language, project.title, project.titleId)}
                      </h3>
                      
                      <div className="flex items-center gap-2 text-rootly-muted text-xs mb-4">
                        <div className="w-5 h-5 rounded-full bg-rootly-primary/10 flex items-center justify-center text-[9px] font-bold text-rootly-primary border border-rootly-primary/20">
                          {localizedField(language, project.client || 'C', project.clientId).charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium line-clamp-1">{localizedField(language, project.client || 'Rootly Partner', project.clientId) || 'Rootly Partner'}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-1" />
                      </div>
                    </div>

                    {/* Bottom Rolling Panel */}
                    <div className="relative h-[76px] w-full overflow-hidden mt-2 rounded-xl border border-rootly-border bg-rootly-background">
                      <div className="absolute inset-0 transition-transform duration-500 ease-in-out transform translate-y-0 group-hover:-translate-y-1/2 flex flex-col w-full h-[200%]">
                        {/* Layer A: Stats Panel */}
                        <div className="flex justify-between w-full h-[76px] items-center px-4 shrink-0 bg-rootly-background">
                          <div>
                            <span className="text-[9px] text-rootly-muted uppercase tracking-widest block mb-1">{language === 'id' ? 'Tech Stack' : 'Tech Stack'}</span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="w-2 h-2 rounded-full bg-rootly-primary animate-pulse" />
                              <span className="text-xs font-semibold text-rootly-text">
                                {project.category === 'WEB_APP' && 'Next.js / TS'}
                                {project.category === 'MOBILE' && 'Flutter / Dart'}
                                {project.category === 'INTERNAL_SYSTEM' && 'Node.js / React'}
                                {project.category === 'DESIGN' && 'Figma / Canvas'}
                                {!['WEB_APP', 'MOBILE', 'INTERNAL_SYSTEM', 'DESIGN'].includes(project.category) && 'Fullstack'}
                              </span>
                            </div>
                          </div>
                          <div className="text-rootly-primary text-xs font-extrabold bg-rootly-primary/10 px-3 py-1.5 rounded-lg border border-rootly-primary/20">
                            Year {project.year}
                          </div>
                        </div>
                        
                        {/* Layer B: Project Description */}
                        <div className="flex items-center w-full h-[76px] px-4 bg-rootly-primary/5">
                          <p className="line-clamp-2 text-xs text-rootly-text font-regular italic leading-relaxed">
                            {localizedField(language, project.summary, project.summaryId)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20 font-mono text-xs text-rootly-muted">
              <p>{"NO PROJECTS FOUND FOR THIS CATEGORY NODE."}</p>
            </div>
          )}
        </div>
      </section>

      {/* Reusable CTA Section */}
      <CTA />
    </div>
  )
}