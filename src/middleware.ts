import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

const ADMIN_LOGIN_PATH = "/admin/login"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const { pathname } = req.nextUrl

  if (pathname.startsWith(ADMIN_LOGIN_PATH)) {
    return res
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll().map(({ name, value }) => ({ name, value }))
        },
        setAll(cookies) {
          cookies.forEach(({ name, value, options }) => {
            res.cookies.set({ name, value, ...options })
          })
        },
      },
    }
  )
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    const signInUrl = req.nextUrl.clone()
    signInUrl.pathname = ADMIN_LOGIN_PATH
    signInUrl.searchParams.set("callbackUrl", req.nextUrl.pathname + req.nextUrl.search)
    return NextResponse.redirect(signInUrl)
  }

  return res
}

export const config = {
  matcher: ["/admin/:path*"],
}
