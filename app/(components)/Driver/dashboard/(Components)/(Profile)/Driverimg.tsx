import Image from 'next/image'
import React from 'react'
import dhoni from '@/public/57.webp'

const Driverimg = () => {
  return (
    <div className='relative'>
      <Image src={dhoni} alt='Image' width={300} className='rounded grayscale-[.4]'/>
      <div className='absolute bottom-0 shadow m-1 p-0.5 rounded bg-slate-800'>⭐⭐⭐⭐⭐</div>
    </div>
  )
}

export default Driverimg
