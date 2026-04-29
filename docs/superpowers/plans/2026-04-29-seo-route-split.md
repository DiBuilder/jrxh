# SEO 路由拆分 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将单页面双 tab 架构拆分为 `/huangdao` 和 `/bazi` 两个独立路由，各自导出 metadata，提升 SEO。

**Architecture:** 两个独立的 Next.js 路由页面，各自是 server component 导出 metadata + 渲染对应的 client component。TopTabs 从状态切换改为 `<Link>` 路由跳转，移入 layout。`/` 做 redirect 到 `/huangdao`。

**Tech Stack:** Next.js 16 App Router, React, Tailwind CSS v4, lunar-javascript

---

### Task 1: 改造 TopTabs 为路由链接

**Files:**
- Modify: `components/TopTabs.jsx`

将 TopTabs 从 `onTabChange` 回调模式改为 `<Link>` 路由跳转，用 `usePathname()` 判断高亮。

- [ ] **Step 1: 重写 TopTabs.jsx**

当前内容：
```jsx
'use client'

export default function TopTabs({ activeTab, onTabChange }) {
  return (
    <div className="flex justify-center gap-2 pt-4 pb-2">
      <button
        onClick={() => onTabChange('huangdao')}
        className={`px-6 py-2 text-lg rounded-lg border-2 transition-all ${
          activeTab === 'huangdao'
            ? 'bg-gold text-bg-deep border-gold font-bold'
            : 'bg-transparent text-gold border-gold-dark hover:border-gold'
        }`}
      >
        今日黄道选号
      </button>
      <button
        onClick={() => onTabChange('birth')}
        className={`px-6 py-2 text-lg rounded-lg border-2 transition-all ${
          activeTab === 'birth'
            ? 'bg-gold text-bg-deep border-gold font-bold'
            : 'bg-transparent text-gold border-gold-dark hover:border-gold'
        }`}
      >
        生辰本命选号
      </button>
    </div>
  )
}
```

替换为：
```jsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function TopTabs() {
  const pathname = usePathname()
  const btnBase = "px-6 py-2 text-lg rounded-lg border-2 transition-all"
  const activeCls = 'bg-gold text-bg-deep border-gold font-bold'
  const inactiveCls = 'bg-transparent text-gold border-gold-dark hover:border-gold'

  return (
    <div className="flex justify-center gap-2 pt-4 pb-2">
      <Link href="/huangdao" className={`${btnBase} ${pathname === '/huangdao' ? activeCls : inactiveCls}`}>
        今日黄道选号
      </Link>
      <Link href="/bazi" className={`${btnBase} ${pathname === '/bazi' ? activeCls : inactiveCls}`}>
        生辰本命选号
      </Link>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/TopTabs.jsx
git commit -m "refactor: change TopTabs from callback to Link-based routing"
```

---

### Task 2: 改造 layout 为 client component，嵌入 TopTabs，移除 metadata

**Files:**
- Modify: `app/layout.jsx`

Layout 变为 client component 以使用 `usePathname`（供 TopTabs），移除 metadata export（各 page 自行导出）。

- [ ] **Step 1: 重写 layout.jsx**

当前内容：
```jsx
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
```

替换为：
```jsx
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
```

- [ ] **Step 2: Commit**

```bash
git add app/layout.jsx
git commit -m "refactor: move TopTabs into layout, remove metadata for per-page export"
```

---

### Task 3: 创建 /huangdao 路由

**Files:**
- Create: `app/huangdao/page.jsx`
- Create: `app/huangdao/client.jsx`

将原 page.jsx 中黄道选号相关逻辑提取为 HuangdaoClient，page.jsx 作为 server component 导出 metadata 并渲染它。

- [ ] **Step 1: 创建 app/huangdao/page.jsx**

```jsx
import HuangdaoClient from './client'

export const metadata = {
  title: '今日黄道选号 - 双色球大乐透',
  description: '基于农历日干支和吉时辰的命理选号工具，每日黄道吉时生财星入局',
}

export default function HuangdaoPage() {
  return <HuangdaoClient />
}
```

- [ ] **Step 2: 创建 app/huangdao/client.jsx**

```jsx
'use client'
import { useState, useCallback, useMemo } from 'react'
import BallGrid from '@/components/BallGrid'
import BottomBar from '@/components/BottomBar'
import DisclaimerModal from '@/components/DisclaimerModal'
import JieDu from '@/components/JieDu'
import { getTodayLunar, getLuckyShiChen, getDayGanZhiIndex } from '@/lib/lunar'
import { generateHuangdao } from '@/lib/lottery'

function makeHuangdaoSentence(lunar, luckyList) {
  const ganzhi = lunar.getDayInGanZhi()
  const dayName = ganzhi + '日'
  const shiChen = luckyList[0]?.name || '子'
  return `今日${dayName}，${shiChen}时吉时，生财星入局`
}

export default function HuangdaoClient() {
  const [showDisclaimer, setShowDisclaimer] = useState(true)
  const [lotteryType, setLotteryType] = useState('ssq')
  const [regenerateCount, setRegenerateCount] = useState(0)

  const todayNumbers = useMemo(() => {
    const lunar = getTodayLunar()
    const idx = getDayGanZhiIndex(lunar)
    const lucky = getLuckyShiChen(lunar)
    const seed = idx * 100 + (lucky[0]?.index || 0) + regenerateCount * 7
    return {
      numbers: generateHuangdao(seed, lotteryType),
      jieDu: makeHuangdaoSentence(lunar, lucky),
    }
  }, [lotteryType, regenerateCount])

  const handleRegenerate = useCallback(() => {
    setRegenerateCount(c => c + 1)
  }, [])

  const labels = lotteryType === 'ssq'
    ? { red: '红球', blue: '蓝球' }
    : { red: '前区', blue: '后区' }

  const handleCopy = useCallback(() => {
    if (!todayNumbers.numbers) return ''
    const reds = todayNumbers.numbers.red.map(n => String(n).padStart(2, '0')).join(' ')
    const blues = todayNumbers.numbers.blue.map(n => String(n).padStart(2, '0')).join(' ')
    const name = lotteryType === 'ssq' ? '双色球' : '大乐透'
    return `【${name}】${labels.red}：${reds}  ${labels.blue}：${blues}`
  }, [todayNumbers.numbers, lotteryType, labels])

  const handleTypeChange = useCallback((type) => {
    setLotteryType(type)
    setRegenerateCount(0)
  }, [])

  if (showDisclaimer) {
    return <DisclaimerModal onAgree={() => setShowDisclaimer(false)} />
  }

  return (
    <div className="min-h-screen pb-24 max-w-lg mx-auto">
      <div className="flex flex-col items-center pt-2">
        <button
          onClick={handleRegenerate}
          className="mt-4 px-6 py-2 text-base rounded-lg border-2 border-gold bg-transparent text-gold hover:bg-gold hover:text-bg-deep transition-all"
        >
          换一注
        </button>

        <BallGrid
          reds={todayNumbers.numbers.red}
          blues={todayNumbers.numbers.blue}
          labelRed={labels.red}
          labelBlue={labels.blue}
        />
        <JieDu text={todayNumbers.jieDu} />

        <p className="mt-6 text-base text-gold-light/70 text-center px-4 leading-relaxed">
          本工具仅供娱乐，不构成购彩建议，彩票中奖号码完全随机，理性购彩，量力而行
        </p>
      </div>

      <BottomBar
        lotteryType={lotteryType}
        onTypeChange={handleTypeChange}
        numbers={todayNumbers.numbers}
        onCopy={handleCopy}
      />

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-amber-900/95 border-t border-amber-500/60 py-2 px-4">
        <p className="max-w-lg mx-auto text-center text-base text-amber-200 font-bold">温馨提示：本工具仅供娱乐，不构成购彩建议，理性购彩，量力而行</p>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add app/huangdao/
git commit -m "feat: add /huangdao route with independent metadata"
```

---

### Task 4: 创建 /bazi 路由

**Files:**
- Create: `app/bazi/page.jsx`
- Create: `app/bazi/client.jsx`

将原 page.jsx 中本命选号相关逻辑提取为 BaziClient，page.jsx 作为 server component 导出 metadata 并渲染它。

- [ ] **Step 1: 创建 app/bazi/page.jsx**

```jsx
import BaziClient from './client'

export const metadata = {
  title: '生辰本命选号 - 双色球大乐透',
  description: '根据生辰八字五行补缺原理选号，缺什么补什么，纳音定蓝球',
}

export default function BaziPage() {
  return <BaziClient />
}
```

- [ ] **Step 2: 创建 app/bazi/client.jsx**

```jsx
'use client'
import { useState, useCallback } from 'react'
import { Solar } from 'lunar-javascript'
import BallGrid from '@/components/BallGrid'
import BottomBar from '@/components/BottomBar'
import DisclaimerModal from '@/components/DisclaimerModal'
import BirthdayForm from '@/components/BirthdayForm'
import JieDu from '@/components/JieDu'
import { getBirthdayBaZi } from '@/lib/lunar'
import { generateBirth } from '@/lib/lottery'
import { countWuxing, findMissingWuxing, getNayinWuxing, getWuxingTailDigits, buildNumberPool, fullNumberPool } from '@/lib/wuxing'

const wuxingLib = { findMissingWuxing, getNayinWuxing, getWuxingTailDigits, buildNumberPool, fullNumberPool }

export default function BaziClient() {
  const [showDisclaimer, setShowDisclaimer] = useState(true)
  const [lotteryType, setLotteryType] = useState('ssq')
  const [birthResult, setBirthResult] = useState(null)

  const handleBirthGenerate = useCallback(({ year, month, day, hour }) => {
    const bazi = getBirthdayBaZi(year, month, day, hour)
    const cnts = countWuxing(bazi)
    const solar = Solar.fromYmd(year, month, day)
    const dayNayin = solar.getLunar().getDayNaYin()
    const result = generateBirth(cnts, dayNayin, lotteryType, wuxingLib)
    const missing = result.missingWx
    setBirthResult({
      numbers: result,
      jieDu: `八字缺${missing}，取${missing}数补之`,
      wuxingAnalysis: {
        missing,
        nayin: dayNayin,
      },
    })
  }, [lotteryType])

  const labels = lotteryType === 'ssq'
    ? { red: '红球', blue: '蓝球' }
    : { red: '前区', blue: '后区' }

  const currentNumbers = birthResult?.numbers

  const handleCopy = useCallback(() => {
    if (!currentNumbers) return ''
    const reds = currentNumbers.red.map(n => String(n).padStart(2, '0')).join(' ')
    const blues = currentNumbers.blue.map(n => String(n).padStart(2, '0')).join(' ')
    const name = lotteryType === 'ssq' ? '双色球' : '大乐透'
    return `【${name}】${labels.red}：${reds}  ${labels.blue}：${blues}`
  }, [currentNumbers, lotteryType, labels])

  const handleTypeChange = useCallback((type) => {
    setLotteryType(type)
    setBirthResult(null)
  }, [])

  if (showDisclaimer) {
    return <DisclaimerModal onAgree={() => setShowDisclaimer(false)} />
  }

  return (
    <div className="min-h-screen pb-24 max-w-lg mx-auto">
      <div className="flex flex-col items-center pt-2">
        <BirthdayForm onGenerate={handleBirthGenerate} />

        {currentNumbers && (
          <>
            <BallGrid
              reds={currentNumbers.red}
              blues={currentNumbers.blue}
              labelRed={labels.red}
              labelBlue={labels.blue}
            />
            <JieDu text={birthResult.jieDu} wuxingAnalysis={birthResult.wuxingAnalysis} />
          </>
        )}

        {!currentNumbers && (
          <div className="py-12 text-gold-light/50 text-base">
            填入生辰信息，点击生成号码
          </div>
        )}

        {currentNumbers && (
          <p className="mt-6 text-base text-gold-light/70 text-center px-4 leading-relaxed">
            本工具仅供娱乐，不构成购彩建议，彩票中奖号码完全随机，理性购彩，量力而行
          </p>
        )}
      </div>

      <BottomBar
        lotteryType={lotteryType}
        onTypeChange={handleTypeChange}
        numbers={currentNumbers}
        onCopy={handleCopy}
      />

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-amber-900/95 border-t border-amber-500/60 py-2 px-4">
        <p className="max-w-lg mx-auto text-center text-base text-amber-200 font-bold">温馨提示：本工具仅供娱乐，不构成购彩建议，理性购彩，量力而行</p>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add app/bazi/
git commit -m "feat: add /bazi route with independent metadata"
```

---

### Task 5: 改造 / 为 redirect

**Files:**
- Modify: `app/page.jsx`

首页改为 redirect 到 `/huangdao`。

- [ ] **Step 1: 重写 app/page.jsx**

替换全部内容为：
```jsx
import { redirect } from 'next/navigation'

export default function HomePage() {
  redirect('/huangdao')
}
```

- [ ] **Step 2: 验证**

启动 dev server，访问 `http://localhost:3000`，应自动跳转到 `/huangdao`。

```bash
curl -s -o /dev/null -w "%{url_effective}" http://localhost:3000
```
期望输出：`http://localhost:3000/huangdao`

- [ ] **Step 3: Commit**

```bash
git add app/page.jsx
git commit -m "feat: redirect / to /huangdao"
```

---

### Task 6: 验证与收尾

**Files:**
- None (manual verification)

- [ ] **Step 1: 验证各路由 metadata**

```bash
# 验证 /huangdao 的 title
curl -s http://localhost:3000/huangdao | grep -o '<title>[^<]*</title>'
# 期望: <title>今日黄道选号 - 双色球大乐透</title>

# 验证 /bazi 的 title
curl -s http://localhost:3000/bazi | grep -o '<title>[^<]*</title>'
# 期望: <title>生辰本命选号 - 双色球大乐透</title>
```

- [ ] **Step 2: 验证功能完整性**

手动检查：
- `/huangdao`：免责弹窗 → 点击"我已阅读" → 号码展示 + 解断语 + 换一注 + 底部提示条 + 内联警告
- `/bazi`：免责弹窗 → 点击"我已阅读" → 填写生日 → 生成号码 + 解断语 + 五行分析 + 内联警告
- 两个页面之间通过 TopTabs 跳转，各自的路由高亮正确
- 切换双色球/大乐透在每个页面都正常工作
- 复制号码正常

- [ ] **Step 3: Commit (if any final tweaks)**
