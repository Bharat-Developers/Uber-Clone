"use client";
import React, { useState, useEffect } from 'react';
import styles from './GetARideForm.module.css';


interface Suggestion {
  properties: {
    formatted: string;
   
  };
  
}

const GetARideForm: React.FC = () => {
  const [location1, setLocation1] = useState('');
  const [location2, setLocation2] = useState('');
  const [suggestions1, setSuggestions1] = useState<Suggestion[]>([]); 
  const [suggestions2, setSuggestions2] = useState<Suggestion[]>([]); 

  
  const fetchSuggestions = (location: string | any[], setSuggestions: React.Dispatch<React.SetStateAction<Suggestion[]>>) => {
    if (location.length >= 3) {
      const requestOptions = {
        method: 'GET',
      };

      fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${location}&apiKey=119cd9003a8848678462a64db014f9af`, requestOptions)
        .then(response => response.json())
        .then(result => setSuggestions(result.features))
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
                  onClick={() => setLocation1(suggestion.properties.formatted)}
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
            <ul className="bg-white border border-gray-300 mt-2 rounded w-96">
              {suggestions2.map((suggestion, index) => (
                <li 
                  key={index} 
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => setLocation2(suggestion.properties.formatted)}
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
            <option>For me</option>
            <option>For anyone else</option>
          </select>
        </div>
        <button type="submit" className={styles.button}>Search</button>
      </form>
    </div>
  );
};

export default GetARideForm;
