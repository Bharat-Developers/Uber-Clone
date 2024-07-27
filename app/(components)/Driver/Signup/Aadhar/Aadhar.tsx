'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function Aadhar() {
  const [aadharNumber, setAadharNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const handleAadharChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setAadharNumber(e.target.value);
  };

  const handleContinue = () => {
    // Basic validation: check if Aadhaar number is 16 digits
    if (aadharNumber.length !== 16 || !/^\d+$/.test(aadharNumber)) {
      setErrorMessage('Please enter a valid 16-digit Aadhaar number.');
    } else {
      // Proceed with further actions (e.g., submit form)
      // Reset error message
      setErrorMessage('');
      // Continue with further actions (e.g., submit form)
      console.log('Aadhaar number is valid:', aadharNumber);
      document.cookie = `aadhar=${aadharNumber}; path=/Driver/Signup`;
      console.log(aadharNumber);
      router.push('/Driver/Signup/RC');

    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="bg-black text-white px-6 py-4 flex justify-between items-center rounded-t-lg">
          <span className="text-xl font-bold"><Link href='/Driver/Signup/Documents'> &larr;</Link>	&nbsp; Uber</span>
          <button className="bg-white text-black py-1 px-3 rounded">Help</button>
        </div>
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Let&apos;s find your Aadhaar card</h1>
          <p className="text-gray-700 mb-4">
            Enter your Aadhaar and we&apos;ll get your information from UIDAI. By sharing your Aadhaar details, you hereby confirm that you have shared such details voluntarily.
          </p>
          <div className="flex justify-center mb-4">
            <Image src="/aadhar.png" height={300} width={300} alt="Aadhaar" />
          </div>
          <label htmlFor="aadhar" className="block text-gray-700 mb-2">Enter Aadhaar Number without space</label>
          <input
            type="text"
            id="aadhar"
            placeholder="0000 0000 0000 0000"
            value={aadharNumber}
            onChange={handleAadharChange}
            className="block w-full bg-gray-100 border border-gray-300 p-2 rounded mb-2"
          />
          {errorMessage && <p className="text-red-500 text-sm mb-2">{errorMessage}</p>}
          <button className="bg-black text-white py-2 px-4 rounded w-full" onClick={handleContinue}>Continue</button>
        </div>
      </div>
    </div>
  );
}
