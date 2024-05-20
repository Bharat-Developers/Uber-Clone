"use client";
import React from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './Signup.module.css';

const Signup: React.FC = () => {
    const searchParams = useSearchParams();
    const role = searchParams.get('role');

    const handleContinue = () => {
    };
    const handleGoogleSignup = () => {
    };
    const handleAppleSignup = () => { 
    };
    const handleFindAccount = () => { 
    };
    const handleQRSignup = () => { 
    };
    return (
        <div className={styles.container}>
            <div className={styles.formBackground}>
                <h4 className={styles.title}>What's your phone number or email ?</h4>
                <input
                    type="text"
                    placeholder="Enter your phone number or email address"
                    className={styles.input}
                />
                <button className={styles.continueButton} onClick={handleContinue}>Continue</button>
                <div className={styles.orContainer}>
                    <hr className={styles.hr} />
                    <span className={styles.orText}>or</span>
                    <hr className={styles.hr} />
                </div>
                <button className={styles.googleButton} onClick={handleGoogleSignup}>
                    <img src="/google-logo.png" alt="Google Logo" className={styles.icon} />
                    Sign up with Google
                </button>
                <button className={styles.appleButton} onClick={handleAppleSignup}>
                    <img src="/apple-logo.png" alt="Apple Logo" className={styles.icon} />
                    Sign up with Apple
                </button>
                <div className={styles.orContainer}>
                    <hr className={styles.hr} />
                    <span className={styles.orText}>or</span>
                    <hr className={styles.hr} />
                </div>
                <button className={styles.findAccountButton} onClick={handleFindAccount}>
                    <img src="/search-icon.png" alt="Search Icon" className={styles.icon} />
                    Find my account
                </button>
                <button className={styles.qrButton} onClick={handleQRSignup}>
                    <img src="/qr-icon.png" alt="QR Icon" className={styles.icon} />
                    Sign up with QR code
                </button>
                <p className={styles.footerText}>
                    By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates to the number provided.
                </p>
            </div>
        </div>
    );
};

export default Signup;
