'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { serviceSchema, ServiceFormData } from '@/lib/validations/service'
import { slugify } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DynamicConsoleForm, FormSection } from './dynamic-console-form'

interface ServiceFormProps {
  initialData?: ServiceFormData & { id?: string }
  onSuccess?: () => void
}

const iconOptions = [
  { value: 'Globe', label: 'Globe' },
  { value: 'Smartphone', label: 'Smartphone' },
  { value: 'Building2', label: 'Building' },
  { value: 'Palette', label: 'Palette' },
  { value: 'Code', label: 'Code' },
  { value: 'Database', label: 'Database' },
  { value: 'Server', label: 'Server' },
  { value: 'Cloud', label: 'Cloud' },
  { value: 'Cpu', label: 'CPU' },
  { value: 'Terminal', label: 'Terminal' },
  { value: 'Layers', label: 'Layers' },
  { value: 'Monitor', label: 'Monitor' },
]

export function ServiceForm({ initialData, onSuccess }: ServiceFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [newUseCase, setNewUseCase] = useState('')

  const form = useForm({
    resolver: zodResolver(serviceSchema),
    defaultValues: initialData || {
      title: '',
      slug: '',
      icon: 'Globe',
      summary: '',
      description: '',
      useCases: [],
      displayOrder: 0,
      isActive: true,
    },
  })

  const watchTitle = useWatch({ control: form.control, name: 'title' })

  useEffect(() => {
    if (!initialData?.slug && watchTitle) {
      form.setValue('slug', slugify(watchTitle))
    }
  }, [watchTitle, initialData, form])

  const handleAddUseCase = (setValue: any, useCasesList: string[]) => {
    if (newUseCase.trim()) {
      setValue('useCases', [...useCasesList, newUseCase.trim()])
      setNewUseCase('')
    }
  }

  const handleRemoveUseCase = (indexToRemove: number, setValue: any, useCasesList: string[]) => {
    setValue('useCases', useCasesList.filter((_, i) => i !== indexToRemove))
  }

  const onSubmit = async (data: ServiceFormData) => {
    setIsLoading(true)
    try {
      const url = initialData?.id ? `/api/admin/services/${initialData.id}` : '/api/admin/services'
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
          router.push('/admin/services')
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
      title: 'Basic Info Registry',
      fields: [
        { name: 'title', label: 'Title', type: 'text' },
        {
          name: 'slug',
          label: 'Slug',
          type: 'custom',
          renderCustom: (f) => (
            <div className="flex flex-col gap-1.5">
              <Label className="text-gray-500 font-bold uppercase tracking-wider text-[10px]">Slug</Label>
              <Input
                {...f.register('slug')}
                className="bg-[#F7F6F2]/50 border-[#E2E2DF] border-dashed text-black placeholder-gray-400 mt-1.5 focus-visible:ring-[#1D9E75] font-mono text-xs h-9"
              />
              <span className="text-[9px] text-gray-400 block mt-1">{"// SYSTEM_GENERATED_NODE_URI"}</span>
            </div>
          ),
        },
        {
          name: 'icon',
          label: 'Icon Selector',
          type: 'select',
          options: iconOptions,
        },
        { name: 'isActive', label: 'Active Service Capability', type: 'switch' },
        { name: 'displayOrder', label: 'Display Order', type: 'number', disabled: true },
      ],
    },
    {
      title: 'Service Capability Details',
      fields: [
        { name: 'summary', label: 'Summary', type: 'textarea', gridClass: 'md:col-span-2' },
        { name: 'description', label: 'Description', type: 'textarea', gridClass: 'md:col-span-2' },
        {
          name: 'useCases',
          label: 'Use Cases',
          type: 'custom',
          gridClass: 'md:col-span-2',
          renderCustom: (f) => {
            const useCasesList = f.watch('useCases') || []
            return (
              <div className="flex flex-col gap-1.5 font-mono">
                <Label className="text-gray-500 font-bold uppercase tracking-wider text-[10px]">Use Cases</Label>
                <div className="flex gap-2 mt-1 mb-2">
                  <Input
                    type="text"
                    value={newUseCase}
                    onChange={(e) => setNewUseCase(e.target.value)}
                    placeholder="Add target application case..."
                    className="bg-[#F7F6F2]/50 border-[#E2E2DF] border-dashed text-black focus-visible:ring-[#1D9E75] font-mono text-xs h-9"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleAddUseCase(f.setValue, useCasesList)
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() => handleAddUseCase(f.setValue, useCasesList)}
                    className="bg-[#1D9E75] hover:bg-[#1a8c66] text-white border border-[#1D9E75] h-9 cursor-pointer font-mono text-xs uppercase"
                  >
                    Add
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {useCasesList.map((useCase: string, index: number) => (
                    <div key={index} className="flex items-center gap-1.5 px-2.5 py-1 bg-[#F7F6F2]/40 border border-dashed border-[#E2E2DF] text-xs text-black font-mono">
                      <span>{useCase}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveUseCase(index, f.setValue, useCasesList)}
                        className="text-gray-400 hover:text-red-500 font-bold focus:outline-none cursor-pointer text-sm"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  {useCasesList.length === 0 && (
                    <span className="text-[10px] text-gray-400 italic">{"// NO USE CASES ADDED YET."}</span>
                  )}
                </div>
              </div>
            )
          },
        },
      ],
    },
  ]

  return (
    <DynamicConsoleForm
      form={form}
      sections={sections}
      onSubmit={onSubmit}
      submitLabel="[ COMMIT_SERVICE_NODE ]"
      executingLabel="EXECUTING_COMMIT..."
      isLoading={isLoading}
    />
  )
}