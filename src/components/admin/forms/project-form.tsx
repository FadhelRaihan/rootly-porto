'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { projectSchema, ProjectFormData } from '@/lib/validations/project'
import { slugify, cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { X, Upload } from 'lucide-react'
import Image from 'next/image'
import { DynamicConsoleForm, FormSection } from './dynamic-console-form'

interface ProjectFormProps {
  initialData?: ProjectFormData & { id?: string; techStackIds?: string[] }
  onSuccess?: () => void
}

export function ProjectForm({ initialData, onSuccess }: ProjectFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [thumbnailPreview, setThumbnailPreview] = useState(initialData?.thumbnailUrl || '')
  const [techStackOptions, setTechStackOptions] = useState<{ id: string; name: string }[]>([])
  const [selectedTechs, setSelectedTechs] = useState<string[]>(initialData?.techStackIds || [])

  const form = useForm({
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

  const watchTitle = useWatch({ control: form.control, name: 'title' })

  useEffect(() => {
    if (!initialData?.slug && watchTitle) {
      form.setValue('slug', slugify(watchTitle))
    }
  }, [watchTitle, initialData, form])

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

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>, setValue: any) => {
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

  const toggleTechStack = (techId: string, setValue: any) => {
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
        if (onSuccess) {
          onSuccess()
        } else {
          router.push('/admin/projects')
        }
        router.refresh()
      }
    } catch (error) {
      console.error('Error saving project:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const sections: FormSection[] = [
    {
      title: 'Basic Info Registry',
      fields: [
        { name: 'title', label: 'Title', type: 'bilingual-text' },
        {
          name: 'slug',
          label: 'Slug',
          type: 'custom',
          renderCustom: (f) => (
            <div className="flex flex-col gap-1.5">
              <Label className="text-gray-500 font-bold uppercase tracking-wider text-[10px]">Slug</Label>
              <Input
                {...f.register('slug')}
                className="bg-rootly-admin-bg/50 border-rootly-admin-border border-dashed text-rootly-text placeholder-gray-400 mt-1.5 focus-visible:ring-[#1D9E75] font-mono text-xs h-9"
              />
              <span className="text-[9px] text-gray-400 block mt-1">{"// SYSTEM_GENERATED_NODE_URI"}</span>
            </div>
          ),
        },
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          options: [
            { value: 'WEB_APP', label: 'WEB_APP' },
            { value: 'MOBILE', label: 'MOBILE_APP' },
            { value: 'INTERNAL_SYSTEM', label: 'INTERNAL_SYSTEM' },
            { value: 'DESIGN', label: 'DESIGN_UI_UX' },
          ],
        },
        { name: 'year', label: 'Year', type: 'number' },
        { name: 'displayOrder', label: 'Display Order', type: 'number', disabled: true },
        { name: 'client', label: 'Client', type: 'bilingual-text' },
        { name: 'showClient', label: 'Show Client Info', type: 'switch' },
        { name: 'isFeatured', label: 'Featured Project Node', type: 'switch' },
      ],
    },
    {
      title: 'Project Metadata Content',
      fields: [
        { name: 'summary', label: 'Summary', type: 'bilingual-rich-text', gridClass: 'md:col-span-2' },
        { name: 'challenge', label: 'Challenge', type: 'bilingual-rich-text', gridClass: 'md:col-span-2' },
        { name: 'solution', label: 'Solution', type: 'bilingual-rich-text', gridClass: 'md:col-span-2' },
        { name: 'impact', label: 'Impact', type: 'bilingual-rich-text', gridClass: 'md:col-span-2' },
      ],
    },
    {
      title: 'Media Asset Links',
      fields: [
        {
          name: 'thumbnailUrl',
          label: 'Thumbnail Node Image',
          type: 'custom',
          gridClass: 'md:col-span-2',
          renderCustom: (f) => (
            <div className="flex flex-col gap-1.5">
              <Label className="text-gray-500 font-bold uppercase tracking-wider text-[10px]">Thumbnail Node Image</Label>
              <div className="mt-2">
                {thumbnailPreview ? (
                  <div className="relative inline-block border border-dashed border-rootly-admin-border p-1.5 bg-rootly-admin-bg/50">
                    <Image
                      src={thumbnailPreview}
                      alt="Thumbnail Node"
                      width={128}
                      height={80}
                      className="w-32 h-20 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setThumbnailPreview('')
                        f.setValue('thumbnailUrl', '')
                      }}
                      className="absolute -top-1.5 -right-1.5 bg-red-500 rounded-full p-1 cursor-pointer hover:bg-red-650 transition-colors"
                    >
                      <X size={10} className="text-white" />
                    </button>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-rootly-admin-border p-6 block text-center cursor-pointer hover:border-rootly-primary transition-colors bg-rootly-admin-bg/20 hover:bg-rootly-admin-bg/50">
                    <Upload className="mx-auto h-5 w-5 text-gray-400 mb-1.5" />
                    <p className="text-[10px] font-bold text-gray-500 uppercase">{"// UPLOAD_THUMBNAIL_STREAM"}</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleThumbnailUpload(e, f.setValue)}
                      className="hidden"
                      disabled={isLoading}
                    />
                  </label>
                )}
              </div>
              <input type="hidden" {...f.register('thumbnailUrl')} />
            </div>
          ),
        },
        { name: 'liveUrl', label: 'Live Environment URL', type: 'text', gridClass: 'md:col-span-2' },
      ],
    },
    {
      title: 'Protocol Integrations',
      fields: [
        {
          name: 'techStackIds',
          label: 'Protocol Integrations',
          type: 'custom',
          gridClass: 'md:col-span-2',
          renderCustom: (f) => (
            <div className="flex flex-wrap gap-2">
              {techStackOptions.map((tech) => {
                const isSelected = selectedTechs.includes(tech.id)
                return (
                  <button
                    key={tech.id}
                    type="button"
                    onClick={() => toggleTechStack(tech.id, f.setValue)}
                    className={cn(
                      'px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border transition-all cursor-pointer font-mono',
                      isSelected
                        ? 'bg-rootly-primary/15 text-rootly-primary border-[#1D9E75] border-solid'
                        : 'bg-transparent text-gray-500 border-rootly-admin-border border-dashed hover:border-gray-400 hover:text-rootly-text'
                    )}
                  >
                    {isSelected ? `[ ${tech.name} ]` : tech.name}
                  </button>
                )
              })}
            </div>
          ),
        },
      ],
    },
  ]

  return (
    <DynamicConsoleForm
      form={form}
      sections={sections}
      onSubmit={onSubmit}
      submitLabel="[ COMMIT_PROJECT_NODE ]"
      executingLabel="EXECUTING_COMMIT..."
      isLoading={isLoading}
    />
  )
}