import Image from 'next/image';
import React, { useState } from 'react';
import { setCookie } from '@/app/functions/Cookies';
import { useRouter } from 'next/navigation';
import { getS2Id } from '@/app/functions/getCell_Ids';
import cookie from 'cookie';
const Left = () => {
  const router = useRouter();
  const [isGoActive, setIsGoActive] = useState(false);
  const ValueArray = [
    {
      // img : ,
      value : '12km',
    },
    {
      // img : ,
      value : '69 Rupees',
    },
    {
      // img : ,
      value : '6.9 Yr',
    }
  ]

  const setLocation = () =>{
    // get location access and update in database
    try {
     const cookies = cookie.parse(document.cookie) 
     let token = null;
     if (cookies.Dtoken != undefined) {
       token = cookies.Dtoken
     }
     if (token != undefined && token != null) {
       if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(async (position) => {
           const id = await getS2Id({ latitude: position.coords.latitude, longitude: position.coords.longitude });
           const response = await fetch('http://localhost:5001/api/availableDriver/', {
             method: 'PUT',
             headers: {
               'Content-Type': 'application/json',
               'Authorization': `${token}`
             },
             body: JSON.stringify({
               "cell_id": id,
               "action": "push"
             })
           });
           const responseData = await response.json();

           if (response.status == 401) {
             console.log('no valid token')
             console.log(responseData)
             return
           }
           if (!response.ok) {
             console.log(responseData);
             return
           }

           const response2 = await fetch('http://localhost:5001/api/driver/latLon', {
             method: 'PUT',
             headers: {
               'Content-Type': 'application/json',
               'Authorization': `${token}`
             },
             body: JSON.stringify({
               latitude: position.coords.latitude,
               longitude: position.coords.longitude,
             })
           });
           const responseData2 = await response2;
           if (response2.status == 401) {
             console.log('no valid token')
             console.log(responseData2)
             return
           }
           if (!response2.ok) {
             console.log(responseData2);
             return
           }
           const response3 = await fetch('http://localhost:5001/api/driver/avail', {
             method: 'PUT',
             headers: {
               'Content-Type': 'application/json',
               'Authorization': `${token}`
             },
             body: JSON.stringify({
               availablity: true
             })
           });
           const responseData3 = await response3;
           if (response2.status == 401) {
             console.log('no valid token')
             console.log(responseData3)
             return
           }
           if (!response3.ok) {
             console.log(responseData3);
             return
           }
           if(response3.ok){
             router.push('./Trip_portal')
           }
         },(err)=>{
           console.log(err)
         })
       }
     }
   } catch (err) {
     console.log(err)
   }

 }
 
  return (
    <div className='h-full flex flex-col justify-around items-center'>
      <style jsx>{`
        @keyframes blink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        .arrow-animation {
          animation: blink 1s infinite;
        }
      `}</style>

      <button onClick={() => {
        setIsGoActive(true);
        setCookie("GO",true,1)
        setLocation()
      }}>
        <h1 className='text-4xl'>GO 
          <span className={`${isGoActive ? 'arrow-animation' : ''}`}> {`->`} </span>
        </h1>
      </button>

      <div className='flex flex-col gap-2'>
        {ValueArray.map((items, index) => (
          <div className='border px-2 py-1 flex gap-2 rounded items-center justify-around' key={index}>
            {/* <Image src={}/> */}
            {items.value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Left;
