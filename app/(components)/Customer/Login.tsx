// components/CustomerDriverForm.tsx
'use client'

import React, { useState } from 'react';
import MapWithRouting from '../MapWithRouting/MapWithRouting';

type FormData = {
    email: string;
    password: string;
    name: string;
    number: string;
    dob: string;
    termsAccepted: boolean;
    start: string;
    des: string;
};

const Login: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
        name: '',
        number: '',
        dob: '',
        termsAccepted: false,
        start: '',
        des: ''
    });

    const resetFormData = () => {
        setFormData({
          email: "",
          password: "",
          name: "",
          number: "",
          dob: "",
          termsAccepted: false,
          start: "",
          des: "",
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try{
            const responce = fetch('api/customer',{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(formData)
            })
            console.log("User Created", formData)
        }
        catch(error){
            console.log(error)
            throw new Error('Error Occoured')
        }
        resetFormData()
    };

    return (
      <>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="number">Number:</label>
            <input
              type="tel"
              id="number"
              name="number"
              value={formData.number}
              onChange={handleChange}
              required
            />
          </div>
          {/* <div>
                <label htmlFor="location">Location (Driver):</label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                />
            </div> */}
          <div>
            <label htmlFor="dob">DOB:</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="termsAccepted">
              <input
                type="checkbox"
                id="termsAccepted"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                required
              />
              I accept the Terms and Conditions
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
        <MapWithRouting/>
      </>
    );
};

export default Login;
