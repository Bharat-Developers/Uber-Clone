'use client'
import React, { useState } from 'react'
import Contact from './Contact'
import Popup from './Popup'
import Navbar from '../dashboard/Navbar/Navbar'
import Stop from './Stop'
import TripDetails from './TripDetails'
import socket from '@/webSocket/driverSocket'
import { useRouter } from 'next/navigation'
import {setCookie,eraseCookie} from '@/app/functions/Cookies'
import cookie from 'cookie'
import Map from './Map'
import { getS2Id } from '@/app/functions/getCell_Ids'
function page() {

  if (!socket.active) {
    socket.connect();
  }

  socket.on('connect', async () => {
    console.log('driver connected')

    const cookies = cookie.parse(document.cookie);
    let data = null
    data = cookies.tripAccepted
    
    if (data) {
      data = JSON.parse(data)
      socket.emit('join room', data.room_id) 
      setTripAccepted(data)
      setIsAccepted(true)
    }
    let data2 = null
    data2 = cookies.onGoing

    if (data2 ) {
        data2 = JSON.parse(data2)
        socket.emit('join room', data2.room_id) 
        setOnGoing(data2)
        setIsOnGoing(true)
      }
    
      // get location access and update in database
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
                  "action": "push"
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
            })
          
          
        }
      }
      } catch (err) {
        console.log(err)
      }
    
  });

  // trip accepted
  const [tripAccepted, setTripAccepted] = useState({}) // driver can have only 1 trip accepted and 1 ongoing
  // trip ongoing 
  const [onGoing, setOnGoing] = useState({})
  const [tripRequest, setTripRequest] = useState({})
  const [isAccepted, setIsAccepted] = useState(false)
  const [isOnGoing, setIsOnGoing] = useState(false)
  const [showRequest, setShowRequest] = useState(false)
  const [cell_id,setCell_id] = useState("7156836981807251456")

  //socket events
  socket.on('ride request', (data) => {
    if (!isAccepted) { // no trip is accepted
      setTripRequest(data)
      console.log(data)
      // show pop up 
      setShowRequest(true);
    }
    
    console.log('ride requested')
    // this will remove all drivers in room and only rider and driver accepted is in room
  })

  socket.on('tranfered', (data) => {
    setShowRequest(false)
    setTripRequest({})
    // hide the pop up
    // don't emit event 'accept ride'
  })

  socket.on('canceled-rider', (data) => {

    if(data.room_id == tripAccepted.room_id){
      clearTripAccepted()
      alert('trip cancelled')
      // popup trip cancelled
    }
    
  })


  //functions

  const AcceptTrip = () => {
    if (tripRequest != null) {

      const cookies = cookie.parse(document.cookie);
      let token = null
      token = cookies.Dtoken
      if(showRequest){
        socket.emit('accept ride', {
          token: `${token}`,
          room_id: tripRequest.room_id,
          rider_id: tripRequest.rider_id,
          details : tripRequest.details
        },
        (trip_id: string)=>{
          console.log('acceptded')
          setShowRequest(false)
          const data = tripRequest
          data.trip_id = trip_id
          storeTripAccepted(data)
          setTripRequest({})
          //console.log(tripRequest)
          setIsAccepted(true)
        })
      }
      
      
    }
  }


  const StartTrip = (otp: number) => {
    
    socket.emit('start trip', { details: tripAccepted, otp: otp },()=>{
      console.log('invaild otp')
    },()=>{
      storeOnGoing(tripAccepted)
      clearTripAccepted()
    });
  }


  const onReject = () => {
    setShowRequest(false)//hide pop up
    setTripRequest({});
    console.log('rejected')
  }

  const onCancel = () => {
    socket.emit('cancel trip-driver',tripAccepted)
    clearTripAccepted()
    console.log('trip cancelled')
  }

  const onEndTrip = () => {
    socket.emit('end trip',onGoing)
    // show take payment for amount onGoing.details.amount

  }

  const onPayment = () => {
    socket.emit('close trip',onGoing)
    setIsOnGoing(false)
    cleareOnGoing()
  }
  //store the trips in cookie
  const storeTripAccepted = (trip: any) => {
    setCookie("tripAccepted", JSON.stringify(trip),0.2);
    setTripAccepted(trip)
    console.log(tripAccepted)
    console.log(trip)
    setIsAccepted(true)
  };

  const clearTripAccepted = () => {
    eraseCookie("tripAccepted");
    setTripAccepted({});
    setIsAccepted(false);
  };

  const storeOnGoing = (trip: any) => {
    setCookie("onGoing", JSON.stringify(trip),0.2);
    setOnGoing(trip)
    setIsOnGoing(true)
  };

  const cleareOnGoing = () => {
    eraseCookie("onGoing");
    setOnGoing({})
    setIsOnGoing(false)
  };





  return (
    <>
    <div className='relative'>
    <div className="flex flex-row space-y-4 mt-[40px] ml-[10px] w-[300px] p-6 bg-white rounded-lg shadow-md">

    
      {!isAccepted && !isOnGoing && <SearchingRider />}
      {showRequest && <RequestPopUp
        acceptRide={AcceptTrip}
        rejectRide={onReject}
        tripRequest={tripRequest}
      />}
    </div>
    <div className="flex flex-row space-y-4 mt-[40px] ml-[10px] w-[300px] p-6 bg-white rounded-lg shadow-md">
      {(isAccepted || isOnGoing) && 
      <TripDetails
      isAccepted={isAccepted}
      isOnGoing={isOnGoing}
      tripAccepted={tripAccepted}
      onGoing={onGoing}
      submitOtp={StartTrip}
      Cancel={onCancel}
    />
      }
      </div>
      <div className="flex flex-row space-y-4 mt-[40px] ml-[10px] w-[300px] p-6 bg-white rounded-lg shadow-md">
      {isOnGoing && <EndTrip
      onPayment={()=>onPayment()}
      endTrip={() => onEndTrip()}
      amount={onGoing.details.amount}
      />}
      </div>
      <div className="flex flex-row space-y-4 mt-[40px] ml-[10px] w-[300px] p-6 bg-white rounded-lg shadow-md">
      {!isAccepted && !isOnGoing && <Stop />}
      </div>
        <Map
      
        />
        </div>
    </>
  )
}







function TripCancelled() {

  return (
    <>
      Trip cancelled by Customer
    </>
  )
}


interface EndTripProps{
  endTrip: ()=> void,
  onPayment: () => void,
  amount: number
}

const EndTrip:React.FC<EndTripProps> = ({
  endTrip,
  onPayment,
  amount
}) => {
  const [showPayment, setShowPayment] = useState(false)
  return (
    <>
      {!showPayment && <button onClick={() => {
        endTrip()
        setShowPayment(true)
      }
        }
        >End Trip</button>
      }

      {showPayment && 
       <div>
        <h5>take payment for amount: {amount}</h5>
      <button onClick={()=>onPayment()}> amount recived </button>
      </div>
      }
      
    </>
  )
}

function SearchingRider() {
  return (
    <>
      <br />
      searching for rider
      <br />
    </>
  )
}



//POPup

interface PopupProps {
  acceptRide: () => void,
  rejectRide: () => void,
  tripRequest: Object
}
const RequestPopUp: React.FC<PopupProps> = ({
  acceptRide,
  rejectRide,
  tripRequest,
}) => {

  return (
    <>

      <br />
      name: {tripRequest.details.name}
      <br />
      pickup: {tripRequest.details.pickup}
      <br />
      dropoff:{tripRequest.details.dropoff}
      <br />
      amount: {tripRequest.details.amount}
      <br />
      <button onClick={() => acceptRide()}>Accept</button>
      <br />
      <button onClick={() => rejectRide()}>Reject</button>
      <br />
    </>
  )
}


export default page