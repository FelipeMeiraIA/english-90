'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { getCurrentDayNumber, phaseLabel, todayInBrasilia } from '@/lib/utils'
import type { PlanDay, UserDayProgress } from '@/lib/types'

type DayStatus = 'completed' | 'current' | 'future' | 'missed'

interface CalDay {
  dayNumber: number
  status: DayStatus
  planDay?: Partial<PlanDay>
}

export default function CalendarPage() {
  const router = useRouter()
  const supabase = createClient()
  const [days, setDays] = useState<CalDay[]>([])
  const [loading, setLoading] = useState(true)
  const [currentDay, setCurrentDay] = useState(0)
  const [selected, setSelected] = useState<CalDay | null>(null)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      const { data: prof } = await supabase.from('user_profiles').select('*').eq('id', user.id).single()
      if (!prof?.onboarding_done) { router.push('/onboarding'); return }

      const dn = getCurrentDayNumber(prof.start_date!)
      setCurrentDay(dn)

      const { data: progress } = await supabase
        .from('user_day_progress')
        .select('day_number, completed')
        .eq('user_id', user.id)

      const { data: planDays } = await supabase
        .from('plan_days')
        .select('day_number, focus_title, theme, phase, week_number')
        .order('day_number')

      const completedSet = new Set((progress ?? []).filter((p: UserDayProgress) => p.completed).map((p: UserDayProgress) => p.day_number))
      const planMap = new Map((planDays ?? []).map((p: Partial<PlanDay>) => [p.day_number, p]))

      const built: CalDay[] = Array.from({ length: 90 }, (_, i) => {
        const n = i + 1
        let status: DayStatus
        if (completedSet.has(n)) status = 'completed'
        else if (n === dn) status = 'current'
        else if (n < dn) status = 'missed'
        else status = 'future'
        return { dayNumber: n, status, planDay: planMap.get(n) }
      })

      setDays(built)
      setLoading(false)
    }
    load()
  }, [])

  const phaseColors: Record<number, string> = { 1: 'blue', 2: 'violet', 3: 'emerald' }

  function statusClass(status: DayStatus, phase: number) {
    if (status === 'completed') return 'bg-emerald-500 text-white border-emerald-500'
    if (status === 'current')   return 'bg-brand-600 text-white border-brand-600 ring-2 ring-brand-300'
    if (status === 'missed')    return 'bg-orange-100 text-orange-500 border-orange-200'
    return 'bg-white text-gray-400 border-gray-100'
  }

  if (loading) return (
    <div className="max-w-2xl mx-auto px-4 py-6 animate-pulse">
      <div className="h-8 bg-gray-100 rounded-xl w-32 mb-6" />
      <div className="grid grid-cols-9 gap-1.5">
        {Array.from({ length: 90 }).map((_, i) => (
          <div key={i} className="aspect-square bg-gray-100 rounded-lg" />
        ))}
      </div>
    </div>
  )

  const phases = [1, 2, 3]

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">90-Day Plan</h1>
          <p className="text-sm text-gray-400 mt-0.5">Day {currentDay} of 90</p>
        </div>
        <Link href="/today" className="btn-primary text-sm">
          Today →
        </Link>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        {[
          { label: 'Done', cls: 'bg-emerald-500' },
          { label: 'Today', cls: 'bg-brand-600' },
          { label: 'Missed', cls: 'bg-orange-100 border border-orange-200' },
          { label: 'Upcoming', cls: 'bg-white border border-gray-200' },
        ].map(l => (
          <div key={l.label} className="flex items-center gap-1.5 text-xs text-gray-500">
            <div className={`w-3 h-3 rounded-sm ${l.cls}`} />
            {l.label}
          </div>
        ))}
      </div>

      {/* Calendar grid by phase */}
      {phases.map(phase => {
        const start = (phase - 1) * 30
        const phaseDays = days.slice(start, start + 30)
        return (
          <div key={phase} className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className={`badge ${
                phase === 1 ? 'bg-blue-50 text-blue-700' :
                phase === 2 ? 'bg-violet-50 text-violet-700' :
                'bg-emerald-50 text-emerald-700'
              }`}>Phase {phase}</span>
              <span className="text-sm text-gray-500">{phaseLabel(phase)}</span>
              <span className="text-xs text-gray-400 ml-auto">Days {start+1}–{start+30}</span>
            </div>
            <div className="grid grid-cols-10 gap-1.5">
              {phaseDays.map(d => (
                <button
                  key={d.dayNumber}
                  onClick={() => setSelected(selected?.dayNumber === d.dayNumber ? null : d)}
                  className={`
                    relative aspect-square rounded-lg border text-xs font-semibold
                    flex items-center justify-center transition-all
                    ${statusClass(d.status, phase)}
                    ${selected?.dayNumber === d.dayNumber ? 'scale-110 shadow-md' : 'hover:scale-105'}
                  `}
                >
                  {d.dayNumber}
                </button>
              ))}
            </div>
          </div>
        )
      })}

      {/* Day detail panel */}
      {selected && (
        <div className="card p-5 mt-4 animate-fade-in">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold
              ${selected.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                selected.status === 'current'   ? 'bg-brand-100 text-brand-700' :
                'bg-gray-100 text-gray-500'}`}
            >
              {selected.dayNumber}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{selected.planDay?.focus_title ?? `Day ${selected.dayNumber}`}</p>
              <p className="text-xs text-gray-400">{selected.planDay?.theme} · Week {selected.planDay?.week_number}</p>
            </div>
            {selected.status === 'current' && (
              <Link href="/today" className="btn-primary text-xs ml-auto">Go →</Link>
            )}
          </div>
          <div className="flex gap-2">
            <span className={`badge ${
              selected.status === 'completed' ? 'bg-emerald-50 text-emerald-700' :
              selected.status === 'current'   ? 'bg-brand-50 text-brand-700' :
              selected.status === 'missed'    ? 'bg-orange-50 text-orange-600' :
              'bg-gray-50 text-gray-500'
            }`}>
              {selected.status === 'completed' ? '✓ Completed' :
               selected.status === 'current'   ? '→ Today' :
               selected.status === 'missed'    ? '! Missed' : 'Upcoming'}
            </span>
            <span className="badge bg-gray-50 text-gray-500">Phase {selected.planDay?.phase}</span>
          </div>
        </div>
      )}
    </div>
  )
}
