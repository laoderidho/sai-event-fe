import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Label } from "@radix-ui/react-label"

interface Option {
  label: string,
  value: string
}

interface param{
  options: Option[],
  label: string,
  placeholder: string,
  onChange: (value: string) => void
}

const CSelect = ({options,label,placeholder, onChange}: param) => {
  return (
    <div>
       <Label className="text-base">{label}</Label>
        <Select onValueChange={onChange}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {options && options.map(option=>(
                  <SelectItem key={option.value} value={option.value}>
                      {option.label}
                  </SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
    
  )
}

export default CSelect
