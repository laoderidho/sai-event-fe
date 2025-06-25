"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import api from "@/lib/api"

const page = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const login = async () =>{
        try {
            const res = await api.post('auth/login', {
                email: username,
                password: password
            })
            if(res.status == 200){
                console.log("success")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-2/5">
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
                </CardHeader>
                <CardContent>
                <div>
                        <Label className="text-xl" htmlFor="username">Email / No Telp</Label>
                        <Input 
                            className="h-12 !text-xl" 
                            type="text" 
                            id="username" 
                            placeholder="Masukkan Email atau No telp" 
                            onChange={(e)=>setUsername(e.target.value)}
                            value={username}
                        />
                </div>
                <div className="mt-5">
                        <Label className="text-xl" htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input 
                                className="h-12 !text-xl pr-10" 
                                type={showPassword ? "text": "password"} 
                                id="password" 
                                placeholder="Masukkan Password"
                                onChange={e=> setPassword(e.target.value)}
                                value={password}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 "
                                >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                </div>
                </CardContent>
                <CardFooter>
                    <div className="w-full">
                        <Button onClick={login} className="w-full h-13 !text-xl cursor-pointer bg-[#006E5D] hover:bg-[#004D40]">Login</Button>
                        <p className="text-blue-600 text-xl mt-3">Belum Punya Akun?</p>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default page
