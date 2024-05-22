"use client";
import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import validator from 'validator';
import styles from './Login.module.css';

const Login: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const searchParams = useSearchParams();
    const role = searchParams ? searchParams.get('role') : null;
    const router = useRouter();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        setErrorMessage('');
    };

    const handleContinue = () => {
        if (validator.isEmail(inputValue) || validator.isMobilePhone(inputValue, 'any', { strictMode: false })) {
            router.push('/Customer/progress');
        } else {
            setErrorMessage('Please enter a valid email or phone number.');
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signIn('google', { callbackUrl: role === '/Customer/ride' ? '/Customer/progress' : '/Customer/progress' });
        } catch (error) {
            console.error('Google login failed', error);
        }
    };

    const handleAppleLogin = async () => {
        console.log('Apple login clicked');
    };

    const handleFindAccount = async () => {
        console.log('Find my account clicked');
    };

    const handleQRLogin = async () => {
        console.log('Log in with QR code clicked');
    };

    return (
        <div className={styles.container}>
            <div className={styles.formBackground}>
                <h4 className={styles.title}>What's your phone number or email?</h4>
                <input
                    type="text"
                    placeholder="Enter your phone number or email address"
                    value={inputValue}
                    onChange={handleInputChange}
                    className={styles.input}
                />
                <button className={styles.continueButton} onClick={handleContinue}>
                    Continue
                </button>
                {errorMessage && (
                    <div className={styles.errorMessage}>
                        {errorMessage}
                    </div>
                )}
                <div className={styles.orContainer}>
                    <hr className={styles.hr} />
                    <span className={styles.orText}>or</span>
                    <hr className={styles.hr} />
                </div>
                <button className={styles.googleButton} onClick={handleGoogleLogin}>
                    <img src="/google-logo.png" alt="Google Logo" className={styles.icon} />
                    Continue with Google
                </button>
                <button className={styles.appleButton} onClick={handleAppleLogin}>
                    <img src="/apple-logo.png" alt="Apple Logo" className={styles.icon} />
                    Continue with Apple
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
                {/* <button className={styles.qrButton} onClick={handleQRLogin}>
                    <img src="/qr-icon.png" alt="QR Icon" className={styles.icon} />
                    Log in with QR code
                </button> */}
                <p className={styles.footerText}>
                    By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates to the number provided.
                </p>
            </div>
        </div>
    );
};

export default Login;
