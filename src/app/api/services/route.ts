import { db } from '@/db'
import { services, serviceTechStacks, techStacks } from '@/db/schema'
import { eq, asc } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const serviceList = await db
      .select()
      .from(services)
      .where(eq(services.isActive, true))
      .orderBy(asc(services.displayOrder))

    const servicesWithTech = await Promise.all(
      serviceList.map(async (service) => {
        const techs = await db
          .select({ techStack: techStacks })
          .from(serviceTechStacks)
          .innerJoin(techStacks, eq(serviceTechStacks.techStackId, techStacks.id))
          .where(eq(serviceTechStacks.serviceId, service.id))
        return { ...service, techStacks: techs.map((t) => t.techStack) }
      })
    )

    return NextResponse.json({ success: true, data: servicesWithTech })
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}