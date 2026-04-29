'use client'
import './globals.css'
import TopTabs from '@/components/TopTabs'

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-bg-deep text-gold font-chinese">
        <TopTabs />
        {children}
      </body>
    </html>
  )
}
