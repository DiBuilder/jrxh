import BaziClient from './client'

export const metadata = {
  title: '生辰本命选号 - 八字五行补缺选号',
  description: '根据生辰八字五行补缺原理选号，分析命中所缺五行，取对应尾数补之，纳音定蓝球。支持双色球和大乐透。仅供娱乐。',
  keywords: ['生辰八字选号', '五行选号', '本命选号', '八字缺五行', '纳音五行选号', '双色球五行', '大乐透五行'],
  openGraph: {
    title: '生辰本命选号 | 吉日选号工具',
    description: '根据生辰八字五行补缺原理，缺什么补什么，纳音定蓝球',
    url: 'https://jrxh.top/bazi',
  },
  alternates: {
    canonical: 'https://jrxh.top/bazi',
  },
}

export default function BaziPage() {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* SEO 静态内容 - Server Component 渲染 */}
      <div className="sr-only">
        <h1>生辰本命选号 - 八字五行补缺选号</h1>
        <p>根据您的生辰八字，分析五行旺衰，找出命中所缺五行，取河图尾数对应号码补之。蓝球由日柱纳音五行定夺。支持双色球和大乐透两种彩票类型，为您生成个性化本命号码。</p>
        <nav aria-label="站点导航">
          <ul>
            <li><a href="/">今日黄道选号</a> - 每日自动更新的命理选号</li>
            <li><a href="/bazi">生辰本命选号</a> - 基于八字五行补缺的个性化选号</li>
          </ul>
        </nav>
      </div>

      {/* 交互内容 - Client Component */}
      <BaziClient />
    </div>
  )
}
