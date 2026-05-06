import { db } from '@/db'
import { testimonials } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import { TestimonialForm } from '@/components/admin/forms/testimonial-form'

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const item = await db.query.testimonials.findFirst({ where: eq(testimonials.id, id) })
  if (!item) notFound()
  return <div className="p-8"><h1 className="text-2xl text-white font-serif mb-8">Edit Testimonial</h1><TestimonialForm initialData={item as any} /></div>
}