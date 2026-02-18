'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { itemTypeColor, formatDate } from '@/lib/utils'
import type { UserItem, SpacedReview } from '@/lib/types'

const ITEM_TYPES = ['all', 'connector', 'structure', 'verb', 'expression', 'word']

interface ItemWithReviews extends UserItem {
  reviews?: SpacedReview[]
}

export default function ItemsPage() {
  const router = useRouter()
  const supabase = createClient()
  const [items, setItems] = useState<ItemWithReviews[]>([])
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      const { data: items } = await supabase
        .from('user_items')
        .select('*, spaced_reviews(id, due_date, interval_tag, done, done_at)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      setItems(items ?? [])
      setLoading(false)
    }
    load()
  }, [])

  const filtered = items.filter(item => {
    const matchType = filter === 'all' || item.item_type === filter
    const matchSearch = !search || item.term.toLowerCase().includes(search.toLowerCase()) ||
      item.example.toLowerCase().includes(search.toLowerCase())
    return matchType && matchSearch
  })

  if (loading) return (
    <div className="max-w-xl mx-auto px-4 py-6 animate-pulse space-y-3">
      <div className="h-8 bg-gray-100 rounded-xl w-32" />
      <div className="h-10 bg-gray-100 rounded-xl" />
      {[1,2,3].map(i => <div key={i} className="h-20 bg-gray-100 rounded-2xl" />)}
    </div>
  )

  return (
    <div className="max-w-xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Item Bank</h1>
        <p className="text-sm text-gray-400 mt-0.5">{items.length} items learned</p>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search terms or examples…"
          className="input"
        />
      </div>

      {/* Type filter */}
      <div className="flex gap-2 flex-wrap mb-5">
        {ITEM_TYPES.map(t => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
              filter === t
                ? 'bg-brand-600 text-white'
                : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-50'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Items list */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          {items.length === 0 ? (
            <>
              <div className="text-4xl mb-3">📚</div>
              <p>No items yet. Complete your first day to start learning!</p>
            </>
          ) : (
            <p>No items match your search.</p>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map(item => {
            const reviews = (item as any).spaced_reviews as SpacedReview[] ?? []
            const doneCount = reviews.filter(r => r.done).length
            const isExpanded = expanded === item.id

            return (
              <div key={item.id} className="card overflow-hidden">
                <button
                  onClick={() => setExpanded(isExpanded ? null : item.id)}
                  className="w-full p-4 text-left flex items-start gap-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`badge ${itemTypeColor(item.item_type)}`}>{item.item_type}</span>
                      <span className="font-semibold text-gray-900">{item.term}</span>
                      <span className="text-xs text-gray-400 ml-auto">Day {item.source_day_number}</span>
                    </div>
                    <p className="text-sm text-gray-500 italic truncate">"{item.example}"</p>
                  </div>
                  <div className="shrink-0 text-xs text-gray-400">
                    {doneCount}/{reviews.length} reviews
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-gray-50 pt-3 animate-fade-in">
                    <p className="text-xs text-gray-500 mb-3 italic">"{item.example}"</p>
                    <div className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">Spaced reviews</div>
                    <div className="grid grid-cols-5 gap-1.5">
                      {reviews
                        .sort((a, b) => a.interval_tag.localeCompare(b.interval_tag))
                        .map(r => (
                          <div
                            key={r.id}
                            className={`rounded-lg p-2 text-center text-xs font-medium ${
                              r.done ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-50 text-gray-400'
                            }`}
                          >
                            <div>{r.interval_tag}</div>
                            <div className="text-[10px] opacity-70 mt-0.5">
                              {r.done ? '✓' : formatDate(r.due_date)}
                            </div>
                          </div>
                        ))
                      }
                    </div>
                    <p className="text-xs text-gray-400 mt-3">
                      Added {formatDate(item.created_at)}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
