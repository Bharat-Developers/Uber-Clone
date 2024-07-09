"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 
import styles from './Navigation.module.css';

const Navbar = () => {
    const pathname = usePathname(); 

    const navLinks = [
        { path: '/Driver/HomePage', label: 'Home' },
        { path: '/Customer/login', label: 'Ride' },
        { path: '/Driver/dashboard', label: 'Drive' },
        { path: '/Driver/login', label: 'Login' },
        { path: '/Driver/signup', label: 'SignUp' },
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