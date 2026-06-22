import { cookies } from 'next/headers'
import { translations, Language } from '@/lib/translations'

export async function getServerTranslation() {
  const cookieStore = await cookies()
  const language = (cookieStore.get('rootly_lang')?.value as Language) || 'id'
  
  const t = (key: string): string => {
    return translations[language]?.[key] || translations['id']?.[key] || key
  }
  
  return { language, t }
}
