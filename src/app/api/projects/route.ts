import { db } from '@/db'
import { projects, projectTechStacks, techStacks, projectCategoryEnum } from '@/db/schema'
import { eq, and, desc, asc, sql } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '9')
    const offset = (page - 1) * limit

    const conditions = []

    if (category && projectCategoryEnum.enumValues.includes(category as any)) {
      conditions.push(eq(projects.category, category as any))
    }

    if (featured === 'true') {
      conditions.push(eq(projects.isFeatured, true))
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined

    const projectList = await db
      .select()
      .from(projects)
      .where(whereClause)
      .orderBy(asc(projects.displayOrder), desc(projects.createdAt))
      .limit(limit)
      .offset(offset)

    const projectsWithTech = await Promise.all(
      projectList.map(async (project) => {
        const techs = await db
          .select({ techStack: techStacks })
          .from(projectTechStacks)
          .innerJoin(techStacks, eq(projectTechStacks.techStackId, techStacks.id))
          .where(eq(projectTechStacks.projectId, project.id))
        return { ...project, techStacks: techs.map((t) => t.techStack) }
      })
    )

    return NextResponse.json({ success: true, data: projectsWithTech })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}