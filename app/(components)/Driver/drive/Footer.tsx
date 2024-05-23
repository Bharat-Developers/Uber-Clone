import React from 'react'
import styles from './Footer.module.css'
import Link from 'next/link'

export default function Footer() {
  return (
    <div className={styles.container}>
    <div className={styles.box}>
    <Link href='/Driver/signup'> <button className={styles.centeredbutton}>Sign Up to Drive</button></Link>
    </div>
  </div>
  
  )
}