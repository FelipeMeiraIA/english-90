import { addDays, differenceInDays, format, parseISO, isToday, isBefore, startOfDay } from 'date-fns'
import { toZonedTime, fromZonedTime } from 'date-fns-tz'
import type { UserDayProgress } from './types'

export const TZ = 'America/Sao_Paulo'

/** Returns today's date string (YYYY-MM-DD) in Sao Paulo timezone */
export function todayInBrasilia(): string {
  const now = toZonedTime(new Date(), TZ)
  return format(now, 'yyyy-MM-dd')
}

/** Calculate which plan day the user should be on */
export function getCurrentDayNumber(startDate: string): number {
  const start = parseISO(startDate)
  const todayDate = startOfDay(toZonedTime(new Date(), TZ))
  const diff = differenceInDays(todayDate, startOfDay(start))
  return Math.max(1, Math.min(90, diff + 1))
}

/** Calculate spaced repetition due dates from a base date */
export function getSpacedDates(baseDate: string): { tag: string; date: string }[] {
  const base = parseISO(baseDate)
  return [
    { tag: 'D1',  date: format(addDays(base, 1),  'yyyy-MM-dd') },
    { tag: 'D3',  date: format(addDays(base, 3),  'yyyy-MM-dd') },
    { tag: 'D7',  date: format(addDays(base, 7),  'yyyy-MM-dd') },
    { tag: 'D15', date: format(addDays(base, 15), 'yyyy-MM-dd') },
    { tag: 'D30', date: format(addDays(base, 30), 'yyyy-MM-dd') },
  ]
}

/** Calculate current streak from sorted completed days */
export function calcStreak(completedDays: UserDayProgress[]): { current: number; best: number } {
  if (!completedDays.length) return { current: 0, best: 0 }

  // Sort by date descending
  const sorted = [...completedDays]
    .filter(d => d.completed)
    .sort((a, b) => b.date.localeCompare(a.date))

  const todayStr = todayInBrasilia()
  const yesterdayStr = format(addDays(parseISO(todayStr), -1), 'yyyy-MM-dd')

  // Current streak: consecutive days ending today or yesterday
  let current = 0
  let expected = todayStr

  // If most recent day isn't today or yesterday, streak is 0
  if (sorted[0]?.date !== todayStr && sorted[0]?.date !== yesterdayStr) {
    current = 0
  } else {
    expected = sorted[0].date
    for (const d of sorted) {
      if (d.date === expected) {
        current++
        expected = format(addDays(parseISO(expected), -1), 'yyyy-MM-dd')
      } else {
        break
      }
    }
  }

  // Best streak: find longest consecutive run
  let best = 0
  let run = 1
  const asc = [...sorted].reverse()
  for (let i = 1; i < asc.length; i++) {
    const prev = parseISO(asc[i - 1].date)
    const curr = parseISO(asc[i].date)
    if (differenceInDays(curr, prev) === 1) {
      run++
      best = Math.max(best, run)
    } else {
      run = 1
    }
  }
  best = Math.max(best, run, current)

  return { current, best }
}

/** Format a date for display */
export function formatDate(dateStr: string): string {
  return format(parseISO(dateStr), 'MMM d, yyyy')
}

/** Phase label */
export function phaseLabel(phase: number): string {
  return ['', 'Foundation', 'Topics', 'Advanced'][phase] ?? ''
}

/** Item type badge color */
export function itemTypeColor(type: string): string {
  const map: Record<string, string> = {
    connector:  'bg-blue-100 text-blue-700',
    structure:  'bg-violet-100 text-violet-700',
    verb:       'bg-amber-100 text-amber-700',
    expression: 'bg-emerald-100 text-emerald-700',
    word:       'bg-pink-100 text-pink-700',
  }
  return map[type] ?? 'bg-gray-100 text-gray-700'
}

/** Download data as file */
export function downloadFile(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

/** cn helper (minimal) */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
