"use client"

import api from "@/lib/api"
import { ConvertLabelAndValueSelect, SelectItem } from "@/lib/utils"
import { useEffect, useState } from "react"
import { Toaster } from "sonner"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/custom/datatable/Datatable"
import { COcongregation } from "@/components/custom/column-datatable/congregation"
import { Icongregation } from "@/lib/interface/data-select/Icongregation"

const CongregationPage = () => {
  const [region, setRegion] = useState<SelectItem[]>([])
  const [congregation, setCongregation] = useState<Icongregation[]>([])
  
   // function get
  const getRegion = async () => {
      const res = await api.get('/admin/region',{})
      const data = ConvertLabelAndValueSelect(res.data.data, 'name', 'id')
      setRegion(data)
  }

  const getCongregation = async () => {
    try {
      const res = await api.get('/admin/congregation', {})
      const data = res.data.data
      setCongregation(data)
    } catch (error) {
      
    }
  }
    

   // Function handle
   const handleAdd = (): void => {
    
  }

  const handleEdit = (row: any): void => {
    console.log('Edit row:', row)
  }

  const handleDelete = (row: any): void => {
    console.log('Delete row:', row)
  }

  const columns = COcongregation({ onEdit: handleEdit, onDelete: handleDelete })
  // mounted 
  useEffect(() => {
    getRegion()
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
          </div>
          
          <DataTable columns={columns} data={congregation}/>
       </div>
    </div>
  )
}

export default CongregationPage
