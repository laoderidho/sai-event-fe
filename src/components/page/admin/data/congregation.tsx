"use client"
/* eslint-disable */
import api from "@/lib/api"
import { useEffect, useState } from "react"
import { Toaster, toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/custom/datatable/Datatable"
import { COcongregation } from "@/components/custom/column-datatable/congregation"
import { Icongregation } from "@/lib/interface/data-select/Icongregation"
import ParentDialog from "@/components/custom/dialog/ParentDialog"
import { BindComponentCongregation } from "@/components/custom/element/Congregation/BindCongregation"
import BindDeleteCongregation from "@/components/custom/element/Congregation/BindDeleteCongregation"

const CongregationPage = () => {
  const [congregation, setCongregation] = useState<Icongregation[]>([])
  const [name, setName] = useState("")
  const [openDialog, setOpenDialog] = useState(false)
  const [label, setLabel] = useState("")
  const [statusComponent, setStatusComponent] = useState(0)
  const [selectRegion, setSelectRegion] = useState<number>(0)
  const [congregationId, setCongregationId] = useState<number>(0)

  const getCongregation = async () => {
    try {
      const res = await api.get("/admin/congregation", {})
      setCongregation(res.data.data)
    } catch (error) {
      toast.error("Gagal mengambil data jemaat")
    }
  }

  const save = async () => {
     try {
        const res = await api.post("/admin/congregation/add", {
          name: name,
          region_id: selectRegion
        })
        if(res.status == 200){
          toast.success(res.data.message)
          getCongregation()
          setOpenDialog(false)

        }
     } catch (error: any) {
        toast.error(error.response.data.message)
     }
  }

  const update = async () => {
    try {
      const res = await api.put(`/admin/congregation/update/${congregationId}`, {
        name: name,
        region_id: selectRegion
      })
      if(res.status == 200){
        toast.success(res.data.message)
        getCongregation()
        setOpenDialog(false)
        setName('')
      }
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
  }

  const deleteCongregation = async () => {
    try {
      await api.delete(`/admin/congregation/delete/${congregationId}`,{})
      .then(res => {
        if (res.status === 200) {
          toast.success('Jemaat berhasil dihapus')
          getCongregation()
          setOpenDialog(false)
          setName('')
        }
      })
    } catch (error: any) {
      toast.error(error.response.data.message || 'Terjadi kesalahan saat menghapus Jemaat')
      setOpenDialog(false)
    }
  }

  const handleAdd = () => {
    setOpenDialog(true)
    setLabel("Tambah Jemaat")
    setName("")
    setSelectRegion(0)
    setStatusComponent(1)
  }

  const handleEdit = (row: Icongregation) => {
    setOpenDialog(true)
    setLabel("Update Jemaat")
    setName(row.name)
    setSelectRegion(row.region_id)
    setCongregationId(row.id)
    setStatusComponent(2)
  }

  const handleDelete = async (row: Icongregation) => {
    setOpenDialog(true)
    setLabel("Update Jemaat")
    setName(row.name)
    setCongregationId(row.id)
    setStatusComponent(3)
  }

  const columns = COcongregation({ onEdit: handleEdit, onDelete: handleDelete })

  useEffect(() => {
    getCongregation()
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-4">Jemaat</h1>
      <Toaster richColors />
      <div className="md:w-1/2">
        <div className="flex justify-end mb-5">
          <Button onClick={handleAdd}>
            <Plus />
          </Button>

          <ParentDialog title={label} open={openDialog} setOpen={setOpenDialog}>
            {(statusComponent === 1 || statusComponent === 2) && (
              <BindComponentCongregation
                name={name}
                setName={setName}
                save={save}
                update={update}
                statusComponent={statusComponent}
                regiondata={selectRegion}
                setRegiondata={setSelectRegion}
              />
            )}
            {statusComponent == 3 && <BindDeleteCongregation name={name} deleteData={deleteCongregation} />}
          </ParentDialog>
        </div>

        <DataTable columns={columns} data={congregation} />
      </div>
    </div>
  )
}

export default CongregationPage
