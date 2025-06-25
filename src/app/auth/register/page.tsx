"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Stepper from "@/components/custom/step/stepper"
import { useState } from "react"
import ParentStep from "@/components/custom/register-step/parentStep"

const page = () => {
    const [step, setStep]= useState(0)

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
                <Stepper currentStep={step} steps={[1, 2, 3]} />
                <ParentStep stepNumber={step}/>
              </CardContent>
              <CardFooter>
                  
              </CardFooter>
          </Card>
      </div>
    )
  }
  
  export default page
  