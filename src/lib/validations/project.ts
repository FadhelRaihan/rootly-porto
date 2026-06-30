import { z } from 'zod'

export const projectSchema = z.object({
  title: z.string().min(3).max(100),
  titleId: z.string().optional().or(z.literal('')),
  slug: z.string().min(3).max(100).regex(/^[a-z0-9-]+$/, 'Slug hanya boleh huruf kecil, angka, dan tanda hubung'),
  category: z.enum(['WEB_APP', 'MOBILE', 'INTERNAL_SYSTEM', 'DESIGN']),
  client: z.string().optional(),
  clientId: z.string().optional().or(z.literal('')),
  showClient: z.boolean().default(false),
  year: z.number().int().min(2020).max(2035),
  summary: z.string().min(10).max(500),
  summaryId: z.string().optional().or(z.literal('')),
  challenge: z.string().min(50),
  challengeId: z.string().optional().or(z.literal('')),
  solution: z.string().min(50),
  solutionId: z.string().optional().or(z.literal('')),
  impact: z.string().min(50),
  impactId: z.string().optional().or(z.literal('')),
  thumbnailUrl: z.string().url(),
  images: z.array(z.string().url()).default([]),
  liveUrl: z.string().url().optional().or(z.literal('')),
  isFeatured: z.boolean().default(false),
  displayOrder: z.number().int().min(0).default(0),
  techStackIds: z.array(z.string()).default([]),
})

export type ProjectFormData = z.infer<typeof projectSchema>