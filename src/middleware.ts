import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If the user is not signed in and the current path is not /login or /signup, redirect to /login
  if (!session && !["/login", "/signup"].includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // If the user is signed in and tries to access /login or /signup, redirect to /
  if (session && ["/login", "/signup"].includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  return res
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

