'use client'
import React, { useState } from 'react'

const GetData = () => {

interface User{
    id : number;
    name : String;
}
const [data, setdata] = useState<User[]>([]);

    const handleSubmit = async () => {
        await fetch('api/customer')
        .then(response => response.json())
        .then((data : User[])=>{
            setdata(data);
        })
        .catch(error => {
            console.log('Error fetching data', error);
            throw new Error('Error fetching data')
        })
    }
  return (
    <div>
      <button type="submit" className='border p-2' onClick={handleSubmit}>I want Users Data</button>
      <ul className='flex-col justify-center text-center'>
        {data.map(user => (
            <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default GetData
