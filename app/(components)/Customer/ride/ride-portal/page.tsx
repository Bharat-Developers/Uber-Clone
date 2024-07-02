'use client'

import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import Map from '../Map';
import styles from './page.module.css';
import socket from '@/webSocket/riderSocket';
import { latLng } from 'leaflet';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import {setCookie,eraseCookie} from '@/app/actions/function'
import cookie from 'cookie'

const RidePortalPage: React.FC = () => {
  
  const SearchParams = useSearchParams() 
  const router = useRouter()
  const pickup = SearchParams.get("pickup")
  const dropoff = SearchParams.get("dropoff")
  const [requestOn,setRequestOn] = useState(false)
  const [showDriver,setShowDriver] = useState(false)
  const [started, setStarted] = useState(false)
  const [currentTrip,setCurrentTrip] = useState({})
  // text to show status
  const [statusText,setStatusText] = useState('')
  // socket events
  if(!socket.active){
    socket.connect();
  }

  socket.on('connect', () => {
    console.log('rider connected')

    const cookies = cookie.parse(document.cookie);
    let data = null
    data = cookies.currentTrip
    if (data!= undefined) {
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
    setStatusText('finding best driver for you')
    setRequestOn(true)
    const pickupLat = parseFloat('25')
    const pickupLon = parseFloat('179')
    socket.emit('request ride',
      {
          details: {
              pickup: pickup,
              dropoff: dropoff,
              amount: 100
          },
          coor:{lat:pickupLat,lon:pickupLon}
      });
  }
  
  socket.on('drivers latLon',(latLng)=>{
    console.log(latLng)
    // show this latlng as marker with progess bar on page 
  })

  socket.on('driver-detials',(data)=>{
    console.log(data)
    storeCurrentTrip(data)
    setShowDriver(true)
    //show trip detials
    // show "driver is on way"
    setStatusText('driver is on way')
  })

  socket.on('trip started',()=>{
    setStarted(true)
    // remove cancel button
    // show "you are on the way to destination"
    setStatusText('you are on the way to destination')
  })
  
  socket.on('no driver',()=>{
    //stop progress bar 
    
    //pop up or show no driver found
    setStatusText('show no driver found')
    setTimeout(()=>{
      router.replace('./Customer/ride')
    },2000) 
    
  })

  socket.on('canceled-driver',()=>{
    setStatusText('trip cancelled by driver')
    setTimeout(()=>{
      router.replace('./ride')
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
    socket.emit('cancel trip-rider',currentTrip)
    setStatusText('trip cancelled')
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
      {!showDriver && <ProgressBar/>}
      <br/>
      <br/>
      {statusText}
      <br/>
      <br/>
      {showDriver && <DriverDetails
      currentTrip={currentTrip}
      />}
      <br/>
      {pickup}
      <br/>
      {dropoff}
      <br/>
      {!started && <button onClick={()=>onCancel()}>Cancel Trip</button>}
      </>
  );
}



//note
// all socket function handled in this for rider
// 



const ProgressBar = () => {
  return(
    <>
    Progess Bar
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
    Driver Name:{currentTrip.name}<br/>
    Amount: {currentTrip.amount}<br/>
    Vehical Number: {currentTrip.Rc}<br/>
    Mobile no : {currentTrip.number}<br/>
    OTP : {currentTrip.otp}<br/>
    </>
  )

}

export default RidePortalPage;


// showDriver state that trip is accepted by driver