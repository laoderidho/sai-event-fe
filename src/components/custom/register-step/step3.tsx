import { useState } from "react"
import CSelect from "../input/Select"


const Step3 = () => {

  const [country, setCountry]= useState('')

  const options = [
    { label: "Indonesia", value: "id" },
    { label: "Malaysia", value: "my" },
    { label: "Singapura", value: "sg" }
  ]

  return (
    <div>
      <CSelect label="country" options={options} onChange={setCountry} />
    </div>
  )
}

export default Step3
