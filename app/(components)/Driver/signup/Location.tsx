'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Location() {
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (location.length >=2) { 
      const requestOptions = {
        method: 'GET',
      };
  
      fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${location}&apiKey=7060a1b8dbc64f0092997c4b56f0d874`, requestOptions)
        .then(response => response.json())
        .then(result => setSuggestions(result.features))
        .catch(error => console.log('error', error));
    } else {
      setSuggestions([]);
    }
  }, [location]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-1/2 rounded-lg overflow-hidden">
        <div className="bg-black text-white p-4 flex justify-between items-center">
          <span>Uber</span>
          <button className="bg-white text-black py-1 px-3 rounded mt-2">Help</button>
        </div>
        <div className="bg-white text-black p-4 relative">
          <Image src="/dollar_bill.png" height={40} width={40} alt="Money" className="mt-6" />
          <h1 className="text-xl mt-4">Earn with Uber</h1>
          <p className="mt-2">
            Decide when, where, and how you want to earn.
          </p>
          <div className="mt-4 text-sm">
            <label>Where would you like to earn?</label><br />
            <input 
              type="text" 
              className="bg-neutral-300 w-96 h-8 mt-2 p-2 rounded" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            {suggestions.length > 0 && (
              <ul className="bg-white border border-gray-300 mt-2 rounded w-96">
                {suggestions.map((suggestion, index) => (
                  <li 
                    key={index} 
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => setLocation(suggestion.properties.formatted)}
                  >
                    {suggestion.properties.formatted}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="mt-4 text-sm">
            <label>Referral Code (optional)</label><br />
            <input type="text" className="bg-neutral-300 w-96 h-8 mt-2 p-2 rounded" />
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <Link href='/Driver/language'>
            <button className="bg-black text-white py-2 px-4 rounded absolute bottom-4 right-4  rounded-sm">
              Next
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
