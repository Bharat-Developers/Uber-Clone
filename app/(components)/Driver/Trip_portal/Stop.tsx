import { useRouter } from "next/navigation";
import cookie from 'cookie'
import socket from "@/webSocket/driverSocket";
import { eraseCookie } from "@/app/functions/Cookies";
import { getS2Id } from "@/app/functions/getCell_Ids";
import styles from './Stop.module.css'; // Import CSS module
function Stop() {
    const router = useRouter()
  
    const stopTrips = async () => {
      const cookies = cookie.parse(document.cookie);
      try {
        let token = null;
        if(cookies.Dtoken != undefined){
          token = cookies.Dtoken
        }
        if(token!=undefined && token!=null){
          
          if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(async (position)=>{
              const id = await getS2Id({ latitude: position.coords.latitude, longitude: position.coords.longitude });
              const response = await fetch(`${process.env.NEXT_PUBLIC_LINK}:5001/api/availableDriver/`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `${token}`
                },
                body: JSON.stringify({
                  "cell_id": id,
                  "action": "pull"
                })
              });
              const responseData = await response.json();
              console.log('res 1')
              if (response.status == 401) {
                console.log('no valid token')
                console.log(responseData)
              }
              if (!response.ok) {
                console.log(responseData);
                ;
              }
             
              const response3 = await fetch(`${process.env.NEXT_PUBLIC_LINK}:5001/api/driver/`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `${token}`
                },
                body: JSON.stringify({
                  driver:{
                  availablity: false,
                  latLon:[
                     position.coords.latitude,
                     position.coords.longitude,
                  ]
                }
              })
              });
              const responseData3 = await response3.json();
              if (response3.status == 401) {
                console.log('no valid token')
                console.log(responseData3)
                return
              }
              if (!response3.ok) {
                console.log(responseData3);
                return
              }
              if(response3.ok){
                socket.emit('close connection')
                socket.disconnect()
                router.replace('/Driver/dashboard')
                eraseCookie("GO")
              }
            })
        }
         
        }
      } catch (err) {
        console.log(err)
      }
    
      
    }
    return (
      <button className={styles.stopButton} onClick={() => stopTrips()}>Stop Trips</button>
    )
  }


  export default Stop