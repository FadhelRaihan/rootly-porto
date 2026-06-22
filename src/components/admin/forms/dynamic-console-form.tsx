'use client'

import React from 'react'
import { useWatch } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { AppSelect } from '@/components/ui/app-select'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BilingualField } from './bilingual-field'

export interface FormField {
  name: string
  label: string
  type: 'text' | 'number' | 'textarea' | 'switch' | 'select' | 'custom' | 'bilingual-text' | 'bilingual-textarea'
  options?: { value: string; label: string }[]
  placeholder?: string
  disabled?: boolean
  gridClass?: string // Tailwind grid span, e.g. "col-span-1" or "md:col-span-2"
  renderCustom?: (formContext: any) => React.ReactNode
}

export interface FormSection {
  title: string
  fields: FormField[]
}

interface DynamicConsoleFormProps {
  form: any // The React Hook Form instance from the parent
  sections: FormSection[]
  onSubmit: (data: any) => Promise<void>
  submitLabel?: string
  executingLabel?: string
  isLoading?: boolean
}

export function DynamicConsoleForm({
  form,
  sections,
  onSubmit,
  submitLabel = '[ COMMIT_CHANGES ]',
  executingLabel = 'EXECUTING_COMMIT...',
  isLoading = false,
}: DynamicConsoleFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = form

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-h-[80vh] overflow-y-auto px-1 py-2 font-mono text-xs">
      {sections.map((section, sIdx) => (
        <Card key={section.title} className="bg-rootly-admin-card border-rootly-admin-border border-dashed text-rootly-text rounded-lg">
          <CardHeader className="py-3 border-b border-dashed border-rootly-admin-border">
            <CardTitle className="text-xs text-gray-500 uppercase tracking-wider font-bold">
              {`[ 0${sIdx + 1} // ${section.title.toUpperCase().replace(/\s+/g, '_')} ]`}
            </CardTitle>
          </CardHeader>
          <CardContent className="py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.fields.map((field) => {
                const error = errors[field.name]
                const errorMessage = error?.message as string | undefined

                return (
                  <div key={field.name} className={cn("flex flex-col gap-1.5", field.gridClass)}>
                    {field.type !== 'custom' && field.type !== 'switch' && !field.type.startsWith('bilingual') && (
                      <Label className="text-gray-500 font-bold uppercase tracking-wider text-[10px]">
                        {field.label}
                      </Label>
                    )}

                    {field.type === 'text' && (
                      <Input
                        {...register(field.name)}
                        disabled={field.disabled}
                        placeholder={field.placeholder}
                        className="bg-rootly-admin-bg/50 border-rootly-admin-border border-dashed text-rootly-text placeholder-gray-400 focus-visible:ring-[#1D9E75] font-mono text-xs h-9"
                      />
                    )}

                    {field.type === 'number' && (
                      <Input
                        type="number"
                        {...register(field.name, { valueAsNumber: true })}
                        disabled={field.disabled}
                        placeholder={field.placeholder}
                        className="bg-rootly-admin-bg/50 border-rootly-admin-border border-dashed text-rootly-text focus-visible:ring-[#1D9E75] font-mono text-xs h-9"
                      />
                    )}

                    {field.type === 'textarea' && (
                      <Textarea
                        {...register(field.name)}
                        disabled={field.disabled}
                        placeholder={field.placeholder}
                        className="bg-rootly-admin-bg/50 border-rootly-admin-border border-dashed text-rootly-text focus-visible:ring-[#1D9E75] font-mono text-xs min-h-[60px]"
                      />
                    )}

                    {field.type === 'bilingual-text' && (
                      <BilingualField
                        enName={field.name}
                        idName={`${field.name}Id`}
                        label={field.label}
                        register={register}
                        setValue={setValue}
                        watch={watch}
                        type="input"
                        placeholder={field.placeholder}
                        disabled={field.disabled}
                        errorMessage={errors[field.name]?.message as string | undefined}
                      />
                    )}

                    {field.type === 'bilingual-textarea' && (
                      <BilingualField
                        enName={field.name}
                        idName={`${field.name}Id`}
                        label={field.label}
                        register={register}
                        setValue={setValue}
                        watch={watch}
                        type="textarea"
                        placeholder={field.placeholder}
                        disabled={field.disabled}
                        errorMessage={errors[field.name]?.message as string | undefined}
                      />
                    )}

                    {field.type === 'select' && (
                      <SelectField field={field} control={control} setValue={setValue} />
                    )}

                    {field.type === 'switch' && (
                      <SwitchField field={field} control={control} setValue={setValue} />
                    )}

                    {field.type === 'custom' && field.renderCustom && (
                      field.renderCustom(form)
                    )}

                    {errorMessage && (
                      <p className="text-red-500 text-[10px] mt-0.5">
                        {`// ERROR: ${errorMessage}`}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="flex justify-end gap-3 pt-4 border-t border-dashed border-rootly-admin-border">
        <Button
          type="submit"
          className="bg-rootly-primary hover:brightness-90 text-white font-mono text-xs uppercase tracking-wider border border-[#1D9E75] rounded-md h-10 px-6 cursor-pointer shadow-xs transition-all duration-200"
          disabled={isLoading}
        >
          {isLoading ? executingLabel : submitLabel}
        </Button>
      </div>
    </form>
  )
}

function SelectField({ field, control, setValue }: { field: FormField; control: any; setValue: any }) {
  const value = useWatch({ control, name: field.name })
  return (
    <AppSelect
      value={value || ''}
      onValueChange={(val) => setValue(field.name, val)}
      options={field.options || []}
      width="w-full"
      className="bg-rootly-admin-bg/50 border-rootly-admin-border border-dashed text-rootly-text h-9 text-xs"
    />
  )
}

function SwitchField({ field, control, setValue }: { field: FormField; control: any; setValue: any }) {
  const checked = useWatch({ control, name: field.name })
  return (
    <div className="flex items-center gap-3 py-1.5">
      <Switch
        checked={checked}
        onCheckedChange={(checked) => setValue(field.name, checked)}
        className="data-[state=checked]:bg-rootly-primary"
        disabled={field.disabled}
      />
      <Label className="text-gray-500 font-bold uppercase tracking-wider text-[10px] cursor-pointer">
        {field.label}
      </Label>
    </div>
  )
}
