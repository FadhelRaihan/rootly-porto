import { db } from '@/db'
import { testimonials } from '@/db/schema'
import { eq, and, asc } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')

    const conditions = [eq(testimonials.isActive, true)]
    if (featured === 'true') {
      conditions.push(eq(testimonials.isFeatured, true))
    }

    const testimonialList = await db
      .select()
      .from(testimonials)
      .where(and(...conditions))
      .orderBy(asc(testimonials.displayOrder))

    return NextResponse.json({ success: true, data: testimonialList })
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}