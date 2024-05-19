'use client'
import React, { useEffect, useState } from 'react'
import { Location } from '@/types/Location';
import getCell_Ids from '@/app/actions/getCell_Ids';
const GetData = () => {

interface Driver{
    _id : number;
    name : String;
}



const [data, setdata] = useState<Driver[]>([]);



    const handleSubmit = async () => {
        await fetch('api/driver')
        .then(response => response.json())
        .then((data : Driver[])=>{
            console.log();
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
            <div key={driver._id}>{driver.name},{driver._id}</div>
        ))}
      </div>
    </div>
  )
}

export default GetData
