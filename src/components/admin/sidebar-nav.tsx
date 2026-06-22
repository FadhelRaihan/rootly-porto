'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, FolderKanban, Wrench, Layers, MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'

export function SidebarNav() {
  const pathname = usePathname()

  const navItems = [
    { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/projects', icon: FolderKanban, label: 'Projects' },
    { href: '/admin/services', icon: Wrench, label: 'Services' },
    { href: '/admin/tech-stack', icon: Layers, label: 'Tech Stack' },
    { href: '/admin/testimonials', icon: MessageSquare, label: 'Testimonials' },
  ]

  return (
    <nav className="flex-1 p-4 space-y-1.5 font-mono text-xs">
      {navItems.map((item, index) => {
        // Match exact or starts with for nested routes (e.g. /admin/projects/new matches /admin/projects)
        const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href))
        const idxStr = `0${index + 1}`
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center justify-between px-3 py-2.5 rounded-lg border transition-all duration-200 uppercase tracking-wider",
              isActive 
                ? "bg-rootly-primary/10 border-rootly-primary/35 text-rootly-text font-bold shadow-xs border-l-2" 
                : "bg-transparent border-transparent text-gray-500 hover:border-rootly-border hover:text-rootly-text hover:bg-rootly-admin-bg/40"
            )}
          >
            <div className="flex items-center gap-3">
              <item.icon size={15} className={isActive ? "text-rootly-primary" : "text-gray-400"} />
              <div className="flex items-center gap-1.5">
                <span className={isActive ? "text-rootly-primary/80" : "text-gray-300"}>{idxStr} {"//"}</span>
                <span>{item.label}</span>
              </div>
            </div>
            {isActive && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0 ml-2" />
            )}
          </Link>
        )
      })}
    </nav>
  )
}
