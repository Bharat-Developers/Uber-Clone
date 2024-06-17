"use client";
import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import validator from 'validator';
import styles from './Login.module.css';
import Image from 'next/image';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const searchParams = useSearchParams();
    const role = searchParams ? searchParams.get('role') : null;
    const router = useRouter();

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        setErrorMessage('');
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        setErrorMessage('');
    };

    const handleContinue = async () => {
        if (validator.isEmail(email) && password.length > 0) {
            try {
                const response = await fetch('http://localhost:5001/api/rider/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    console.log("Login successful", data);
                    console.log(data.token)
                    sessionStorage.setItem('token', data.token)
                    // Redirect to the progress page or another page as needed
                    router.push('/Customer/progress');
                } else {
                    setErrorMessage(data.msg || 'Something went wrong. Please try again.');
                }
            } catch (error) {
                console.error('Error logging in:', error);
                setErrorMessage('Something went wrong. Please try again.');
            }
        } else {
            setErrorMessage('Please enter a valid email and password.');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formBackground}>
                <h4 className={styles.title}>What&#39;s your email?</h4>
                <input
                    type="text"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={handleEmailChange}
                    className={styles.input}
                />
                <h4 className={styles.title}>Enter your password:</h4>
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={handlePasswordChange}
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
                <div className={styles.orContainer}>
                    <hr className={styles.hr} />
                    <span className={styles.orText}>or</span>
                    <hr className={styles.hr} />
                </div>
                <button className={styles.findAccountButton} >
                    {/* <Image src="/search-icon.png" alt="Search Icon" className={styles.icon} /> */}
                    Find my account
                </button>
                <p className={styles.footerText}>
                    By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates to the number provided.
                </p>
            </div>
        </div>
    );
};

export default Login;
