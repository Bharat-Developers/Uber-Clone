import './globals.css';
import { ReactNode } from 'react';
import ClientSessionProvider from './(components)/Customer/ClientSessionProvider';
import Navbar from './(components)/Navbar';

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>
                <ClientSessionProvider>
                    <Navbar />
                    {children}
                </ClientSessionProvider>
            </body>
        </html>
    );
}
