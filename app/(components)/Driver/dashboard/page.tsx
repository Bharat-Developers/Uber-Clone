'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import Profile from './(Components)/(Profile)/Profile';
import PrevRides from './(Components)/(PrevRide)/PrevRides';
import Graph from './(Components)/(Graph)/Graph';

const Home: React.FC = () => {
  
  const router = useRouter()
  return (
    <>
      <div className='flex flex-col'>
        <Profile />
        <div className='flex gap-2 w-full items-center'>
          <PrevRides rides={[]} />
          <Graph />
        </div>
      </div>
      <button onClick={ () => {
        
        
      }}>Go</button>
    </>
  );
};

export default Home;
