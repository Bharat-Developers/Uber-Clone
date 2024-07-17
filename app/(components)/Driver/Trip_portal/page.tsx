'use client'
import React, { useState } from 'react'
import Contact from './Contact'
import Popup from './Popup'
import Navbar from '../dashboard/Navbar/Navbar'
import Stop from './Stop'

import TripDetails from './TripDetails'
import socket from '@/webSocket/driverSocket'
import { useRouter } from 'next/navigation'
import { setCookie, eraseCookie } from '@/app/functions/Cookies'
import cookie from 'cookie'
import Map from './Map'
import PopUp from './Popup'
import { routingControlRef } from '@/app/utilities/MapUtils'
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

    if (data2) {
      data2 = JSON.parse(data2)
      socket.emit('join room', data2.room_id)
      setOnGoing(data2)
      setIsOnGoing(true)
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

    if (data.room_id == tripAccepted.room_id) {
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
      if (showRequest) {
        socket.emit('accept ride', {
          token: `${token}`,
          room_id: tripRequest.room_id,
          rider_id: tripRequest.rider_id,
          details: tripRequest.details
        },
          (trip_id: string) => {
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

    socket.emit('start trip', { details: tripAccepted, otp: otp }, () => {
      console.log('invaild otp')
    }, () => {
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
    routingControlRef?.remove();
    socket.emit('cancel trip-driver', tripAccepted)
    clearTripAccepted()
    console.log('trip cancelled')
  }

  const onEndTrip = () => {
    socket.emit('end trip', onGoing)
    // show take payment for amount onGoing.details.amount

  }

  const onPayment = () => {
    routingControlRef?.remove()
    socket.emit('close trip', onGoing)
    setIsOnGoing(false)
    cleareOnGoing()
  }
  //store the trips in cookie
  const storeTripAccepted = (trip: any) => {
    setCookie("tripAccepted", JSON.stringify(trip), 0.2);
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
    setCookie("onGoing", JSON.stringify(trip), 0.2);
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
        <Map
          isAccepted={isAccepted}
          isOnGoing={isOnGoing}
          tripAccepted={tripAccepted}
          onGoing={onGoing}
        />
          {!isAccepted && !isOnGoing && <SearchingRider />}
          
          {showRequest && <PopUp
            acceptRide={AcceptTrip}
            rejectRide={onReject}
            tripRequest={tripRequest}
          />}
        
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

         {isOnGoing && <EndTrip
            onPayment={() => onPayment()}
            endTrip={() => onEndTrip()}
            amount={onGoing.details.amount}
          />}
      
         {!isAccepted && !isOnGoing && <Stop />}

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


interface EndTripProps {
  endTrip: () => void,
  onPayment: () => void,
  amount: number
}

const EndTrip: React.FC<EndTripProps> = ({
  endTrip,
  onPayment,
  amount
}) => {
  const [showPayment, setShowPayment] = useState(false)
  return (
    <>
      {!showPayment && <button onClick={() => {
        {/* can add end trip otp for security */}
         endTrip()
        setShowPayment(true)
      }
      }
      className={"py-2 px-5 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-grey-700 focus:outline-none focus:ring focus:ring-grey-400 focus:ring-opacity-75"}
      >End Trip</button>
      }

      {showPayment &&
        <div>
          <h5>take payment for amount: {amount}</h5>
          <button onClick={() => onPayment()}> amount recived </button>
        </div>
      }

    </>
  )
}


function SearchingRider() {
  return (
    <div className="loading-container">
      <div className="loading-text">Searching for Rider</div>
      <div className="loading-dots">
        <span className="loading-dot">.</span>
        <span className="loading-dot">.</span>
        <span className="loading-dot">.</span>
        <span className="loading-dot">.</span>
      </div>
      <style jsx>{`
        @keyframes loadingDots {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 50vh;
          background-color: rgba(255, 255, 255, 0.9);
          font-size: 32px;
          font-weight: bold;
          text-align: center;
        }

        .loading-dots {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 20px;
        }

        .loading-dot {
          margin: 0 5px;
          animation: loadingDots 1s infinite;
        }

        .loading-dot:nth-child(1) {
          animation-delay: 0s;
        }
        .loading-dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        .loading-dot:nth-child(3) {
          animation-delay: 0.4s;
        }
        .loading-dot:nth-child(4) {
          animation-delay: 0.6s;
        }
      `}</style>
    </div>
  );
}




export default page