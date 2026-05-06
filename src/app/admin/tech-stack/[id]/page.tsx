import { db } from '@/db'
import { techStacks } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import { TechStackForm } from '@/components/admin/forms/tech-stack-form'

export default async function EditTechStackPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const item = await db.query.techStacks.findFirst({ where: eq(techStacks.id, id) })
  if (!item) notFound()
  return <div className="p-8"><h1 className="text-2xl text-white font-serif mb-8">Edit Tech Stack</h1><TechStackForm initialData={item as any} /></div>
}