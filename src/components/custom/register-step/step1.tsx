import { useState } from "react"
import Text from "../input/Text"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { setData } from "@/store/registerStore"
import api from "@/lib/api"
import { useEffect } from "react"
import AlertDanger from "../alert/danger"

const Step1 = () => {
  const state = useSelector((state: { register: any }) => state.register);
  const [name, setName] = useState(state.name)
  const [email, setEmail] = useState(state.email)
  const [phone, setPhone] = useState(state.no_telp)
  const dispatch = useDispatch()
  const [messageError, setMessageError] = useState('')
  const [showMessage, setShowMessage] = useState(false)

  const updateBio = () =>{
    dispatch(setData({ 
        name,
        email,
        no_telp: phone,
        step: state.step + 1
    }))
  }

  const checkData = async () => {
      try {
        const data = await api.post('auth/check', {
            email,
            no_telp: phone,
        })
        if(data.status == 200){
            updateBio()
        }
      } catch (error: any) {
        setShowMessage(true)
        setMessageError(error.response.data.message)
      }
  }

    // mounted 
    useEffect(() =>{
        if(showMessage){
            setTimeout(()=>{
                setShowMessage(false)
            }, 5000)
        }
    },[showMessage])

  return (
    <div className="mt-2">
        {
            showMessage && <AlertDanger message={messageError} />
        }
       <Text
            label="Nama"
            placeholder="Masukkan Nama Anda"
            id="name"
            value={name}
            onChange={setName}
            type="text"
        />
        <div className="mt-2">
            <Text
                label="Email"
                placeholder="Masukkan Email Anda"
                id="email"
                value={email}
                onChange={setEmail}
                type="email"
            />
        </div>
        <div className="mt-2">
            <Text
                label="No Telepon"
                placeholder="Masukkan No Telepon anda"
                id="no_telp"
                value={phone}
                onChange={setPhone}
                type="number"
            />
        </div>
        
        <div className="w-full mt-6">
            <Button onClick={checkData} disabled={name == '' || email == '' || phone == ''} className="w-full h-9 !text-base cursor-pointer bg-primary hover:bg-[#004D40]">Simpan</Button>
            <p className="text-gray-600 text-base mt-2">Sudah Punya Akun? 
                <span className="!text-blue-600 pl-2"><Link href="/auth/login">Login</Link></span>
            </p>
        </div>
    </div>
  )
}

export default Step1
