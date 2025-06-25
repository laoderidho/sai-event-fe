// components/TextInput.tsx
"use client"

import { Label } from "@radix-ui/react-label"
import { Input } from "@/components/ui/input"

type TextInputProps = {
  label: string
  placeholder?: string
  id: string
  value: string
  onChange: (value: string) => void
  type: string
}

export default function Text({ label, placeholder = "", id, value, onChange, type }: TextInputProps) {
  return (
    <div>
      <Label className="text-xl" htmlFor={id}>{label}</Label>
      <Input 
        className="h-12 !text-xl" 
        type={type}
        id={id} 
        placeholder={placeholder} 
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
