'use client'
import React from 'react';
import Layout from './Navbar/Layout';
import TestMap from '../map/TestMap';
import { useRouter } from 'next/navigation';

const Home: React.FC = () => {
  
  const router = useRouter()
  return (
    <>
    <button onClick={()=>{
      router.push('./Trip_portal')
    }}>Go</button></>
  );
};

export default Home;
