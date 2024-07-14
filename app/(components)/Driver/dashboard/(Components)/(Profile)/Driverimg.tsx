import Image from 'next/image'
import React from 'react'
import vidya from '@/public/Vidya.jpeg'

const Driverimg = () => {
  return (
    <div className='relative'>
      <Image src={vidya} alt='Image' width={200} className='rounded grayscale-[.4]'/>
      <div className='absolute bottom-0 shadow m-1 p-0.5 rounded bg-slate-800'>⭐⭐⭐⭐⭐</div>
    </div>
  )
}

export default Driverimg
