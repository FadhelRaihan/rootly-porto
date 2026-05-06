import { auth, signOut } from '@/lib/auth'
import Link from 'next/link'
import { LayoutDashboard, FolderKanban, Wrench, Layers, MessageSquare, LogOut, ExternalLink } from 'lucide-react'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session) {
    return <>{children}</>
  }

  const navItems = [
    { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/projects', icon: FolderKanban, label: 'Projects' },
    { href: '/admin/services', icon: Wrench, label: 'Services' },
    { href: '/admin/tech-stack', icon: Layers, label: 'Tech Stack' },
    { href: '/admin/testimonials', icon: MessageSquare, label: 'Testimonials' },
  ]

  return (
    <div className="flex h-screen bg-[#111110]">
      <aside className="w-60 bg-[#1C1C1A] border-r border-[#2E2E2C] flex flex-col">
        <div className="p-4 border-b border-[#2E2E2C]">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="22" stroke="#1D9E75" strokeWidth="2" />
              <path d="M24 12V32M24 12L18 18M24 12L30 18M18 24H32" stroke="#1D9E75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-white font-serif text-lg">Rootly</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-[#242422] rounded-md transition-colors"
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-[#2E2E2C] space-y-1">
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-[#242422] rounded-md transition-colors"
          >
            <ExternalLink size={20} />
            <span>View Site</span>
          </a>
          <form action={async () => {
            'use server'
            await signOut({ redirectTo: '/admin/login' })
          }}>
            <button
              type="submit"
              className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-[#242422] rounded-md transition-colors w-full"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}