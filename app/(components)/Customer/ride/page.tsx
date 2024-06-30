'use client'
import React, { useEffect } from 'react';
import GetARideForm from './GetARideForm';
import Map from './Map';
// import MapWithRouting from '../MapWithRouting'
import styles from './page.module.css';
import Navbar from './navbar/Navbar';
import DriverPortal from './driver-portal/DriverPortal';
// import { useAuth } from '../../AuthContext/auth'
import { useRouter } from 'next/navigation';


const Ride: React.FC = () => {
    // const { isAuthenticated } = useAuth();
    // const router = useRouter();

    // useEffect(() => {
    //     console.log('ride: -----running auth here-----');
    //     const checkAuthentication = async () => {
    //         const authStatus = await isAuthenticated();
    //         console.log('ride: authenticated or not: ', authStatus);
    //         if (!authStatus) {
    //             router.push('/Customer/login');
    //         }
    //     };

    //     checkAuthentication();
    // }, [isAuthenticated, router])

    return (

        <>
            <Navbar />
            <div className={styles.container}>

                <div className={styles.formContainer}>
                    <GetARideForm />

                </div>
                <div className={styles.mapContainer}>
                    <Map />
                </div>
                {/* <div className={styles.driverContainer}>
                <DriverPortal />
            </div> */}

            </div>
        </>
    )
};


export default Ride;
