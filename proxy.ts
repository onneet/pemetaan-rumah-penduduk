import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const isDashboardPath = request.nextUrl.pathname.startsWith('/dashboard');

  if (isDashboardPath && !token) {
    const url = new URL('/login', request.url);
    return NextResponse.redirect(url);
  }

  // Optional: Redirect to dashboard if logged in and accessing landing page or login page
  const isAuthPage = request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/';
  if (isAuthPage && token) {
      const url = new URL('/dashboard', request.url);
      return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/dashboard/:path*'],
};
