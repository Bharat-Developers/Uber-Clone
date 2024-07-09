'use client'

import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import Map from '../Map';
import styles from './page.module.css';
import socket from '@/webSocket/riderSocket';
import { latLng } from 'leaflet';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import {setCookie,eraseCookie} from '@/app/functions/Cookies';
import cookie from 'cookie';
import RidePortal from './RidePortal';


const RidePortalPage: React.FC = () => {
  
  const SearchParams = useSearchParams() 
  const router = useRouter()
  const pickup = SearchParams.get("pickup")
  const dropoff = SearchParams.get("dropoff")
  const [requestOn,setRequestOn] = useState(false)
  const [isAccepted,setIsAccepted] = useState(false)
  const [started, setStarted] = useState(false)
  const [currentTrip,setCurrentTrip] = useState({})
  // text to show status
  const [statusText,setStatusText] = useState('')
  const [room,setRoom] = useState(0)
  const [progress, setProgress] = useState(0) // Add progress state

  // socket events
  if(!socket.active){
    socket.connect();
  }

  socket.on('connect', () => {
    console.log('rider connected')

    const cookies = cookie.parse(document.cookie);
    let data = null
    data = cookies.currentTrip
    if (data) {
      data = JSON.parse(data)
      socket.emit('join room', data.room_id) 
      setCurrentTrip(data)
      setRequestOn(true)// don't send request ride
    }
  })

  const storeCurrentTrip = (trip: any) => {
    setCookie("currentTrip",JSON.stringify(trip),0.2)
    setCurrentTrip(trip)
    
  };

  const clearCurrentTrip = () => {
    eraseCookie("currentTrip");
    setCurrentTrip({})
  }

  if(!requestOn){
    setStatusText('Finding best driver for you')
    setRequestOn(true)
    const pickupLat = parseFloat('21.176433')
    const pickupLon = parseFloat('79.060855')
    socket.emit('request ride',
      {
          details: {
              pickup: pickup,
              dropoff: dropoff,
              amount: 100
          },
          coor:{lat:pickupLat,lon:pickupLon}
      },(room_id: any)=>{
        setRoom(room_id)
      });
  }
  
  socket.on('drivers latLon',(latLng)=>{
    console.log(latLng)
    // show this latlng as marker with progess bar on page 
     // Update progress as an example
     
     setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
  })

  socket.on('driver-detials',(data)=>{
    console.log(data)
    storeCurrentTrip(data)
    setIsAccepted(true)
    //show trip detials
    // show "driver is on way"
    setStatusText('Driver is on way')
  })

  socket.on('trip started',()=>{
    setStarted(true)
    // remove cancel button
    // show "you are on the way to destination"
    setStatusText('You are on the way to destination')
  })
  
  socket.on('no driver',()=>{
    //stop progress bar 
    
    //pop up or show no driver found
    setStatusText('show no driver found')
    setTimeout(()=>{
      router.replace('/Customer/ride')
    },2000) 
    
  })

  socket.on('canceled-driver',()=>{
    setStatusText('trip cancelled by driver')
    setTimeout(()=>{
      clearCurrentTrip()
      router.replace('/Customer/ride')
    },5000) 
  })

  socket.on('trip complete',()=>{
    //
    setStatusText('Please pay the driver Rs '+ currentTrip.amount)
  })

  socket.on('trip ended',()=>{
    setStatusText('Trip completed')
    setTimeout(()=>{
      clearCurrentTrip()
      router.replace('/Customer/ride')
    },5000) 
  })

  const onCancel = () => {
   
    socket.emit('cancel trip-rider',currentTrip,room,isAccepted)
    setStatusText('Trip cancelled by You')
    setTimeout(()=>{
      clearCurrentTrip()
      router.replace('/Customer/ride')
    },5000) 
  }
  // on cancel button clicked
  // socket.emit('cancel trip-rider', currentTrip)

  // get driver location continously every 3 sec (useEffect) and change on map
  // get driver location 
  return(
      <>
       <Navbar /><div className={styles.containers}>
        <h1 className={styles.heading}>Getting Driver Info</h1>
      {!isAccepted && <RidePortal progress={0}/>}
      <h1 className={styles.title}>{statusText}</h1>
    
     
      {isAccepted && <DriverDetails
      currentTrip={currentTrip}
      />}
      <br/>
      <div className={styles.alignment}>
      <div className={styles.img}>
      <h3 className={styles.details}>From: {pickup}</h3>
      <br/>
     
      <h3 className={styles.details}>To: {dropoff}</h3></div></div>
      <br/>
      <br/>
      {!started && <button className={styles.button} onClick={()=>onCancel()}>Cancel Trip</button>}
      </div>
      </>
  );
}



//note
// all socket function handled in this for rider
// 



const ProgressBar = () => {
  return(
    <>
    
    <h1 className={styles.title}>Generating driver details</h1>

    </>
  )
}




interface RideDetailsProps{
  currentTrip: Object
}

const DriverDetails:React.FC<RideDetailsProps> = (
  {
    currentTrip
  }
) =>{
  return(
    <>
   <br/>
   <div className={styles.border}>
   <h3 className={styles.information}>
    Driver Name:{currentTrip.name}<br/>
    Amount: {currentTrip.amount}<br/>
    Vehical Number: {currentTrip.Rc}<br/>
    Mobile no : {currentTrip.number}<br/>
    OTP : {currentTrip.otp}</h3></div><br/>
    </>
  )

}

export default RidePortalPage;


// isAccepted state that trip is accepted by driver