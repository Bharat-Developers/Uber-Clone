"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';
import validator from 'validator';
import styles from './signup.module.css';
import 'react-datepicker/dist/react-datepicker.css';

const Signup: React.FC = () => {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        setErrorMessage('');
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        setErrorMessage('');
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        setErrorMessage('');
    };

    const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNumber(event.target.value);
        setErrorMessage('');
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTermsAccepted(event.target.checked);
    };

    const handleContinue = async () => {
        console.log('terms accpetd: ', termsAccepted);
        if (!(validator.isEmail(email))) {
            setErrorMessage("please enter a valid email")
        }
        else if (password.length < 6) {
            setErrorMessage("password must contain at least 6 characters")
        }
        else if (name.length == 0) {
            setErrorMessage("enter a name")
        }
        else if (!(validator.isMobilePhone(number, 'any', { strictMode: false }))) {
            setErrorMessage("enter a valid phone number")
        }
        else if (!(startDate)) {
            setErrorMessage("Enter a valid DOB")
        }
        else if (!(termsAccepted)) {
            setErrorMessage("Kindly accept the terms and conditions")
        }
        else {
            try {
                const formData = {
                    email,
                    password,
                    name,
                    number,
                    startDate,
                    termsAccepted
                }
                const response = await fetch(`${process.env.NEXT_PUBLIC_LINK}:5001/api/rider/signUp`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                console.log("User Created", formData)
                console.log('----: ', response);
                router.push('/Customer/login');
            }
            catch (error) {
                console.log('--error occured--: ', error);
                // OR :- setErrorMessage(response.msg)
            }
        }
        // } else {
        //     setErrorMessage('Please fill all fields correctly and accept the terms.');
        // }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formBackground}>
                <h4 className={styles.title}>What&apos;s your email?</h4>
                <input
                    type="text"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={handleEmailChange}
                    className={styles.input}
                />

                <h4 className={styles.title}>Enter your Password:</h4>
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={handlePasswordChange}
                    className={styles.input}
                />

                <h4 className={styles.title}>Enter your Name:</h4>
                <input
                    type="text"
                    placeholder="Enter your Name"
                    value={name}
                    onChange={handleNameChange}
                    className={styles.input}
                />

                <h4 className={styles.title}>Phone Number:</h4>
                <input
                    type="text"
                    placeholder="Enter your Number"
                    value={number}
                    onChange={handleNumberChange}
                    className={styles.input}
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
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="terms"> I accept the terms and services</label>
                </div>

                <button
                    className={styles.continueButton}
                    style={termsAccepted ? { color: "" } : { backgroundColor: "grey", cursor: "not-allowed" }}
                    onClick={handleContinue}
                    disabled={!termsAccepted}
                >
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
        </div >
    );
};

export default Signup;
