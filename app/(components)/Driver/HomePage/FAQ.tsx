'use client';
import React, { useState } from 'react';
import styles from './faq.module.css';

const FAQ = () => {
  const [selected, setSelected] = useState<number | null>(null);

  const toggle = (i: number) => {
    if (selected === i) {
      setSelected(null);
    } else {
      setSelected(i);
    }
  };

  return (
    <div>
        <h1 className={styles.heading}>Frequently asked questions </h1>
    <div className={styles.wrapper}>
      <div className={styles.accordion}>
        {data.map((item, i) => (
          <div className={styles.items} key={i}>
            <div className={styles.title} onClick={() => toggle(i)}>
              {item.question}
              <span>{selected === i ? '-' : '+'}</span>
            </div>
            <div className={selected === i ? styles['content-show'] : styles.content}>
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

const data = [
  {
    question: "Can I drive with Uber in my city?",
    answer: "Uber is available in hundreds of cities worldwide. Tap below to see if yours is one of them."
  },
  {
    question: "What are the requirements to drive with Uber?",
    answer: "You must meet the minimum age to drive in your city, have an eligible mode of transportation, and submit required documents, including a valid driver's license. Drivers in the US must also pass a background screening and have at least one year of licensed driving experience."
  },
  {
    question: "Is the Uber platform safe?",
    answer: "Your safety matters to us. Uber has a Global Safety Team dedicated to doing our part to help prevent incidents. Learn more about the safety features in the app, as well as safeguards such as GPS tracking and phone anonymization, by visiting the link below."
  },
  {
    question: "Do I need my own car?",
    answer: "If you want to drive with Uber but need a car, you can get a car from one of our vehicle partners or from a fleet partner in select markets. Please note that vehicle options may vary by city."
  }
];

export default FAQ;
