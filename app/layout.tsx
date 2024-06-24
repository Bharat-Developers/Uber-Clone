import './globals.css';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './(components)/Customer/navbar/Navbar';

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Navbar/>
                    {children}
            </body>
        </html>
    );
}
