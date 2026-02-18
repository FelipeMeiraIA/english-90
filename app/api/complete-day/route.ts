import { createClient } from '@/lib/supabase/server'
import { getSpacedDates, todayInBrasilia } from '@/lib/utils'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const {
    dayNumber, sentence1, sentence2,
    idea1, idea2, connectedSentence, miniParagraph,
    fluency, confidence, difficulty,
    timeSpentMinutes, progressId,
    item1Type, item1, item1Example,
    item2Type, item2, item2Example,
  } = body

  const today = todayInBrasilia()

  // Upsert progress
  const { data: prog, error: progErr } = await supabase
    .from('user_day_progress')
    .upsert({
      id: progressId,
      user_id: user.id,
      day_number: dayNumber,
      date: today,
      sentences: [sentence1, sentence2],
      idea_1: idea1,
      idea_2: idea2,
      connected_sentence: connectedSentence,
      mini_paragraph: miniParagraph,
      scores: { fluency, confidence, difficulty },
      time_spent_minutes: timeSpentMinutes,
      production_done: true,
      connection_done: true,
      new_learning_done: true,
      review_done: true,
      completed: true,
    })
    .select()
    .single()

  if (progErr) return NextResponse.json({ error: progErr.message }, { status: 500 })

  // Check if items already created for this day
  const { data: existingItems } = await supabase
    .from('user_items')
    .select('id')
    .eq('user_id', user.id)
    .eq('source_day_number', dayNumber)

  if (!existingItems?.length) {
    const items = [
      {
        user_id: user.id,
        source_day_number: dayNumber,
        item_type: item1Type,
        term: item1,
        meaning: `${item1Type}: ${item1}`,
        example: sentence1 || item1Example,
      },
      {
        user_id: user.id,
        source_day_number: dayNumber,
        item_type: item2Type,
        term: item2,
        meaning: `${item2Type}: ${item2}`,
        example: sentence2 || item2Example,
      },
    ]

    const { data: insertedItems, error: itemErr } = await supabase
      .from('user_items')
      .insert(items)
      .select()

    if (itemErr) return NextResponse.json({ error: itemErr.message }, { status: 500 })

    const reviews = insertedItems!.flatMap(item =>
      getSpacedDates(today).map(({ tag, date }) => ({
        user_id: user.id,
        user_item_id: item.id,
        due_date: date,
        interval_tag: tag,
        done: false,
      }))
    )

    await supabase.from('spaced_reviews').insert(reviews)
  }

  return NextResponse.json({ success: true, progress: prog })
}
