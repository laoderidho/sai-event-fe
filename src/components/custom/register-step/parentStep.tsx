"use client"
import Step1 from "./step1"
import Step2 from "./step2"
import { AnimatePresence, motion } from "framer-motion"
import Step3 from "./step3"
import { useState, useEffect } from "react"

type Step = {
  stepNumber: number
}

const ParentStep = ({ stepNumber }: Step) => {

  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])


  const renderStep = () => {

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={stepNumber}
          initial={hasMounted ? { x: 300, opacity: 0 }: false}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          className="absolute w-full"
        >
          {stepNumber === 0 && <Step1 />}
          {stepNumber === 1 && <Step2 />}
          {stepNumber === 2 && <Step3 />}
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <div className="relative h-88 overflow-hidden">
      {renderStep()}
    </div>
  )
}

export default ParentStep
