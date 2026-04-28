import './globals.css'

export const metadata = {
  title: '命理彩票选号 - 黄道吉日选号',
  description: '基于农历和生辰八字的命理彩票选号工具，支持双色球和大乐透',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-bg-deep text-gold font-chinese">
        {children}
      </body>
    </html>
  )
}
