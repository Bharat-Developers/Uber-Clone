'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import styles from './WhatNeed.module.css'

export default function WhatNeed() {
    const [selected, setSelected] = useState('')
    const handleButton = (content: string) => {
        setSelected(content)

    }
    const renderContent = () => {
        if (selected === 'content1') {
            return (
                <div className={styles.flexContainer}>
                    <div className={styles.flexItem}>
                        <Image src="/requirement.jpg" height={25} width={25} alt='requirements'></Image>
                        <h1 className={styles.headings}> Requirements</h1>
                        <ul>
                            <li>Be at least 18 years old</li>
                            <li>Clear a background screening</li>
                        </ul>
                    </div>
                    <div className={styles.flexItem}>
                    <Image src="/document.jpg" height={25} width={25} alt='requirements'></Image>
                        <h1 className={styles.headings}> Documents</h1>
                        <ul>
                            <li>Valid driver's license (private or commercial), if you plan to drive</li>
                            <li>Proof of residency in your city, state or province</li>
                            <li>Car documents such as commercial insurance, vehicle registration certificate, permit</li>
                        </ul>
                    </div>
                    <div className={styles.flexItem}>
                    <Image src="/documentCheck.jpg" height={25} width={25} alt='requirements'></Image>
                        <h1 className={styles.headings}> Sign Up</h1>
                        <ul>
                            <li>Visit the nearest Partner Seva Kendra in your city</li>
                            <li>Submit documents and photo</li>
                            <li>Provide information for a background check</li>
                        </ul>
                    </div>
                  
                </div>

            );
        } else if (selected === 'content2') {
            return (
                <div className={styles.flexContainer}>
                <div className={styles.flexItem}>
                    <Image src="/requirement.jpg" height={25} width={25} alt='requirements'></Image>
                    <h1 className={styles.headings}> Requirements</h1>
                    <ul>
                        <li>Be at least 18 years old</li>
                        <li>Clear a background screening</li>
                    </ul>
                </div>
                <div className={styles.flexItem}>
                <Image src="/document.jpg" height={25} width={25} alt='requirements'></Image>
                    <h1 className={styles.headings}> Documents</h1>
                    <ul>
                        <li>Valid driver's license</li>
                        <li>Proof of residency in your city, state or province like Pan Card</li>
                        <li>Vehicle documents such as insurance, vehicle registration certificate</li>
                    </ul>
                </div>
                <div className={styles.flexItem}>
                <Image src="/documentCheck.jpg" height={25} width={25} alt='requirements'></Image>
                    <h1 className={styles.headings}> Sign Up</h1>
                    <ul>
                        <li>Visit the nearest Partner Seva Kendra in your city</li>
                        <li>Submit documents and photo</li>
                        <li>Provide information for a background check</li>
                    </ul>
                </div>
              
            </div>
            );
        }
        return null;
    };
    return (
        <div className={styles.main}>
            <h1 className={styles.heading}>Here's what you need to sign up</h1>

            <div className={styles.change}>
                <button onClick={() => handleButton('content1')}>To drive</button> &nbsp; &nbsp;
                <button onClick={() => handleButton('content2')}>To deliver</button>
            </div>
            <br></br>
            <div className={styles.contentContainer}>
                {renderContent()}
            </div>

        </div>
    )
}
