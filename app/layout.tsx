import './globals.css';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>

                    {children}
            </body>
        </html>
    );
}
