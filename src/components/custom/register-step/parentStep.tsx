"use client"
import Step1 from "./step1"
import Step2 from "./step2"
import { AnimatePresence, motion } from "framer-motion"
import Step3 from "./step3"

type Step = {
  stepNumber: number
}

const ParentStep = ({ stepNumber }: Step) => {
  const renderStep = () => {
    if (stepNumber === 0) {
      return <Step1 />
    }

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={stepNumber}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute w-full"
        >
          {stepNumber === 1 && <Step2 />}
          {stepNumber === 2 && <Step3 />}
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <div className="relative h-78 overflow-hidden">
      {renderStep()}
    </div>
  )
}

export default ParentStep
