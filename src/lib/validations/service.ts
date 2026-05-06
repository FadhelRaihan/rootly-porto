import { z } from 'zod'

export const serviceSchema = z.object({
  title: z.string().min(3).max(100),
  slug: z.string().min(3).max(100).regex(/^[a-z0-9-]+$/, 'Slug hanya boleh huruf kecil, angka, dan tanda hubung'),
  icon: z.string().min(1),
  summary: z.string().min(20).max(200),
  description: z.string().min(50),
  useCases: z.array(z.string()).default([]),
  displayOrder: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
  techStackIds: z.array(z.string()).default([]),
})

export type ServiceFormData = z.infer<typeof serviceSchema>