import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

const ASSET_PUBLIC = new Set<`/${string}`>([])
const AUTH_PAGES = new Set<`/${string}`>([
  '/login',
  '/register',
  '/forgot-password',
  '/update-password',
])

function isPublic(req: NextRequest) {
  const { pathname } = new URL(req.url)
  if (pathname.startsWith('/_next')) return true
  if (pathname.startsWith('/images')) return true
  if (pathname.startsWith('/assets')) return true
  if (pathname === '/favicon.ico') return true
  return false
}

export async function middleware(req: NextRequest) {
  let supabaseResponse = NextResponse.next({ request: req })

  if (isPublic(req)) return supabaseResponse

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request: req })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = new URL(req.url)

  if (user && AUTH_PAGES.has(pathname as `/${string}`)) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  if (!user && !AUTH_PAGES.has(pathname as `/${string}`)) {
    const loginUrl = new URL('/login', req.url)
    const target = pathname === '/login' || pathname === '/register' ? '/' : pathname
    loginUrl.searchParams.set('redirectTo', target)
    return NextResponse.redirect(loginUrl)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images|assets|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js)).*)',
  ],
}
