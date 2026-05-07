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
    <footer className="bg-[#1C1C1A] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Image src="/icon/Logo-NameIconWhite.svg" width={150} height={150} className='mb-6' alt='IconWhite' />
            <p className="text-gray-400 max-w-md mb-6">
              Technology with roots. We build digital products that matter — designed to last, crafted with care.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-[#1D9E75] transition-colors"><Globe size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-[#1D9E75] transition-colors"><Code2 size={20} /></a>
              <a href="mailto:hello@rootly.id" className="text-gray-400 hover:text-[#1D9E75] transition-colors"><Mail size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-[#1D9E75] transition-colors text-sm">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-[#1D9E75] transition-colors text-sm">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#2E2E2C] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Rootly. All rights reserved.</p>
          <p className="text-gray-500 text-sm">Made with care in Indonesia</p>
        </div>
      </div>
    </footer>
  )
}