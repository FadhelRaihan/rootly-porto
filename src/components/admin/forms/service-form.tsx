'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { serviceSchema, ServiceFormData } from '@/lib/validations/service'
import { slugify } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ServiceFormProps {
  initialData?: ServiceFormData & { id?: string; techStackIds?: string[] }
}

const iconOptions = ['Globe', 'Smartphone', 'Building2', 'Palette', 'Code', 'Database', 'Server', 'Cloud']

export function ServiceForm({ initialData }: ServiceFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: zodResolver(serviceSchema),
    defaultValues: initialData || { title: '', slug: '', icon: 'Globe', summary: '', description: '', useCases: [], displayOrder: 0, isActive: true },
  })

  const watchTitle = watch('title')

  useState(() => {
    if (!initialData?.slug && watchTitle) {
      setValue('slug', slugify(watchTitle))
    }
  })

  const onSubmit = async (data: ServiceFormData) => {
    setIsLoading(true)
    try {
      const url = initialData?.id ? `/api/admin/services/${initialData.id}` : '/api/admin/services'
      const method = initialData?.id ? 'PUT' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      if (res.ok) router.push('/admin/services')
    } catch (e) { console.error(e) }
    finally { setIsLoading(false) }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card className="bg-[#242422] border-[#2E2E2C]">
        <CardHeader><CardTitle className="text-white">Basic Info</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-300">Title</Label>
              <Input {...register('title')} className="bg-[#1C1C1A] border-[#2E2E2C] text-white mt-1" />
            </div>
            <div>
              <Label className="text-gray-300">Slug</Label>
              <Input {...register('slug')} className="bg-[#1C1C1A] border-[#2E2E2C] text-white mt-1" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label className="text-gray-300">Icon</Label>
              <Input {...register('icon')} className="bg-[#1C1C1A] border-[#2E2E2C] text-white mt-1" placeholder="Lucide icon name" />
            </div>
            <div>
              <Label className="text-gray-300">Display Order</Label>
              <Input type="number" {...register('displayOrder', { valueAsNumber: true })} className="bg-[#1C1C1A] border-[#2E2E2C] text-white mt-1" />
            </div>
            <div className="flex items-center gap-3 mt-6">
              <Switch checked={watch('isActive')} onCheckedChange={(c) => setValue('isActive', c)} />
              <Label className="text-gray-300">Active</Label>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-[#242422] border-[#2E2E2C]">
        <CardHeader><CardTitle className="text-white">Content</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-gray-300">Summary</Label>
            <Textarea {...register('summary')} maxLength={200} className="bg-[#1C1C1A] border-[#2E2E2C] text-white mt-1" />
          </div>
          <div>
            <Label className="text-gray-300">Description</Label>
            <Textarea {...register('description')} rows={6} className="bg-[#1C1C1A] border-[#2E2E2C] text-white mt-1" />
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()} className="border-[#2E2E2C] text-gray-300">Cancel</Button>
        <Button type="submit" className="bg-[#1D9E75]" disabled={isLoading}>{isLoading ? 'Saving...' : 'Save'}</Button>
      </div>
    </form>
  )
}