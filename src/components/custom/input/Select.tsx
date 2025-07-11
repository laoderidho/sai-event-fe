import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Label } from "@radix-ui/react-label"

interface Option {
  label: string,
  value: string
}

interface Props {
  options: Option[],
  label: string,
  placeholder: string,
  value?: any, // Tambahkan ini
  onChange: (value: any) => void
}

const CSelect = ({ options, label, placeholder, value, onChange }: Props) => {
  return (
    <div>
      <Label className="text-base">{label}</Label>
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options?.map(option => (
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
