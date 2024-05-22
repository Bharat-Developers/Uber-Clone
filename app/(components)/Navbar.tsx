"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import styles from './Navbar.module.css';

const Navbar = () => {
    const pathname = usePathname();
    const { data: session } = useSession();

    const navLinks = [
        { path: '/Customer/ride', label: 'Ride' },
    ];

    if (!session) {
        navLinks.push(
            { path: '/Customer/login-options', label: 'Login' },
            { path: '/Customer/signup-options', label: 'SignUp' }
        );
    }

    const handleSignOut = () => {
        signOut({ callbackUrl: '/Customer/login-options' });
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
                {session && (
                    <>
                        <li className={styles.userName}>Hello, {session.user?.name}</li>
                        <li>
                            <li onClick={handleSignOut} className={styles.signOutButton}>Sign Out</li>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
