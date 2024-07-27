'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Import useRouter hook from next/navigation

export default function Ride() {
  const router = useRouter();

  const handleSelect = (option: string) => {
    // Navigate to the next page with the selected option
    document.cookie = `Ride=${option}; path=/Driver/Signup`;
    console.log(option)

    router.push(`/Driver/Signup/Documents/?ride=${option}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-1/2 rounded-lg overflow-hidden">
        <div className="bg-black text-white p-4 flex justify-between items-center">
          <span>Uber</span>
          <button className="bg-white text-black py-1 px-3 rounded mt-2">Help</button>
        </div>
        <div className="bg-white text-black p-4 relative">
          <Image src="/dollar_bill.png" height={40} width={40} alt="Money" className="mt-6" />
          <h1 className="text-xl mt-4">Choose your ride</h1>
          <p className="mt-2">
            Select the type of vehicle you want to drive with Uber.
          </p>
          <div className="mt-4 text-sm">
            <div
              className="bg-neutral-300 w-96 h-16 mt-2 p-4 rounded cursor-pointer flex items-center justify-between hover:bg-gray-200"
              onClick={() => handleSelect('car')}
            >
              <span>Car</span>
              <Image src="/car.png" height={40} width={40} alt="Car" />
            </div>
            <div
              className="bg-neutral-300 w-96 h-16 mt-2 p-4 rounded cursor-pointer flex items-center justify-between hover:bg-gray-200"
              onClick={() => handleSelect('auto')}
            >
              <span>Auto</span>
              <Image src="/auto.png" height={40} width={40} alt="Auto" />
            </div>
            <div
              className="bg-neutral-300 w-96 h-16 mt-2 p-4 rounded cursor-pointer flex items-center justify-between hover:bg-gray-200"
              onClick={() => handleSelect('2-wheeler')}
            >
              <span>2-Wheeler</span>
              <Image src="/moto.png" height={40} width={40} alt="2-Wheeler" />
            </div>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <button
            onClick={() => handleSelect('')}
            className="bg-black text-white py-2 px-4 rounded absolute bottom-4 right-4 rounded-sm"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
