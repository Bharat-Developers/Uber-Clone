'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter(); // Initialize the router

  const navLinks = [
    { path: '/Customer/ride', label: 'Ride' },
    { path: '/', label: 'Signout' },
  ];

  const handleSignOut = () => {
    // Add your sign out logic here if needed
    router.push('/'); 
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
        {/* Sign Out button will always be present */}
        <li onClick={handleSignOut} className={styles.signOutButton}></li>
      </ul>
    </nav>
  );
};

export default Navbar;
