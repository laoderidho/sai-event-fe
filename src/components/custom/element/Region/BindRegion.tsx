import Text from "../../input/Text"
import { Button } from "@/components/ui/button"

type Props = {
    statusComponent: number, 
    save: () => void,
    update: () => void,
    name: string,
    setName: (value: string) => void
}

export const BindComponentRegion = ({statusComponent, save, update, name, setName}: Props) => {
    return (
      <div>
          <Text
              label="Nama Wilayah"
              placeholder="Masukkan Nama Wilayah "
              id="name"
              value={name}
              onChange={setName}
              type="text"
          />
          <div className="mt-5 flex justify-end">
            <Button onClick={statusComponent == 1 ? save : update } className="">{statusComponent == 1 ? 'Simpan' : 'Update'}</Button>
          </div>
      </div>
    )
  }