import HuangdaoClient from './huangdao-client'

export const metadata = {
  title: '今日黄道选号 - 双色球大乐透命理选号',
  description: '基于农历日干支和吉时辰的命理选号工具，每日黄道吉时生财星入局，智能生成双色球和大乐透号码。仅供娱乐。',
  keywords: ['今日黄道选号', '黄道吉日选号', '双色球今日号码', '大乐透今日号码', '命理选号', '吉时选号'],
  openGraph: {
    title: '今日黄道选号 | 吉日选号工具',
    description: '基于农历日干支和吉时辰，每日黄道吉时生财星入局',
    url: 'https://www.jrxh.top',
  },
  alternates: {
    canonical: 'https://www.jrxh.top',
  },
}

export default function HomePage() {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* SEO 静态内容 - Server Component 渲染 */}
      <div className="sr-only">
        <h1>今日黄道选号 - 双色球大乐透命理选号</h1>
        <p>基于中国传统命理学，根据农历日干支和每日吉时，智能生成双色球和大乐透幸运号码。今日黄道吉时生财星入局，为您提供每日选号参考。支持双色球（6红+1蓝）和大乐透（5前+2后）两种彩票类型。</p>
        <nav aria-label="站点导航">
          <ul>
            <li><a href="/">今日黄道选号</a> - 每日自动更新的命理选号</li>
            <li><a href="/bazi">生辰本命选号</a> - 基于八字五行补缺的个性化选号</li>
          </ul>
        </nav>
      </div>

      {/* 交互内容 - Client Component */}
      <HuangdaoClient />
    </div>
  )
}
