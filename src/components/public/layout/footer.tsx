import Link from 'next/link'
import { Mail, Globe, Code2 } from 'lucide-react'
import Image from 'next/image'

const footerLinks = {
  services: [
    { label: 'Web Development', href: '/services' },
    { label: 'Mobile Apps', href: '/services' },
    { label: 'Internal Systems', href: '/services' },
    { label: 'UI/UX Design', href: '/services' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Process', href: '/process' },
    { label: 'Contact', href: '/contact' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-[#1C1C1A] text-white relative overflow-hidden">
      {/* Subtle White Dotted Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:18px_18px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Image src="/icon/Logo-NameIconWhite.svg" width={150} height={150} className='mb-6' alt='IconWhite' />
            <p className="text-gray-400 max-w-md mb-6 text-sm leading-relaxed">
              Technology with roots. We build digital products that matter — designed to last, crafted with care.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-9 h-9 rounded-lg border border-white/10 bg-white/[0.03] flex items-center justify-center text-gray-400 hover:text-[#1D9E75] hover:border-[#1D9E75]/30 transition-all duration-300"><Globe size={18} /></a>
              <a href="#" className="w-9 h-9 rounded-lg border border-white/10 bg-white/[0.03] flex items-center justify-center text-gray-400 hover:text-[#1D9E75] hover:border-[#1D9E75]/30 transition-all duration-300"><Code2 size={18} /></a>
              <a href="mailto:hello@rootly.id" className="w-9 h-9 rounded-lg border border-white/10 bg-white/[0.03] flex items-center justify-center text-gray-400 hover:text-[#1D9E75] hover:border-[#1D9E75]/30 transition-all duration-300"><Mail size={18} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono tracking-widest text-[#1D9E75] uppercase mb-5">{"[ SYS // SERVICES ]"}</h4>
            <ul className="space-y-3.5">
              {footerLinks.services.map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-[#1D9E75] transition-colors text-sm flex items-center group">
                    <span className="text-[10px] font-mono opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 mr-1.5 text-[#1D9E75]">{"\u003e"}</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono tracking-widest text-[#1D9E75] uppercase mb-5">{"[ ORG // COMPANY ]"}</h4>
            <ul className="space-y-3.5">
              {footerLinks.company.map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-[#1D9E75] transition-colors text-sm flex items-center group">
                    <span className="text-[10px] font-mono opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 mr-1.5 text-[#1D9E75]">{"\u003e"}</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Dashed border with live system status feed */}
        <div className="border-t border-dashed border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs font-mono">© {new Date().getFullYear()} Rootly. All rights reserved.</p>
          
          {/* Live Network Status Indicator */}
          <div className="flex items-center gap-2 px-3 py-1 bg-white/[0.02] border border-white/5 rounded-md font-mono text-[9px] text-gray-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{"NET // MAINNET"}</span>
            <span className="text-white/10">{"|"}</span>
            <span>{"ENGINE // STABLE_0xOK"}</span>
          </div>

          <p className="text-gray-500 text-xs font-mono">Made with care in Indonesia</p>
        </div>
      </div>
    </footer>
  )
}