import { z } from 'zod'

export const testimonialSchema = z.object({
  clientName: z.string().min(2).max(100),
  clientNameId: z.string().optional().or(z.literal('')),
  clientRole: z.string().min(2).max(100),
  clientRoleId: z.string().optional().or(z.literal('')),
  clientCompany: z.string().min(2).max(100),
  clientCompanyId: z.string().optional().or(z.literal('')),
  clientPhoto: z.string().url().optional().or(z.literal('')),
  quote: z.string().min(20).max(1000),
  quoteId: z.string().optional().or(z.literal('')),
  rating: z.number().int().min(1).max(5).optional(),
  projectId: z.string().nullable().optional(),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
  displayOrder: z.number().int().min(0).default(0),
})

export type TestimonialFormData = z.infer<typeof testimonialSchema>