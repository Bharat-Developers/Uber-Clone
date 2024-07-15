import React from 'react'
import Info from './Info'
import Profile_Images from './Images'
import Left from './left'


const Profile = () => {
  return (
    <div className='flex justify-center'>
      <div className='flex justify-around p-5 items-center border w-[80%] m-4 bg-slate-600 rounded '>
        <div className='h-full'>
          <Profile_Images />
        </div>
        <div className='h-full'>
          <Info />
        </div>
        <div className='h-full'>
          <Left />
        </div>
      </div>
    </div>
  )
}

export default Profile
