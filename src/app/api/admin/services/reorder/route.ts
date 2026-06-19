import { auth } from '@/lib/auth'
import { db } from '@/db'
import { services } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { ids } = body

    if (!ids || !Array.isArray(ids)) {
      return NextResponse.json({ success: false, error: 'Invalid payload: expected array of ids' }, { status: 400 })
    }

    // Perform sequential bulk update inside database transaction to ensure safety
    await db.transaction(async (tx) => {
      for (let i = 0; i < ids.length; i++) {
        await tx
          .update(services)
          .set({ displayOrder: i })
          .where(eq(services.id, ids[i]))
      }
    })

    return NextResponse.json({ success: true, message: 'Services reordered successfully' })
  } catch (error) {
    console.error('Error reordering services:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
