import React from 'react';
// index.js or App.js
import '@fortawesome/fontawesome-free/css/all.min.css';
import Link from 'next/link';


export default function Document() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full min-h-[300px]">
        <h1 className="text-3xl font-bold mb-4">Welcome User,</h1>
        <p className="text-gray-700 mb-4">Here&#39;s what you need to do to set up your account.</p>
        <ul className="list-none">
          <Link href='/Driver/aadhar'>
            <li className="flex justify-between items-center mb-2 mt-2">
              Aadhar Card
              <i className="fa fa-chevron-right"></i>
            </li></Link>
          <hr className="border-gray-300" />
          <Link href='/Driver/registration'>
            <li className="flex justify-between items-center mb-2 mt-2">
              Registration Certificate
              <i className="fa fa-chevron-right"></i>
            </li></Link>
          <hr className="border-gray-300" />
        </ul>
      </div>
    </div>
  );
}