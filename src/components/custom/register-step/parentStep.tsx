"use client"
import Step1 from "./step1"

type Step = {
    stepNumber: number
}

const ParentStep = ({stepNumber}: Step) => {

  return (
    <div>
        <Step1/>
    </div>
  )
}

export default ParentStep
