'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { getCurrentDayNumber, todayInBrasilia, itemTypeColor, getSpacedDates } from '@/lib/utils'
import type { PlanDay, UserDayProgress, SpacedReview } from '@/lib/types'

interface ReviewWithItem extends SpacedReview {
  user_items: { term: string; item_type: string; example: string; meaning: string }
}

export default function TodayPage() {
  const router = useRouter()
  const supabase = createClient()

  // Data state
  const [dayNumber, setDayNumber] = useState(0)
  const [planDay, setPlanDay] = useState<PlanDay | null>(null)
  const [progress, setProgress] = useState<UserDayProgress | null>(null)
  const [reviews, setReviews] = useState<ReviewWithItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [completed, setCompleted] = useState(false)

  // Form state
  const [sentence1, setSentence1] = useState('')
  const [sentence2, setSentence2] = useState('')
  const [idea1, setIdea1] = useState('')
  const [idea2, setIdea2] = useState('')
  const [connectedSentence, setConnectedSentence] = useState('')
  const [miniParagraph, setMiniParagraph] = useState('')
  const [fluency, setFluency] = useState(5)
  const [confidence, setConfidence] = useState(5)
  const [difficulty, setDifficulty] = useState(5)

  // Timer
  const [seconds, setSeconds] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimeRef = useRef<number>(Date.now())

  useEffect(() => {
    loadData()
    timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  async function loadData() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/login'); return }

    const { data: prof } = await supabase.from('user_profiles').select('*').eq('id', user.id).single()
    if (!prof?.onboarding_done) { router.push('/onboarding'); return }

    const dn = getCurrentDayNumber(prof.start_date!)
    setDayNumber(dn)

    // Load plan day
    const { data: pd } = await supabase.from('plan_days').select('*').eq('day_number', dn).single()
    setPlanDay(pd)

    // Load existing progress
    const today = todayInBrasilia()
    const { data: prog } = await supabase
      .from('user_day_progress')
      .select('*')
      .eq('user_id', user.id)
      .eq('day_number', dn)
      .single()

    if (prog) {
      setProgress(prog)
      setCompleted(prog.completed)
      setSentence1(prog.sentences?.[0] ?? '')
      setSentence2(prog.sentences?.[1] ?? '')
      setIdea1(prog.idea_1 ?? '')
      setIdea2(prog.idea_2 ?? '')
      setConnectedSentence(prog.connected_sentence ?? '')
      setMiniParagraph(prog.mini_paragraph ?? '')
      setFluency(prog.scores?.fluency ?? 5)
      setConfidence(prog.scores?.confidence ?? 5)
      setDifficulty(prog.scores?.difficulty ?? 5)
    }

    // Load pending reviews (max 10, ordered by due_date)
    const { data: rev } = await supabase
      .from('spaced_reviews')
      .select('*, user_items(term, item_type, example, meaning)')
      .eq('user_id', user.id)
      .eq('done', false)
      .lte('due_date', today)
      .order('due_date', { ascending: true })
      .limit(10)

    setReviews(rev ?? [])
    setLoading(false)
  }

  async function markReviewDone(reviewId: string) {
    await supabase
      .from('spaced_reviews')
      .update({ done: true, done_at: new Date().toISOString() })
      .eq('id', reviewId)
    setReviews(r => r.filter(x => x.id !== reviewId))
  }

  async function saveProgress() {
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const today = todayInBrasilia()
    const elapsed = Math.round((Date.now() - startTimeRef.current) / 60000)

    const payload = {
      user_id: user.id,
      day_number: dayNumber,
      date: today,
      sentences: [sentence1, sentence2],
      idea_1: idea1,
      idea_2: idea2,
      connected_sentence: connectedSentence,
      mini_paragraph: miniParagraph,
      scores: { fluency, confidence, difficulty },
      time_spent_minutes: elapsed,
      production_done: sentence1.length > 5 && sentence2.length > 5,
      connection_done: connectedSentence.length > 5,
      new_learning_done: true,
      review_done: reviews.length === 0,
    }

    const { error } = await supabase
      .from('user_day_progress')
      .upsert({ ...payload, id: progress?.id })

    setSaving(false)
  }

  async function completeDay() {
    if (!planDay) return
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const today = todayInBrasilia()
    const elapsed = Math.round((Date.now() - startTimeRef.current) / 60000)

    // Upsert progress as completed
    const { data: prog, error: progErr } = await supabase
      .from('user_day_progress')
      .upsert({
        id: progress?.id,
        user_id: user.id,
        day_number: dayNumber,
        date: today,
        sentences: [sentence1, sentence2],
        idea_1: idea1,
        idea_2: idea2,
        connected_sentence: connectedSentence,
        mini_paragraph: miniParagraph,
        scores: { fluency, confidence, difficulty },
        time_spent_minutes: elapsed,
        production_done: true,
        connection_done: true,
        new_learning_done: true,
        review_done: true,
        completed: true,
      })
      .select()
      .single()

    if (progErr) { setSaving(false); return }

    // Create user_items for the 2 learned items (if not already done)
    const items = [
      {
        user_id: user.id,
        source_day_number: dayNumber,
        item_type: planDay.item_1_type,
        term: planDay.item_1,
        meaning: `${planDay.item_1_type}: ${planDay.item_1}`,
        example: sentence1 || planDay.item_1_example,
      },
      {
        user_id: user.id,
        source_day_number: dayNumber,
        item_type: planDay.item_2_type,
        term: planDay.item_2,
        meaning: `${planDay.item_2_type}: ${planDay.item_2}`,
        example: sentence2 || planDay.item_2_example,
      },
    ]

    // Only insert if not already done (check by source_day_number)
    const { data: existingItems } = await supabase
      .from('user_items')
      .select('id')
      .eq('user_id', user.id)
      .eq('source_day_number', dayNumber)

    if (!existingItems?.length) {
      const { data: insertedItems } = await supabase
        .from('user_items')
        .insert(items)
        .select()

      if (insertedItems) {
        const reviews = insertedItems.flatMap(item =>
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
    }

    setCompleted(true)
    setSaving(false)

    if (timerRef.current) clearInterval(timerRef.current)
  }

  const formatTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  if (loading) return <LoadingState />

  if (dayNumber > 90) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">🎓</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">You completed English 90!</h1>
        <p className="text-gray-500">90 days of practice. Well done!</p>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Day {dayNumber} of 90</p>
          <h1 className="text-xl font-bold text-gray-900">{planDay?.focus_title}</h1>
          <p className="text-xs text-gray-400 mt-0.5">Theme: {planDay?.theme}</p>
        </div>
        <div className="text-right">
          <div className="text-lg font-mono font-semibold text-gray-700">{formatTime(seconds)}</div>
          <div className="text-xs text-gray-400">/ 15:00</div>
        </div>
      </div>

      {/* Timer bar */}
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-brand-500 rounded-full transition-all"
          style={{ width: `${Math.min(100, (seconds / 900) * 100)}%` }}
        />
      </div>

      {completed && (
        <div className="card p-4 bg-emerald-50 border-emerald-100 text-emerald-700 flex items-center gap-3">
          <span className="text-2xl">🎉</span>
          <div>
            <p className="font-semibold">Day {dayNumber} complete!</p>
            <p className="text-sm opacity-80">Your items are queued for spaced review.</p>
          </div>
        </div>
      )}

      {/* ── Section 1: Reviews ── */}
      {reviews.length > 0 && (
        <Section title={`Pending Reviews (${reviews.length})`} emoji="🔁">
          <div className="space-y-2">
            {reviews.map(r => (
              <ReviewCard key={r.id} review={r} onDone={() => markReviewDone(r.id)} />
            ))}
          </div>
        </Section>
      )}

      {reviews.length === 0 && !loading && (
        <div className="card p-4 bg-gray-50 text-center text-sm text-gray-400">
          No pending reviews today ✓
        </div>
      )}

      {/* ── Section 2: New Learning ── */}
      <Section title="New Learning" emoji="📖">
        {planDay && (
          <div className="space-y-3">
            <ItemCard
              num={1}
              type={planDay.item_1_type}
              term={planDay.item_1}
              example={planDay.item_1_example}
            />
            <ItemCard
              num={2}
              type={planDay.item_2_type}
              term={planDay.item_2}
              example={planDay.item_2_example}
            />
            {planDay.notes && (
              <p className="text-xs text-gray-400 italic px-1">{planDay.notes}</p>
            )}
          </div>
        )}
      </Section>

      {/* ── Section 3: Production ── */}
      <Section title="Your Sentences" emoji="✍️">
        <div className="space-y-3">
          <div>
            <label className="label">Sentence 1 — using <strong>{planDay?.item_1}</strong></label>
            <textarea
              value={sentence1}
              onChange={e => setSentence1(e.target.value)}
              placeholder={planDay?.item_1_example}
              rows={2}
              className="textarea"
              disabled={completed}
            />
          </div>
          <div>
            <label className="label">Sentence 2 — using <strong>{planDay?.item_2}</strong></label>
            <textarea
              value={sentence2}
              onChange={e => setSentence2(e.target.value)}
              placeholder={planDay?.item_2_example}
              rows={2}
              className="textarea"
              disabled={completed}
            />
          </div>
        </div>
      </Section>

      {/* ── Section 4: Connection ── */}
      <Section title="Connection Training" emoji="🔗">
        <p className="text-sm text-gray-500 mb-3 italic">{planDay?.connection_prompt}</p>
        <div className="space-y-3">
          <div>
            <label className="label">Idea 1</label>
            <input
              value={idea1}
              onChange={e => setIdea1(e.target.value)}
              placeholder="First idea…"
              className="input"
              disabled={completed}
            />
          </div>
          <div>
            <label className="label">Idea 2</label>
            <input
              value={idea2}
              onChange={e => setIdea2(e.target.value)}
              placeholder="Second idea…"
              className="input"
              disabled={completed}
            />
          </div>
          <div>
            <label className="label">Connected sentence</label>
            <textarea
              value={connectedSentence}
              onChange={e => setConnectedSentence(e.target.value)}
              placeholder="Write a sentence connecting Idea 1 and Idea 2…"
              rows={2}
              className="textarea"
              disabled={completed}
            />
          </div>
        </div>
      </Section>

      {/* ── Section 5: Mini-paragraph (optional) ── */}
      <Section title="Mini-Paragraph" emoji="📝" optional>
        <textarea
          value={miniParagraph}
          onChange={e => setMiniParagraph(e.target.value)}
          placeholder="Write 4-6 sentences using today's items, connectors, and your connection sentence…"
          rows={5}
          className="textarea"
          disabled={completed}
        />
      </Section>

      {/* ── Section 6: Scores ── */}
      <Section title="Self-Assessment" emoji="📊">
        <div className="space-y-4">
          <ScoreSlider label="Fluency" value={fluency} onChange={setFluency} disabled={completed} />
          <ScoreSlider label="Confidence" value={confidence} onChange={setConfidence} disabled={completed} />
          <ScoreSlider label="Difficulty" value={difficulty} onChange={setDifficulty} disabled={completed}
            hint="(10 = very difficult)" />
        </div>
      </Section>

      {/* ── Action buttons ── */}
      {!completed && (
        <div className="space-y-2 pb-4">
          <button
            onClick={completeDay}
            disabled={saving || !sentence1 || !sentence2 || !connectedSentence}
            className="btn-primary w-full py-3 text-base"
          >
            {saving ? 'Saving…' : '✓ Complete Day ' + dayNumber}
          </button>
          <button onClick={saveProgress} disabled={saving} className="btn-secondary w-full">
            Save draft
          </button>
          <p className="text-center text-xs text-gray-400">
            Complete requires: 2 sentences + connection sentence
          </p>
        </div>
      )}
    </div>
  )
}

// ──────────────────────────────────────────────────
// Sub-components
// ──────────────────────────────────────────────────

function Section({
  title, emoji, children, optional
}: {
  title: string; emoji: string; children: React.ReactNode; optional?: boolean
}) {
  return (
    <div className="card p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">{emoji}</span>
        <h2 className="section-title mb-0">{title}</h2>
        {optional && <span className="text-xs text-gray-400 ml-auto">optional</span>}
      </div>
      {children}
    </div>
  )
}

function ReviewCard({ review, onDone }: { review: ReviewWithItem; onDone: () => void }) {
  const [done, setDone] = useState(false)

  function handle() {
    setDone(true)
    onDone()
  }

  return (
    <div className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${done ? 'opacity-40' : 'border-gray-100 bg-gray-50'}`}>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={`badge ${itemTypeColor(review.user_items?.item_type ?? '')}`}>
            {review.user_items?.item_type}
          </span>
          <span className="font-semibold text-sm text-gray-900">{review.user_items?.term}</span>
          <span className="text-xs text-gray-400 ml-auto">{review.interval_tag}</span>
        </div>
        <p className="text-xs text-gray-500 italic truncate">{review.user_items?.example}</p>
      </div>
      <button
        onClick={handle}
        disabled={done}
        className="shrink-0 w-8 h-8 rounded-lg border-2 border-gray-200 flex items-center justify-center text-gray-400 hover:border-emerald-400 hover:text-emerald-500 hover:bg-emerald-50 transition-colors"
      >
        ✓
      </button>
    </div>
  )
}

function ItemCard({
  num, type, term, example
}: {
  num: number; type: string; term: string; example: string
}) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-700 text-xs flex items-center justify-center font-bold shrink-0">
          {num}
        </span>
        <span className={`badge ${itemTypeColor(type)}`}>{type}</span>
        <span className="font-bold text-gray-900">{term}</span>
      </div>
      <p className="text-sm text-gray-600 italic">"{example}"</p>
    </div>
  )
}

function ScoreSlider({
  label, value, onChange, disabled, hint
}: {
  label: string; value: number; onChange: (n: number) => void; disabled: boolean; hint?: string
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <label className="label mb-0">{label} {hint && <span className="normal-case font-normal opacity-70">{hint}</span>}</label>
        <span className="text-sm font-bold text-brand-600">{value}/10</span>
      </div>
      <input
        type="range"
        min={0} max={10} step={1}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        disabled={disabled}
        className="w-full accent-brand-600"
      />
      <div className="flex justify-between text-xs text-gray-300 mt-0.5">
        <span>0</span><span>5</span><span>10</span>
      </div>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="max-w-xl mx-auto px-4 py-6 space-y-4 animate-pulse">
      <div className="h-8 bg-gray-100 rounded-xl w-48" />
      <div className="h-40 bg-gray-100 rounded-2xl" />
      <div className="h-40 bg-gray-100 rounded-2xl" />
      <div className="h-40 bg-gray-100 rounded-2xl" />
    </div>
  )
}
