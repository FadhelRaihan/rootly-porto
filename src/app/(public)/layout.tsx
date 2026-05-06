import { Navbar } from '@/components/public/layout/navbar'
import { Footer } from '@/components/public/layout/footer'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}