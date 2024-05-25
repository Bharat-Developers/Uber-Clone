'use client';
import { useEffect, useState } from 'react';
import styles from './Active.module.css';
import Sidebar from '../sidebar/Sidebar';
const ActiveDrivers = () => {
  const [activeDrivers, setActiveDrivers] = useState(0);

  useEffect(() => {
    const fetchActiveDrivers = async () => {
      try {
        const response = await fetch('/api/active-drivers');
        const data = await response.json();
        setActiveDrivers(data.activeDrivers);
      } catch (error) {
        console.error('Error fetching active customers:', error);
      }
    };

    fetchActiveDrivers();
  }, []);

  return (
    <><Sidebar /><div className={styles.container}>
          <h1>Active Driver</h1>
          <p>Number of active drivers: {activeDrivers}</p>
      </div></>
  );
};

export default ActiveDrivers;
