// components/TextInput.tsx
"use client"

import { Label } from "@radix-ui/react-label"
import { Input } from "@/components/ui/input"

type TextInputProps = {
  label?: string
  placeholder?: string
  id: string
  value: string
  onChange: (value: string) => void
  type: string,
  classNameInput?: string
}

export default function Text({ label, placeholder = "", id, value, onChange, type, classNameInput = "" }: TextInputProps) {
  return (
    <div>
      {label &&  <Label className="text-base" htmlFor={id}>{label}</Label>}
      <Input 
        className={`h-10 !text-base ${classNameInput}`} 
        type={type}
        id={id} 
        placeholder={placeholder} 
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
