import Link from 'next/link'

export const metadata = {
  title: '页面未找到',
}

export default function NotFound() {
  return (
    <div className="h-full flex flex-col items-center justify-center px-6 text-center">
      <div className="animate-float-in">
        <p className="text-7xl font-bold text-accent/20 select-none mb-4">404</p>
        <h1 className="text-xl font-bold text-text-primary mb-2">此路不通</h1>
        <p className="text-sm text-text-tertiary mb-8 leading-relaxed">
          页面不存在或已被移除<br />请检查地址是否正确
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-2.5 text-sm font-medium rounded-xl
            bg-accent text-white shadow-md shadow-accent/20
            hover:bg-accent-light active:scale-95 transition-all duration-300"
        >
          返回首页
        </Link>
      </div>
    </div>
  )
}
