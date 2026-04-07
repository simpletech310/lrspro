import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { checkCsrf } from '@/lib/security'

export async function POST(request: NextRequest) {
  const csrfError = checkCsrf(request)
  if (csrfError) return csrfError

  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (!profile || profile.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await request.json().catch(() => ({}))
  const paths = body.paths as string[] | undefined

  if (paths && Array.isArray(paths)) {
    paths.forEach(p => revalidatePath(p))
  } else {
    revalidatePath('/')
    revalidatePath('/about')
    revalidatePath('/services')
    revalidatePath('/contact')
  }

  return NextResponse.json({ success: true, revalidated: paths || ['all'] })
}
