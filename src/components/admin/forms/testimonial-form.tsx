'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { testimonialSchema, TestimonialFormData } from '@/lib/validations/testimonial'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Props { initialData?: TestimonialFormData & { id?: string } }

export function TestimonialForm({ initialData }: Props) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: zodResolver(testimonialSchema),
    defaultValues: initialData || { clientName: '', clientRole: '', clientCompany: '', quote: '', rating: 5, isFeatured: false, isActive: true, displayOrder: 0 },
  })

  const onSubmit = async (data: TestimonialFormData) => {
    setIsLoading(true)
    try {
      const url = initialData?.id ? `/api/admin/testimonials/${initialData.id}` : '/api/admin/testimonials'
      const method = initialData?.id ? 'PUT' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      if (res.ok) router.push('/admin/testimonials')
    } catch (e) { console.error(e) }
    finally { setIsLoading(false) }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card className="bg-[#242422] border-[#2E2E2C]">
        <CardHeader><CardTitle className="text-white">Client Info</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div><Label className="text-gray-300">Name</Label><Input {...register('clientName')} className="bg-[#1C1C1A] border-[#2E2E2C] text-white mt-1" /></div>
            <div><Label className="text-gray-300">Role</Label><Input {...register('clientRole')} className="bg-[#1C1C1A] border-[#2E2E2C] text-white mt-1" /></div>
            <div><Label className="text-gray-300">Company</Label><Input {...register('clientCompany')} className="bg-[#1C1C1A] border-[#2E2E2C] text-white mt-1" /></div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-[#242422] border-[#2E2E2C]">
        <CardHeader><CardTitle className="text-white">Testimonial</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label className="text-gray-300">Quote</Label><Textarea {...register('quote')} rows={4} className="bg-[#1C1C1A] border-[#2E2E2C] text-white mt-1" /></div>
          <div className="grid grid-cols-3 gap-4">
            <div><Label className="text-gray-300">Rating</Label><Input type="number" min={1} max={5} {...register('rating', { valueAsNumber: true })} className="bg-[#1C1C1A] border-[#2E2E2C] text-white mt-1" /></div>
            <div><Label className="text-gray-300">Display Order</Label><Input type="number" {...register('displayOrder', { valueAsNumber: true })} className="bg-[#1C1C1A] border-[#2E2E2C] text-white mt-1" /></div>
            <div className="flex items-center gap-3 mt-6"><Switch checked={watch('isFeatured')} onCheckedChange={(c) => setValue('isFeatured', c)} /><Label className="text-gray-300">Featured</Label></div>
          </div>
          <div className="flex items-center gap-3"><Switch checked={watch('isActive')} onCheckedChange={(c) => setValue('isActive', c)} /><Label className="text-gray-300">Active</Label></div>
        </CardContent>
      </Card>
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()} className="border-[#2E2E2C] text-gray-300">Cancel</Button>
        <Button type="submit" className="bg-[#1D9E75]" disabled={isLoading}>{isLoading ? 'Saving...' : 'Save'}</Button>
      </div>
    </form>
  )
}