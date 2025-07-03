// COregion.ts
import { ColumnDef } from "@tanstack/react-table"
import { Icongregation } from "@/lib/interface/data-select/Icongregation"
import { Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

type Props = {
  onEdit: (row: Icongregation) => void
  onDelete: (row: Icongregation) => void
}

export const COcongregation = ({ onEdit, onDelete }: Props): ColumnDef<Icongregation>[] => [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'regionName',
    header: 'Jemaat',
  },
  {
    accessorKey: 'action',
    header: 'Aksi',
    cell: ({ row }) => {
      const data = row.original
      return (
        <div className="flex gap-2">
          <Button
            className="px-4 py-1 rounded text-sm"
            onClick={() => onEdit(data)}
          >
            <Pencil size={16} />
          </Button>
          <Button
            variant={"destructive"}
            className="px-4 py-1 bg-red-500 text-white rounded text-sm"
            onClick={() => onDelete(data)}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      )
    },
  }
]
