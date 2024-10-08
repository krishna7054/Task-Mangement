import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token && req.nextUrl.pathname.startsWith('/tasks')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/tasks', '/kanban'],
};
