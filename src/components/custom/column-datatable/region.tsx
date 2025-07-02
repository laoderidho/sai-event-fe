// COregion.ts
import { ColumnDef } from "@tanstack/react-table"
import { Iregion } from "@/lib/interface/data-select/Iregion"
import { Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

type Props = {
  onEdit: (row: Iregion) => void
  onDelete: (row: Iregion) => void
}

export const COregion = ({ onEdit, onDelete }: Props): ColumnDef<Iregion>[] => [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Name',
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
