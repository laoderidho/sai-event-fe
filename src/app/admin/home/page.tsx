import Homepage from "@/components/page/admin/home"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Home - SAI Event',
  description: 'Admin Home Page for SAI Event Management System',
}

const page = () => {
  return <Homepage />
}

export default page
