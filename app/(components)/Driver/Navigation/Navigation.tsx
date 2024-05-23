"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 
import styles from './Navigation.module.css';

const Navbar = () => {
    const pathname = usePathname(); 

    const navLinks = [
        { path: '/Driver/dashboard', label: 'Home' },
        { path: '/Driver/ride', label: 'Ride' },
        { path: '/Driver/drive', label: 'Drive' },
        // { path: '/Driver/login-options', label: 'Login' },
        // { path: '/Driver/signup-options', label: 'SignUp' },
    ];

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
            </ul>
        </nav>
    );
};

export default Navbar;