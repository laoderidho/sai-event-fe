import { useEffect, useState } from "react"
import CSelect from "../input/Select"
import api from "@/lib/api"
import { ConvertLabelAndValueSelect } from "@/lib/utils"
import { SelectItem } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { setData } from "@/store/registerStore"
import AlertDanger from "../alert/danger"
import { useRouter } from "next/navigation"

const Step3 = () => {
  const dispatch = useDispatch()
  const [region, setRegion] = useState<SelectItem[]>([])
  const [selectRegion, setSelectRegion] = useState(0)
  const [congregation, setCongregation] = useState<SelectItem[]>([])
  const [cnSelect, setCnSelect] = useState(0)
  const {name, email, password, no_telp, step} = useSelector((state: { register: any }) => state.register);
  const [message, setMessage] = useState('')
  const [showMessage, setShowMessage] = useState(false)
  const router = useRouter()

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

  const submitDataRegister = async () =>{
    try {
      const res = await api.post(`auth/register`, {
          name,
          password,
          email,
          no_telp,
          congregation_id: cnSelect
      })

      if(res.status== 201){
        router.push('/auth/login')
      }
    } catch (error) {
        setMessage('Terjadi Kesalahan')
        setShowMessage(true)
    }
  }

   const updateStepBefore = () => {
      dispatch(setData({
        step: step - 1
      }))
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
       { showMessage && <AlertDanger message={message} />}
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
            <div className='flex justify-between'>
              <Button onClick={updateStepBefore} className="w-[45%] h-9 mx-1 !text-base text-black cursor-pointer border border-black bg-[#FFFFFF] hover:bg-[#F2F2F2F2]">Sebelumnya</Button>
              <Button onClick={submitDataRegister} disabled={cnSelect == 0} className="w-[45%] h-9 mx-1 !text-base cursor-pointer bg-[#006E5D] hover:bg-[#004D40]">Simpan</Button>
            </div>
           
            <p className="text-gray-600 text-base mt-2">Sudah Punya Akun? 
                <span className="!text-blue-600 pl-2"><Link href="/auth/login">Login</Link></span>
            </p>
        </div>
    </div>
  )
}

export default Step3
