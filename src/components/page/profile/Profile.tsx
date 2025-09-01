'use client'

import { Card } from "@/components/ui/card"
import api from "@/lib/api"
import { useEffect, useState, useCallback } from "react"
import Image from "next/image" // For rendering images only, not for creating new image elements
import { Church, Mail, Map, Pencil, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import ParentDialog from "@/components/custom/dialog/ParentDialog"
import Cropper, {Area} from 'react-easy-crop'
import { toast, Toaster } from "sonner"

type Props = {
    id: number
}
const Profile = ({id}: Props) => {
  const [imgProfile, setImgProfile] = useState<string>('')
  const [profile, setProfile] = useState<any>({})
  const [modalProfile, setModalProfile] = useState<boolean>(false)
  // Cropper variable
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [zoom, setZoom] = useState(1);


  // Baca file sebagai DataURL
  const onFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
    }
  };

  const getDataProfile = async () => {
      try {
        const res = await api.get(`profile/${id}`, {})

        const imgLink = res.data.data[0].linkImage

        setImgProfile(`${imgLink}?t=${new Date().getTime()}`)

        setProfile(res.data.data[0])
      } catch (error) {
        
      }
  }

  const readFile = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result as string), false);
      reader.readAsDataURL(file);
    });
  };

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImg = (imageSrc: string, cropPixels: Area): Promise<string> => {
    return new Promise((resolve, reject) => {
      const image = new window.Image();
      image.src = imageSrc;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = cropPixels.width;
        canvas.height = cropPixels.height;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          return reject(new Error("Canvas context not available"));
        }

        ctx.drawImage(
          image,
          cropPixels.x,
          cropPixels.y,
          cropPixels.width,
          cropPixels.height,
          0,
          0,
          cropPixels.width,
          cropPixels.height
        );

        // langsung ambil base64 (string)
        const base64String = canvas.toDataURL("image/jpeg").split(",")[1]; 
        resolve(base64String);
      };
      image.onerror = (err: any) => reject(err);
    });
  };

  function cropModal(){
    if (!imageSrc) return
    setModalProfile(!modalProfile)
   // showCroppedImage()
  }

  const updateImage = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

      try {
        const getImage = await getCroppedImg(imageSrc, croppedAreaPixels);
        const res = await api.post('profile/add-image', {
          image: getImage
        })
        if(res.status == 200){
          toast.success(res.data.message)
          window.location.reload()
        }else{
          toast.error('Gagal memperbarui foto profile')
        }
      } catch (error) {
        console.error("Crop failed:", error);
      }
  };


  useEffect(()=>{
    cropModal()
  }, [imageSrc])

  useEffect(()=> {
    getDataProfile()
  },[])
  return (
    <div className="p-4">
       <Toaster richColors />
      <h1 className="text-4xl font-bold mb-4">Profile</h1>
      <div className="flex gap-1 flex-col md:flex-row">
        <Card className="md:w-1/3 w-full flex items-center justify-center !gap-0">
          <h1 className="p-0 m-0 text-2xl font-bold">{profile.name}</h1>
          <p className="p-0 m-3 w-1/4 text-center text-md rounded-sm bg-[#DFFFE0] text-[#00A84F]">{profile.roleName}</p>
         <label className="inline-flex items-center mb-2 gap-2 px-3 py-1 border border-gray-400 rounded-lg text-sm text-gray-700 cursor-pointer hover:bg-gray-50 w-fit">
            <input type="file" accept="image/*" onChange={onFileChange} className="hidden" />
            <Pencil className="w-4 h-4" /> Edit Foto Profile
          </label>
          <div className="w-80 h-80 rounded-full overflow-hidden border border-gray-200">
            <Image
              src={imgProfile === '' ? "/auth/guest.png" : imgProfile}
              alt="profile"
              width={400}
              height={400}
              className="object-cover"
              priority
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
        <div className="relative w-full h-64 mb-3">
          
            {imageSrc &&
              <Cropper
                image={imageSrc ?? undefined}
                crop={crop}
                zoom={zoom}
                onZoomChange={setZoom}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
              />
          }
        </div>
        {imageSrc && 
          <Button onClick={updateImage}>Update</Button>
        }
      </ParentDialog>
    </div>
  )
}

export default Profile
