import { auth } from '@/lib/auth'
import { db } from '@/db'
import { services, serviceTechStacks } from '@/db/schema'
import { serviceSchema } from '@/lib/validations/service'
import { eq, desc } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const serviceList = await db.select().from(services).orderBy(desc(services.createdAt))
    return NextResponse.json({ success: true, data: serviceList })
  } catch (error) {
    console.error('Error fetching services:', error)
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
    const parsed = serviceSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.flatten() }, { status: 400 })
    }

    const { techStackIds, ...serviceData } = parsed.data

    const [service] = await db.insert(services).values(serviceData).returning()

    if (techStackIds && techStackIds.length > 0) {
      const techRelations = techStackIds.map((techId) => ({
        serviceId: service.id,
        techStackId: techId,
      }))
      await db.insert(serviceTechStacks).values(techRelations)
    }

    return NextResponse.json({ success: true, data: service }, { status: 201 })
  } catch (error) {
    console.error('Error creating service:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}