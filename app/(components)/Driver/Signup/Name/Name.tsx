'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import cookie from 'cookie'

export default function Email() {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    document.cookie = `name=${name}; path=/Driver/Signup`;
    document.cookie = `dob=${dob}; path=/Driver/Signup`;
    document.cookie = `termsAccepted=${termsAccepted ? 'true' : 'false'}; path=/Driver/Signup`;
    console.log(name, dob, termsAccepted);
    router.push('/Driver/Signup/Phone');
  };

  const handleCheckboxChange = (e: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
    setTermsAccepted(e.target.checked);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md rounded-lg overflow-hidden shadow-lg bg-white">
        <div className="bg-black text-white p-4 flex justify-between items-center">
          <span className="text-xl font-bold">Uber</span>
          <button className="bg-white text-black py-1 px-3 rounded mt-2">Help</button>
        </div>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Driver signup</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="name"
              className="block w-full bg-gray-100 border border-gray-300 p-2 rounded mb-4"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="date"
              id="dob"
              className="block w-full bg-gray-100 border border-gray-300 p-2 rounded mb-4"
              placeholder="Enter your date of birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
            <label className="block mb-4">
              <input
                type="checkbox"
                className="mr-2"
                checked={termsAccepted}
                onChange={handleCheckboxChange}
                required
              />
              I accept the terms and conditions
            </label>
            <button type="submit" className="bg-black text-white py-2 px-4 rounded w-full">
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
