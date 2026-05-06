import { Metadata } from 'next'
import { AnimatedSection } from '@/components/public/shared/animated-section'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'About — Rootly',
  description: 'Rootly adalah software house yang dibangun di atas fondasi nilai: grounded, purposeful, warmth, dan long-lasting.',
}

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 bg-[#F7F6F2]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <AnimatedSection>
            <h1 className="text-5xl font-serif text-[#1C1C1A] mb-6">About Rootly</h1>
            <p className="text-xl text-[#888780] max-w-2xl">
              We are a software house built on the belief that technology should serve a purpose.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <h2 className="text-3xl font-serif text-[#1C1C1A] mb-6">Our Story</h2>
              <p className="text-[#888780] mb-4">
                Rootly was born from a simple observation: too many software projects fail to deliver real value. They look impressive on the surface but crumble under the weight of poor architecture, short-sighted decisions, and disconnected teams.
              </p>
              <p className="text-[#888780] mb-4">
                We decided to build differently. We set out to create a software house that puts lasting value above short-term wins. Where honest communication replaces corporate speak. Where every feature exists because it solves a real problem.
              </p>
              <p className="text-[#888780]">
                The name Rootly comes from our philosophy: build with roots. Roots that dig deep into understanding your business, roots that anchor your software in solid architecture, and roots that keep your product growing strong for years to come.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="aspect-square bg-[#F7F6F2] rounded-lg flex items-center justify-center">
                <svg width="200" height="200" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="22" fill="#1D9E75" fillOpacity="0.1" stroke="#1D9E75" strokeWidth="2" />
                  <path d="M24 14V34" stroke="#1D9E75" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M18 20L24 14L30 20" stroke="#1D9E75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 28H32" stroke="#1D9E75" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-[#F7F6F2]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <AnimatedSection>
              <h3 className="text-2xl font-serif text-[#1C1C1A] mb-4">Our Mission</h3>
              <p className="text-[#888780]">
                To build software that solves real problems, creates lasting value, and forms genuine partnerships with our clients.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <h3 className="text-2xl font-serif text-[#1C1C1A] mb-4">Our Vision</h3>
              <p className="text-[#888780]">
                To be the most trusted software partner for businesses that care about quality over quantity, and substance over style.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <AnimatedSection>
            <h2 className="text-4xl font-serif text-[#1C1C1A] text-center mb-16">Our Values</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Grounded', desc: 'We build software that solves actual problems, not just impressive-looking features.' },
              { title: 'Purposeful', desc: 'Every line of code serves a clear purpose and delivers measurable value to your business.' },
              { title: 'Warmth', desc: 'We communicate honestly, transparently, and treat your project like it is our own.' },
              { title: 'Long-lasting', desc: 'We build for the long term with maintainable code that stands the test of time.' },
            ].map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 0.1}>
                <div className="text-center p-8 border border-[#E8E6E0] rounded-lg">
                  <h3 className="text-xl font-serif text-[#1D9E75] mb-4">{value.title}</h3>
                  <p className="text-[#888780] text-sm">{value.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}