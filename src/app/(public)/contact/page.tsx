import { Metadata } from 'next'
import { AnimatedSection } from '@/components/public/shared/animated-section'
import { ContactForm } from '@/components/public/contact/contact-form'
import { getServerTranslation } from '@/lib/i18n-server'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Hubungi Rootly untuk memulai kolaborasi pengembangan web app, mobile app, atau sistem digital perusahaan Anda.',
}

export default async function ContactPage() {
  const { t } = await getServerTranslation()
  const pipelineSteps = [
    t('contact.pipeline.step1'),
    t('contact.pipeline.step2'),
    t('contact.pipeline.step3'),
    t('contact.pipeline.step4'),
  ]

  return (
    <div className="pt-20 bg-rootly-background min-h-screen text-rootly-text">
      {/* Hero */}
      <section className="py-20 relative overflow-hidden border-b border-dashed border-rootly-border">
        <div className="absolute inset-0 bg-[radial-gradient(#1d9e7508_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <AnimatedSection>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-xs tracking-widest text-rootly-primary uppercase">
                {"[ SYSTEM // CONNECTION GATEWAY ]"}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-rootly-text mb-6 leading-tight">
              {t('contact.title')}
            </h1>
            <p className="text-lg text-rootly-muted max-w-2xl font-mono text-xs">
              {t('contact.subtitle')}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-20 bg-rootly-surface relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Column: Info & Pipeline */}
            <div className="lg:col-span-5 space-y-8">
              <AnimatedSection>
                {/* Node Registry Card */}
                <div className="bg-rootly-background/50 p-6 sm:p-8 rounded-2xl border border-rootly-border hover:border-rootly-primary/30 transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-rootly-primary/5 rounded-bl-full pointer-events-none" />
                  <span className="font-mono text-[9px] text-rootly-primary tracking-widest uppercase block mb-6">{"[ NODE REGISTRY // CONNECTION PATHS ]"}</span>
                  <h2 className="text-2xl font-serif text-rootly-text mb-6">{t('contact.info.title')}</h2>
                  
                  <div className="space-y-4 font-mono text-[11px] text-rootly-muted">
                    <div className="grid grid-cols-[80px_1fr] gap-x-2 border-b border-dashed border-rootly-border pb-3">
                      <span className="text-rootly-muted">{t('contact.info.email')} //</span>
                      <span className="font-bold text-rootly-text">hello@rootly.id</span>
                    </div>
                    <div className="grid grid-cols-[80px_1fr] gap-x-2 border-b border-dashed border-rootly-border pb-3">
                      <span className="text-rootly-muted">{t('contact.info.location')}  //</span>
                      <span className="text-rootly-text">Indonesia (UTC+7)</span>
                    </div>
                    <div className="grid grid-cols-[80px_1fr] gap-x-2 border-b border-dashed border-rootly-border pb-3">
                      <span className="text-rootly-muted">{t('contact.info.response')} //</span>
                      <span className="text-rootly-text">{t('contact.info.responseValue')}</span>
                    </div>
                  </div>
                </div>

                {/* Pipeline Steps Card */}
                <div className="mt-8 bg-rootly-surface p-6 sm:p-8 rounded-2xl border border-rootly-border">
                  <span className="font-mono text-[9px] text-rootly-primary tracking-widest uppercase block mb-6">{"[ PIPELINE // STAGE SYNCHRONIZATION ]"}</span>
                  <h3 className="text-lg font-serif text-rootly-text mb-6">{t('contact.pipeline.title')}</h3>
                  
                  <div className="relative border-l border-dashed border-rootly-primary/40 pl-6 ml-3 space-y-6">
                    {pipelineSteps.map((item, i) => (
                      <div key={i} className="relative">
                        <span className="absolute -left-[33px] top-0.5 w-[15px] h-[15px] bg-rootly-surface border border-rootly-primary text-rootly-primary rounded-full flex items-center justify-center font-mono text-[8px] font-bold">
                          {i + 1}
                        </span>
                        <div className="font-mono text-[9px] text-rootly-primary uppercase mb-0.5">{`[ PHASE 0${i + 1} ]`}</div>
                        <p className="text-rootly-muted text-xs leading-relaxed font-sans">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Right Column: Interactive Form */}
            <div className="lg:col-span-7">
              <AnimatedSection delay={0.2}>
                <ContactForm />
              </AnimatedSection>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}