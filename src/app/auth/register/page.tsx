import RegisterPage from "@/components/page/auth/register"
import { Metadata } from "next"


export const metadata: Metadata = {
  title: 'Register - SAI Event',
  description: 'Register to SAI Event Management System',
}

const page = () => {
  return <RegisterPage />
}

export default page
