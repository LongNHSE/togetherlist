import { NextRequest, NextResponse } from 'next/server';
import { getCookies } from 'cookies-next';
import { cookies } from 'next/headers';

const publicPath = [
  '/test',
  '/sidebar/*',
  '/test',
  '/sidebar',
  '/account-settings',
  '/profile',
  '/home',
  '/home/*',
  '/',
  '/auth',
  '/auth/login',
  '/auth/signup',
  '/auth/forgot-password',
  '/auth/reset-password',
];
const authPath = ['/auth'];
const privatePath = ['/workspace/*'];

export function middleware(req: NextRequest) {
  const cookiess = getCookies({ cookies });

  // Get the path of the request
  const path = req.nextUrl.pathname;

  // Check if the path is a public path
  // const isPublicRoute = publicPath.includes(path);
  const isPublicRoute = publicPath.some((publicPath) => {
    const regex = new RegExp(`^${publicPath.replace('*', '.*')}$`);
    return regex.test(path);
  });

  // Check if the path is a auth path
  const isAuthRoute = authPath.some((authPath) => {
    const regex = new RegExp(`^${authPath.replace('*', '.*')}$`);
    return regex.test(path);
  });

  //Get cookie
  const cookie = cookiess?.clientSessionToken;

  if (!isPublicRoute && !cookie) {
    return NextResponse.redirect(new URL('/auth', req.nextUrl));
  }
  if (isAuthRoute && cookie) {
    return NextResponse.redirect(new URL('/workspace', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
