
'use client'
import Link from 'next/link';
import React, { useState } from 'react';

export default function Rc() {
  const [licensePlate, setLicensePlate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLicensePlateChange = (e) => {
    setLicensePlate(e.target.value);
  };

  const handleContinue = () => {
    // Basic validation: check if license plate number is not empty
    if (!licensePlate.trim()) {
      setErrorMessage('Please enter a license plate number.');
    } else {
      // Proceed with further actions (e.g., submit form)
      // Reset error message
      setErrorMessage('');
      // Continue with further actions (e.g., submit form)
      console.log('License plate number is valid:', licensePlate);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="bg-black text-white px-6 py-4 flex justify-between items-center rounded-t-lg">
          <span className="text-xl font-bold"><Link href='/components/documents'> &larr; &nbsp; Uber</Link></span>
          <button className="bg-white text-black py-1 px-3 rounded">Help</button>
        </div>
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Let’s find your Registration Certificate (RC)</h1>
          <p className="text-gray-700 mb-4">
            Enter your license plate number and we'll get the required information from the Vahan and Sarathi portal of MoRTH, or you can upload your Registration Certificate (RC) instead.
          </p>
          <label htmlFor="licensePlate" className="block text-gray-700 mb-2">License Plate Number</label>
          <input
            type="text"
            id="licensePlate"
            value={licensePlate}
            onChange={handleLicensePlateChange}
            className="block w-full bg-gray-100 border border-gray-300 p-2 rounded mb-2"
          />
          {errorMessage && <p className="text-red-500 text-sm mb-2">{errorMessage}</p>}
       <Link href='/Driver/dashboard'>   <button className="bg-black text-white py-2 px-4 rounded w-full" onClick={handleContinue}>Continue</button></Link>
        </div>
      </div>
    </div>
  );
}
