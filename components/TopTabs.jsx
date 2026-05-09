'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function TopTabs() {
  const pathname = usePathname()

  return (
    <div className="flex justify-center gap-2 pt-2 pb-3 sm:pt-4 sm:pb-4 px-2">
      <Link
        href="/huangdao"
        className={`px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg sm:rounded-xl transition-all duration-200 whitespace-nowrap ${
          pathname === '/huangdao'
            ? 'bg-accent text-white shadow-sm shadow-accent/20 font-medium'
            : 'text-text-tertiary hover:text-text-secondary hover:bg-bg-tertiary'
        }`}
      >
        今日黄道选号
      </Link>
      <Link
        href="/bazi"
        className={`px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg sm:rounded-xl transition-all duration-200 whitespace-nowrap ${
          pathname === '/bazi'
            ? 'bg-accent text-white shadow-sm shadow-accent/20 font-medium'
            : 'text-text-tertiary hover:text-text-secondary hover:bg-bg-tertiary'
        }`}
      >
        生辰本命选号
      </Link>
    </div>
  )
}
