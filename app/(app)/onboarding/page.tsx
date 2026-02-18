'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { todayInBrasilia } from '@/lib/utils'

export default function OnboardingPage() {
  const router = useRouter()
  const supabase = createClient()
  const [startDate, setStartDate] = useState(todayInBrasilia())
  const [loading, setLoading] = useState(false)

  async function handleStart() {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/login'); return }

    await supabase.from('user_profiles').upsert({
      id: user.id,
      email: user.email,
      start_date: startDate,
      onboarding_done: true,
    })

    router.push('/today')
  }

  const phases = [
    { num: 1, label: 'Foundation', days: '1–30', desc: 'Connectors, structures & verbs', color: 'bg-blue-50 border-blue-100 text-blue-700' },
    { num: 2, label: 'Topics',     days: '31–60', desc: 'Business, Tech, Mindset & Money', color: 'bg-violet-50 border-violet-100 text-violet-700' },
    { num: 3, label: 'Advanced',   days: '61–90', desc: 'Argumentation, essays & simulations', color: 'bg-emerald-50 border-emerald-100 text-emerald-700' },
  ]

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-600 text-white text-2xl font-bold mb-5">
          90
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to English 90</h1>
        <p className="text-gray-500">
          15 minutes a day. Spaced repetition. Real results in 90 days.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { num: '90', label: 'Days' },
          { num: '15', label: 'Min/day' },
          { num: '180+', label: 'Items' },
        ].map(s => (
          <div key={s.label} className="card p-4 text-center">
            <div className="text-2xl font-bold text-brand-600">{s.num}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Phases */}
      <div className="space-y-3 mb-8">
        {phases.map(p => (
          <div key={p.num} className={`card border p-4 ${p.color}`}>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/60 flex items-center justify-center text-sm font-bold shrink-0">
                {p.num}
              </div>
              <div>
                <div className="font-semibold text-sm">{p.label} <span className="font-normal opacity-70">· Days {p.days}</span></div>
                <div className="text-xs opacity-70 mt-0.5">{p.desc}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Start date */}
      <div className="card p-5 mb-6">
        <label className="label">Start date</label>
        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          max={todayInBrasilia()}
          className="input"
        />
        <p className="text-xs text-gray-400 mt-2">
          Your 90-day plan will be calculated from this date.
        </p>
      </div>

      <button onClick={handleStart} disabled={loading} className="btn-primary w-full text-base py-3">
        {loading ? 'Setting up your plan…' : 'Start my 90-day plan →'}
      </button>
    </div>
  )
}
