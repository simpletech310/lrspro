import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll() { return request.cookies.getAll() }, setAll(s) { s.forEach(({name,value}) => request.cookies.set(name,value)); supabaseResponse = NextResponse.next({ request }); s.forEach(({name,value,options}) => supabaseResponse.cookies.set(name,value,options)) } } }
  )
  const { data: { user } } = await supabase.auth.getUser()
  const pathname = request.nextUrl.pathname

  if (pathname.startsWith('/portal')) {
    if (!user) return NextResponse.redirect(new URL('/login?redirect=' + pathname, request.url))
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
    if (!profile || (profile.role !== 'client' && profile.role !== 'admin'))
      return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if (pathname.startsWith('/dashboard')) {
    if (!user) return NextResponse.redirect(new URL('/login?redirect=' + pathname, request.url))
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
    if (!profile || profile.role === 'client') return NextResponse.redirect(new URL('/portal/dashboard', request.url))
    if (pathname.startsWith('/dashboard/admin') && profile.role !== 'admin')
      return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return supabaseResponse
}

export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico|api/webhooks).*)'] }