import { auth } from '@/lib/auth'
import { db } from '@/db'
import { techStacks } from '@/db/schema'
import { techStackSchema } from '@/lib/validations/tech-stack'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    const { id } = await params
    const item = await db.query.techStacks.findFirst({ where: eq(techStacks.id, id) })
    if (!item) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
    return NextResponse.json({ success: true, data: item })
  } catch { return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 }) }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    const { id } = await params
    const body = await request.json()
    const parsed = techStackSchema.safeParse(body)
    if (!parsed.success) return NextResponse.json({ success: false, error: parsed.error.flatten() }, { status: 400 })
    const [updated] = await db.update(techStacks).set({ ...parsed.data, updatedAt: new Date() }).where(eq(techStacks.id, id)).returning()
    if (!updated) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
    return NextResponse.json({ success: true, data: updated })
  } catch { return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 }) }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    const { id } = await params
    const [deleted] = await db.delete(techStacks).where(eq(techStacks.id, id)).returning()
    if (!deleted) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
    return NextResponse.json({ success: true, data: deleted })
  } catch { return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 }) }
}