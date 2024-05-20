import React from 'react';
import Image from 'next/image';

export default function Vehicle() {
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
          
        </div>
      </div>
    </div>
  );
}
