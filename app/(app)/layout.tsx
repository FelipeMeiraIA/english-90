import Nav from '@/components/nav'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col">
      <Nav />
      <main className="flex-1 pb-24 md:pb-6">
        {children}
      </main>
    </div>
  )
}
