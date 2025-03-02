import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Redirect '/' to '/home'
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/home', req.url));
  }

  return NextResponse.next(); // Allow other routes
}

export const config = {
  matcher: ['/'], // Only check '/'
};
