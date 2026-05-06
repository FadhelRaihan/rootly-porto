import { Metadata } from 'next'
import { AnimatedSection } from '@/components/public/shared/animated-section'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

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
    <div className="pt-20">
      <section className="py-20 bg-[#F7F6F2]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <AnimatedSection>
            <h1 className="text-5xl font-serif text-[#1C1C1A] mb-6">How We Work</h1>
            <p className="text-xl text-[#888780] max-w-2xl">
              A clear, transparent process that keeps you in control and your project on track.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-24">
          {steps.map((step, index) => (
            <AnimatedSection key={step.number} delay={index * 0.1}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-3">
                  <span className="text-6xl font-serif text-[#1D9E75]/20">{step.number}</span>
                  <h3 className="text-2xl font-serif text-[#1C1C1A] mt-4">{step.title}</h3>
                </div>
                <div className="lg:col-span-6">
                  <p className="text-[#888780] mb-6">{step.description}</p>
                  <ul className="grid grid-cols-2 gap-3">
                    {step.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-[#1C1C1A]">
                        <span className="w-1.5 h-1.5 bg-[#1D9E75] rounded-full" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="lg:col-span-3 hidden lg:block">
                  <div className="aspect-square bg-[#F7F6F2] rounded-lg" />
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="py-20 bg-[#1D9E75]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-serif text-white mb-4">Ready to start?</h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">Let us walk you through our process and find the best solution for your project.</p>
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="text-[#1D9E75]">Get in Touch</Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}