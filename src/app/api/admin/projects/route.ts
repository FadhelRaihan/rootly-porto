import { auth } from '@/lib/auth'
import { db } from '@/db'
import { projects, projectTechStacks } from '@/db/schema'
import { projectSchema } from '@/lib/validations/project'
import { desc, sql } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const projectList = await db
      .select()
      .from(projects)
      .orderBy(desc(projects.createdAt))

    return NextResponse.json({ success: true, data: projectList })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const parsed = projectSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { techStackIds, ...projectData } = parsed.data

    // Get max displayOrder to assign the next position if default (0) is passed
    const maxOrderResult = await db
      .select({ maxOrder: sql<number>`coalesce(max(${projects.displayOrder}), -1)` })
      .from(projects)
    const nextOrder = (maxOrderResult[0]?.maxOrder ?? -1) + 1

    const [project] = await db
      .insert(projects)
      .values({
        ...projectData,
        displayOrder: projectData.displayOrder === 0 ? nextOrder : projectData.displayOrder,
        images: projectData.images || [],
        liveUrl: projectData.liveUrl || null,
      })
      .returning()

    if (techStackIds && techStackIds.length > 0) {
      const techRelations = techStackIds.map((techId) => ({
        projectId: project.id,
        techStackId: techId,
      }))
      await db.insert(projectTechStacks).values(techRelations)
    }

    return NextResponse.json({ success: true, data: project }, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}