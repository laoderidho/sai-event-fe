"use client"
import { Label } from "@radix-ui/react-label"
import { Input } from "@/components/ui/input"
import { EyeOff, Eye } from "lucide-react"
import { useState } from "react"

type TextInputProps = {
    label: string
    placeholder?: string
    id: string
    value: string
    onChange: (value: string) => void
}

const Password = ({label, placeholder="", id, value, onChange}: TextInputProps) => {
  
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div>
        <Label className="text-base" htmlFor={id}>{label}</Label>
        <div className="relative">
            <Input 
                className="h-10 !text-base pr-10" 
                type={showPassword ? "text": "password"} 
                id={id} 
                placeholder={placeholder}
                onChange={e=> onChange(e.target.value)}
                value={value}
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 "
                >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
        </div>
    </div>
  )
}

export default Password
