import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2, 'Nama terlalu pendek').max(100),
  email: z.string().email('Format email tidak valid'),
  company: z.string().optional(),
  projectType: z.enum([
    'Web Application',
    'Mobile Application',
    'Internal Business System',
    'UI/UX Design',
    'Tech Consulting',
    'Lainnya',
  ]),
  budget: z.string().optional(),
  message: z.string().min(20, 'Pesan terlalu pendek').max(2000),
})

export type ContactFormData = z.infer<typeof contactSchema>