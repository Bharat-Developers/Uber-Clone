import React from 'react'
import Image from 'next/image'
import styles from './WhyDriver.module.css'

function WhyDrive() {
    return (
        <div className={styles.container}>
            <div className={styles.text}>
                Why Drive with us ? <br></br><br></br>
                <Image src='/img.jpg' height={1400} width={1400} alt='img'></Image>
            </div>
            <br></br>
            <div className={styles.flexbox}>
                <div className={styles.box}>
                    <Image src='/calendar.jpg' height={25} width={25} alt='calendar'></Image><br></br>
                    <h1 className={styles.headings}>Set your own hours</h1>
                    You decide when and how often you drive.
                </div>

                <div className={styles.box}>
                <Image src='/money.jpg' height={25} width={25} alt='money'></Image><br></br>
                    <h1 className={styles.headings}>Get paid fast</h1>
                    Weekly payments in your bank account.</div>

                <div className={styles.box}>
                <Image src='/support.jpg' height={25} width={25} alt='support'></Image><br></br>
                    <h1 className={styles.headings}>Get support at every turn
                    </h1>If there's anything that you need, you can reach us anytime.
                </div>
            </div>

        </div>
    )
}

export default WhyDrive
