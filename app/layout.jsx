import './globals.css'
import TopTabs from '@/components/TopTabs'
import ThemeToggle from '@/components/ThemeToggle'
import Logo from '@/components/Logo'

const SITE_URL = 'https://jrxh.vercel.app'
const SITE_NAME = '吉祥选号'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - 彩票命理选号工具 | 双色球大乐透`,
    template: `%s | ${SITE_NAME}`,
  },
  description: '基于中国传统命理学的彩票选号工具，提供今日黄道选号和生辰本命选号两种模式，支持双色球和大乐透。仅供娱乐，理性购彩。',
  keywords: [
    '彩票选号', '双色球选号', '大乐透选号', '命理选号',
    '黄道吉日选号', '生辰八字选号', '五行选号',
    '彩票号码生成', '幸运号码', '吉祥选号',
    'lottery number picker', 'Chinese fortune numbers',
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} - 基于命理学的彩票选号工具`,
    description: '今日黄道选号 + 生辰本命选号，支持双色球和大乐透。传统命理与现代设计的结合。',
    images: [
      {
        url: `${SITE_URL}/og.png`,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} - 彩票命理选号工具`,
    description: '基于中国传统命理学的彩票选号，支持双色球和大乐透',
    images: [`${SITE_URL}/og.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
}

// 防止主题闪烁的内联脚本
const themeScript = `
(function(){
  try{
    var t=localStorage.getItem('theme');
    if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches)){
      document.documentElement.classList.add('dark');
    }
  }catch(e){}
})()
`

// JSON-LD 结构化数据（Google 富片段 + 百度结构化）
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: SITE_NAME,
  description: '基于中国传统命理学的彩票选号工具，提供今日黄道选号和生辰本命选号',
  url: SITE_URL,
  applicationCategory: 'EntertainmentApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'CNY',
  },
  featureList: [
    '今日黄道选号 - 基于农历日干支和吉时',
    '生辰本命选号 - 基于八字五行补缺',
    '支持双色球和大乐透',
  ],
  inLanguage: 'zh-CN',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* 百度站长验证 - 添加后在百度搜索资源平台提交 */}
        <meta name="baidu-site-verification" content="" />
      </head>
      <body className="h-[100dvh] overflow-hidden bg-bg-primary text-text-primary font-chinese antialiased">
        <div className="max-w-lg mx-auto h-full flex flex-col">
          <div className="flex items-center justify-between px-4 pt-3 shrink-0">
            <div className="flex items-center gap-2">
              <Logo size={32} />
              <span className="text-sm font-medium text-text-primary">{SITE_NAME}</span>
            </div>
            <ThemeToggle />
          </div>
          <div className="shrink-0">
            <TopTabs />
          </div>
          <div className="flex-1 min-h-0">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
