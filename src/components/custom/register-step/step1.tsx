import { useState } from "react"
import Text from "../input/Text"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useDispatch } from "react-redux"
import { setData } from "@/store/registerStore"

const Step1 = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const dispatch = useDispatch()

  const updateBio = () =>{
    dispatch(setData({ 
        name,
        email,
        no_telp: phone
    }))
  }

  return (
    <div className="mt-2">
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
                type="text"
            />
        </div>
        
        <div className="w-full mt-6">
            <Button onClick={updateBio} disabled={name !== '' && email !== '' && phone !== ''} className="w-full h-9 !text-base cursor-pointer bg-[#006E5D] hover:bg-[#004D40]">Simpan</Button>
            <p className="text-gray-600 text-base mt-2">Sudah Punya Akun? 
                <span className="!text-blue-600 pl-2"><Link href="/auth/login">Login</Link></span>
            </p>
        </div>
    </div>
  )
}

export default Step1
