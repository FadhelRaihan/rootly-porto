import { db } from '@/db'
import { techStacks } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const allTechStacks = await db
      .select()
      .from(techStacks)
      .where(eq(techStacks.isActive, true))

    const grouped = allTechStacks.reduce((acc, tech) => {
      if (!acc[tech.category]) {
        acc[tech.category] = []
      }
      acc[tech.category].push(tech)
      return acc
    }, {} as Record<string, typeof allTechStacks>)

    return NextResponse.json({ success: true, data: grouped })
  } catch (error) {
    console.error('Error fetching tech stacks:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}