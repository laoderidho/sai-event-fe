import { Metadata } from "next"
import LoginPage from "@/components/page/auth/login"

export const metadata: Metadata = {
    title: 'Login - SAI Event',
    description: 'Login to SAI Event Management System',
}

const page = () => {
  return <LoginPage />
}

export default page
