import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const userRole = req.cookies.get('role')?.value; // Get role from cookies
  const { pathname } = req.nextUrl;

  // Protect '/' — only allow admin
  if (pathname === '/' && userRole !== 'admin') {
    return NextResponse.redirect(new URL('/home', req.url));
  }

  // Prevent admin from accessing '/home'
  if (pathname === '/home' && userRole === 'admin') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // If no role, always redirect to '/home'
  if (!userRole && pathname === '/') {
    return NextResponse.redirect(new URL('/home', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/home', '/login'], // Protect these routes
};
