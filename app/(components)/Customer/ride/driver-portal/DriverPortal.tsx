// DriverPortal.tsx
"use client"
import React from 'react';
import styles from './DriverPortal.module.css';

const DriverPortal: React.FC = () => {
  const driverInfo = {
    name: 'Bharat Developers',
    vehicle: 'Car Mini',
    licensePlate: 'ABC1234',
    arrivalTime: '5 minutes',
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Driver Information</h2>
      <div className={styles.driverInfo}>
        <p><strong>Name:</strong> {driverInfo.name}</p>
        <p><strong>Vehicle:</strong> {driverInfo.vehicle}</p>
        <p><strong>License Plate:</strong> {driverInfo.licensePlate}</p>
        <p><strong>Estimated Arrival:</strong> {driverInfo.arrivalTime}</p>
      </div>
      <button className={styles.button}>Cancel Ride</button>
    </div>
  );
};

export default DriverPortal;
