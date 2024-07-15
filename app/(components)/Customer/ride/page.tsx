'use client'
import React, { useState } from 'react';
import GetARideForm from './GetARideForm';
import Map from './Map';
// import MapWithRouting from '../MapWithRouting'
import styles from './page.module.css';
import Navbar from './navbar/Navbar';
import DriverPortal from './ride-portal/RidePortal';
import L from 'leaflet'
import { Location } from '@/types/Location';
import Link from 'next/link';
import Rideoffer from './Rideoffer';
const Ride: React.FC = () => {
    const [location1, setLocation1] = useState('');
    const [location2, setLocation2] = useState('');
    const [showPrice, setShowPrice] = useState(false);
    const [distance , setDistance] = useState(-1)
    const [coor1, Setcoor1] = useState<Location>({ latitude: 0, longitude: 0 });
    const [coor2, Setcoor2] = useState<Location>({ latitude: 0, longitude: 0 });
    return (
        <><Navbar /><div className={styles.container}>

           {!showPrice && <div className={styles.formContainer}>
                <GetARideForm
                    location1={location1}
                    location2={location2}
                    setLocation1={(loc) => setLocation1(loc)}
                    setLocation2={(loc) => setLocation2(loc)}
                    setShowPrice={()=>setShowPrice(true)}
                    Setcoor1={Setcoor1}
                    Setcoor2={Setcoor2}
                    coor1={coor1}
                    coor2={coor2}
                />

            </div>}
            {showPrice && <Rideoffer
            location1={location1}
            location2={location2}
            coor1={coor1}
            coor2={coor2}
            setShowPrice= {()=>setShowPrice(false)}
            distance={distance}
            />}
            <div className={styles.mapContainer}>
                <Map
                    setLocation1={(loc) => setLocation1(loc)}
                    setLocation2={(loc) => setLocation2(loc)}
                    Setcoor1={Setcoor1}
                    Setcoor2={Setcoor2}
                    coor1={coor1}
                    coor2={coor2}
                    showPrice ={showPrice}
                    setDistance={(dis)=>setDistance(dis)}
                />
            </div>

        </div>
        </>
    );
};


export default Ride;
