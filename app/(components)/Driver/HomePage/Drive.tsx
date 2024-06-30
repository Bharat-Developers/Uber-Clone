import React from 'react';
import Image from 'next/image';
import styles from './Drive.module.css'
import Link from 'next/link';
import Navigation from '../Navigation/Navigation'
export default function Drive() {
  return (<>
    <Navigation />
    <div className={styles.container} >
      <div className={styles.textcontainer}>
        <p className={styles.bold}>Drive when you <br></br> want, make what <br></br> you need</p>

        <p className={styles.supportingtext}>
          Earn on your own schedule.<br></br><br></br> </p>
        <div className={styles.buttonaccount}>
          <Link href='/Driver/signup/Name'>  <button type='submit' className={styles.btn}>Get Started</button>     </Link>
          <p className={styles.underline}>Already have an account? <Link href='/Driver/login'>Sign in</Link></p>
        </div>
      </div>
      <div className={styles.imgcontainer}>
        <Image src="/img1.jpg" height={500} width={500} alt="Image loading" />
      </div>

    </div>
  </>
  );
}
