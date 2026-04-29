'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function TopTabs() {
  const pathname = usePathname()
  const btnBase = "px-6 py-2 text-lg rounded-lg border-2 transition-all"
  const activeCls = 'bg-gold text-bg-deep border-gold font-bold'
  const inactiveCls = 'bg-transparent text-gold border-gold-dark hover:border-gold'

  return (
    <div className="flex justify-center gap-2 pt-4 pb-2">
      <Link href="/huangdao" className={`${btnBase} ${pathname === '/huangdao' ? activeCls : inactiveCls}`}>
        今日黄道选号
      </Link>
      <Link href="/bazi" className={`${btnBase} ${pathname === '/bazi' ? activeCls : inactiveCls}`}>
        生辰本命选号
      </Link>
    </div>
  )
}
