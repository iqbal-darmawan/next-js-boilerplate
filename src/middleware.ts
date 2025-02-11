import { getToken } from "next-auth/jwt"
import withAuth from "next-auth/middleware"
import { NextRequest, NextResponse } from "next/server"

export default withAuth(async function middleware(request: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET
  const token = await getToken({ req: request, secret })

  const { pathname } = request.nextUrl

  if (!token && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!api|login|forgot-password|reset-password|_next/static|_next/image|favicon.ico|robots.txt|images|uploads).*)'
  ]
}