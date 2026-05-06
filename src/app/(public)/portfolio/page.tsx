import { Metadata } from 'next'
import { db } from '@/db'
import { projects } from '@/db/schema'
import { asc } from 'drizzle-orm'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatedSection } from '@/components/public/shared/animated-section'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Portfolio — Rootly',
  description: 'See our recent projects in web development, mobile apps, and internal systems.',
}

const categoryLabels: Record<string, string> = {
  WEB_APP: 'Web App',
  MOBILE: 'Mobile',
  INTERNAL_SYSTEM: 'Internal System',
  DESIGN: 'Design',
}

export default async function PortfolioPage({ searchParams }: { searchParams: Promise<{ category?: string; page?: string }> }) {
  const { category } = await searchParams
  const allProjects = await db
    .select()
    .from(projects)
    .orderBy(asc(projects.displayOrder))

  const filteredProjects = category
    ? allProjects.filter((p) => p.category === category)
    : allProjects

  const categories = ['WEB_APP', 'MOBILE', 'INTERNAL_SYSTEM', 'DESIGN']

  return (
    <div className="pt-20">
      <section className="py-20 bg-[#F7F6F2]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <AnimatedSection>
            <h1 className="text-5xl font-serif text-[#1C1C1A] mb-6">Our Work</h1>
            <p className="text-xl text-[#888780] max-w-2xl">
              A selection of projects we have worked on, each solving real problems.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-12 bg-white border-b border-[#E8E6E0]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-wrap gap-4">
            <Link
              href="/portfolio"
              className={`px-4 py-2 rounded-full text-sm transition-colors ${!category ? 'bg-[#1D9E75] text-white' : 'bg-[#F7F6F2] text-[#1C1C1A] hover:bg-[#E8E6E0]'}`}
            >
              All
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/portfolio?category=${cat}`}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${category === cat ? 'bg-[#1D9E75] text-white' : 'bg-[#F7F6F2] text-[#1C1C1A] hover:bg-[#E8E6E0]'}`}
              >
                {categoryLabels[cat]}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
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
                    <Badge variant="outline" className="text-xs border-[#E8E6E0] text-[#888780]">
                      {categoryLabels[project.category]}
                    </Badge>
                    <span className="text-xs text-[#888780]">• {project.year}</span>
                    {project.isFeatured && (
                      <Badge className="text-xs bg-[#1D9E75]">Featured</Badge>
                    )}
                  </div>
                  <h3 className="text-xl font-serif text-[#1C1C1A] group-hover:text-[#1D9E75] transition-colors">
                    {project.title}
                  </h3>
                  {project.showClient && project.client && (
                    <p className="text-sm text-[#888780] mt-1">{project.client}</p>
                  )}
                  <p className="text-[#888780] text-sm mt-2 line-clamp-2">{project.summary}</p>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[#888780]">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}