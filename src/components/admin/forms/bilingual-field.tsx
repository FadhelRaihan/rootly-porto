'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface BilingualFieldProps {
  enName: string
  idName: string
  label: string
  register: any
  setValue: any
  watch: any
  type?: 'input' | 'textarea'
  placeholder?: string
  disabled?: boolean
  gridClass?: string
  errorMessage?: string
}

export function BilingualField({
  enName,
  idName,
  label,
  register,
  setValue,
  watch,
  type = 'input',
  placeholder,
  disabled,
  gridClass,
  errorMessage,
}: BilingualFieldProps) {
  const [activeLang, setActiveLang] = useState<'en' | 'id'>('en')
  const enValue = watch(enName)
  const idValue = watch(idName)

  const handleCopy = () => {
    if (enValue && !idValue) {
      setValue(idName, enValue, { shouldValidate: false })
    }
  }

  return (
    <div className={cn("flex flex-col gap-1.5", gridClass)}>
      <div className="flex items-center justify-between">
        <Label className="text-gray-500 font-bold uppercase tracking-wider text-[10px]">
          {label}
        </Label>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setActiveLang('en')}
            className={cn(
              'text-[9px] font-bold font-mono uppercase tracking-wider px-1.5 py-0.5 rounded border cursor-pointer transition-all',
              activeLang === 'en'
                ? 'bg-rootly-primary/15 text-rootly-primary border-rootly-primary/40'
                : 'text-gray-400 border-transparent hover:text-gray-300 hover:border-rootly-admin-border'
            )}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setActiveLang('id')}
            className={cn(
              'text-[9px] font-bold font-mono uppercase tracking-wider px-1.5 py-0.5 rounded border cursor-pointer transition-all',
              activeLang === 'id'
                ? 'bg-rootly-primary/15 text-rootly-primary border-rootly-primary/40'
                : 'text-gray-400 border-transparent hover:text-gray-300 hover:border-rootly-admin-border'
            )}
          >
            ID
          </button>
          {activeLang === 'id' && !idValue && enValue && (
            <button
              type="button"
              onClick={handleCopy}
              className="text-[9px] font-mono text-rootly-primary hover:text-rootly-primary/80 underline px-1"
              title="Copy from English"
            >
              copy
            </button>
          )}
        </div>
      </div>

      {activeLang === 'en' && (
        type === 'textarea' ? (
          <Textarea
            {...register(enName)}
            disabled={disabled}
            placeholder={placeholder}
            className="bg-rootly-admin-bg/50 border-rootly-admin-border border-dashed text-rootly-text focus-visible:ring-[#1D9E75] font-mono text-xs min-h-[60px]"
          />
        ) : (
          <Input
            {...register(enName)}
            disabled={disabled}
            placeholder={placeholder}
            className="bg-rootly-admin-bg/50 border-rootly-admin-border border-dashed text-rootly-text placeholder-gray-400 focus-visible:ring-[#1D9E75] font-mono text-xs h-9"
          />
        )
      )}

      {activeLang === 'id' && (
        type === 'textarea' ? (
          <Textarea
            {...register(idName)}
            disabled={disabled}
            placeholder={placeholder ? `${placeholder} (Bahasa Indonesia)` : 'Bahasa Indonesia'}
            className="bg-rootly-admin-bg/50 border-rootly-admin-border border-dashed text-rootly-text focus-visible:ring-[#1D9E75] font-mono text-xs min-h-[60px]"
          />
        ) : (
          <Input
            {...register(idName)}
            disabled={disabled}
            placeholder={placeholder ? `${placeholder} (Bahasa Indonesia)` : 'Bahasa Indonesia'}
            className="bg-rootly-admin-bg/50 border-rootly-admin-border border-dashed text-rootly-text placeholder-gray-400 focus-visible:ring-[#1D9E75] font-mono text-xs h-9"
          />
        )
      )}

      {errorMessage && (
        <p className="text-red-500 text-[10px] mt-0.5">
          {`// ERROR: ${errorMessage}`}
        </p>
      )}
    </div>
  )
}
