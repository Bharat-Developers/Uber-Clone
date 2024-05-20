"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './LoginOptions.module.css'; // Import the CSS module

const LoginOptions: React.FC = () => {
    const router = useRouter();

    const handleClose = () => {
        router.push('/'); // Redirect to home or any other page you prefer
    };

    const handleDriveAndDeliver = () => {
        router.push('/login?role=drive');
    };

    const handleRide = () => {
        router.push('/login?role=ride');
    };

    return (
        <div className={styles.container}>
            <button onClick={handleClose} className={styles.closeButton}>✕</button>
            <div className={styles.optionContainer}>
                <button onClick={handleDriveAndDeliver} className={styles.option}>
                    <span>Sign in to drive & deliver</span>
                    <span>→</span>
                </button>
                <button onClick={handleRide} className={styles.option}>
                    <span>Sign in to ride</span>
                    <span>→</span>
                </button>
            </div>
        </div>
    );
};

export default LoginOptions;
