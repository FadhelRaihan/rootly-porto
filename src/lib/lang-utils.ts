import { type Language } from '@/context/language-context'

export function localizedField(lang: Language, en: string, id?: string | null): string {
  if (lang === 'id' && id) return id
  return en
}

export function localizedFieldArr(lang: Language, en: string[], id?: string[] | null): string[] {
  if (lang === 'id' && id && id.length > 0) return id
  return en
}

export const categoryLabels: Record<string, { en: string; id: string }> = {
  WEB_APP: { en: 'Web App', id: 'Aplikasi Web' },
  MOBILE: { en: 'Mobile', id: 'Mobile' },
  INTERNAL_SYSTEM: { en: 'Internal System', id: 'Sistem Internal' },
  DESIGN: { en: 'Design', id: 'Desain' },
  FRONTEND: { en: 'Frontend', id: 'Frontend' },
  BACKEND: { en: 'Backend', id: 'Backend' },
  DATABASE: { en: 'Database', id: 'Database' },
  DEVOPS: { en: 'DevOps', id: 'DevOps' },
  MOBILE_CAT: { en: 'Mobile', id: 'Mobile' },
}

export function localizedCategory(category: string, lang: Language): string {
  return categoryLabels[category]?.[lang] || category
}
