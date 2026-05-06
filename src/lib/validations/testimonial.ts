import { z } from 'zod'

export const testimonialSchema = z.object({
  clientName: z.string().min(2).max(100),
  clientRole: z.string().min(2).max(100),
  clientCompany: z.string().min(2).max(100),
  clientPhoto: z.string().url().optional().or(z.literal('')),
  quote: z.string().min(20).max(1000),
  rating: z.number().int().min(1).max(5).optional(),
  projectId: z.string().optional(),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
  displayOrder: z.number().int().min(0).default(0),
})

export type TestimonialFormData = z.infer<typeof testimonialSchema>