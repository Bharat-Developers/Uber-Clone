'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import styles from './Navbar.module.css';
import FindDriverButton from '../find-driver/FindDriverButton';  // Import the FindDriverButton component

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter(); // Initialize the router

  const navLinks = [
    { path: '/Customer/ride', label: 'Ride' },
  ];

  const handleFindDriverClick = () => {
    router.push('/Customer/find-driver');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">Uber</Link>
      </div>
      <ul className={styles.navLinks}>
        {navLinks.map((link) => (
          <li key={link.path} className={pathname === link.path ? styles.active : ''}>
            <Link href={link.path}>{link.label}</Link>
          </li>
        ))}
        <li>
          <FindDriverButton onClick={handleFindDriverClick} />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
