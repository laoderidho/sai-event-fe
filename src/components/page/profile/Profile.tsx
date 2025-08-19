'use client'

import { Card } from "@/components/ui/card"
import api from "@/lib/api"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Church, Mail, Map, Pencil, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import ParentDialog from "@/components/custom/dialog/ParentDialog"

type Props = {
    id: number
}
const Profile = ({id}: Props) => {
  const [imgProfile, setImgProfile] = useState<string>('')
  const [profile, setProfile] = useState<any>({})
  const [modalProfile, setModalProfile] = useState<boolean>(false)

  const getDataProfile = async () => {
      try {
        const res = await api.get(`profile/${id}`, {})

        setImgProfile(res.data.data[0].linkImage)
        setProfile(res.data.data[0])
      } catch (error) {
        
      }
  }

  useEffect(()=> {
    getDataProfile()
  },[])
  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-4">Profile</h1>
      <div className="flex gap-1 flex-col md:flex-row">
        <Card className="md:w-1/3 w-full flex items-center justify-center !gap-0">
          <h1 className="p-0 m-0 text-2xl font-bold">{profile.name}</h1>
          <p className="p-0 m-3 w-1/4 text-center text-md rounded-sm bg-[#DFFFE0] text-[#00A84F]">{profile.roleName}</p>
          <Button className="w-1/3 mt-1 mb-2" onClick={() => setModalProfile(!modalProfile)} variant="outline"> 
              <Pencil/> Edit Foto Profile 
          </Button>
          <div className="w-80 h-80 rounded-full overflow-hidden border border-gray-200">
            <Image
              src={imgProfile === '' ? "/auth/guest.png" : imgProfile}
              alt="profile"
              width={400}
              height={400}
              className="object-cover"
            />
          </div>
        </Card>
        <Card className="md:w-2/3 w-full md:mt-0 mt-5 md:ml-5 p-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold mt-2">Informasi</h1>

            <div className="grid grid-cols-1 md:grid-cols-2">
                <div>
                    <p className="text-gray-500 flex items-center"><Mail size={20} /><span className="font-semibold text-black ml-2">{profile.email}</span></p>
                </div>
                <div>
                    <p className="text-gray-500 flex items-center"><Phone size={20} /><span className="font-semibold text-black ml-2">{profile.no_telp}</span></p>
                </div>
                {/* Anda bisa membiarkan garis pemisah ini atau menghapusnya jika menggunakan gap */}
                <div className="col-span-1 md:col-span-2 border-t border-gray-300 my-4"></div>
                <div>
                    <p className="text-gray-500 flex items-center"><Map size={20} /><span className="font-semibold text-black ml-2">{profile.regionName}</span></p>
                </div>
                <div>
                    <p className="text-gray-500 flex items-center"><Church size={20} /><span className="font-semibold text-black ml-2">{profile.congregationName}</span></p>
                </div>
            </div>
          </div>
        </Card>
      </div>
     <ParentDialog
        title="Edit Profile"
        open={modalProfile}
        setOpen={setModalProfile}
      >
        
      </ParentDialog>
    </div>
  )
}

export default Profile
