import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import cookie from 'cookie';

export async function middleware(request: NextRequest) {
    console.log('+++MIDDLEWARE HERE++++');
    const { pathname } = request.nextUrl;

    // Parse cookies from the request headers
    const cookies = cookie.parse(request.headers.get('cookie') || '');
    const token = cookies.token;

    // Define paths that require authentication
    const protectedPaths = ['/Customer/ride'];

    // Check if the path is protected and token is not present
    if (protectedPaths.includes(pathname) && !token) {
        console.log('No token found. Redirecting to login.');
        return NextResponse.redirect(new URL('/Customer/login', request.url));
    }

    // If there is a token, validate it
    if (token) {
        try {
            const response = await fetch('http://localhost:5001/api/rider/authenticate', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 401) {
                console.log('Token is invalid or expired. Redirecting to login.');
                return NextResponse.redirect(new URL('/Customer/login', request.url));
            }

            console.log('Token is valid.');
        } catch (error) {
            console.error('Authentication error:', error);
            return NextResponse.redirect(new URL('/Customer/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/Customer/ride']
};
