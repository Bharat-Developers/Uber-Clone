import './globals.css';
import { ReactNode } from 'react';
import ClientSessionProvider from './(components)/Customer/ClientSessionProvider';
// import Navbar from './(components)/Customer/Navbar';
import { useNavigate } from 'react-router-dom';

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>
                <ClientSessionProvider>
                    {/* <Navbar /> */}
                    {children}
                </ClientSessionProvider>
            </body>
        </html>
    );
}
