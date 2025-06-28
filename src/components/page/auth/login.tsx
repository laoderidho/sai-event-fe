"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import api from "@/lib/api"
import Link from "next/link"
import Text from "@/components/custom/input/Text"
import Password from "@/components/custom/input/Password"
import AlertDanger from "@/components/custom/alert/danger"
import { useDispatch } from "react-redux"
import { setDataAuth } from "@/store/authStore"
import { adminId, userId } from "@/lib/config/general"
import { useRouter } from "next/navigation"

const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const router = useRouter()

    const [messageError, setMessageError] = useState('')
    const [showMessage, setShowMessage] = useState(false)

    // function
    const login = async () =>{
        try {
            const res = await api.post('auth/login', {
                username: username,
                password: password
            })
            if(res.status == 200){
                const name = res.data.data.name
                const role = res.data.data.role
                dispatch(setDataAuth({
                    name,
                    role
                }))

                localStorage.setItem('name', name)
                localStorage.setItem('role', role)

                settingCheckRoute(role)
            }
        } catch (error: any) {
            setMessageError(error.response.data.message)
            setShowMessage(true)
        }
    }

    const settingCheckRoute = (role: number): void => {
        if(role == adminId){
            router.push('/admin/home')
        }else if(role == userId){
            router.push('/user/home')
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
        <div className="flex justify-center items-center h-screen">
            <Card className="w-full sm:w-3/5 md:w-2/5 max-w-md">
                <CardHeader>
                    <div className="flex justify-center">
                        <Image
                        src="/logo.png"
                        alt="logo"
                        width={100}
                        height={100}
                        className="flex justify-center"
                        />
                    </div>
                    <CardTitle className="flex justify-center text-4xl">Login</CardTitle>
                    {
                        showMessage && <AlertDanger message={messageError} />
                    }
                </CardHeader>
                <CardContent>
                    <Text
                        label="Email / No Telp"
                        placeholder="Masukkan Email Atau No Telp"
                        id="username"
                        value={username}
                        onChange={setUsername}
                        type="text"
                    />
                <div className="mt-2">
                    <Password
                        label="Password"
                        value={password}
                        placeholder="Masukkan password"
                        id="password"
                        onChange={setPassword}
                    />
                </div>
                </CardContent>
                <CardFooter>
                    <div className="w-full">
                        <Button onClick={login} className="w-full h-9 !text-base cursor-pointer bg-[#006E5D] hover:bg-[#004D40]">Login</Button>
                        <p className="text-gray-600 text-base mt-2">Belum Punya Akun? 
                            <span className="!text-blue-600 pl-2"><Link href="/auth/register">Register</Link></span>
                        </p>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default LoginPage
