'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import styles from './Navbar.module.css';
import FindDriverButton from '../find-driver/FindDriverButton';  // Import the FindDriverButton component

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const router = useRouter(); // Initialize the router

  const navLinks = [
    { path: '/Customer/ride', label: 'Ride' },
  ];

  const handleFindDriverClick = () => {
    router.push('/Customer/find-driver');
  };

  if (!session) {
    navLinks.push(
      { path: '/', label: 'Signout' },
    );
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
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
        {session && (
          <>
            <li className={styles.userName}>Hello, {session.user?.name}</li>
            <li onClick={handleSignOut} className={styles.signOutButton}>Sign Out</li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
