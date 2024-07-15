import { useRouter } from "next/navigation";
import cookie from 'cookie'
import socket from "@/webSocket/driverSocket";
import { eraseCookie } from "@/app/functions/Cookies";
import { getS2Id } from "@/app/functions/getCell_Ids";
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
              const response = await fetch('http://localhost:5001/api/availableDriver/', {
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
        
              if (response.status == 401) {
                console.log('no valid token')
                console.log(responseData)
              }
              if (!response.ok) {
                console.log(responseData);
                ;
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
                  availablity: false
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
      <button onClick={() => stopTrips()}>Stop Trips</button>
    )
  }


  export default Stop