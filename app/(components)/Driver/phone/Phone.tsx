'use client'
import Link from 'next/link';
import React, { useState } from 'react';

export default function Phone() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [otpError, setOtpError] = useState('');

  const handleEmailChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setPhone(e.target.value);
  };

  const handleOtpChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setOtp(e.target.value);
  };

  const handleSendOTP = () => {
    // Basic validation: check if email is empty
    if (!email.trim()) {
      setEmailError('Please enter your email.');
    } else {
      // Proceed with sending OTP logic
      // Reset email error message
      setEmailError('');
    }
  };

  const handleContinue = () => {
    // Basic validation: check if phone number and OTP are not empty
    if (!phone.trim()) {
      setPhoneError('Please enter your phone number.');
    } else if (!otp.trim()) {
      setOtpError('Please enter the OTP.');
    } else {
      // Proceed with further actions (e.g., submit form)
      // Reset error messages
      setPhoneError('');
      setOtpError('');
      // Continue with further actions (e.g., submit form)
      console.log('Form submitted successfully:', { email, phone, otp });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md rounded-lg overflow-hidden shadow-lg bg-white">
        <div className="bg-black text-white p-4 flex justify-between items-center">
          <span className="text-xl font-bold">Uber</span>
          <button className="bg-white text-black py-1 px-3 rounded mt-2">Help</button>
        </div>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Enter Your Details</h1>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className="block w-full bg-gray-100 border border-gray-300 p-2 rounded mb-2"
            placeholder="Enter your email"
          />
          {emailError && <p className="text-red-500 text-sm mb-2">{emailError}</p>}
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={handlePhoneChange}
            className="block w-full bg-gray-100 border border-gray-300 p-2 rounded mb-2"
            placeholder="Enter your phone number"
          />
          {phoneError && <p className="text-red-500 text-sm mb-2">{phoneError}</p>}
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={handleOtpChange}
            className="block w-full bg-gray-100 border border-gray-300 p-2 rounded mb-2"
            placeholder="Enter OTP"
          />
          {otpError && <p className="text-red-500 text-sm mb-2">{otpError}</p>}
          <button className="bg-black text-white py-2 px-4 rounded w-full mb-2" onClick={handleSendOTP}>Send OTP</button>
         <Link href='/Driver/signup'> <button className="bg-black text-white py-2 px-4 rounded w-full" onClick={handleContinue}>Continue</button></Link>
        </div>
      </div>
    </div>
  );
}
