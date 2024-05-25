'use client'
import React, { useEffect, useState } from 'react'
import { Location } from '@/types/Location';
import {getCell_Ids,getS2Id} from '@/app/actions/getCell_Ids';
import S2Cell from '@/lib/models/S2cell';
import { S2Celltype } from '@/types/S2Cell';

const getTrip = () => {
    const [data, setData] = useState<S2Celltype[]>([]);
    const [ocation, setLocation] = useState<Location>({ latitude: 0, longitude: 0 });
    const getLocation = () =>{
        if ('geolocation' in navigator) {
            // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude, longitude } = coords;
                setLocation({ latitude, longitude });
                console.log(latitude, longitude);
            })
        }
    }
    useEffect(() => {
       setInterval(() =>{
        getLocation();
       },60000)// 1 min
    }, [
        location
    ]);

    const handleSubmit = async () =>{
        await fetch('api/region',{
            method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({S2_Id: getS2Id(location)})
        })
        .then(response => {
            console.log(response.json)
            setData(response.json);
        })
        
    }

    let regionIds = getCell_Ids(location);
    console.log(regionIds);
    return (
     <div>
        <button type="submit" className='border p-2' onClick={handleSubmit}>I want Data</button>
        <ul className='flex-col justify-center text-center'>
        {data.map(S2Cell => (
            <li key={user._id}>{user.name}</li>
        ))}
      </ul>
     </div>
    )
}

export default getTrip