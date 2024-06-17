"use client";
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import DatePicker from 'react-datepicker';
import styles from './signup.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import Image from 'next/image';

const DriverSignup: React.FC = () => {
    const searchParams = useSearchParams();
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [number, setnumber] = useState<string>('');

    const handleSubmit = async () => {
        const formData = {
            email,
            password,
            name,
            number,
            dob: startDate,
            termsAccepted
        };

        try {
            const response = await fetch('http://localhost:5001/api/rider/signUp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const res = await response.json();
                console.log(res.token)
                sessionStorage.setItem('token', res.token)
                console.log("User Created", formData);
            } else {
                console.error("Error creating user");
            }
        } catch (error) {
            console.error("Error creating user", error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formBackground}>
                <h4 className={styles.title}>What&#39;s your email?</h4>
                <input
                    type="text"
                    placeholder="Enter your email address"
                    className={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <h4 className={styles.title}>Enter your Password:</h4>
                <input
                    type="password"
                    placeholder="Enter your password"
                    className={styles.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <h4 className={styles.title}>Enter your Name:</h4>
                <input
                    type="text"
                    placeholder="Enter your Name"
                    className={styles.input}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <h4 className={styles.title}>number Number:</h4>
                <input
                    type="text"
                    placeholder="Enter your Number"
                    className={styles.input}
                    value={number}
                    onChange={(e) => setnumber(e.target.value)}
                />

                <h4 className={styles.title}>Enter your DOB:</h4>
                <DatePicker
                    selected={startDate}
                    onChange={(date: Date | null) => setStartDate(date)}
                    dateFormat="dd/MM/yyyy"
                    className={styles.datePicker}
                    placeholderText="Enter your date of birth"
                />

                <div className={styles.terms}>
                    <input
                        type="checkbox"
                        id="terms"
                        name="terms"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                    />
                    <label htmlFor="terms"> I accept the terms and services</label>
                </div>

                <button
                    className={styles.continueButton}
                    onClick={handleSubmit}
                    disabled={!termsAccepted}
                >
                    Continue
                </button>

                <div className={styles.orContainer}>
                    <hr className={styles.hr} />
                    <span className={styles.orText}>or</span>
                    <hr className={styles.hr} />
                </div>

                {/* <p className={styles.footerText}>
                    By proceeding, you consent to get calls, WhatsApp, or SMS messages, including by automated means, from Uber and its affiliates to the number provided.
                </p> */}
            </div>
        </div>
    );
};

export default DriverSignup;
