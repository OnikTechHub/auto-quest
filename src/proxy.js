import { NextResponse } from 'next/server'
import { auth } from './lib/auth' 
import { headers } from 'next/headers'


export default async function proxy(request) {
    
  const { pathname } = request.nextUrl;

  try {
    
    const currentHeaders = await headers();
    const session = await auth.api.getSession({
      headers: currentHeaders
    });

    console.log("Better Auth Session:", session);

    if (session) {
      return NextResponse.next();
    }
  } catch (error) {
    console.error("Proxy Auth Error:", error.message);
  }

  return NextResponse.redirect(new URL('/login', request.url));
}

// 
export const config = {
  matcher: ['/my-bookings', '/add-car', '/details/:path*' ],
};