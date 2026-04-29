import HuangdaoClient from './client'

export const metadata = {
  title: '今日黄道选号 - 双色球大乐透',
  description: '基于农历日干支和吉时辰的命理选号工具，每日黄道吉时生财星入局',
}

export default function HuangdaoPage() {
  return <HuangdaoClient />
}
