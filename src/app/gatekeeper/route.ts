import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const response = NextResponse.redirect(new URL('/admin/login', request.url))
  
  // Set the gatekeeper cookie for 1 hour
  response.cookies.set('allow_admin_access', 'true', {
    path: '/',
    maxAge: 3600, // 1 hour
    httpOnly: true,
    sameSite: 'lax',
  })
  
  return response
}
