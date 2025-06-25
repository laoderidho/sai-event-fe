"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { Button } from "@/components/ui/button"

const page = () => {
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
                  <CardTitle className="flex justify-center text-4xl">Register</CardTitle>
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
                  
              </CardFooter>
          </Card>
      </div>
    )
  }
  
  export default page
  