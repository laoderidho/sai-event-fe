"use client"

import React from "react"
import { Check } from "lucide-react"

interface StepperProps {
  currentStep: number
  steps: number[]
}

const Stepper: React.FC<StepperProps> = ({ currentStep, steps }) => {
  return (
    <div className="flex items-center justify-center gap-4">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full border text-sm font-medium 
            ${currentStep >= step ? "bg-[#006E5D] text-white border-[#006E5D]" : "border-[#006E5D] text-[#006E5D]"}`}>
            {currentStep >= step ? <Check />: step}
          </div>

          {index < steps.length - 1 && (
            <div className="w-10 h-0.5 bg-[#006E5D]" />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default Stepper
