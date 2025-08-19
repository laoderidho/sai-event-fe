import { Metadata } from "next"
import Profile from "@/components/page/profile/Profile";

type Props = {
    params: {
        id: number,
        name: string
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params;
  
  const decodeName = decodeURIComponent(name);

  return {
    title: `Profil ${decodeName} - SAI Event`,
    description: `Halaman profil dari ${decodeName}`
  };
}


const page = async ({params}: Props) => {
  const {id} = await params
  return <Profile id={id} />
}

export default page
