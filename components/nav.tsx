'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

const links = [
  { href: '/dashboard', label: 'Dashboard', icon: '◎' },
  { href: '/today',     label: 'Today',     icon: '⬡' },
  { href: '/calendar',  label: 'Plan',       icon: '▦' },
  { href: '/items',     label: 'Items',      icon: '❖' },
  { href: '/settings',  label: 'Settings',   icon: '⚙' },
]

export default function Nav() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-56 bg-white border-r border-gray-100 flex-col z-40">
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand-600 text-white flex items-center justify-center text-sm font-bold">
              90
            </div>
            <span className="font-semibold text-gray-900">English 90</span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                pathname.startsWith(l.href)
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <span className="text-base">{l.icon}</span>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-gray-100">
          <button
            onClick={signOut}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-gray-50 hover:text-gray-700 w-full transition-colors"
          >
            <span className="text-base">→</span>
            Sign out
          </button>
        </div>
      </aside>

      {/* Desktop content spacer */}
      <div className="hidden md:block w-56 shrink-0" />

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex z-40 safe-area-bottom">
        {links.slice(0, 5).map(l => (
          <Link
            key={l.href}
            href={l.href}
            className={cn(
              'flex-1 flex flex-col items-center gap-0.5 py-3 text-xs font-medium transition-colors',
              pathname.startsWith(l.href)
                ? 'text-brand-600'
                : 'text-gray-400'
            )}
          >
            <span className="text-lg leading-none">{l.icon}</span>
            {l.label}
          </Link>
        ))}
      </nav>
    </>
  )
}
