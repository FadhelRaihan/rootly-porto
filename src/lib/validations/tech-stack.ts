import { z } from 'zod'

export const techStackSchema = z.object({
  name: z.string().min(2).max(50),
  category: z.enum(['FRONTEND', 'BACKEND', 'MOBILE', 'DATABASE', 'DEVOPS', 'DESIGN']),
  iconUrl: z.string().url().or(z.literal('')),
  isActive: z.boolean().default(true),
})

export type TechStackFormData = z.infer<typeof techStackSchema>