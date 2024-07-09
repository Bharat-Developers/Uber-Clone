import { useRouter } from "next/navigation";
import cookie from 'cookie'
import socket from "@/webSocket/driverSocket";
import { eraseCookie } from "@/app/functions/Cookies";
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
          const response = await fetch('http://localhost:5001/api/availableDriver/', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${token}`
            },
            body: JSON.stringify({
              "cell_id": "7156836981807251456",
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
          eraseCookie("GO")
        }
        
      } catch (err) {
        console.log(err)
      }
    
      socket.emit('close connection')
      socket.disconnect()
      router.replace('/Driver/dashboard')
    }
    return (
      <button onClick={() => stopTrips()}>Stop Trips</button>
    )
  }


  export default Stop