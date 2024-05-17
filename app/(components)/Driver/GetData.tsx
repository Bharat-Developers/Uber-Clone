'use client'
import React, { useState } from 'react'

const GetData = () => {

interface Driver{
    id : number;
    name : String;
}
const [data, setdata] = useState<Driver[]>([]);

    const handleSubmit = async () => {
        await fetch('api/driver')
        .then(response => response.json())
        .then((data : Driver[])=>{
            setdata(data);
        })
        .catch(error => {
            console.log('Error fetching data', error);
        })
    }
  return (
    <div>
      <button type="submit" className='border p-2' onClick={handleSubmit}>I want Drivers Data</button>
      <div className='flex-col justify-center text-center'>
        {data.map((driver : Driver) => (
            <div key={driver.id}>{driver.name}</div>
        ))}
      </div>
    </div>
  )
}

export default GetData
