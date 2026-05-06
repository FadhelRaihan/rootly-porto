import { db } from '@/db'
import { projects, projectTechStacks, techStacks, testimonials } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const project = await db.query.projects.findFirst({
      where: eq(projects.slug, slug),
    })

    if (!project) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 })
    }

    const techs = await db
      .select({ techStack: techStacks })
      .from(projectTechStacks)
      .innerJoin(techStacks, eq(projectTechStacks.techStackId, techStacks.id))
      .where(eq(projectTechStacks.projectId, project.id))

    const testimonial = await db.query.testimonials.findFirst({
      where: eq(testimonials.projectId, project.id),
    })

    return NextResponse.json({
      success: true,
      data: {
        ...project,
        techStacks: techs.map((t) => t.techStack),
        testimonial,
      },
    })
  } catch (error) {
    console.error('Error fetching project:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}