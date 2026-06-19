import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
  const isLoginPage = req.nextUrl.pathname === '/admin/login'
  const isLoggedIn = !!req.auth
  const hasGatekeeperCookie = req.cookies.has('allow_admin_access')

  // Stealth mode: if accessing admin route and does not have the gatekeeper cookie, show 404
  if (isAdminRoute && !hasGatekeeperCookie) {
    return NextResponse.rewrite(new URL('/404', req.url))
  }

  if (isAdminRoute && !isLoginPage && !isLoggedIn) {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }

  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/admin/dashboard', req.url))
  }
})

export const config = {
  matcher: ['/admin', '/admin/:path*'],
}