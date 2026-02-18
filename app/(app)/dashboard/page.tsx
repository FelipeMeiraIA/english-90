'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { getCurrentDayNumber, calcStreak, todayInBrasilia, phaseLabel } from '@/lib/utils'
import type { UserDayProgress, UserProfile } from '@/lib/types'

interface Stats {
  daysCompleted: number
  currentStreak: number
  bestStreak: number
  totalItems: number
  reviewsDone: number
  currentDay: number
  phase: number
  weeklyData: { week: number; days: number }[]
}

export default function DashboardPage() {
  const router = useRouter()
  const supabase = createClient()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      // Load profile
      const { data: prof } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (!prof?.onboarding_done) { router.push('/onboarding'); return }
      setProfile(prof)

      const currentDay = getCurrentDayNumber(prof.start_date!)
      const phase = currentDay <= 30 ? 1 : currentDay <= 60 ? 2 : 3

      // Load progress
      const { data: progress } = await supabase
        .from('user_day_progress')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: true })

      const completed = (progress ?? []).filter((d: UserDayProgress) => d.completed)
      const { current, best } = calcStreak(completed)

      // Weekly chart: group by week
      const weekMap: Record<number, number> = {}
      for (const d of completed) {
        const w = Math.ceil(d.day_number / 7)
        weekMap[w] = (weekMap[w] ?? 0) + 1
      }
      const weeklyData = Array.from({ length: 13 }, (_, i) => ({
        week: i + 1,
        days: weekMap[i + 1] ?? 0,
      }))

      // Items and reviews
      const { count: itemCount } = await supabase
        .from('user_items')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)

      const { count: reviewCount } = await supabase
        .from('spaced_reviews')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('done', true)

      setStats({
        daysCompleted: completed.length,
        currentStreak: current,
        bestStreak: best,
        totalItems: itemCount ?? 0,
        reviewsDone: reviewCount ?? 0,
        currentDay,
        phase,
        weeklyData,
      })
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <LoadingState />

  const s = stats!
  const progress = Math.round((s.daysCompleted / 90) * 100)

  return (
    <div className="max-w-2xl mx-auto px-40 py-60 md:py-10 md:ml-10">
      {/* Header */}
      <div className="max-w-2xl w-full">
        <div>
          <p className="text-sm text-gray-400 font-medium">Day {s.currentDay} of 90</p>
          <h1 className="text-2xl font-bold text-gray-900 mt-0.5">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Phase {s.phase}: {phaseLabel(s.phase)}
          </p>
        </div>
        <Link href="/today" className="btn-primary">
          Go to Today →
        </Link>
      </div>

      {/* Main progress */}
      <div className="card p-6 mb-4">
        <div className="flex items-end justify-between mb-3">
          <div>
            <p className="text-sm text-gray-500">Overall progress</p>
            <p className="text-3xl font-bold text-gray-900 mt-0.5">{s.daysCompleted}<span className="text-lg text-gray-400 font-normal">/90 days</span></p>
          </div>
          <span className="text-2xl font-bold text-brand-600">{progress}%</span>
        </div>
        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-600 rounded-full transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <StatCard icon="🔥" label="Current streak" value={`${s.currentStreak}d`} />
        <StatCard icon="🏆" label="Best streak" value={`${s.bestStreak}d`} />
        <StatCard icon="📚" label="Items learned" value={s.totalItems.toString()} />
        <StatCard icon="✅" label="Reviews done" value={s.reviewsDone.toString()} />
      </div>

      {/* Weekly chart */}
      <div className="card p-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Days completed per week</h2>
        <div className="flex items-end gap-1.5 h-24">
          {s.weeklyData.map(w => (
            <div key={w.week} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex items-end justify-center" style={{ height: '72px' }}>
                <div
                  className={`w-full rounded-t-md transition-all ${w.days > 0 ? 'bg-brand-500' : 'bg-gray-100'}`}
                  style={{ height: `${Math.max(4, (w.days / 7) * 100)}%` }}
                />
              </div>
              <span className="text-[9px] text-gray-300 font-medium">W{w.week}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Phase badges */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[1, 2, 3].map(p => {
          const done = p === 1 ? Math.min(s.daysCompleted, 30) : p === 2 ? Math.max(0, Math.min(s.daysCompleted - 30, 30)) : Math.max(0, s.daysCompleted - 60)
          const total = 30
          const active = s.phase === p
          return (
            <div key={p} className={`card p-3 text-center ${active ? 'border-brand-200 bg-brand-50' : ''}`}>
              <p className="text-xs font-semibold text-gray-500">Phase {p}</p>
              <p className="text-xs text-gray-400">{phaseLabel(p)}</p>
              <p className={`text-lg font-bold mt-1 ${active ? 'text-brand-600' : 'text-gray-300'}`}>
                {done}/{total}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function StatCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="card p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{icon}</span>
        <span className="text-xs text-gray-500 font-medium">{label}</span>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-100 rounded-xl w-40" />
        <div className="h-32 bg-gray-100 rounded-2xl" />
        <div className="grid grid-cols-2 gap-3">
          {[1,2,3,4].map(i => <div key={i} className="h-24 bg-gray-100 rounded-2xl" />)}
        </div>
      </div>
    </div>
  )
}
