'use client'
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import styles from './Layout.module.css';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 2000); // Change 5000 to the number of milliseconds you want

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div>
      <Navbar/>
      
      <Sidebar />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
