'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Email() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const router = useRouter();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleContinue = (e) => {
    e.preventDefault();

    // Validate email, phone, and password here (if needed)
    // For simplicity, assuming basic validation for demonstration

    // Save data to localStorage
    document.cookie = `email=${email}; path=/Driver/Signup`;
    document.cookie = `number=${phone}; path=/Driver/Signup`;
    document.cookie = `password=${password}; path=/Driver/Signup`;
    console.log(email, phone, password)

    // Navigate to the next step
    router.push('/Driver/Signup/Location');
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
          <form onSubmit={handleContinue}>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="block w-full bg-gray-100 border border-gray-300 p-2 rounded mb-2"
              placeholder="Enter your email"
              required
            />
            {emailError && <p className="text-red-500 text-sm mb-2">{emailError}</p>}
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={handlePhoneChange}
              className="block w-full bg-gray-100 border border-gray-300 p-2 rounded mb-2"
              placeholder="Enter your phone number"
              required
            />
            {phoneError && <p className="text-red-500 text-sm mb-2">{phoneError}</p>}
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="block w-full bg-gray-100 border border-gray-300 p-2 rounded mb-2"
              placeholder="Enter your password"
              required
            />
            {passwordError && <p className="text-red-500 text-sm mb-2">{passwordError}</p>}
            <button type="submit" className="bg-black text-white py-2 px-4 rounded w-full">
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
