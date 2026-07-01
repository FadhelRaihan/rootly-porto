import { Metadata } from 'next'
import { AnimatedSection } from '@/components/public/shared/animated-section'
import { Terminal } from 'lucide-react'
import { CTA } from '@/components/public/shared/cta'
import { getServerTranslation } from '@/lib/i18n-server'

export const metadata: Metadata = {
  title: 'Process — Rootly',
  description: 'Explore Rootly\'s transparent development process. From initial discovery and design to agile development, rigorous testing, and seamless delivery.',
}

export default async function ProcessPage() {
  const { t } = await getServerTranslation()

  const steps = [
    {
      number: '01',
      titleKey: 'process.step1.title',
      descKey: 'process.step1.desc',
      itemsKey: 'process.step1.items',
    },
    {
      number: '02',
      titleKey: 'process.step2.title',
      descKey: 'process.step2.desc',
      itemsKey: 'process.step2.items',
    },
    {
      number: '03',
      titleKey: 'process.step3.title',
      descKey: 'process.step3.desc',
      itemsKey: 'process.step3.items',
    },
    {
      number: '04',
      titleKey: 'process.step4.title',
      descKey: 'process.step4.desc',
      itemsKey: 'process.step4.items',
    },
    {
      number: '05',
      titleKey: 'process.step5.title',
      descKey: 'process.step5.desc',
      itemsKey: 'process.step5.items',
    },
    {
      number: '06',
      titleKey: 'process.step6.title',
      descKey: 'process.step6.desc',
      itemsKey: 'process.step6.items',
    },
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
                {"[ SYSTEM // DEPLOYMENT PIPELINE ]"}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-rootly-text mb-6 leading-tight">
              {t('process.title')}
            </h1>
            <p className="text-lg text-rootly-muted max-w-2xl font-mono text-xs">
              {t('process.subtitle')}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Steps List */}
      <section className="py-20 bg-rootly-surface relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-24 relative z-10">
          {steps.map((step, index) => (
            <AnimatedSection key={step.number} delay={index * 0.1}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Number & Title */}
                <div className="lg:col-span-3">
                  <span className="text-sm font-mono text-rootly-primary tracking-widest block uppercase mb-1">
                    {`[ PHASE // 0${index + 1} ]`}
                  </span>
                  <h2 className="text-3xl font-serif text-rootly-text mt-2">{t(step.titleKey)}</h2>
                </div>

                {/* Description & List */}
                <div className="lg:col-span-6">
                  <p className="text-rootly-muted text-sm leading-relaxed mb-6 font-sans">{t(step.descKey)}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-rootly-background/50 p-4 border border-rootly-border rounded-xl font-mono text-xs text-rootly-muted">
                    {t(step.itemsKey).split(',').map((item: string) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-rootly-primary rounded-full shrink-0" />
                        <span className="truncate">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right Side Visual Diagnostic Box */}
                <div className="lg:col-span-3 hidden lg:block">
                  <div className="bg-rootly-deep-bg text-gray-300 rounded-xl p-4 border border-rootly-border/60 font-mono text-[9px] shadow-sm relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(rgba(29,158,117,0.02)_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none" />
                    
                    {/* Console Tab Header */}
                    <div className="flex items-center justify-between border-b border-rootly-border/60 pb-2 mb-2 text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <Terminal className="w-3 h-3 text-rootly-primary" />
                        <span>
                          {step.number === '01' && 'research_node.sh'}
                          {step.number === '02' && 'sys_blueprint.cfg'}
                          {step.number === '03' && 'figma_assets.xml'}
                          {step.number === '04' && 'git_push.log'}
                          {step.number === '05' && 'prod_deploy.sh'}
                          {step.number === '06' && 'uptime_monitor.py'}
                        </span>
                      </div>
                      <span className="text-emerald-400">OK</span>
                    </div>

                    {/* Console Diagnostics */}
                    <div className="space-y-1 text-gray-400">
                      {step.number === '01' && (
                        <>
                          <p>&gt; query: target_users</p>
                          <p>&gt; scan: competitor_matrix</p>
                          <p className="text-emerald-400">&gt; research_status: 100%</p>
                        </>
                      )}
                      {step.number === '02' && (
                        <>
                          <p>&gt; roadmap: ESTABLISHED</p>
                          <p>&gt; scope: VERIFIED</p>
                          <p className="text-emerald-400">&gt; technical_approach: OK</p>
                        </>
                      )}
                      {step.number === '03' && (
                        <>
                          <p>&gt; ui_states: PROTOTYPING</p>
                          <p>&gt; design_system: ACTIVE</p>
                          <p className="text-emerald-400">&gt; accessibility_check: PASS</p>
                        </>
                      )}
                      {step.number === '04' && (
                        <>
                          <p>&gt; commit: build_success</p>
                          <p>&gt; test_suite: 100% GREEN</p>
                          <p className="text-emerald-400">&gt; ci_pipeline: COMPLETE</p>
                        </>
                      )}
                      {step.number === '05' && (
                        <>
                          <p>&gt; target: mainnet_prod</p>
                          <p>&gt; deployment_handshake: OK</p>
                          <p className="text-emerald-400">&gt; system: ONLINE</p>
                        </>
                      )}
                      {step.number === '06' && (
                        <>
                          <p>&gt; status: HEALTHY</p>
                          <p>&gt; load_balance: OPTIMAL</p>
                          <p className="text-emerald-400">&gt; ping: 12ms</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Reusable CTA Section */}
      <CTA />
    </div>
  )
}