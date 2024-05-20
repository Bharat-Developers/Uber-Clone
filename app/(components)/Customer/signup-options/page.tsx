"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './SignupOptions.module.css'; // Import the CSS module

const SignupOptions: React.FC = () => {
    const router = useRouter();

    const handleClose = () => {
        router.push('/'); 
    };

    const handleDriveAndDeliver = () => {
        router.push('/signup?role=drive');
    };

    const handleRide = () => {
        router.push('/signup?role=ride');
    };

    return (
        <div className={styles.container}>
            <button onClick={handleClose} className={styles.closeButton}>✕</button>
            <div className={styles.optionContainer}>
                <button onClick={handleDriveAndDeliver} className={styles.option}>
                    <span>Sign up to drive & deliver</span>
                    <span>→</span>
                </button>
                <button onClick={handleRide} className={styles.option}>
                    <span>Sign up to ride</span>
                    <span>→</span>
                </button>
            </div>
        </div>
    );
};

export default SignupOptions;
