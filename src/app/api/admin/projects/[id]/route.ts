import { auth } from '@/lib/auth'
import { db } from '@/db'
import { projects, projectTechStacks, techStacks } from '@/db/schema'
import { projectSchema } from '@/lib/validations/project'
import { eq, and } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const project = await db.query.projects.findFirst({
      where: eq(projects.id, id),
    })

    if (!project) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 })
    }

    const techs = await db
      .select({ techStack: techStacks })
      .from(projectTechStacks)
      .innerJoin(techStacks, eq(projectTechStacks.techStackId, techStacks.id))
      .where(eq(projectTechStacks.projectId, project.id))

    return NextResponse.json({
      success: true,
      data: {
        ...project,
        techStackIds: techs.map((t) => t.techStack.id),
      },
    })
  } catch (error) {
    console.error('Error fetching project:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const parsed = projectSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { techStackIds, ...projectData } = parsed.data

    const [updated] = await db
      .update(projects)
      .set({
        ...projectData,
        images: projectData.images || [],
        liveUrl: projectData.liveUrl || null,
        updatedAt: new Date(),
      })
      .where(eq(projects.id, id))
      .returning()

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 })
    }

    if (techStackIds) {
      await db.delete(projectTechStacks).where(eq(projectTechStacks.projectId, id))
      if (techStackIds.length > 0) {
        const techRelations = techStackIds.map((techId) => ({
          projectId: id,
          techStackId: techId,
        }))
        await db.insert(projectTechStacks).values(techRelations)
      }
    }

    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const [deleted] = await db.delete(projects).where(eq(projects.id, id)).returning()

    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: deleted })
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}