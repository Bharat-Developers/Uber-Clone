'use client'
import React from 'react';
import Layout from './Navbar/Layout';
import TestMap from '../map/TestMap';
import { useRouter } from 'next/navigation';
import { setCookie } from '@/app/functions/Cookies';

const Home: React.FC = () => {

  const router = useRouter()
  return (
    <>
      <button onClick={() => {
        setCookie("GO",true,1)
        router.push('./Trip_portal')
      }}>Go</button>
    </>
  );
};

export default Home;
