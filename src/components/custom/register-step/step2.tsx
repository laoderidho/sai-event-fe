import React, { useState } from 'react'
import Password from '../input/Password'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { setData } from '@/store/registerStore'

const Step2 = () => {
  
  const [password, setPassword]= useState('')
  const [confirmPassword, setConfirmPassword]= useState('')
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const updatePassword = () : void => {
      if(password !== confirmPassword){
        setShowMessage(true)
        setMessage('* Password Dan Kata Sandi Harus Sama')
      }else if(password.length < 8){
        setShowMessage(true)
        setMessage('* Kata Sandi tidak boleh kurang dari 8 karakter')
      }else{
        dispatch(setData({
          password
        }))
      }
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
      { showMessage && <p className='text-sm text-red-500'>{message}</p>}
      <div className='mt-2'>
        <Password
            label='Confirm Password'
            placeholder='masukkan konfirmasi password'
            id='confirmPassword'
            value={confirmPassword}
            onChange={setConfirmPassword}
        />
        { showMessage && <p className='text-sm text-red-500'>{message}</p>}
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
