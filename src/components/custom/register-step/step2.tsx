import React, { useState } from 'react'
import Password from '../input/Password'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Step2 = () => {
  
  const [password, setPassword]= useState('')
  const [confirmPassword, setConfirmPassword]= useState('')

  const updatePassword = () : void => {

  }

  return (
    <div className="mt-2">
      <Password
        label='Password'
        placeholder='masukkan password'
        id='password'
        value={password}
        onChange={setPassword}
      />
      <div className='mt-2'>
        <Password
            label='Confirm Password'
            placeholder='masukkan konfirmasi password'
            id='confirmPassword'
            value={confirmPassword}
            onChange={setConfirmPassword}
        />
      </div>

      <div className="w-full mt-6">
            <Button onClick={updatePassword} className="w-full h-9 !text-base cursor-pointer bg-[#006E5D] hover:bg-[#004D40]">Simpan</Button>
            <p className="text-gray-600 text-base mt-2">Sudah Punya Akun? 
                <span className="!text-blue-600 pl-2"><Link href="/auth/login">Login</Link></span>
            </p>
      </div>
    </div>
  )
}

export default Step2
