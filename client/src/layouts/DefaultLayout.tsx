import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'

export function DefaultLayout() {
  return (
    <div className="min-h-dvh flex flex-col bg-background text-foreground">
      <Header />
      <main className="mx-auto max-w-6xl w-full px-4 py-6 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
