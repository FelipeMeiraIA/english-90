'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { downloadFile, todayInBrasilia } from '@/lib/utils'
import type { UserProfile } from '@/lib/types'

export default function SettingsPage() {
  const router = useRouter()
  const supabase = createClient()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [showReset, setShowReset] = useState(false)
  const [resetConfirm, setResetConfirm] = useState('')
  const [msg, setMsg] = useState('')

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data: prof } = await supabase.from('user_profiles').select('*').eq('id', user.id).single()
      setProfile(prof)
      setStartDate(prof?.start_date ?? todayInBrasilia())
      setLoading(false)
    }
    load()
  }, [])

  async function saveSettings() {
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('user_profiles').update({ start_date: startDate }).eq('id', user.id)
    setMsg('Settings saved!')
    setSaving(false)
    setTimeout(() => setMsg(''), 3000)
  }

  async function exportJSON() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const [{ data: progress }, { data: items }, { data: reviews }] = await Promise.all([
      supabase.from('user_day_progress').select('*').eq('user_id', user.id),
      supabase.from('user_items').select('*').eq('user_id', user.id),
      supabase.from('spaced_reviews').select('*').eq('user_id', user.id),
    ])

    const exportData = {
      exported_at: new Date().toISOString(),
      profile,
      progress,
      items,
      reviews,
    }

    downloadFile(JSON.stringify(exportData, null, 2), 'english90-export.json', 'application/json')
  }

  async function exportCSV() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data: progress } = await supabase
      .from('user_day_progress')
      .select('*')
      .eq('user_id', user.id)
      .order('day_number')

    if (!progress?.length) { setMsg('No data to export yet.'); return }

    const headers = ['day_number', 'date', 'completed', 'fluency', 'confidence', 'difficulty', 'time_spent_minutes', 'connected_sentence']
    const rows = progress.map((p: any) => [
      p.day_number,
      p.date,
      p.completed,
      p.scores?.fluency ?? '',
      p.scores?.confidence ?? '',
      p.scores?.difficulty ?? '',
      p.time_spent_minutes,
      `"${(p.connected_sentence ?? '').replace(/"/g, '""')}"`,
    ])

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
    downloadFile(csv, 'english90-progress.csv', 'text/csv')
  }

  async function resetProgress() {
    if (resetConfirm !== 'RESET') return
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    await Promise.all([
      supabase.from('user_day_progress').delete().eq('user_id', user.id),
      supabase.from('user_items').delete().eq('user_id', user.id),
      supabase.from('spaced_reviews').delete().eq('user_id', user.id),
    ])

    setShowReset(false)
    setResetConfirm('')
    setMsg('Progress reset. Starting fresh!')
    router.push('/dashboard')
  }

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) return (
    <div className="max-w-xl mx-auto px-4 py-6 animate-pulse space-y-4">
      <div className="h-8 bg-gray-100 rounded-xl w-32" />
      {[1,2,3].map(i => <div key={i} className="h-24 bg-gray-100 rounded-2xl" />)}
    </div>
  )

  return (
    <div className="max-w-xl mx-auto px-4 py-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

      {msg && (
        <div className="card p-3 bg-emerald-50 border-emerald-100 text-emerald-700 text-sm font-medium">
          {msg}
        </div>
      )}

      {/* Account */}
      <div className="card p-5">
        <h2 className="section-title">Account</h2>
        <p className="text-sm text-gray-500 mb-1">Email</p>
        <p className="text-sm font-medium text-gray-900 mb-4">{profile?.email}</p>
        <button onClick={signOut} className="btn-secondary text-sm">
          Sign out
        </button>
      </div>

      {/* Plan settings */}
      <div className="card p-5">
        <h2 className="section-title">Plan Settings</h2>
        <div className="mb-4">
          <label className="label">Start date</label>
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            max={todayInBrasilia()}
            className="input"
          />
          <p className="text-xs text-gray-400 mt-2">
            Changing this will recalculate which day you're on.
          </p>
        </div>
        <button onClick={saveSettings} disabled={saving} className="btn-primary text-sm">
          {saving ? 'Saving…' : 'Save settings'}
        </button>
      </div>

      {/* Export */}
      <div className="card p-5">
        <h2 className="section-title">Export Data</h2>
        <p className="text-sm text-gray-500 mb-4">Download your progress and vocabulary.</p>
        <div className="flex gap-2">
          <button onClick={exportJSON} className="btn-secondary text-sm flex-1">
            Export JSON
          </button>
          <button onClick={exportCSV} className="btn-secondary text-sm flex-1">
            Export CSV
          </button>
        </div>
      </div>

      {/* Danger zone */}
      <div className="card p-5 border-red-100">
        <h2 className="section-title text-red-500">Danger Zone</h2>
        {!showReset ? (
          <button
            onClick={() => setShowReset(true)}
            className="text-sm text-red-500 hover:text-red-600 font-medium"
          >
            Reset all progress…
          </button>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              This will delete all your progress, items, and reviews. Type <strong>RESET</strong> to confirm.
            </p>
            <input
              value={resetConfirm}
              onChange={e => setResetConfirm(e.target.value)}
              placeholder="Type RESET"
              className="input border-red-200 focus:border-red-400"
            />
            <div className="flex gap-2">
              <button
                onClick={resetProgress}
                disabled={resetConfirm !== 'RESET'}
                className="px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-medium disabled:opacity-40"
              >
                Confirm reset
              </button>
              <button onClick={() => { setShowReset(false); setResetConfirm('') }} className="btn-secondary text-sm">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="text-center text-xs text-gray-300 pb-4">
        English 90 v0.1 · Built for consistent learners
      </div>
    </div>
  )
}
