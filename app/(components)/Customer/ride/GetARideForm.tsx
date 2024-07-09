'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Modal from 'react-modal';
import styles from './GetARideForm.module.css';
import Link from 'next/link';

interface Suggestion {
  properties: {
    formatted: string;
  };
}

interface GetFormProps {
  location1: string
  location2: string
  setLocation1: (location1: string) => void
  setLocation2: (location2: string) => void
}

const GetARideForm: React.FC<GetFormProps> = ({
  location1,
  location2,
  setLocation1,
  setLocation2
}
) => {
  const router = useRouter();
  
  const [suggestions1, setSuggestions1] = useState<Suggestion[]>([]);
  const [suggestions2, setSuggestions2] = useState<Suggestion[]>([]);

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
    // Navigate to find-driver page

    router.push('./ride/ride-portal');
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

        <Link href={{
          pathname: '/Customer/ride/ride-portal',
          query: {
            pickup: location1,
            dropoff: location2
          }
        }}
          className={`${styles.button} ${styles.confirmButton}`}
        >
          Confirm
        </Link>

        {/* <button 
          type="button" 
          className={`${styles.button} ${styles.confirmButton}`} 
          onClick={handleConfirm}
        >
          
        </button> */}
      </form>
    </div>
  );
};

export default GetARideForm;
