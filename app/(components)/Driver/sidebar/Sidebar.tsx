"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 
import styles from './Sidebar.module.css';

const Navbar = () => {
    const pathname = usePathname(); 

    const navLinks = [
        { path: '/Driver/dashboard', label: 'Home' },
        { path: '/Driver/active', label: 'Go Active' },
        { path: '/Driver/statistics', label: 'Statistics' },
        { path: '/Driver/earnings', label: 'Earnings' },
        { path: '/Driver/signout', label: 'Sign Out' },
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