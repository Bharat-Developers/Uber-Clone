import React from 'react'
import VehicelInfo from './vehicelInfo'
import DriverInfo from './driverInfo'

const Info = () => {
  return (
    <div className='flex flex-col gap-4 h-full justify-around text-slate-50'>
      <h1 className='text-6xl font-medium '>MS Dhoni</h1>
      <div className='flex flex-col gap-2 text-xl ml-[50px]'>
        <DriverInfo DOB={new Date} Aadhar={'123456789101'} Number={1234567890} Email={'mahendra.dhoni@gmail.com'} Join_Date={new Date} />
        <VehicelInfo Capicity={4} Model={'1234567890'} Number={'1234567890'} isVerified Owner={'MS Dhoni'} />
      </div>
    </div>
  )
}

export default Info
