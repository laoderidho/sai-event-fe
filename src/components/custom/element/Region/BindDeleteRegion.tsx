import { Button } from "@/components/ui/button"

type Props = {
    name: string,
    deleteData: () => void
}

export const BindComponentDeleteRegion = ({name, deleteData}: Props) => {
    return (
      <div>
          <p>Apakah anda yakin ingin menghapus wilayah <span className="font-bold">{name}</span> ?</p>
          <div className="mt-5 flex justify-end">
            <Button variant="destructive" onClick={deleteData} className="">Hapus</Button>
          </div>
      </div>
    )
  }