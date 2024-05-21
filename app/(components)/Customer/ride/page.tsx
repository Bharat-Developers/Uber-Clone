import React from 'react';
import GetARideForm from '../components/GetARideForm';
// import Map from '../components/Map';
import MapWithRouting from '../components/MapWithRouting';
import styles from './page.module.css';

const Ride: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <GetARideForm />
            </div>
            <div className={styles.mapContainer}>
                <MapWithRouting/>
            </div>
        </div>
    );
};

export default Ride;
