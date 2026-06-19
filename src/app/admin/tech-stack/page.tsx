import { db } from '@/db'
import { techStacks } from '@/db/schema'
import { desc } from 'drizzle-orm'
import { TechStackClient } from '@/components/admin/tech-stack-client'

export default async function TechStackPage() {
  const list = await db.select().from(techStacks).orderBy(desc(techStacks.createdAt))
  return <TechStackClient techList={list as any} />
}