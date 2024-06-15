// pages/index.js
import styles from './Earnings.module.css';
import Head from 'next/head';
import Sidebar from '../../sidebar/Sidebar'; // Adjust the path if necessary
import Image from 'next/image';

export default function Earnings() {
  return (
    <>
      <Sidebar />
      <Head>
        <title>How much can drivers make with Uber?</title>
        <meta name="description" content="Learn how much you can make driving with Uber." />
      </Head>
      <div className={styles.container} style={{ marginLeft: '220px' }}>
        <Image src='/img.jpg' alt='driver' /> {/*Changed <img> -> next <Image> */}
        <h1>How much can drivers make with Uber?</h1>
        <p>The money you make driving with the Uber app depends on when, where, and how often you drive. Find out how your fares are calculated and learn about promotions, which can help increase your earnings.</p>
        <button className={styles.signupButton}>See your Earnings</button>
      </div>
    </>
  );
}
