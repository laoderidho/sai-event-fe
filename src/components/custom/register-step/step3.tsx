import { useEffect, useState } from "react"
import CSelect from "../input/Select"
import api from "@/lib/api"
import { ConvertLabelAndValueSelect } from "@/lib/utils"
import { SelectItem } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useSelector } from "react-redux"

const Step3 = () => {

  const [region, setRegion] = useState<SelectItem[]>([])
  const [selectRegion, setSelectRegion] = useState(0)
  const [congregation, setCongregation] = useState<SelectItem[]>([])
  const [cnSelect, setCnSelect] = useState(0)
  const state = useSelector((state: { register: any }) => state.register);

  // function get
  const getRegion = async () => {
    const res = await api.get('data/region',{})
    const data = ConvertLabelAndValueSelect(res.data.data, 'name', 'id')
    setRegion(data)
  }

  const getCongregation = async (selectRegion: number) => {
     const res = await api.get(`data/congregation/${selectRegion}`, {})
     const data = ConvertLabelAndValueSelect(res.data.data, 'name', 'id')
     setCongregation(data)
  }

  

  // mounted
  useEffect(()=>{
    getRegion()
  },[])

  useEffect(()=>{
    getCongregation(selectRegion)
  },[selectRegion])

  useEffect(()=>{
    setCnSelect(0)
  },[region])

  return (
    <div className="mt-4">
      <CSelect 
        label="Region" 
        placeholder="pilih Region"
        options={region} 
        onChange={e => setSelectRegion(Number(e))} 
        />

        <div className="mt-4">
          <CSelect 
            label="Jemaat" 
            placeholder="pilih Jemaat"
            options={congregation} 
            onChange={e => setCnSelect(Number(e))} 
          />
        </div>

        <div className="w-full mt-6">
            <Button  disabled={cnSelect == 0} className="w-full h-9 !text-base cursor-pointer bg-[#006E5D] hover:bg-[#004D40]">Simpan</Button>
            <p className="text-gray-600 text-base mt-2">Sudah Punya Akun? 
                <span className="!text-blue-600 pl-2"><Link href="/auth/login">Login</Link></span>
            </p>
        </div>
    </div>
  )
}

export default Step3
