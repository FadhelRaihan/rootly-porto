import { auth, signOut } from '@/lib/auth'
import Link from 'next/link'
import { LogOut, ExternalLink } from 'lucide-react'
import { SidebarNav } from '@/components/admin/sidebar-nav'
import { Toaster } from '@/components/ui/sonner'
import Image from 'next/image'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session) {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen bg-rootly-admin-bg text-rootly-text">
      <aside className="w-60 bg-rootly-admin-sidebar border-r border-rootly-admin-border flex flex-col">
        <div className="p-4 border-b border-dashed border-rootly-admin-border font-mono text-[9px] text-gray-400 space-y-2">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <Image src="/icon/Logo-NameIconBlack.svg" width={105} height={105} alt="LogoBlack" className="h-8 w-auto" />
          </Link>
          <div className="flex items-center justify-between text-gray-400 font-semibold uppercase tracking-wider text-[8px] pt-1">
            <span>ADMIN_CORE // V1.0</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rootly-primary animate-pulse" />
              ONLINE
            </span>
          </div>
        </div>
        <SidebarNav />
        <div className="p-4 border-t border-dashed border-rootly-admin-border space-y-1.5 font-mono text-xs">
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 text-gray-500 hover:text-rootly-text hover:bg-rootly-admin-bg/40 rounded-lg border border-transparent hover:border-rootly-border transition-all uppercase tracking-wider"
          >
            <ExternalLink size={15} className="text-gray-400" />
            <div className="flex items-center gap-1.5">
              <span className="text-gray-300">SYS {"//"}</span>
              <span>View Site</span>
            </div>
          </a>
          <form action={async () => {
            'use server'
            await signOut({ redirectTo: '/admin/login' })
          }}>
            <button
              type="submit"
              className="flex items-center gap-3 px-3 py-2.5 text-gray-500 hover:text-red-600 hover:bg-red-50/50 rounded-lg border border-transparent hover:border-red-200 transition-all uppercase tracking-wider w-full cursor-pointer text-left font-mono"
            >
              <LogOut size={15} className="text-gray-400" />
              <div className="flex items-center gap-1.5">
                <span className="text-gray-300">AUTH {"//"}</span>
                <span>Disconnect</span>
              </div>
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 overflow-auto bg-rootly-admin-bg">
        {children}
      </main>
      <Toaster />
    </div>
  )
}