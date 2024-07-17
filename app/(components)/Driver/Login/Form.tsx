'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const router = useRouter();

  const handleEmailChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    // Basic validation: check if email and password are not empty
    if (!email.trim()) {
      setEmailError('Please enter your email.');
    } else if (!password.trim()) {
      setPasswordError('Please enter your password.');
    } else {
      // Proceed with further actions (e.g., submit form)
      setEmailError('');
      setPasswordError('');
      console.log('Form submitted successfully:', { email, password });
      const data = {
        email,
        password
      }
      // Navigate to the next page
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_LINK}:5001/api/driver/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        const responseData = await response.json();

        if (response.status == 401) {
          setPasswordError(responseData.msg + " or email")
        }
        if (!response.ok) {
          console.log(responseData);
          throw new Error('Failed to login in ');
        }

        console.log('Data sent successfully:', responseData);
        document.cookie = `Dtoken=${responseData.token}; path=/`;
        router.push('/Driver/dashboard');
      }
      catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-1/2 rounded-lg overflow-hidden">
        <div className="bg-black text-white p-4 flex justify-between items-center">
          <span>Uber</span>
          <button className="bg-white text-black py-1 px-3 rounded mt-2">Help</button>
        </div>
        <div className="bg-white text-black p-4 relative">
          <Image src="/dollar_bill.png" height={40} width={40} alt="Money" className="mt-6" />
          <h1 className="text-xl mt-4">Sign In</h1>
          <p className="mt-2">Please enter your email and password to continue.</p>
          <div className="mt-4 text-sm">
            <label>Email</label><br />
            <input
              type="email"
              className="bg-neutral-300 w-96 h-8 mt-2 p-2 rounded"
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && (
              <div className="text-red-500 mt-2">
                {emailError}
              </div>
            )}
          </div>
          <div className="mt-4 text-sm">
            <label>Password</label><br />
            <input
              type="password"
              className="bg-neutral-300 w-96 h-8 mt-2 p-2 rounded"
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordError && (
              <div className="text-red-500 mt-2">
                {passwordError}
              </div>
            )}
          </div>
          <br /><br /><br /><br />
          <button
            onClick={handleSubmit}
            className="bg-black text-white py-2 px-4 rounded absolute bottom-4 right-4 rounded-sm"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
