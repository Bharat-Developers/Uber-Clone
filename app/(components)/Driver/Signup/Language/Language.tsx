import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Language() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-1/2 rounded-lg overflow-hidden shadow-lg">
        <div className="bg-black text-white p-4 flex justify-between items-center">
          <span className="text-xl font-bold">Uber</span>
          <button className="bg-white text-black py-1 px-3 rounded mt-2">Help</button>
        </div>
        <div className="p-4">
          <p className="text-gray-700 mb-4">
            You can change your language on this screen or anytime in Help.
          </p>
          <h1 className="text-2xl font-bold mb-4">Select Your Language</h1>
          <select id="languageSelect" className="block w-full bg-gray-100 border border-gray-300 p-2 rounded mb-4">
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
            <option value="bn">বাংলা</option>
            <option value="kn">ಕನ್ನಡ</option>
            <option value="mr">मराठी</option>
            <option value="ta">தமிழ்</option>
            <option value="te">తెలుగు</option>
          </select>
          <br></br>
          <br /><br /><br /><br /><br /><br /><br /><br />
          <Link href='/Driver/Signup/Ride'><button className="bg-black text-white py-2 px-4 rounded w-full">Continue</button></Link>
        </div>
      </div>
    </div>
  );
}
