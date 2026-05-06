'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { projectSchema, ProjectFormData } from '@/lib/validations/project'
import { slugify, cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { X, Upload } from 'lucide-react'

interface ProjectFormProps {
  initialData?: ProjectFormData & { id?: string; techStackIds?: string[] }
}

export function ProjectForm({ initialData }: ProjectFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [thumbnailPreview, setThumbnailPreview] = useState(initialData?.thumbnailUrl || '')
  const [techStackOptions, setTechStackOptions] = useState<{ id: string; name: string }[]>([])
  const [selectedTechs, setSelectedTechs] = useState<string[]>(initialData?.techStackIds || [])

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData || {
      title: '',
      slug: '',
      category: 'WEB_APP',
      showClient: false,
      client: '',
      year: new Date().getFullYear(),
      summary: '',
      challenge: '',
      solution: '',
      impact: '',
      thumbnailUrl: '',
      images: [],
      liveUrl: '',
      isFeatured: false,
      displayOrder: 0,
      techStackIds: [],
    },
  })

  const watchTitle = watch('title')

  useEffect(() => {
    if (!initialData?.slug && watchTitle) {
      setValue('slug', slugify(watchTitle))
    }
  }, [watchTitle, initialData, setValue])

  useEffect(() => {
    fetch('/api/tech-stack')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const allTechs = Object.values(data.data).flat() as { id: string; name: string }[]
          setTechStackOptions(allTechs)
        }
      })
  }, [])

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    setIsLoading(true)
    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.success) {
        setThumbnailPreview(data.data.url)
        setValue('thumbnailUrl', data.data.url)
      }
    } catch {
      console.error('Upload failed')
    } finally {
      setIsLoading(false)
    }
  }

  const toggleTechStack = (techId: string) => {
    const newTechs = selectedTechs.includes(techId)
      ? selectedTechs.filter((id) => id !== techId)
      : [...selectedTechs, techId]
    setSelectedTechs(newTechs)
    setValue('techStackIds', newTechs)
  }

  const onSubmit = async (data: ProjectFormData) => {
    setIsLoading(true)
    try {
      const url = initialData?.id
        ? `/api/admin/projects/${initialData.id}`
        : '/api/admin/projects'
      const method = initialData?.id ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        router.push('/admin/projects')
      }
    } catch (error) {
      console.error('Error saving project:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <Card className="bg-[#242422] border-[#2E2E2C]">
        <CardHeader>
          <CardTitle className="text-white">Basic Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-300">Title</Label>
              <Input {...register('title')} className="bg-[#1C1C1A] border-[#2E2E2C] text-white mt-1" />
              {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>}
            </div>
            <div>
              <Label className="text-gray-300">Slug</Label>
              <Input {...register('slug')} className="bg-[#1C1C1A] border-[#2E2E2C] text-white mt-1" />
              {errors.slug && <p className="text-red-400 text-sm mt-1">{errors.slug.message}</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-gray-300">Category</Label>
              <Select value={watch('category')} onValueChange={(val) => setValue('category', val as any)}>
                <SelectTrigger className="bg-[#1C1C1A] border-[#2E2E2C] text-white mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#242422] border-[#2E2E2C]">
                  <SelectItem value="WEB_APP" className="text-white">Web App</SelectItem>
                  <SelectItem value="MOBILE" className="text-white">Mobile</SelectItem>
                  <SelectItem value="INTERNAL_SYSTEM" className="text-white">Internal System</SelectItem>
                  <SelectItem value="DESIGN" className="text-white">Design</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-gray-300">Year</Label>
              <Input type="number" {...register('year', { valueAsNumber: true })} className="bg-[#1C1C1A] border-[#2E2E2C] text-white mt-1" />
            </div>
            <div>
              <Label className="text-gray-300">Display Order</Label>
              <Input type="number" {...register('displayOrder', { valueAsNumber: true })} className="bg-[#1C1C1A] border-[#2E2E2C] text-white mt-1" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-300">Client</Label>
              <Input {...register('client')} className="bg-[#1C1C1A] border-[#2E2E2C] text-white mt-1" />
            </div>
            <div className="flex items-center gap-3 mt-6">
              <Switch checked={watch('showClient')} onCheckedChange={(checked) => setValue('showClient', checked)} />
              <Label className="text-gray-300">Show Client</Label>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Switch checked={watch('isFeatured')} onCheckedChange={(checked) => setValue('isFeatured', checked)} />
            <Label className="text-gray-300">Featured Project</Label>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#242422] border-[#2E2E2C]">
        <CardHeader>
          <CardTitle className="text-white">Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-gray-300">Summary (max 150 chars)</Label>
            <Textarea {...register('summary')} maxLength={150} className="bg-[#1C1C1A] border-[#2E2E2C] text-white mt-1" />
            <p className="text-gray-500 text-sm mt-1">{watch('summary')?.length || 0}/150</p>
          </div>
          <div>
            <Label className="text-gray-300">Challenge</Label>
            <Textarea {...register('challenge')} rows={4} className="bg-[#1C1C1A] border-[#2E2E2C] text-white mt-1" />
          </div>
          <div>
            <Label className="text-gray-300">Solution</Label>
            <Textarea {...register('solution')} rows={4} className="bg-[#1C1C1A] border-[#2E2E2C] text-white mt-1" />
          </div>
          <div>
            <Label className="text-gray-300">Impact</Label>
            <Textarea {...register('impact')} rows={4} className="bg-[#1C1C1A] border-[#2E2E2C] text-white mt-1" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#242422] border-[#2E2E2C]">
        <CardHeader>
          <CardTitle className="text-white">Media</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-gray-300">Thumbnail</Label>
            <div className="mt-1">
              {thumbnailPreview ? (
                <div className="relative inline-block">
                  <img src={thumbnailPreview} alt="Thumbnail" className="w-32 h-20 object-cover rounded" />
                  <button type="button" onClick={() => { setThumbnailPreview(''); setValue('thumbnailUrl', '') }} className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1">
                    <X size={14} className="text-white" />
                  </button>
                </div>
              ) : (
                <label className="border-2 border-dashed border-[#2E2E2C] rounded-lg p-8 block text-center cursor-pointer hover:border-[#1D9E75] transition-colors">
                  <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-gray-400 text-sm">Click to upload</p>
                  <input type="file" accept="image/*" onChange={handleThumbnailUpload} className="hidden" disabled={isLoading} />
                </label>
              )}
            </div>
            <input type="hidden" {...register('thumbnailUrl')} />
          </div>
          <div>
            <Label className="text-gray-300">Live URL</Label>
            <Input {...register('liveUrl')} placeholder="https://..." className="bg-[#1C1C1A] border-[#2E2E2C] text-white mt-1" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#242422] border-[#2E2E2C]">
        <CardHeader>
          <CardTitle className="text-white">Tech Stack</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {techStackOptions.map((tech) => (
              <button
                key={tech.id}
                type="button"
                onClick={() => toggleTechStack(tech.id)}
                className={cn(
                  'px-3 py-1 rounded-full text-sm transition-colors',
                  selectedTechs.includes(tech.id)
                    ? 'bg-[#1D9E75] text-white'
                    : 'bg-[#1C1C1A] text-gray-300 hover:bg-[#2E2E2C]'
                )}
              >
                {tech.name}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()} className="border-[#2E2E2C] text-gray-300 hover:bg-[#242422]">
          Cancel
        </Button>
        <Button type="submit" className="bg-[#1D9E75] hover:bg-[#1a8c66]" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Project'}
        </Button>
      </div>
    </form>
  )
}