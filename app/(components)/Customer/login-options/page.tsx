"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './LoginOptions.module.css';

const LoginOptions: React.FC = () => {
    const router = useRouter();

    const handleClose = () => {
        router.push('/'); 
    };

    const handleDriveAndDeliver = () => {
        router.push('/Customer/login?role=drive');
    };

    const handleRide = () => {
        router.push('/Customer/login?role=ride');
    };

    return (
        <div className={styles.container}>
            <button onClick={handleClose} className={styles.closeButton}>✕</button>
            <div className={styles.optionContainer}>
                <button onClick={handleDriveAndDeliver} className={styles.option}>
                    <span>Sign in to drive & deliver</span>
                    <span> →</span>
                </button>
                <button onClick={handleRide} className={styles.option}>
                    <span>Sign in to ride </span>
                    <span> →</span>
                </button>
            </div>
        </div>
    );
};

export default LoginOptions;
