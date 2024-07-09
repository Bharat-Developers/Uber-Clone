'use client'
import React, { useState } from 'react';
import GetARideForm from './GetARideForm';
import Map from './Map';
// import MapWithRouting from '../MapWithRouting'
import styles from './page.module.css';
import Navbar from './navbar/Navbar';
import DriverPortal from './ride-portal/RidePortal';
const Ride: React.FC = () => {
    const [location1, setLocation1] = useState('');
    const [location2, setLocation2] = useState('');
    return (
        <><Navbar /><div className={styles.container}>

            <div className={styles.formContainer}>
                <GetARideForm
                 location1={location1}
                 location2={location2}
                 setLocation1={(loc) => setLocation1(loc)}
                 setLocation2={(loc)=>setLocation2(loc)}
                />

            </div>
            <div className={styles.mapContainer}>
                <Map 
                 setLocation1={(loc) => setLocation1(loc)}
                 setLocation2={(loc)=>setLocation2(loc)}
                 />
            </div>

        </div></>
    );
};


export default Ride;
