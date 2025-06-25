"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { Button } from "@/components/ui/button"

const page = () => {
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
                      />
              </div>
              <div className="mt-5">
                      <Label className="text-xl" htmlFor="password">Password</Label>
                      <div className="relative">
                          <Input 
                              className="h-12 !text-xl pr-10" 
                              type="text" 
                              id="password" 
                              placeholder="Masukkan Password"
                          />
                      </div>
              </div>
              </CardContent>
              <CardFooter>
                  <Button className="w-full h-13 !text-lg cursor-pointer bg-[#006E5D] hover:bg-[#004D40]">Login</Button>
                  <p>Belum Punya Akun?</p>
              </CardFooter>
          </Card>
      </div>
    )
  }
  
  export default page
  