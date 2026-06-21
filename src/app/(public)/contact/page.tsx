import { Metadata } from 'next'
import { AnimatedSection } from '@/components/public/shared/animated-section'
import { ContactForm } from '@/components/public/contact/contact-form'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Hubungi Rootly untuk memulai kolaborasi pengembangan web app, mobile app, atau sistem digital perusahaan Anda.',
}

export default function ContactPage() {
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
                {"[ SYSTEM // CONNECTION GATEWAY ]"}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#1C1C1A] mb-6 leading-tight">
              Get in Touch
            </h1>
            <p className="text-lg text-[#888780] max-w-2xl font-mono text-xs">
              INITIALIZE CONNECTION PROTOCOL TO REGISTER YOUR DECENTRALIZED OR CENTRALIZED PROJECTS.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Column: Info & Pipeline */}
            <div className="lg:col-span-5 space-y-8">
              <AnimatedSection>
                {/* Node Registry Card */}
                <div className="bg-[#F7F6F2]/50 p-6 sm:p-8 rounded-2xl border border-[#E8E6E0] hover:border-[#1D9E75]/30 transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-[#1D9E75]/5 rounded-bl-full pointer-events-none" />
                  <span className="font-mono text-[9px] text-[#1D9E75] tracking-widest uppercase block mb-6">{"[ NODE REGISTRY // CONNECTION PATHS ]"}</span>
                  <h2 className="text-2xl font-serif text-[#1C1C1A] mb-6">Contact Information</h2>
                  
                  <div className="space-y-4 font-mono text-[11px] text-[#888780]">
                    <div className="grid grid-cols-[80px_1fr] gap-x-2 border-b border-dashed border-[#E8E6E0] pb-3">
                      <span className="text-gray-400">MAIL //</span>
                      <span className="font-bold text-[#1C1C1A]">hello@rootly.id</span>
                    </div>
                    <div className="grid grid-cols-[80px_1fr] gap-x-2 border-b border-dashed border-[#E8E6E0] pb-3">
                      <span className="text-gray-400">LOC  //</span>
                      <span className="text-[#1C1C1A]">Indonesia (UTC+7)</span>
                    </div>
                    <div className="grid grid-cols-[80px_1fr] gap-x-2 border-b border-dashed border-[#E8E6E0] pb-3">
                      <span className="text-gray-400">SYNC //</span>
                      <span className="text-[#1C1C1A]">Within 24 hours</span>
                    </div>
                  </div>
                </div>

                {/* Pipeline Steps Card */}
                <div className="mt-8 bg-white p-6 sm:p-8 rounded-2xl border border-[#E8E6E0]">
                  <span className="font-mono text-[9px] text-[#1D9E75] tracking-widest uppercase block mb-6">{"[ PIPELINE // STAGE SYNCHRONIZATION ]"}</span>
                  <h3 className="text-lg font-serif text-[#1C1C1A] mb-6">What happens next?</h3>
                  
                  <div className="relative border-l border-dashed border-[#1D9E75]/40 pl-6 ml-3 space-y-6">
                    {[
                      'We review your project details and goals',
                      'We schedule a free consultation call',
                      'We propose a tailored system layout',
                      'We start building with clean roots'
                    ].map((item, i) => (
                      <div key={i} className="relative">
                        <span className="absolute -left-[33px] top-0.5 w-[15px] h-[15px] bg-white border border-[#1D9E75] text-[#1D9E75] rounded-full flex items-center justify-center font-mono text-[8px] font-bold">
                          {i + 1}
                        </span>
                        <div className="font-mono text-[9px] text-[#1D9E75] uppercase mb-0.5">{`[ PHASE 0${i + 1} ]`}</div>
                        <p className="text-[#888780] text-xs leading-relaxed font-sans">{item}</p>
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