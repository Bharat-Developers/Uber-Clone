'use client'
import React from 'react';
import Layout from './Navbar/Layout';
import TestMap from '../map/TestMap';
import Profile from './(Components)/(Profile)/Profile';
import PrevRides from './(Components)/(PrevRide)/PrevRides';
import Graph from './(Components)/(Graph)/Graph';

const Home: React.FC = () => {

  return (
    <>
      <div className='flex flex-col'>
        <Profile />
        <div className='flex gap-2 w-full items-center'>
          <PrevRides />
          <Graph />
        </div>
      </div>
    </>
  );
};

export default Home;
