import BaziClient from './client'

export const metadata = {
  title: '生辰本命选号 - 双色球大乐透',
  description: '根据生辰八字五行补缺原理选号，缺什么补什么，纳音定蓝球',
}

export default function BaziPage() {
  return <BaziClient />
}
