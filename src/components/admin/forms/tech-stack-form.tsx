'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { techStackSchema, TechStackFormData } from '@/lib/validations/tech-stack'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Upload, X } from 'lucide-react'
import Image from 'next/image'
import { DynamicConsoleForm, FormSection } from './dynamic-console-form'

interface Props { 
  initialData?: TechStackFormData & { id?: string }
  onSuccess?: () => void
}

const categories = ['FRONTEND', 'BACKEND', 'MOBILE', 'DATABASE', 'DEVOPS', 'DESIGN'] as const

export function TechStackForm({ initialData, onSuccess }: Props) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const form = useForm({
    resolver: zodResolver(techStackSchema),
    defaultValues: initialData || { name: '', category: 'FRONTEND', iconUrl: '', isActive: true },
  })

  const handleIconUpload = async (e: React.ChangeEvent<HTMLInputElement>, setValue: any) => {
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
        setValue('iconUrl', data.data.url)
      }
    } catch {
      console.error('Upload failed')
    } finally {
      setIsUploading(false)
    }
  }

  const onSubmit = async (data: TechStackFormData) => {
    setIsLoading(true)
    try {
      const url = initialData?.id ? `/api/admin/tech-stack/${initialData.id}` : '/api/admin/tech-stack'
      const method = initialData?.id ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        if (onSuccess) {
          onSuccess()
        } else {
          router.push('/admin/tech-stack')
        }
        router.refresh()
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  const sections: FormSection[] = [
    {
      title: 'Protocol Metadata Registry',
      fields: [
        { name: 'name', label: 'Stack Name', type: 'text' },
        {
          name: 'category',
          label: 'Stack Category',
          type: 'select',
          options: categories.map((c) => ({ value: c, label: c })),
        },
        {
          name: 'iconUrl',
          label: 'Icon Asset Stream',
          type: 'custom',
          gridClass: 'md:col-span-2',
          renderCustom: (f) => {
            const currentIconUrl = f.watch('iconUrl')
            return (
              <div className="space-y-2 font-mono text-xs">
                <Label className="text-gray-500 font-bold uppercase tracking-wider text-[10px]">Icon Asset Stream</Label>
                <div className="flex gap-4 items-start bg-rootly-admin-card p-3 rounded-lg border border-dashed border-rootly-admin-border">
                  {/* Preview Container */}
                  <div className="w-14 h-14 border border-dashed border-rootly-admin-border bg-rootly-admin-bg/30 flex items-center justify-center overflow-hidden shrink-0">
                    {currentIconUrl ? (
                      <Image 
                        src={currentIconUrl} 
                        alt="Icon Preview" 
                        width={40}
                        height={40}
                        className="w-10 h-10 object-contain transition-transform duration-200 hover:scale-110"
                      />
                    ) : (
                      <span className="text-[9px] font-bold text-gray-400">PREVIEW</span>
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <Input 
                      {...f.register('iconUrl')} 
                      className="bg-rootly-admin-bg/50 border-rootly-admin-border border-dashed text-rootly-text h-9 text-xs focus-visible:ring-[#1D9E75] font-mono" 
                      placeholder="Paste icon URL (SVG/PNG) or upload file below" 
                    />
                    <div className="flex items-center gap-2">
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-dashed border-rootly-admin-border hover:border-rootly-primary hover:bg-gray-50 text-[10px] font-bold text-gray-700 cursor-pointer transition-all">
                        <Upload className="w-3.5 h-3.5 text-gray-500" />
                        {isUploading ? 'UPLOADING...' : 'UPLOAD_FILE'}
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => handleIconUpload(e, f.setValue)} 
                          className="hidden" 
                          disabled={isUploading} 
                        />
                      </label>
                      {currentIconUrl && (
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => f.setValue('iconUrl', '')}
                          className="text-red-605 hover:text-red-700 hover:bg-red-50 h-7 text-[10px] cursor-pointer px-2.5 rounded-none border border-dashed border-rootly-admin-border font-mono font-bold"
                        >
                          <X className="w-3.5 h-3.5 mr-1" />
                          CLEAR
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          },
        },
        { name: 'isActive', label: 'Visible on Public Portfolio', type: 'switch', gridClass: 'md:col-span-2' },
      ],
    },
  ]

  return (
    <DynamicConsoleForm
      form={form}
      sections={sections}
      onSubmit={onSubmit}
      submitLabel="[ COMMIT_STACK_NODE ]"
      executingLabel="EXECUTING_COMMIT..."
      isLoading={isLoading}
    />
  )
}