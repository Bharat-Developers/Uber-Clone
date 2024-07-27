'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Popup.module.css';


interface PopupProps {
  acceptRide: () => void,
  rejectRide: () => void,
  tripRequest: Object
}


const PopUp: React.FC<PopupProps> = ({
  acceptRide,
  rejectRide,
  tripRequest,
}) => {

  return (
    <>


      <div className={styles.popupOverlay}>
        <div className={styles.popupContent}>

          <Image
            src="/uber.png"
            alt="Uber logo"
            width={100}
            height={100}
            className={styles.logo}
          />
          <h2 className={styles.newRide}>New Ride Alert!</h2>
          <p><b>Name:</b> {tripRequest.details.name}</p>
          <p><b>From:</b> {tripRequest.details.pickup}</p>
          <p><b>To:</b> {tripRequest.details.dropoff}</p>
          <p><b>Amount:</b> Rs {tripRequest.details.amount}</p>
          <div className={styles.buttonContainer}>
            <button className={styles.acceptButton} onClick={() => acceptRide()}>Accept</button>
            <button className={styles.rejectButton} onClick={() => rejectRide()}>Reject</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default PopUp;