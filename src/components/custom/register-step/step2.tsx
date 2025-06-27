import React, { useState } from 'react'
import Password from '../input/Password'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { setData } from '@/store/registerStore'

const Step2 = () => {
  const state = useSelector((state: { register: any }) => state.register);
  const [password, setPassword]= useState(state.password)
  const [confirmPassword, setConfirmPassword]= useState(state.password)
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const updatePassword = () : void => {
      if(password !== confirmPassword){
        setShowMessage(true)
        setMessage('* Password Dan Kata Sandi Harus Sama')
      }else if(password.length < 6){
        setShowMessage(true)
        setMessage('* Kata Sandi tidak boleh kurang dari 6 karakter')
      }else{
        dispatch(setData({
          password,
          step: state.step + 1
        }))
      }
  }

  const updateStepBefore = () => {
    dispatch(setData({
      step: state.step - 1
    }))
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
            <div className='flex justify-between'>
              <Button onClick={updateStepBefore} className="w-[45%] h-9 mx-1 !text-base text-black cursor-pointer border border-black bg-[#FFFFFF] hover:bg-[#F2F2F2F2]">Sebelumnya</Button>
              <Button onClick={updatePassword} className="w-[45%] h-9 mx-1 !text-base cursor-pointer bg-[#006E5D] hover:bg-[#004D40]">Simpan</Button>
            </div>
            
            <p className="text-gray-600 text-base mt-2">Sudah Punya Akun? 
                <span className="!text-blue-600 pl-2"><Link href="/auth/login">Login</Link></span>
            </p>
      </div>
    </div>
  )
}

export default Step2
