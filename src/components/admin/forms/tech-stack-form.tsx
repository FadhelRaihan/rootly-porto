'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { techStackSchema, TechStackFormData } from '@/lib/validations/tech-stack'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Props { initialData?: TechStackFormData & { id?: string } }

const categories = ['FRONTEND', 'BACKEND', 'MOBILE', 'DATABASE', 'DEVOPS', 'DESIGN'] as const

export function TechStackForm({ initialData }: Props) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: zodResolver(techStackSchema),
    defaultValues: initialData || { name: '', category: 'FRONTEND', iconUrl: '', isActive: true },
  })

  const onSubmit = async (data: TechStackFormData) => {
    setIsLoading(true)
    try {
      const url = initialData?.id ? `/api/admin/tech-stack/${initialData.id}` : '/api/admin/tech-stack'
      const method = initialData?.id ? 'PUT' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      if (res.ok) router.push('/admin/tech-stack')
    } catch (e) { console.error(e) }
    finally { setIsLoading(false) }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card className="bg-[#242422] border-[#2E2E2C]">
        <CardHeader><CardTitle className="text-white">Tech Stack</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><Label className="text-gray-300">Name</Label><Input {...register('name')} className="bg-[#1C1C1A] border-[#2E2E2C] text-white mt-1" /></div>
            <div><Label className="text-gray-300">Icon URL</Label><Input {...register('iconUrl')} className="bg-[#1C1C1A] border-[#2E2E2C] text-white mt-1" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label className="text-gray-300">Category</Label>
              <select {...register('category')} className="bg-[#1C1C1A] border-[#2E2E2C] text-white mt-1 p-2 rounded w-full">
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-3 mt-6"><Switch checked={watch('isActive')} onCheckedChange={(c) => setValue('isActive', c)} /><Label className="text-gray-300">Active</Label></div>
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