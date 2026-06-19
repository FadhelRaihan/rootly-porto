import { Metadata } from 'next'
import { AnimatedSection } from '@/components/public/shared/animated-section'
import { Terminal } from 'lucide-react'
import { CTA } from '@/components/public/shared/cta'

export const metadata: Metadata = {
  title: 'Process — Rootly',
  description: 'How we work: from discovery to delivery, we keep you involved every step of the way.',
}

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We start by understanding your business, your goals, and your users. We ask questions, do research, and dig deep to uncover what really matters.',
    items: ['Business goals analysis', 'User research', 'Competitor analysis', 'Technical feasibility check'],
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'Based on our findings, we create a clear roadmap. We define the scope, prioritize features, and outline the technical approach.',
    items: ['Project roadmap', 'Feature prioritization', 'Technical architecture', 'Timeline & budget planning'],
  },
  {
    number: '03',
    title: 'Design',
    description: 'We design with purpose. Every screen, every interaction, every detail is crafted to solve problems and create great experiences.',
    items: ['UI/UX design', 'Interactive prototypes', 'Design system', 'User testing'],
  },
  {
    number: '04',
    title: 'Development',
    description: 'We build using modern, maintainable technologies. We communicate regularly and show you progress every two weeks.',
    items: ['Agile development', 'Code reviews', 'Continuous integration', 'Regular demos'],
  },
  {
    number: '05',
    title: 'Launch',
    description: 'We do not just hand over the code and walk away. We help you deploy, train your team, and make sure everything runs smoothly.',
    items: ['Deployment assistance', 'Testing & QA', 'Team training', 'Documentation'],
  },
  {
    number: '06',
    title: 'Ongoing Support',
    description: 'Technology needs care. We offer ongoing support to keep your product running, improving, and adapting to changing needs.',
    items: ['Maintenance & updates', 'Performance monitoring', 'Feature enhancements', 'Priority support'],
  },
]

export default function ProcessPage() {
  return (
    <div className="pt-20 bg-[#F7F6F2] min-h-screen text-[#1C1C1A]">
      {/* Hero */}
      <section className="py-20 relative overflow-hidden border-b border-dashed border-[#E8E6E0]">
        {/* Warm Dotted Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#1d9e7508_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <AnimatedSection>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-xs tracking-widest text-[#1D9E75] uppercase">
                {"[ SYSTEM // DEPLOYMENT PIPELINE ]"}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#1C1C1A] mb-6 leading-tight">
              How We Work
            </h1>
            <p className="text-lg text-[#888780] max-w-2xl font-mono text-xs">
              A CLEAR, TRANSPARENT PIPELINE DESIGNED TO ANCHOR YOUR PROJECT AND ENSURE SYSTEM STABILITY.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Steps List */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-24 relative z-10">
          {steps.map((step, index) => (
            <AnimatedSection key={step.number} delay={index * 0.1}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Number & Title */}
                <div className="lg:col-span-3">
                  <span className="text-sm font-mono text-[#1D9E75] tracking-widest block uppercase mb-1">
                    {`[ PHASE // 0${index + 1} ]`}
                  </span>
                  <h3 className="text-3xl font-serif text-[#1C1C1A] mt-2">{step.title}</h3>
                </div>

                {/* Description & List */}
                <div className="lg:col-span-6">
                  <p className="text-[#888780] text-sm leading-relaxed mb-6 font-sans">{step.description}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#F7F6F2]/50 p-4 border border-[#E8E6E0] rounded-xl font-mono text-xs text-[#888780]">
                    {step.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#1D9E75] rounded-full shrink-0" />
                        <span className="truncate">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right Side Visual Diagnostic Box */}
                <div className="lg:col-span-3 hidden lg:block">
                  <div className="bg-[#1C1C1A] text-gray-300 rounded-xl p-4 border border-[#2A2A28] font-mono text-[9px] shadow-sm relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(rgba(29,158,117,0.02)_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none" />
                    
                    {/* Console Tab Header */}
                    <div className="flex items-center justify-between border-b border-[#2A2A28] pb-2 mb-2 text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <Terminal className="w-3 h-3 text-[#1D9E75]" />
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