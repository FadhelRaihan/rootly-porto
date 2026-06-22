import Link from 'next/link'
import { Mail, Globe, Code2 } from 'lucide-react'
import Image from 'next/image'
import { getServerTranslation } from '@/lib/i18n-server'

export async function Footer() {
  const { t } = await getServerTranslation()

  const footerLinks = {
    services: [
      { label: t('footer.serviceWeb'), href: '/services' },
      { label: t('footer.serviceMobile'), href: '/services' },
      { label: t('footer.serviceInternal'), href: '/services' },
      { label: t('footer.serviceUiux'), href: '/services' },
    ],
    company: [
      { label: t('footer.about'), href: '/about' },
      { label: t('footer.portfolio'), href: '/portfolio' },
      { label: t('footer.process'), href: '/process' },
      { label: t('footer.contact'), href: '/contact' },
    ],
  }

  return (
    <footer className="bg-rootly-deep-bg text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:18px_18px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Image src="/icon/Logo-NameIconWhite.svg" width={150} height={150} className='mb-6' alt='IconWhite' />
            <p className="text-gray-400 max-w-md mb-6 text-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-9 h-9 rounded-lg border border-white/10 bg-white/[0.03] flex items-center justify-center text-gray-400 hover:text-rootly-primary hover:border-rootly-primary/30 transition-all duration-300"><Globe size={18} /></a>
              <a href="#" className="w-9 h-9 rounded-lg border border-white/10 bg-white/[0.03] flex items-center justify-center text-gray-400 hover:text-rootly-primary hover:border-rootly-primary/30 transition-all duration-300"><Code2 size={18} /></a>
              <a href="mailto:hello@rootly.id" className="w-9 h-9 rounded-lg border border-white/10 bg-white/[0.03] flex items-center justify-center text-gray-400 hover:text-rootly-primary hover:border-rootly-primary/30 transition-all duration-300"><Mail size={18} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono tracking-widest text-rootly-primary uppercase mb-5">{"[ SYS // " + t('footer.services') + " ]"}</h4>
            <ul className="space-y-3.5">
              {footerLinks.services.map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-rootly-primary transition-colors text-sm flex items-center group">
                    <span className="text-[10px] font-mono opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 mr-1.5 text-rootly-primary">{"\u003e"}</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono tracking-widest text-rootly-primary uppercase mb-5">{"[ ORG // " + t('footer.company') + " ]"}</h4>
            <ul className="space-y-3.5">
              {footerLinks.company.map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-rootly-primary transition-colors text-sm flex items-center group">
                    <span className="text-[10px] font-mono opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 mr-1.5 text-rootly-primary">{"\u003e"}</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-dashed border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs font-mono">© {new Date().getFullYear()} Rootly. {t('footer.copyright')}</p>
          
          <div className="flex items-center gap-2 px-3 py-1 bg-white/[0.02] border border-white/5 rounded-md font-mono text-[9px] text-gray-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{"NET // MAINNET"}</span>
            <span className="text-white/10">{"|"}</span>
            <span>{"ENGINE // STABLE_0xOK"}</span>
          </div>

          <p className="text-gray-500 text-xs font-mono">{t('footer.madeIn')}</p>
        </div>
      </div>
    </footer>
  )
}