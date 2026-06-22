import { z } from 'zod'

export const serviceSchema = z.object({
  title: z.string().min(3).max(100),
  titleId: z.string().optional().or(z.literal('')),
  slug: z.string().min(3).max(100).regex(/^[a-z0-9-]+$/, 'Slug hanya boleh huruf kecil, angka, dan tanda hubung'),
  icon: z.string().min(1),
  summary: z.string().min(20).max(200),
  summaryId: z.string().optional().or(z.literal('')),
  description: z.string().min(50),
  descriptionId: z.string().optional().or(z.literal('')),
  useCases: z.array(z.string()).default([]),
  useCasesId: z.array(z.string()).optional(),
  displayOrder: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
  techStackIds: z.array(z.string()).default([]),
})

export type ServiceFormData = z.infer<typeof serviceSchema>