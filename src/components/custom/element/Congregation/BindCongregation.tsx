import Text from "../../input/Text"
import { Button } from "@/components/ui/button"
import { ConvertLabelAndValueSelect, SelectItem } from "@/lib/utils"
import CSelect from "../../input/Select"
import api from "@/lib/api"
import { useState, useEffect } from "react"

type Props = {
  statusComponent: number
  save: () => void
  update: () => void
  name: string
  setName: (value: string) => void
  regiondata: number
  setRegiondata: (value: number) => void
}

export const BindComponentCongregation = ({
  statusComponent,
  save,
  update,
  name,
  setName,
  regiondata,
  setRegiondata,
}: Props) => {
  const [region, setRegion] = useState<SelectItem[]>([])

  const getRegion = async () => {
    const res = await api.get("/admin/region", {})
    const data = ConvertLabelAndValueSelect(res.data.data, "name", "id")
    setRegion(data)
  }

  useEffect(() => {
    getRegion()
  }, [])

  return (
    <div>
      <CSelect
        label="Wilayah"
        placeholder="Pilih Wilayah"
        options={region}
        onChange={setRegiondata}
        value={regiondata}
      />

      <div className="mt-3">
        <Text
          label="Nama Jemaat"
          placeholder="Masukkan Nama Jemaat"
          id="name"
          value={name}
          onChange={setName}
          type="text"
        />
      </div>

      
      <div className="mt-5 flex justify-end">
        <Button onClick={statusComponent === 1 ? save : update}>
          {statusComponent === 1 ? "Simpan" : "Update"}
        </Button>
      </div>
    </div>
  )
}
