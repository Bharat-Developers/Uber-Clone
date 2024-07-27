import React from 'react'
import Driverimg from './Driverimg'
import Image from 'next/image'
import Liscense from '@/public/Liscense.png'
const Profile_Images = () => {
  return (
    <div className='flex flex-col items-center h-full justify-around'>
      <div>
        <Driverimg />
      </div>
      <div>
        <Image src={Liscense} alt='Liscense' width={300} />
      </div>
    </div>
  )
}

export default Profile_Images
