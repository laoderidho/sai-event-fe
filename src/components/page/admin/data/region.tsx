"use client"
import api from "@/lib/api"
import { useEffect, useState } from "react"
import { Iregion } from "@/lib/interface/data-select/Iregion"
import { DataTable } from "@/components/custom/datatable/Datatable"
import { COregion } from "@/components/custom/column-datatable/region"
import ParentDialog from "@/components/custom/dialog/ParentDialog"
import { Plus } from "lucide-react"
import Text from "@/components/custom/input/Text"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"

const RegionPage = () => {
  const [region, setRegion] = useState<Iregion[]>([])
  const [name, setName] = useState<string>('')
  const [openDialog, setOpenDialog] = useState(false)


  // function api 
  const getData = async () => {
    try {
      const res = await api.get('/admin/region', {})
      if (res.status === 200) {
        setRegion(res.data.data)
      }
    } catch (error) {
      
    }
  }

  const save = async () => {
    try {
      await api.post('/admin/region/add', {
        name: name
      }).then(res=>{
        if (res.status === 200) {
          toast.success('Berhasil menambahkan wilayah')
          getData()
          setOpenDialog(false)
          setName('')
        }
      })
    } catch (error) {
      
    }
  }

  // useeffect mounted
  useEffect(()=> {
    getData()
  },[])

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-4">Region</h1>
      <Toaster richColors />
      <div className="md:w-1/2">
        <div className="flex justify-end mb-5">
          <ParentDialog 
            labelButton={<div className="flex "><Plus /></div>}
            title="Tambah Wilayah"
            open={openDialog}
            setOpen={setOpenDialog}
          >
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
                  <Button onClick={save} className="">Simpan</Button>
                </div>
            </div>
          </ParentDialog>
        </div>
        
        <DataTable  columns={COregion} data={region} pageSize={5} />
      </div>

    </div>
  )
}

export default RegionPage
