// ============================================================
// English 90 — Type Definitions
// ============================================================

export type ItemType = 'connector' | 'structure' | 'verb' | 'expression' | 'word'

export interface PlanDay {
  id: number
  day_number: number
  phase: 1 | 2 | 3
  week_number: number
  focus_title: string
  theme: string
  item_1_type: ItemType
  item_1: string
  item_1_example: string
  item_2_type: ItemType
  item_2: string
  item_2_example: string
  connection_prompt: string
  notes: string
}

export interface UserProfile {
  id: string
  email: string
  start_date: string | null   // ISO date string YYYY-MM-DD
  onboarding_done: boolean
  timezone: string
  created_at: string
}

export interface UserDayProgress {
  id: string
  user_id: string
  day_number: number
  date: string                // ISO date YYYY-MM-DD
  review_done: boolean
  new_learning_done: boolean
  production_done: boolean
  connection_done: boolean
  mini_paragraph: string
  sentences: string[]         // [sentence1, sentence2]
  idea_1: string
  idea_2: string
  connected_sentence: string
  scores: {
    fluency?: number
    confidence?: number
    difficulty?: number
  }
  time_spent_minutes: number
  completed: boolean
  created_at: string
}

export interface UserItem {
  id: string
  user_id: string
  source_day_number: number
  item_type: ItemType
  term: string
  meaning: string
  example: string
  created_at: string
}

export interface SpacedReview {
  id: string
  user_id: string
  user_item_id: string
  due_date: string            // ISO date
  interval_tag: 'D1' | 'D3' | 'D7' | 'D15' | 'D30'
  done: boolean
  done_at: string | null
  created_at: string
  // joined fields
  user_items?: UserItem
}

// ─── UI helpers ────────────────────────────────────────────
export interface DashboardStats {
  daysCompleted: number
  currentStreak: number
  bestStreak: number
  totalItems: number
  reviewsDone: number
  weeklyData: { week: number; days: number }[]
}

export interface TodayData {
  currentDayNumber: number
  planDay: PlanDay | null
  existingProgress: UserDayProgress | null
  pendingReviews: SpacedReview[]
}
