"use client";
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import DatePicker from 'react-datepicker';
import styles from './signup.module.css';
import 'react-datepicker/dist/react-datepicker.css';

const DriverSignup: React.FC = () => {
    const searchParams = useSearchParams();
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [location, setLocation] = useState<string>('');

    const handleContinue = () => {
        // Handle continue button click
    };

    const handleGoogleSignup = () => {
        // Handle Google signup button click
    };

    const handleAppleSignup = () => { 
        // Handle Apple signup button click
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTermsAccepted(event.target.checked);
    };

    return (
        <div className={styles.container}>
            <div className={styles.formBackground}>
                <h4 className={styles.title}>What's your email?</h4>
                <input
                    type="text"
                    placeholder="Enter your email address"
                    className={styles.input}
                />

                <h4 className={styles.title}>Enter your Password:</h4>
                <input
                    type="password"
                    placeholder="Enter your password"
                    className={styles.input}
                />

                <h4 className={styles.title}>Enter your Name:</h4>
                <input
                    type="text"
                    placeholder="Enter your Name"
                    className={styles.input}
                />

                <h4 className={styles.title}>Phone Number:</h4>
                <input
                    type="text"
                    placeholder="Enter your Number"
                    className={styles.input}
                />

                <h4 className={styles.title}>Enter your DOB:</h4>
                <DatePicker
                    selected={startDate}
                    onChange={(date: Date) => setStartDate(date)}
                    dateFormat="dd/MM/yyyy"
                    className={styles.datePicker}
                    placeholderText="Enter your date of birth"
                />

                {/* <h4 className={styles.title}>Enter your Location:</h4>
                <input
                    type="text"
                    placeholder="Enter your location"
                    className={styles.input}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                /> */}

                <div className={styles.terms}>
                    <input
                        type="checkbox"
                        id="terms"
                        name="terms"
                        checked={termsAccepted}
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="terms"> I accept the terms and services</label>
                </div>

                <button
                    className={styles.continueButton}
                    onClick={handleContinue}
                    disabled={!termsAccepted}
                >
                    Continue
                </button>

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

                {/* <p className={styles.footerText}>
                    By proceeding, you consent to get calls, WhatsApp, or SMS messages, including by automated means, from Uber and its affiliates to the number provided.
                </p> */}
            </div>
        </div>
    );
};

export default DriverSignup;

