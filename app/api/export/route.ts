import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const format = searchParams.get('format') ?? 'json'

  const [{ data: progress }, { data: items }, { data: reviews }, { data: profile }] = await Promise.all([
    supabase.from('user_day_progress').select('*').eq('user_id', user.id).order('day_number'),
    supabase.from('user_items').select('*').eq('user_id', user.id).order('created_at'),
    supabase.from('spaced_reviews').select('*').eq('user_id', user.id).order('due_date'),
    supabase.from('user_profiles').select('*').eq('id', user.id).single(),
  ])

  if (format === 'csv') {
    const headers = ['day_number','date','completed','fluency','confidence','difficulty','time_spent_minutes','sentences','connected_sentence']
    const rows = (progress ?? []).map((p: any) => [
      p.day_number,
      p.date,
      p.completed,
      p.scores?.fluency ?? '',
      p.scores?.confidence ?? '',
      p.scores?.difficulty ?? '',
      p.time_spent_minutes,
      `"${(p.sentences ?? []).join(' | ').replace(/"/g, '""')}"`,
      `"${(p.connected_sentence ?? '').replace(/"/g, '""')}"`,
    ])
    const csv = [headers.join(','), ...rows.map((r: any[]) => r.join(','))].join('\n')
    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="english90-progress.csv"',
      },
    })
  }

  const data = {
    exported_at: new Date().toISOString(),
    profile: profile?.data,
    progress,
    items,
    reviews,
  }

  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="english90-export.json"',
    },
  })
}
