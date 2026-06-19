import { db } from '@/db'
import { services } from '@/db/schema'
import { asc } from 'drizzle-orm'
import { ServicesClient } from '@/components/admin/services-client'

export default async function ServicesPage() {
  const serviceList = await db.select().from(services).orderBy(asc(services.displayOrder))

  return <ServicesClient serviceList={serviceList as any} />
}