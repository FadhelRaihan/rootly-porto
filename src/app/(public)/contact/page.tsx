'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, ContactFormData } from '@/lib/validations/contact'
import { AnimatedSection } from '@/components/public/shared/animated-section'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CheckCircle2, AlertCircle } from 'lucide-react'

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      projectType: undefined,
      budget: '',
      message: '',
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true)
    setIsError(false)
    setIsSuccess(false)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setIsSuccess(true)
      } else {
        setIsError(true)
      }
    } catch {
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const projectTypes = ['Web Application', 'Mobile Application', 'Internal Business System', 'UI/UX Design', 'Tech Consulting', 'Lainnya']

  return (
    <div className="pt-20">
      <section className="py-20 bg-[#F7F6F2]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <AnimatedSection>
            <h1 className="text-5xl font-serif text-[#1C1C1A] mb-6">Get in Touch</h1>
            <p className="text-xl text-[#888780] max-w-2xl">
              Tell us about your project and we will get back to you within 24 hours.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <AnimatedSection>
              <div>
                <h2 className="text-2xl font-serif text-[#1C1C1A] mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-[#888780] mb-1">Email</p>
                    <p className="text-[#1C1C1A]">hello@rootly.id</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#888780] mb-1">Location</p>
                    <p className="text-[#1C1C1A]">Indonesia</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#888780] mb-1">Response Time</p>
                    <p className="text-[#1C1C1A]">Within 24 hours</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="text-lg font-serif text-[#1C1C1A] mb-4">What happens next?</h3>
                <ol className="space-y-3">
                  {['We review your project details', 'We schedule a free consultation call', 'We propose a tailored solution', 'We start building when you are ready'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-[#888780]">
                      <span className="w-6 h-6 bg-[#1D9E75]/10 text-[#1D9E75] rounded-full flex items-center justify-center text-sm">{i + 1}</span>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              {isSuccess ? (
                <div className="bg-[#F7F6F2] p-8 rounded-lg text-center">
                  <CheckCircle2 className="w-16 h-16 text-[#1D9E75] mx-auto mb-4" />
                  <h3 className="text-2xl font-serif text-[#1C1C1A] mb-2">Message Sent!</h3>
                  <p className="text-[#888780]">Thank you for reaching out. We will get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {isError && (
                    <div className="flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-lg">
                      <AlertCircle className="w-5 h-5" />
                      <p className="text-sm">Something went wrong. Please try again.</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-[#1C1C1A]">Name *</Label>
                      <Input {...register('name')} className="mt-1 border-[#E8E6E0]" />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <Label className="text-[#1C1C1A]">Email *</Label>
                      <Input type="email" {...register('email')} className="mt-1 border-[#E8E6E0]" />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-[#1C1C1A]">Company</Label>
                      <Input {...register('company')} className="mt-1 border-[#E8E6E0]" />
                    </div>
                    <div>
                      <Label className="text-[#1C1C1A]">Project Type *</Label>
                      <Select value={watch('projectType') || ''} onValueChange={(val) => setValue('projectType', val as ContactFormData['projectType'])}>
                        <SelectTrigger className="mt-1 border-[#E8E6E0]"><SelectValue placeholder="Select type" /></SelectTrigger>
                        <SelectContent>
                          {projectTypes.map((type) => (<SelectItem key={type} value={type}>{type}</SelectItem>))}
                        </SelectContent>
                      </Select>
                      {errors.projectType && <p className="text-red-500 text-sm mt-1">{errors.projectType.message}</p>}
                    </div>
                  </div>

                  <div>
                    <Label className="text-[#1C1C1A]">Budget Range</Label>
                    <Select value={watch('budget') || ''} onValueChange={(val) => setValue('budget', val || undefined)}>
                      <SelectTrigger className="mt-1 border-[#E8E6E0]"><SelectValue placeholder="Select budget" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-10m">Under Rp 10 million</SelectItem>
                        <SelectItem value="10-25m">Rp 10 - 25 million</SelectItem>
                        <SelectItem value="25-50m">Rp 25 - 50 million</SelectItem>
                        <SelectItem value="50-100m">Rp 50 - 100 million</SelectItem>
                        <SelectItem value="over-100m">Over Rp 100 million</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-[#1C1C1A]">Message *</Label>
                    <Textarea {...register('message')} rows={6} className="mt-1 border-[#E8E6E0]" />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                  </div>

                  <Button type="submit" className="w-full bg-[#1D9E75] hover:bg-[#1a8c66]" disabled={isLoading}>
                    {isLoading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  )
}