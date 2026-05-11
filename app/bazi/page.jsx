import BaziClient from './client'

export const metadata = {
  title: '生辰本命选号 - 八字五行补缺选号',
  description: '根据生辰八字五行补缺原理选号，分析命中所缺五行，取对应尾数补之，纳音定蓝球。支持双色球和大乐透。仅供娱乐。',
  keywords: ['生辰八字选号', '五行选号', '本命选号', '八字缺五行', '纳音五行选号', '双色球五行', '大乐透五行'],
  openGraph: {
    title: '生辰本命选号 | 吉日选号工具',
    description: '根据生辰八字五行补缺原理，缺什么补什么，纳音定蓝球',
    url: 'https://jrxh.vercel.app/bazi',
  },
  alternates: {
    canonical: 'https://jrxh.vercel.app/bazi',
  },
}

export default function BaziPage() {
  return <BaziClient />
}
