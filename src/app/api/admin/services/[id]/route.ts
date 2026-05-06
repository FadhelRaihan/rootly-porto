import { auth } from '@/lib/auth'
import { db } from '@/db'
import { services, serviceTechStacks, techStacks } from '@/db/schema'
import { serviceSchema } from '@/lib/validations/service'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    const { id } = await params
    const service = await db.query.services.findFirst({ where: eq(services.id, id) })
    if (!service) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
    const techs = await db.select({ techStack: techStacks }).from(serviceTechStacks).innerJoin(techStacks, eq(serviceTechStacks.techStackId, techStacks.id)).where(eq(serviceTechStacks.serviceId, service.id))
    return NextResponse.json({ success: true, data: { ...service, techStackIds: techs.map((t) => t.techStack.id) } })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    const { id } = await params
    const body = await request.json()
    const parsed = serviceSchema.safeParse(body)
    if (!parsed.success) return NextResponse.json({ success: false, error: parsed.error.flatten() }, { status: 400 })
    const { techStackIds, ...serviceData } = parsed.data
    const [updated] = await db.update(services).set({ ...serviceData, updatedAt: new Date() }).where(eq(services.id, id)).returning()
    if (!updated) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
    if (techStackIds) {
      await db.delete(serviceTechStacks).where(eq(serviceTechStacks.serviceId, id))
      if (techStackIds.length > 0) await db.insert(serviceTechStacks).values(techStackIds.map((techId: string) => ({ serviceId: id, techStackId: techId })))
    }
    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    const { id } = await params
    const [deleted] = await db.delete(services).where(eq(services.id, id)).returning()
    if (!deleted) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
    return NextResponse.json({ success: true, data: deleted })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 })
  }
}