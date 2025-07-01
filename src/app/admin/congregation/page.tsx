import CongregationPage from "@/components/page/admin/data/congregation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Jemaat - SAI Event',
  description: 'Daftar Jemaat',
};

const page = () => {
  return <CongregationPage />
}

export default page
