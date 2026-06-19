import { auth } from '@/lib/auth'
import { db } from '@/db'
import { testimonials } from '@/db/schema'
import { testimonialSchema } from '@/lib/validations/testimonial'
import { desc, sql } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    const list = await db.select().from(testimonials).orderBy(desc(testimonials.createdAt))
    return NextResponse.json({ success: true, data: list })
  } catch { return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 }) }
}

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    const body = await request.json()
    const parsed = testimonialSchema.safeParse(body)
    if (!parsed.success) return NextResponse.json({ success: false, error: parsed.error.flatten() }, { status: 400 })
    
    // Get max displayOrder to assign the next position if default (0) is passed
    const maxOrderResult = await db
      .select({ maxOrder: sql<number>`coalesce(max(${testimonials.displayOrder}), -1)` })
      .from(testimonials)
    const nextOrder = (maxOrderResult[0]?.maxOrder ?? -1) + 1

    const [created] = await db.insert(testimonials).values({
      ...parsed.data,
      displayOrder: parsed.data.displayOrder === 0 ? nextOrder : parsed.data.displayOrder,
    }).returning()
    return NextResponse.json({ success: true, data: created }, { status: 201 })
  } catch { return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 }) }
}