import { ColumnDef } from "@tanstack/react-table"
import { Iregion } from "@/lib/interface/data-select/Iregion"

export const COregion: ColumnDef<Iregion>[] = [
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
        return (
          <div className="flex gap-2">
            <button
              className="px-4 py-1 bg-blue-500 text-white rounded text-sm"
            >
              Edit
            </button>
            <button
              className="px-4 py-1 bg-red-500 text-white rounded text-sm"
            >
              Hapus
            </button>
          </div>
        );
      }
      
    }
  ]