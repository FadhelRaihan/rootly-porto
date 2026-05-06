import { db } from '@/db'
import { services } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import { ServiceForm } from '@/components/admin/forms/service-form'

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const service = await db.query.services.findFirst({ where: eq(services.id, id) })
  if (!service) notFound()
  return <div className="p-8"><h1 className="text-2xl text-white font-serif mb-8">Edit Service</h1><ServiceForm initialData={service as any} /></div>
}