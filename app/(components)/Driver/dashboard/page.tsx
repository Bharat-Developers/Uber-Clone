'use client'
import React from 'react';
import cookie from 'cookie'
import { useRouter } from 'next/navigation';
import { setCookie } from '@/app/functions/Cookies';
import { getS2Id } from '@/app/functions/getCell_Ids';

const Home: React.FC = () => {
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
  const router = useRouter()
  return (
    <>
      <button onClick={async () => {
        setCookie("GO",true,1)
        await setLocation()
        
      }}>Go</button>
    </>
  );
};

export default Home;
