'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { testimonialSchema, TestimonialFormData } from '@/lib/validations/testimonial'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DynamicConsoleForm, FormSection } from '@/components/admin/forms/dynamic-console-form'
import { Upload, X } from 'lucide-react'
import Image from 'next/image'
import { toast } from 'sonner'

interface Props { 
  initialData?: TestimonialFormData & { id?: string }
  onSuccess?: () => void
}

export function TestimonialForm({ initialData, onSuccess }: Props) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [projectOptions, setProjectOptions] = useState<{ value: string; label: string }[]>([])

  const form = useForm({
    resolver: zodResolver(testimonialSchema),
    defaultValues: initialData || { 
      clientName: '', 
      clientRole: '', 
      clientCompany: '', 
      clientPhoto: '', 
      quote: '', 
      rating: 5, 
      isFeatured: false, 
      isActive: true, 
      displayOrder: 0,
      projectId: 'none' as any
    },
  })

  useEffect(() => {
    fetch('/api/admin/projects')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          const options = data.data.map((p: any) => ({
            value: p.id,
            label: p.title
          }))
          setProjectOptions([{ value: 'none', label: 'None (Unlinked)' }, ...options])
        }
      })
      .catch((err) => console.error('Failed to fetch projects:', err))
  }, [])

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    setIsUploading(true)
    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.success) {
        form.setValue('clientPhoto', data.data.url)
        toast.success('Photo uploaded successfully')
      }
    } catch {
      console.error('Upload failed')
      toast.error('Upload failed')
    } finally {
      setIsUploading(false)
    }
  }

  const onSubmit = async (data: TestimonialFormData) => {
    setIsLoading(true)
    const payload = {
      ...data,
      projectId: data.projectId === 'none' ? null : data.projectId
    }

    try {
      const url = initialData?.id ? `/api/admin/testimonials/${initialData.id}` : '/api/admin/testimonials'
      const method = initialData?.id ? 'PUT' : 'POST'
      const res = await fetch(url, { 
        method, 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(payload) 
      })
      if (res.ok) {
        toast.success(initialData?.id ? 'Testimonial updated successfully' : 'Testimonial created successfully')
        if (onSuccess) {
          onSuccess()
        } else {
          router.push('/admin/testimonials')
        }
        router.refresh()
      } else {
        toast.error('Failed to save testimonial')
      }
    } catch (e) { 
      console.error(e)
      toast.error('An error occurred')
    } finally { 
      setIsLoading(false) 
    }
  }

  const sections: FormSection[] = [
    {
      title: 'Client Profile Metadata',
      fields: [
        {
          name: 'clientName',
          label: 'Client Name',
          type: 'bilingual-text',
          placeholder: 'e.g. John Doe',
          gridClass: 'col-span-1'
        },
        {
          name: 'clientRole',
          label: 'Client Role',
          type: 'bilingual-text',
          placeholder: 'e.g. CEO / Lead Architect',
          gridClass: 'col-span-1'
        },
        {
          name: 'clientCompany',
          label: 'Client Company',
          type: 'bilingual-text',
          placeholder: 'e.g. Acme Corp',
          gridClass: 'col-span-1 md:col-span-2'
        }
      ]
    },
    {
      title: 'Client Avatar Signature',
      fields: [
        {
          name: 'clientPhoto',
          label: 'Client Photo',
          type: 'custom',
          gridClass: 'col-span-1 md:col-span-2',
          renderCustom: (formInstance) => {
            const watchClientPhoto = formInstance.watch('clientPhoto')
            return (
              <div className="space-y-2">
                <Label className="text-gray-500 font-bold uppercase tracking-wider text-[10px]">
                  CLIENT_PHOTO_NODE
                </Label>
                <div className="flex gap-4 items-start bg-rootly-admin-card p-3 rounded-lg border border-dashed border-rootly-admin-border">
                  <div className="w-14 h-14 border border-dashed border-rootly-admin-border bg-rootly-admin-bg/35 flex items-center justify-center overflow-hidden shrink-0">
                    {watchClientPhoto ? (
                      <Image 
                        src={watchClientPhoto} 
                        alt="Client Avatar" 
                        width={56}
                        height={56}
                        className="w-14 h-14 object-cover"
                      />
                    ) : (
                      <span className="text-[9px] font-bold text-gray-400">AVATAR</span>
                    )}
                  </div>

                  <div className="flex-1 space-y-2 font-mono">
                    <Input 
                      {...formInstance.register('clientPhoto')} 
                      className="bg-rootly-admin-bg/50 border-rootly-admin-border border-dashed text-rootly-text h-9 text-xs focus-visible:ring-[#1D9E75] font-mono" 
                      placeholder="Paste photo URL or upload below" 
                    />
                    <div className="flex items-center gap-2">
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-dashed border-rootly-admin-border hover:border-rootly-primary hover:bg-rootly-primary/5 text-[10px] font-bold text-gray-700 cursor-pointer transition-all">
                        <Upload className="w-3.5 h-3.5 text-rootly-primary" />
                        {isUploading ? 'UPLOADING...' : 'UPLOAD_PHOTO'}
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handlePhotoUpload} 
                          className="hidden" 
                          disabled={isUploading} 
                        />
                      </label>
                      {watchClientPhoto && (
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => formInstance.setValue('clientPhoto', '')}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 text-[9px] font-bold h-7 cursor-pointer px-2 border border-transparent hover:border-red-200"
                        >
                          <X className="w-3.5 h-3.5 mr-1" />
                          {"[ CLEAR ]"}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        }
      ]
    },
    {
      title: 'Review Registry Details',
      fields: [
        {
          name: 'quote',
          label: 'Quote Recommendation (min 20 characters)',
          type: 'bilingual-textarea',
          placeholder: 'Excellent engineering execution, highly recommended...',
          gridClass: 'col-span-1 md:col-span-2'
        },
        {
          name: 'rating',
          label: 'Node Rating Level',
          type: 'select',
          options: [
            { value: '5', label: '★★★★★ (5 Stars)' },
            { value: '4', label: '★★★★☆ (4 Stars)' },
            { value: '3', label: '★★★☆☆ (3 Stars)' },
            { value: '2', label: '★★☆☆☆ (2 Stars)' },
            { value: '1', label: '★☆☆☆☆ (1 Star)' },
          ],
          gridClass: 'col-span-1'
        },
        {
          name: 'projectId',
          label: 'Linked System Project Ref',
          type: 'select',
          options: projectOptions,
          gridClass: 'col-span-1'
        }
      ]
    },
    {
      title: 'Console Telemetry Configs',
      fields: [
        {
          name: 'isActive',
          label: 'Active (Visible on public interface)',
          type: 'switch',
          gridClass: 'col-span-1'
        },
        {
          name: 'isFeatured',
          label: 'Featured (Promote on dashboard lists)',
          type: 'switch',
          gridClass: 'col-span-1'
        }
      ]
    }
  ]

  return (
    <DynamicConsoleForm
      form={form}
      sections={sections}
      onSubmit={onSubmit}
      submitLabel={initialData?.id ? '[ UPDATE_TESTIMONIAL_NODE ]' : '[ REGISTER_TESTIMONIAL_NODE ]'}
      executingLabel="EXECUTING_NODE_REGISTRATION..."
      isLoading={isLoading}
    />
  )
}