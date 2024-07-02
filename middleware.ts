import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import cookie from 'cookie';

export async function middleware(request: NextRequest) {
    console.log('+++MIDDLEWARE HERE++++');
    const { pathname } = request.nextUrl;
    console.log('pathname is: ', pathname);

    // Define paths that require authentication
    const protectedPaths = ['/Customer/ride', '/Customer/ride/driver-portal', '/Driver/dashboard', '/Driver/Trip_portal'];
    const driverOrCustomer = pathname.includes('Customer') ? true : false;
    console.log('doc: ', driverOrCustomer);

    // Parse cookies from the request headers
    const cookies = cookie.parse(request.headers.get('cookie') || '');
    let token = null;
    if (driverOrCustomer) {
        console.log('in C token');
        token = cookies.Ctoken;
    }
    else {
        console.log('in D token');
        token = cookies.Dtoken;
    }

    console.log('token here is: ', token);

    // Check if the path is protected and token is not present
    if (protectedPaths.includes(pathname) && !token) {
        console.log('No token found. Redirecting to login.');
        if (driverOrCustomer) {
            return NextResponse.redirect(new URL('/Customer/login', request.url));
        }
        else {
            return NextResponse.redirect(new URL('/Driver/HomePage', request.url));
        }
    }

    // If there is a token, validate it
    if (token) {
        try {

            const response = await fetch(`http://localhost:5001/api/${driverOrCustomer ? 'rider' : 'driver'}/auth`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            });

            if (response.status === 401) {
                console.log('Token is invalid or expired. Redirecting to login.');
                if (driverOrCustomer) {
                    return NextResponse.redirect(new URL('/Customer/login', request.url));
                }
                else {
                    return NextResponse.redirect(new URL('/Driver/HomePage', request.url));
                }
            }

            console.log('Token is valid.');
        } catch (error) {
            console.error('Authentication error:', error);
            if (driverOrCustomer) {
                return NextResponse.redirect(new URL('/Customer/login', request.url));
            }
            else {
                return NextResponse.redirect(new URL('/Driver/HomePage', request.url));
            }

        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/Customer/ride', '/Customer/ride/driver-portal', '/Driver/dashboard', '/Driver/Trip_portal']
};
