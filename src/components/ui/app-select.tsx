import * as React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

export interface AppSelectOption {
  value: string
  label: string
}

interface AppSelectProps {
  value: string
  onValueChange: (value: string) => void
  options: AppSelectOption[]
  placeholder?: string
  className?: string
  width?: string
}

export function AppSelect({
  value,
  onValueChange,
  options,
  placeholder,
  className,
  width = "w-[150px]",
}: AppSelectProps) {
  return (
    <Select value={value} onValueChange={(val) => onValueChange(val || '')}>
      <SelectTrigger className={cn("h-8 text-xs bg-[#F7F6F2] border-[#E2E2DF] text-black cursor-pointer", width, className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false} className="bg-white border-[#E2E2DF] text-black z-[100]">
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value} className="text-xs pl-3 cursor-pointer">
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
