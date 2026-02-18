import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { reviewId } = await request.json()
  if (!reviewId) return NextResponse.json({ error: 'Missing reviewId' }, { status: 400 })

  const { error } = await supabase
    .from('spaced_reviews')
    .update({ done: true, done_at: new Date().toISOString() })
    .eq('id', reviewId)
    .eq('user_id', user.id)  // RLS but double-check

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
