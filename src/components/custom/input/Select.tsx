import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

interface Option {
  label: string,
  value: string
}

interface param{
  options: Option[],
  label: string,
  onChange: (value: string) => void
}

const CSelect = ({options,label, onChange}: param) => {
  return (
    <Select onValueChange={onChange}>
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>
            {options && options.map(option=>(
              <SelectItem key={option.value} value={option.value}>
                  {option.label}
              </SelectItem>
            ))}
        </SelectContent>
    </Select>
  )
}

export default CSelect
