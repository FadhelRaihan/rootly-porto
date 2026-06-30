import { Navbar } from '@/components/public/layout/navbar'
import { Footer } from '@/components/public/layout/footer'
import { LoadingScreen } from '@/components/public/shared/loading-screen'
import { db } from '@/db'
import { services } from '@/db/schema'
import { eq, asc } from 'drizzle-orm'

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const activeServices = await db
    .select()
    .from(services)
    .where(eq(services.isActive, true))
    .orderBy(asc(services.displayOrder))

  return (
    <>
      <LoadingScreen />
      <div id="app-content">
        <Navbar services={activeServices} />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  )
}