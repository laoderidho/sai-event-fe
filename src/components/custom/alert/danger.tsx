"use client"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { AlertCircleIcon } from "lucide-react"

type dangerType = {
    message: string
}

const AlertDanger = ({message}: dangerType) => {
  return (
    <>
       <Alert variant="destructive">
            <AlertCircleIcon/>
            <AlertTitle>{message}</AlertTitle>
        </Alert>
    </>
  )
}

export default AlertDanger
