// DriverInfo.tsx
"use client"
import React from 'react';
import styles from './RideInfo.module.css';

interface RideInfoProps {
  isAccepted: boolean,
  statusText: string,
  currentTrip: object,
  pickup: string,
  dropoff: string,
  onCancel: () => void,
  started: boolean,
}

const RideInfo: React.FC<RideInfoProps> = ({ isAccepted,statusText,currentTrip,pickup,dropoff,started,onCancel }) => {

  return (
    <>
    <div className={styles.infoContainers}>
        
      <h1 className={styles.heading}>{statusText}</h1>
     {(!isAccepted && !started)&& <ProgressBar/>}
      <h1 className={styles.title}>Getting Driver Info</h1>
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
};


interface DriverDetailsProps{
  currentTrip: Object
}

const DriverDetails:React.FC<DriverDetailsProps> = (
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

const ProgressBar = () => {
  return(
    <>
    <div className="loading-container">
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
          height: 10vh;
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
    </>
  )
}

export default RideInfo;
