"use client";

import React from 'react';
import Navbar from '../navbar/Navbar';
import RideOptions from '../RideOptions';
import styles from './FindDriverButton.module.css';

const FindDriverPage = () => {
    return (
        <>
            <Navbar />
            <div className={styles.container}>
                {/* <h1>Find My Driver</h1> */}
                <RideOptions />
            </div>
        </>
    );
};

export default FindDriverPage;
