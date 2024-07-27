import React from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  return (
    <div className={styles.navbar}>
      <h1>Uber</h1>
      <nav>
        <ul className={styles.navLinks}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/Driver/HomePage">Signout</Link>
          </li>
       
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
