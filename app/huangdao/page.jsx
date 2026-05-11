import HuangdaoClient from './client'

export const metadata = {
  title: '今日黄道选号 - 双色球大乐透命理选号',
  description: '基于农历日干支和吉时辰的命理选号工具，每日黄道吉时生财星入局，智能生成双色球和大乐透号码。仅供娱乐。',
  keywords: ['今日黄道选号', '黄道吉日选号', '双色球今日号码', '大乐透今日号码', '命理选号', '吉时选号'],
  openGraph: {
    title: '今日黄道选号 | 吉日选号工具',
    description: '基于农历日干支和吉时辰，每日黄道吉时生财星入局',
    url: 'https://jrxh.vercel.app/huangdao',
  },
  alternates: {
    canonical: 'https://jrxh.vercel.app/huangdao',
  },
}

export default function HuangdaoPage() {
  return <HuangdaoClient />
}
