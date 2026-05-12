'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function TopTabs() {
  const pathname = usePathname()

  return (
    <nav className="flex justify-center px-4 sm:px-5 pb-3" role="navigation" aria-label="主导航">
      <div className="inline-flex items-center gap-1 p-1 bg-bg-tertiary/80 backdrop-blur-sm rounded-2xl border border-border/50">
        <Link
          href="/"
          className={`relative px-5 sm:px-6 py-2 text-xs sm:text-sm rounded-xl transition-all duration-300 whitespace-nowrap ${
            pathname === '/'
              ? 'bg-accent text-white font-medium shadow-md shadow-accent/20'
              : 'text-text-tertiary hover:text-text-secondary'
          }`}
        >
          今日黄道选号
        </Link>
        <Link
          href="/bazi"
          className={`relative px-5 sm:px-6 py-2 text-xs sm:text-sm rounded-xl transition-all duration-300 whitespace-nowrap ${
            pathname === '/bazi'
              ? 'bg-accent text-white font-medium shadow-md shadow-accent/20'
              : 'text-text-tertiary hover:text-text-secondary'
          }`}
        >
          生辰本命选号
        </Link>
      </div>
    </nav>
  )
}
