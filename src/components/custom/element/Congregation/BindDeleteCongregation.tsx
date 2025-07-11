import { Button } from "@/components/ui/button"

type Props = {
    name: string
    deleteData: () => void
}

const BindDeleteCongregation = ({name, deleteData}: Props) => {
    return (
        <div>
            <p>Apakah anda yakin ingin menghapus Jemaat <span className="font-bold">{name}</span> ?</p>
            <div className="mt-5 flex justify-end">
              <Button variant="destructive" onClick={deleteData} className="">Hapus</Button>
            </div>
        </div>
      )
}

export default BindDeleteCongregation
