import { NextResponse, type NextRequest } from "next/server"
import { verifyToken } from "@/lib/auth"

const ADMIN_LOGIN_PATH = "/admin/login"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip authentication for login page and public assets
  if (
    pathname.startsWith(ADMIN_LOGIN_PATH) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname.includes("/studio") ||
    !pathname.startsWith("/admin")
  ) {
    return NextResponse.next()
  }

  // Check for JWT token in cookie
  const token = request.cookies.get("admin-token")?.value

  if (!token) {
    const loginUrl = new URL(ADMIN_LOGIN_PATH, request.url)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Verify JWT token
  const user = await verifyToken(token)
  
  if (!user) {
    // Invalid token, redirect to login
    const response = NextResponse.redirect(new URL(ADMIN_LOGIN_PATH, request.url))
    response.cookies.delete("admin-token")
    return response
  }

  // Valid token, allow access
  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
