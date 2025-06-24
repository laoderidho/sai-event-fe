import Image from "next/image"

const Page = () => {
  return (
    <>
       <div className="w-full flex h-screen">
          <div className="w-1/2 h-full">
              <h1>Test</h1>
          </div>
          <div className="w-1/2 h-full relative">
            <Image
              src="/auth/auth-bg.png"
              alt="Logo"
              fill
              className="object-cover"
            />
          </div>
       </div>
    </>
  )
}

export default Page
