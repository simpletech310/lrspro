import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return response
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
        },
      },
    }
  )

  try {
    // This will refresh session if expired - required for Server Components
    const { data: { user } } = await supabase.auth.getUser()
    const pathname = request.nextUrl.pathname

    if (pathname.startsWith('/portal')) {
      if (!user) return NextResponse.redirect(new URL('/login?redirect=' + pathname, request.url))
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()
        
      if (!profile || (profile.role !== 'client' && profile.role !== 'admin'))
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    if (pathname.startsWith('/dashboard')) {
      if (!user) return NextResponse.redirect(new URL('/login?redirect=' + pathname, request.url))
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()
        
      if (!profile || profile.role === 'client') 
        return NextResponse.redirect(new URL('/portal/dashboard', request.url))
        
      if (pathname.startsWith('/dashboard/admin') && profile.role !== 'admin')
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  } catch (error) {
    // If anything fails, we return the base response to avoid a 500 error
    console.error('Middleware error:', error)
    return response
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/webhooks).*)'],
}