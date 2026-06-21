'use client'

import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, ContactFormData } from '@/lib/validations/contact'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { AppSelect } from '@/components/ui/app-select'
import { CheckCircle2, AlertCircle } from 'lucide-react'

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    control,
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

  const projectType = useWatch({ control, name: 'projectType' })
  const budget = useWatch({ control, name: 'budget' })

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
    <>
      {isSuccess ? (
        <div className="bg-[#F7F6F2]/50 p-8 rounded-2xl border border-[#1D9E75]/30 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#1d9e7506_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
          <CheckCircle2 className="w-12 h-12 text-[#1D9E75] mx-auto mb-4 animate-bounce" />
          <span className="font-mono text-[10px] text-[#1D9E75] tracking-widest uppercase block mb-2">{"[ CONNECTION ESTABLISHED ]"}</span>
          <h3 className="text-2xl font-serif text-[#1C1C1A] mb-3">Message Transmitted!</h3>
          <p className="text-[#888780] text-sm leading-relaxed max-w-sm mx-auto font-serif">
            Thank you for initiating node communication. Our team will ping you back on the registry within 24 hours.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 sm:p-8 rounded-2xl border border-[#E8E6E0] shadow-xs relative">
          <span className="font-mono text-[9px] text-gray-400 absolute top-4 right-4">{"[ SECURE SOCKETS ]"}</span>
          
          {isError && (
            <div className="flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-lg border border-red-100 font-mono text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p>ERROR: Handshake failed. Please try re-transmitting.</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-[#1C1C1A] font-mono text-xs">{"ID // NAME *"}</Label>
              <Input {...register('name')} placeholder="e.g. John Doe" className="mt-1 border-[#E8E6E0] focus-visible:ring-[#1D9E75] bg-[#F7F6F2]/20" />
              {errors.name && <p className="text-red-500 text-xs mt-1 font-mono">{`! ${errors.name.message}`}</p>}
            </div>
            <div>
              <Label className="text-[#1C1C1A] font-mono text-xs">{"MAIL // EMAIL *"}</Label>
              <Input type="email" {...register('email')} placeholder="e.g. john@domain.com" className="mt-1 border-[#E8E6E0] focus-visible:ring-[#1D9E75] bg-[#F7F6F2]/20" />
              {errors.email && <p className="text-red-500 text-xs mt-1 font-mono">{`! ${errors.email.message}`}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-[#1C1C1A] font-mono text-xs">{"ORG // COMPANY"}</Label>
              <Input {...register('company')} placeholder="e.g. Acme Corp" className="mt-1 border-[#E8E6E0] focus-visible:ring-[#1D9E75] bg-[#F7F6F2]/20" />
            </div>
            <div>
              <Label className="text-[#1C1C1A] font-mono text-xs">{"TYPE // PROJECT TYPE *"}</Label>
              <AppSelect
                value={projectType || ''}
                onValueChange={(val) => setValue('projectType', val as ContactFormData['projectType'])}
                options={projectTypes.map((type) => ({ value: type, label: type }))}
                width="w-full"
                placeholder="Select project protocol"
                className="mt-1 border-[#E8E6E0] h-9 bg-[#F7F6F2]/20"
              />
              {errors.projectType && <p className="text-red-500 text-xs mt-1 font-mono">{`! ${errors.projectType.message}`}</p>}
            </div>
          </div>

          <div>
            <Label className="text-[#1C1C1A] font-mono text-xs">{"EST // BUDGET RANGE"}</Label>
            <AppSelect
              value={budget || ''}
              onValueChange={(val) => setValue('budget', val || undefined)}
              options={[
                { value: 'under-10m', label: 'Under Rp 10 million' },
                { value: '10-25m', label: 'Rp 10 - 25 million' },
                { value: '25-50m', label: 'Rp 25 - 50 million' },
                { value: '50-100m', label: 'Rp 50 - 100 million' },
                { value: 'over-100m', label: 'Over Rp 100 million' },
              ]}
              width="w-full"
              placeholder="Select budget node"
              className="mt-1 border-[#E8E6E0] h-9 bg-[#F7F6F2]/20"
            />
          </div>

          <div>
            <Label className="text-[#1C1C1A] font-mono text-xs">{"MSG // MESSAGE *"}</Label>
            <Textarea {...register('message')} rows={5} placeholder="Describe your project, timeline, and requirements..." className="mt-1 border-[#E8E6E0] focus-visible:ring-[#1D9E75] bg-[#F7F6F2]/20" />
            {errors.message && <p className="text-red-500 text-xs mt-1 font-mono">{`! ${errors.message.message}`}</p>}
          </div>

          <Button type="submit" className="w-full bg-[#1D9E75] hover:bg-[#1a8c66] text-white font-mono text-xs tracking-widest uppercase py-6 rounded-xl hover:shadow-[0_0_20px_rgba(29,158,117,0.2)] transition-all duration-300" disabled={isLoading}>
            {isLoading ? 'INITIATING HANDSHAKE...' : 'SUBMIT REQUEST PROTOCOL //'}
          </Button>
        </form>
      )}
    </>
  )
}
