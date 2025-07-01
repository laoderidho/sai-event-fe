import RegionPage from "@/components/page/admin/data/region";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Wilayah Jemaat - SAI Event',
  description: 'Daftar Wilayah Jemaat',
};


const page = () => {
    return <RegionPage />
}

export default page;