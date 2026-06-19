import { db } from '@/db'
import { testimonials } from '@/db/schema'
import { desc } from 'drizzle-orm'
import { TestimonialsClient } from '@/components/admin/testimonials-client'

export default async function TestimonialsPage() {
  const list = await db.select().from(testimonials).orderBy(desc(testimonials.createdAt))

  return <TestimonialsClient testimonialList={list as any} />
}