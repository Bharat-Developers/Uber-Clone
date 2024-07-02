// DriverPortal.tsx
"use client"
import React, { useState, useEffect } from 'react';
import styles from './DriverPortal.module.css';

const DriverPortal: React.FC = () => {
  const driverInfo = {
    name: 'Bharat Developers',
    vehicle: 'Car Mini',
    licensePlate: 'ABC1234',
    arrivalTime: '5 minutes',
  };

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(interval);
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.container}>
      {progress < 100 ? (
        <>
          <h3 className={styles.findingDriverTitle}>Finding the Best Driver for You</h3>
          <div className={styles.progressBarContainer}>
            <div className={styles.progressBar} style={{ width: `${progress}%` }} />
          </div>
        </>
      ) : (
        <>
          <h2 className={styles.title}>Driver Information</h2>
          <div className={styles.driverInfo}>
            <p><strong>Name:</strong> {driverInfo.name}</p>
            <p><strong>Vehicle:</strong> {driverInfo.vehicle}</p>
            <p><strong>License Plate:</strong> {driverInfo.licensePlate}</p>
            <p><strong>Estimated Arrival:</strong> {driverInfo.arrivalTime}</p>
          </div>
        </>
      )}
      <button className={styles.button}>Cancel Ride</button>
    </div>
  );
};

export default DriverPortal;
