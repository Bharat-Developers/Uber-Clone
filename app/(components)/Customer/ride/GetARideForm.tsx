"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Modal from 'react-modal';
import styles from './GetARideForm.module.css';

interface Suggestion {
  properties: {
    formatted: string;
  };
}

const GetARideForm: React.FC = () => {
  const router = useRouter();
  const [location1, setLocation1] = useState('');
  const [location2, setLocation2] = useState('');
  const [suggestions1, setSuggestions1] = useState<Suggestion[]>([]);
  const [suggestions2, setSuggestions2] = useState<Suggestion[]>([]);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [progress, setProgress] = useState(0);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    if (typeof document !== 'undefined' && document.querySelector('#__next')) {
      Modal.setAppElement('#__next');
    }
  }, []);

  const fetchSuggestions = (location: string, setSuggestions: React.Dispatch<React.SetStateAction<Suggestion[]>>) => {
    if (location.length >= 3) {
      const requestOptions = {
        method: 'GET',
      };

      fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${location}&apiKey=119cd9003a8848678462a64db014f9af`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log('API response:', result); // Check the API response in the console
          setSuggestions(result.features);
        })
        .catch(error => console.log('error', error));
    } else {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    fetchSuggestions(location1, setSuggestions1);
  }, [location1]);

  useEffect(() => {
    fetchSuggestions(location2, setSuggestions2);
  }, [location2]);

  useEffect(() => {
    console.log('Suggestions for location1:', suggestions1);
  }, [suggestions1]);

  useEffect(() => {
    console.log('Suggestions for location2:', suggestions2);
  }, [suggestions2]);

  const handleSelectLocation1 = (formatted: string) => {
    console.log('Selected Location1:', formatted); // Add a log to check if this is called
    setLocation1(formatted);
    setSuggestions1([]);
  };

  const handleSelectLocation2 = (formatted: string) => {
    console.log('Selected Location2:', formatted); // Add a log to check if this is called
    setLocation2(formatted);
    setSuggestions2([]);
  };

  const handleConfirm = () => {
    setShowProgressBar(true);
    setProgress(0);

    const updateProgress = () => {
      setProgress(prevProgress => {
        const newProgress = prevProgress + 1;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setShowOtpModal(true); // Show OTP modal when progress reaches 100%
        }
        return newProgress;
      });
    };

    const progressInterval = setInterval(updateProgress, 100);
  };

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  useEffect(() => {
    if (showOtpModal && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [showOtpModal, countdown]);

  const handleResendOtp = () => {
    setCountdown(30);
    setOtp(['', '', '', '']);
    // Add logic to resend OTP here
  };

  const handleSubmitOtp = () => {
    // Assuming OTP is correct and submission is successful
    router.push('./ride/driver-portal');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Get a ride</h2>
      <form className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.label}></label>
          <input 
            type="text" 
            className={styles.input} 
            value={location1}
            onChange={(e) => setLocation1(e.target.value)}
            placeholder="Pickup location"
          />
          {suggestions1.length > 0 && (
            <ul className="bg-white border border-gray-300 mt-2 rounded w-96">
              {suggestions1.map((suggestion, index) => (
                <li 
                  key={index} 
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSelectLocation1(suggestion.properties.formatted)}
                >
                  {suggestion.properties.formatted}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}></label>
          <input 
            type="text" 
            className={styles.input} 
            value={location2}
            onChange={(e) => setLocation2(e.target.value)}
            placeholder="Dropoff location"
          />
          {suggestions2.length > 0 && (
            <ul className="bg-white border border-gray-300 mt-2 rounded w-[22rem]">
              {suggestions2.map((suggestion, index) => (
                <li 
                  key={index} 
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSelectLocation2(suggestion.properties.formatted)}
                >
                  {suggestion.properties.formatted}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}></label>
          <select className={styles.select}>
            <option>Pickup now</option>
            <option>Schedule for later</option>
          </select>
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}></label>
          <select className={styles.select}>
            <option>Car Max</option>
            <option>Car Mini</option>
            <option>Auto</option>
          </select>
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}></label>
          <select className={styles.select}>
            <option>For me</option>
            <option>For anyone else</option>
          </select>
        </div>
        <button 
          type="button" 
          className={`${styles.button} ${styles.confirmButton}`} 
          onClick={handleConfirm}
        >
          Confirm
        </button>
        {showProgressBar && (
          <div style={{ marginTop: '16px', width: '100%' }}>
            <div style={{ height: '24px', backgroundColor: '#e9ecef', borderRadius: '4px' }}>
              <div
                style={{
                  width: `${progress}%`,
                  height: '100%',
                  backgroundColor: '#28a745',
                  borderRadius: '4px',
                  transition: 'width 0.1s ease-in-out',
                }}
              ></div>
            </div>
            <p>{progress}%</p>
          </div>
        )}
      </form>

      <Modal
        isOpen={showOtpModal}
        onRequestClose={() => setShowOtpModal(false)}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '300px',
            textAlign: 'center',
          },
        }}
      >
        <h2>Enter OTP</h2>
        <div style={{ display: 'flex', justifyContent: 'space-around', margin: '1rem 0' }}>
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              value={digit}
              onChange={(e) => handleOtpChange(e.target.value, index)}
              maxLength={1}
              style={{
                width: '2rem',
                height: '2rem',
                fontSize: '1.5rem',
                textAlign: 'center',
                border: '1px solid #ccc',
                borderRadius: '4px',
                margin: '0 0.25rem' // Adjusted margin for better spacing
              }}
            />
          ))}
        </div>
        <p>{countdown} seconds remaining</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
          <button onClick={handleResendOtp} disabled={countdown > 0}>Resend OTP</button>
          <button onClick={handleSubmitOtp}>Submit OTP</button>
        </div>
      </Modal>
    </div>
  );
};

export default GetARideForm;
