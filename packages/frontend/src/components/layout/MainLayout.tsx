import { Outlet } from 'react-router'
import { Navbar } from '@components/layout/Navbar'
import { Footer } from '@components/layout/Footer'

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}