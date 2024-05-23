import React from 'react';
// import GetARideForm from '../GetARideForm';
// import Map from '../Map';
import MapWithRouting from '../MapWithRouting'
import styles from './page.module.css';
import Navbar from '../Navbar';
const Ride: React.FC = () => {
    return (
        <><Navbar /><div className={styles.container}>

            <div className={styles.formContainer}>
                {/* <GetARideForm /> */}

            </div>
            <div className={styles.mapContainer}>
                <MapWithRouting />
            </div>

        </div></>
    );
};


export default Ride;
