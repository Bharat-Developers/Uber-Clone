
'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import Aadhar from '../Aadhar/Aadhar';
import { useRouter } from 'next/navigation';
import cookie from 'cookie'

export default function Rc() {
  const [licensePlate, setLicensePlate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const handleLicensePlateChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setLicensePlate(e.target.value);
  };

  const cookies = cookie.parse(document.cookie);
  




  const email = cookies.email
  const number = cookies.number
  const name = cookies.name
  const dob = cookies.dob
  const termsAccepted = cookies.termsAccepted
  const location = cookies.location
  const cabType = cookies.Ride
  const language = cookies.language
  const password = cookies.password
  const aadhar = cookies.aadhar


  const handleContinue = async () => {
    // Basic validation: check if license plate number is not empty
    if (!licensePlate.trim()) {
      setErrorMessage('Please enter a license plate number.');
    } else {
      // Proceed with further actions (e.g., submit form)
      // Reset error message
      setErrorMessage('');
      // Continue with further actions (e.g., submit form)
      console.log('License plate number is valid:', licensePlate);

      const data = {
        email: email, password: password, name: name, number: number, location: location, language: language, aadhar: aadhar, dob: dob, termsAccepted:termsAccepted, cabType:cabType, RCNo: licensePlate, vehicleModel: "Kia"
      }
      console.log('data sent to driver: ', data);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_LINK}api/driver/signUp`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',

          },
          body: JSON.stringify(data)
        });

        if (!response.ok) {
          throw new Error('Failed to sign up');
        }

        const responseData = await response.json();
        console.log('Data sent successfully:', responseData);

        // Deleting all the cookies
        document.cookie.split(";").forEach(cookie => {
          document.cookie = cookie.split("=")[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        });

        router.push('/Driver/Login');
      } catch (error) {
        console.error('Error sending data to backend:', error);
      }
    }
  }


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="bg-black text-white px-6 py-4 flex justify-between items-center rounded-t-lg">
          <span className="text-xl font-bold"><Link href='/Driver/Signup/Documents'> &larr; &nbsp; Uber</Link></span>
          <button className="bg-white text-black py-1 px-3 rounded">Help</button>
        </div>
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Let’s find your Registration Certificate (RC)</h1>
          <p className="text-gray-700 mb-4">
            Enter your license plate number and we ll get the required information from the Vahan and Sarathi portal of MoRTH, or you can upload your Registration Certificate (RC) instead.
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
          <Link href='/Driver/HomePage'>   <button className="bg-black text-white py-2 px-4 rounded w-full" onClick={handleContinue}>Continue</button></Link>
        </div>
      </div>
    </div>
  );
};