import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Email() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md rounded-lg overflow-hidden shadow-lg bg-white">
        <div className="bg-black text-white p-4 flex justify-between items-center">
          <span className="text-xl font-bold">Uber</span>
          <button className="bg-white text-black py-1 px-3 rounded mt-2">Help</button>
        </div>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Enter Your Email</h1>
          <input
            type="email"
            id="email"
            className="block w-full bg-gray-100 border border-gray-300 p-2 rounded mb-4"
            placeholder="Enter your email"
          />
          <Link href='/Driver/phone'>
          <button className="bg-black text-white py-2 px-4 rounded w-full">Continue</button>
          </Link>
        </div>
      </div>
    </div>
  );
}