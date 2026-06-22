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
import { useTranslation } from '@/context/language-context'

export function ContactForm() {
  const { t } = useTranslation()
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

  const projectTypes = [
    { value: 'Web Application', label: t('contact.form.projectType.web') },
    { value: 'Mobile Application', label: t('contact.form.projectType.mobile') },
    { value: 'Internal Business System', label: t('contact.form.projectType.internal') },
    { value: 'UI/UX Design', label: t('contact.form.projectType.uiux') },
    { value: 'Tech Consulting', label: t('contact.form.projectType.consulting') },
    { value: 'Lainnya', label: t('contact.form.projectType.other') },
  ]

  const budgetOptions = [
    { value: 'under-10m', label: t('contact.form.budget.under10m') },
    { value: '10-25m', label: t('contact.form.budget.10to25m') },
    { value: '25-50m', label: t('contact.form.budget.25to50m') },
    { value: '50-100m', label: t('contact.form.budget.50to100m') },
    { value: 'over-100m', label: t('contact.form.budget.over100m') },
  ]

  return (
    <>
      {isSuccess ? (
        <div className="bg-rootly-background/50 p-8 rounded-2xl border border-rootly-primary/30 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#1d9e7506_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
          <CheckCircle2 className="w-12 h-12 text-rootly-primary mx-auto mb-4 animate-bounce" />
          <span className="font-mono text-[10px] text-rootly-primary tracking-widest uppercase block mb-2">{"[ CONNECTION ESTABLISHED ]"}</span>
          <h3 className="text-2xl font-serif text-rootly-text mb-3">{t('contact.form.successTitle')}</h3>
          <p className="text-rootly-muted text-sm leading-relaxed max-w-sm mx-auto font-serif">
            {t('contact.form.successDesc')}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-rootly-surface p-6 sm:p-8 rounded-2xl border border-rootly-border shadow-xs relative">
          <span className="font-mono text-[9px] text-rootly-muted absolute top-4 right-4">{"[ " + t('contact.form.secureSocket') + " ]"}</span>
          
          {isError && (
            <div className="flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-lg border border-red-100 font-mono text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p>{t('contact.form.errorMsg')}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-rootly-text font-mono text-xs">{t('contact.form.nameLabel')}</Label>
              <Input {...register('name')} placeholder={t('contact.form.namePlaceholder')} className="mt-1 border-rootly-border focus-visible:ring-rootly-primary bg-rootly-background/20" />
              {errors.name && <p className="text-red-500 text-xs mt-1 font-mono">{`! ${errors.name.message}`}</p>}
            </div>
            <div>
              <Label className="text-rootly-text font-mono text-xs">{t('contact.form.emailLabel')}</Label>
              <Input type="email" {...register('email')} placeholder={t('contact.form.emailPlaceholder')} className="mt-1 border-rootly-border focus-visible:ring-rootly-primary bg-rootly-background/20" />
              {errors.email && <p className="text-red-500 text-xs mt-1 font-mono">{`! ${errors.email.message}`}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-rootly-text font-mono text-xs">{t('contact.form.companyLabel')}</Label>
              <Input {...register('company')} placeholder={t('contact.form.companyPlaceholder')} className="mt-1 border-rootly-border focus-visible:ring-rootly-primary bg-rootly-background/20" />
            </div>
            <div>
              <Label className="text-rootly-text font-mono text-xs">{t('contact.form.projectTypeLabel')}</Label>
              <AppSelect
                value={projectType || ''}
                onValueChange={(val) => setValue('projectType', val as ContactFormData['projectType'])}
                options={projectTypes}
                width="w-full"
                placeholder={t('contact.form.projectTypePlaceholder')}
                className="mt-1 border-rootly-border h-9 bg-rootly-background/20"
              />
              {errors.projectType && <p className="text-red-500 text-xs mt-1 font-mono">{`! ${errors.projectType.message}`}</p>}
            </div>
          </div>

          <div>
            <Label className="text-rootly-text font-mono text-xs">{t('contact.form.budgetLabel')}</Label>
            <AppSelect
              value={budget || ''}
              onValueChange={(val) => setValue('budget', val || undefined)}
              options={budgetOptions}
              width="w-full"
              placeholder={t('contact.form.budgetPlaceholder')}
              className="mt-1 border-rootly-border h-9 bg-rootly-background/20"
            />
          </div>

          <div>
            <Label className="text-rootly-text font-mono text-xs">{t('contact.form.messageLabel')}</Label>
            <Textarea {...register('message')} rows={5} placeholder={t('contact.form.messagePlaceholder')} className="mt-1 border-rootly-border focus-visible:ring-rootly-primary bg-rootly-background/20" />
            {errors.message && <p className="text-red-500 text-xs mt-1 font-mono">{`! ${errors.message.message}`}</p>}
          </div>

          <Button type="submit" className="w-full bg-rootly-primary hover:brightness-90 text-white font-mono text-xs tracking-widest uppercase py-6 rounded-xl hover:shadow-[0_0_20px_rgba(29,158,117,0.2)] transition-all duration-300" disabled={isLoading}>
            {isLoading ? t('contact.form.submitting') : t('contact.form.submit')}
          </Button>
        </form>
      )}
    </>
  )
}
