"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import validator from 'validator';
import styles from './Login.module.css';
import cookie from 'cookie'
// import { useAuth } from '../../AuthContext/auth'

const Login: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    // const { storeToken, isAuthenticated } = useAuth()

    const router = useRouter();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        setErrorMessage('');
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        setErrorMessage('');
    };

    const handleContinue = async () => {
        if (
            (validator.isEmail(inputValue) || validator.isMobilePhone(inputValue, 'any', { strictMode: false })) &&
            password.length >= 6
        ) {
            const email = inputValue // since backend takes in "req.email" as argument, we consider the variable email to contain both email and phone number
            try {
                let emailOrNum;
                validator.isEmail(inputValue) ? emailOrNum = true : emailOrNum = false
                const formData = {
                    email,
                    password,
                    emailOrNum
                }
                const response = await fetch('http://localhost:5001/api/rider/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })

                console.log("User logged in", formData)
                const data = await response.json();
                console.log('data: ', data);
                const token = data.token
                if (response.statusText === "Unauthorized") {
                    setErrorMessage("Wrong email or password")
                }
                else {
                    document.cookie = `Ctoken=${token}; path=/`;
                    router.push('/Customer/ride');
                }
            }
            catch (error) {
                console.log('--error occured--: ', error);
                // OR :- setErrorMessage(data.msg)
            }

        } else {
            setErrorMessage('Please enter a valid email or phone number and a password with at least 6 characters.');
        }
    };


    return (
        <div className={styles.container}>
            <div className={styles.formBackground}>
                <h4 className={styles.title}>What&apos;s your phone number or email?</h4>
                <input
                    type="text"
                    placeholder="Enter your phone number or email address"
                    value={inputValue}
                    onChange={handleInputChange}
                    className={styles.input}
                />
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
                <p className={styles.footerText}>
                    By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates to the number provided.
                </p>
            </div>
        </div>
    );
};

export default Login;
