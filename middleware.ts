import { NextRequest, NextResponse } from 'next/server';
import { getCookies } from 'cookies-next';
import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';

const publicPath = [
  '/test',
  '/sidebar/*',
  '/test',
  '/account-settings',
  '/modal',
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
const adminPath = ['/admin/*', '/admin'];

interface DecodedToken {
  role: string;
}

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

  const isAdminRoute = matchPath(adminPath, path);

  //Get cookie
  const cookie = cookiess?.clientSessionToken;

  if (!isPublicRoute && !cookie) {
    return NextResponse.redirect(new URL('/auth', req.nextUrl));
  }

  if (cookie) {
    const decoded = jwtDecode<DecodedToken>(cookie);
    if (isAuthRoute) {
      return NextResponse.redirect(new URL('/workspace', req.nextUrl));
    }
    if (isAdminRoute && decoded.role !== 'admin') {
      return NextResponse.redirect(new URL('/workspace', req.nextUrl));
    }
  }

  return NextResponse.next();
}

function matchPath(paths: string[], currentPath: string): boolean {
  return paths.some((path) => {
    const regex = new RegExp(`^${path.replace('*', '.*')}$`);
    return regex.test(currentPath);
  });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
