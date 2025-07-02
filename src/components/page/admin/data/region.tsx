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
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [id, setId] = useState<number>(0)
  const [label, setLabel] = useState<string>('')
  const [statusComponent, setStatusComponent] = useState<number>(0)

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
        toast.error('Terjadi Kesalahan saat menambahkan wilayah')
    }
  }

  const update = async () => {
    try {
      await api.put(`/admin/region/update/${id}`, {
        name: name
      }).then(res => {
        if (res.status === 200) {
          toast.success('Wilayah berhasil diupdate')
          getData()
          setOpenDialog(false)
          setName('')
        }
      })
    }catch (error) {
      toast.error('Terjadi Kesalahan saat mengupdate wilayah')
    }
  }

  const deleteData = async () => {
    try {
      await api.delete(`/admin/region/delete/${id}`,{})
      .then(res => {
        if (res.status === 200) {
          toast.success('Wilayah berhasil dihapus')
          getData()
          setOpenDialog(false)
          setName('')
        }
      })
    } catch (error: any) {
      toast.error(error.response.data.message || 'Terjadi kesalahan saat menghapus wilayah')
      getData()
      setOpenDialog(false)
    }
  }

  // Function handle
  const handleAdd = () => {
    setOpenDialog(true)
    setLabel('Tambah Wilayah')
    setStatusComponent(1)
    setName('')
  }

  const handleEdit = (row: Iregion) => {
    setOpenDialog(true)
    setName(row.name)
    setId(row.id)
    setLabel('Edit Wilayah')
    setStatusComponent(2)
  }

  const handleDelete = (row: Iregion) => {
    setOpenDialog(true)
    setName(row.name)
    setId(row.id)
    setLabel('Hapus Wilayah')
    setStatusComponent(3)
  }

  const bindComponent = () => {
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

  const bindComponentDelete = () => {
    return (
      <div>
          <p>Apakah anda yakin ingin menghapus wilayah <span className="font-bold">{name}</span> ?</p>
          <div className="mt-5 flex justify-end">
            <Button variant="destructive" onClick={deleteData} className="">Hapus</Button>
          </div>
      </div>
    )
  }

  // useeffect mounted
  useEffect(()=> {
    getData()
  },[])

  const columns = COregion({ onEdit: handleEdit, onDelete: handleDelete })

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-4">Region</h1>
      <Toaster richColors />
      <div className="md:w-1/2">
        <div className="flex justify-end mb-5">
          <Button onClick={handleAdd}>
            <Plus />
          </Button>
          <ParentDialog 
            title={label}
            open={openDialog}
            setOpen={setOpenDialog}
          >
         {(statusComponent == 1 || statusComponent == 2) && bindComponent()}
         {statusComponent == 3 && bindComponentDelete()}
          </ParentDialog>
        </div>
        
        <DataTable  columns={columns} data={region} pageSize={5} />
      </div>

    </div>
  )
}

export default RegionPage
