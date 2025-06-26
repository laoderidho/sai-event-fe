import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface SelectItem {
  value: any;
  label: any;
}

export function ConvertLabelAndValueSelect(data: any[], label: string, value: string): SelectItem[] {
  const transForm = data.map((item: any) => ({
    value: item[value],
    label: item[label]
  }));
  return transForm;
}
