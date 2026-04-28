# 命理彩票选号首页 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 搭建命理彩票选号工具的首页——Next.js App Router + Tailwind CSS v4，双 Tab（今日黄道/生辰本命），中国风视觉。

**Architecture:** Next.js App Router 单页，全部 `'use client'`。lunar-javascript 纯客户端运行。状态集中在 page.jsx，子组件通过 props 接收数据和回调。

**Tech Stack:** Next.js 15 + React 19 + Tailwind CSS v4 + lunar-javascript 1.7.x

---

### Task 1: 初始化 Next.js + Tailwind CSS v4

**Files:**
- Remove: `src/`, `vite.config.js`, `eslint.config.js`, `index.html`
- Modify: `package.json`
- Create: `next.config.js`, `postcss.config.mjs`, `app/globals.css`, `app/layout.jsx`

- [ ] **Step 1: 卸载 Vite 依赖，安装 Next.js + Tailwind**

```bash
npm uninstall vite @vitejs/plugin-react eslint @eslint/js eslint-plugin-react-hooks eslint-plugin-react-refresh globals
npm install next@latest react@latest react-dom@latest
npm install -D tailwindcss @tailwindcss/postcss
```

- [ ] **Step 2: 更新 package.json scripts**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

- [ ] **Step 3: 创建 next.config.js**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {}
export default nextConfig
```

- [ ] **Step 4: 创建 postcss.config.mjs**

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
}
export default config
```

- [ ] **Step 5: 创建 app/globals.css**

```css
@import "tailwindcss";

@theme {
  --color-bg-deep: #8B0000;
  --color-bg-mid: #A52A2A;
  --color-gold: #DAA520;
  --color-gold-light: #FFD700;
  --color-gold-dark: #B8860B;
  --font-family-chinese: "STSong", "SimSun", "Noto Serif SC", serif;
}
```

- [ ] **Step 6: 创建 app/layout.jsx**

```jsx
export const metadata = {
  title: '命理彩票选号 - 黄道吉日选号',
  description: '基于农历和生辰八字的命理彩票选号工具，支持双色球和大乐透',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-[var(--color-bg-deep)] text-[var(--color-gold)] font-[family-name:var(--font-family-chinese)]">
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 7: 删除旧 Vite 文件**

```bash
rm -rf src/ vite.config.js eslint.config.js index.html
```

- [ ] **Step 8: 验证 dev server 启动**

```bash
npm run dev
```

访问 http://localhost:3000，应看到空白深红背景页面。

- [ ] **Step 9: 提交**

```bash
git add -A && git commit -m "feat: migrate from Vite to Next.js + Tailwind CSS v4"
```

---

### Task 2: 实现 lib/lunar.js — 农历查询封装

**Files:**
- Create: `lib/lunar.js`

- [ ] **Step 1: 创建 lib/lunar.js**

```js
import { Solar, Lunar } from 'lunar-javascript'

const DI_ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']

export function getTodayLunar() {
  const now = new Date()
  const solar = Solar.fromYmd(now.getFullYear(), now.getMonth() + 1, now.getDate())
  const lunar = solar.getLunar()
  return lunar
}

export function getTodayGanZhi() {
  const lunar = getTodayLunar()
  return {
    year: lunar.getYearInGanZhi(),
    month: lunar.getMonthInGanZhi(),
    day: lunar.getDayInGanZhi(),
  }
}

export function getJiShi(lunar) {
  const shiChen = lunar.getTimeInGanZhi()
  return shiChen
}

export function getLuckyShiChen(lunar) {
  const dayYi = lunar.getDayYi() || []
  const dayJi = lunar.getDayJi() || []

  const luckyHours = []
  for (let i = 0; i < 12; i++) {
    const branch = DI_ZHI[i]
    const isGood = dayYi.some(yi => yi.includes(branch)) && !dayJi.some(ji => ji.includes(branch))
    if (isGood) luckyHours.push({ index: i, name: branch })
  }

  if (luckyHours.length === 0) {
    luckyHours.push({ index: 0, name: '子' })
  }

  return luckyHours
}

export function getDayGanZhiIndex(lunar) {
  const ganzhi = lunar.getDayInGanZhi()
  return ganzhiToIndex(ganzhi)
}

function ganzhiToIndex(gz) {
  const gan = '甲乙丙丁戊己庚辛壬癸'
  const zhi = '子丑寅卯辰巳午未申酉戌亥'
  const g = gan.indexOf(gz[0])
  const z = zhi.indexOf(gz[1])
  return g * 12 + z
}

export function getBirthdayBaZi(year, month, day, hour) {
  const solar = Solar.fromYmd(year, month, day)
  const lunar = solar.getLunar()
  const baZi = lunar.getEightChar()
  return {
    year: baZi.getYear(),
    month: baZi.getMonth(),
    day: baZi.getDay(),
    time: baZi.getTime(),
  }
}

export function getDayNaYin(lunar) {
  return lunar.getDayNaYin()
}

export function formatGanZhi(gz) {
  return gz
}
```

- [ ] **Step 2: 验证文件语法**

```bash
node -e "import('./lib/lunar.js').then(m => console.log(Object.keys(m)))"
```

预期输出导入的函数名列表。

- [ ] **Step 3: 提交**

```bash
git add lib/lunar.js && git commit -m "feat: add lunar calendar query wrapper"
```

---

### Task 3: 实现 lib/wuxing.js — 五行统计与映射

**Files:**
- Create: `lib/wuxing.js`

- [ ] **Step 1: 创建 lib/wuxing.js**

```js
const WUXING_MAP = {
  '甲': '木', '乙': '木',
  '丙': '火', '丁': '火',
  '戊': '土', '己': '土',
  '庚': '金', '辛': '金',
  '壬': '水', '癸': '水',
  '子': '水', '丑': '土',
  '寅': '木', '卯': '木',
  '辰': '土', '巳': '火',
  '午': '火', '未': '土',
  '申': '金', '酉': '金',
  '戌': '土', '亥': '水',
}

const HETU_MAP = {
  '水': [1, 6],
  '火': [2, 7],
  '木': [3, 8],
  '金': [4, 9],
  '土': [5, 0],
}

const NAYIN_WUXING = {
  '海中金': '金', '炉中火': '火', '大林木': '木', '路旁土': '土',
  '剑锋金': '金', '山头火': '火', '涧下水': '水', '城头土': '土',
  '白蜡金': '金', '杨柳木': '木', '泉中水': '水', '屋上土': '土',
  '金箔金': '金', '覆灯火': '火', '天河水': '水', '大驿土': '土',
  '钗环金': '金', '桑柘木': '木', '大溪水': '水', '沙中土': '土',
  '壁上土': '土', '平地木': '木', '山下火': '火', '长流水': '水',
  '松柏木': '木', '霹雳火': '火', '沙中金': '金', '井泉水': '水',
  '石榴木': '木', '天上火': '火', '大海水': '水', '佛灯火': '火',
}

export function countWuxing(bazi) {
  const chars = bazi.year + bazi.month + bazi.day + bazi.time
  const counts = { '金': 0, '木': 0, '水': 0, '火': 0, '土': 0 }
  for (const ch of chars) {
    const wx = WUXING_MAP[ch]
    if (wx) counts[wx]++
  }
  return counts
}

export function findMissingWuxing(counts) {
  let minWx = null
  let minCount = Infinity
  for (const [wx, count] of Object.entries(counts)) {
    if (count < minCount) {
      minCount = count
      minWx = wx
    }
  }
  return minWx
}

export function getWuxingTailDigits(wx) {
  return HETU_MAP[wx] || []
}

export function getNayinWuxing(nayin) {
  return NAYIN_WUXING[nayin] || '金'
}

export function buildNumberPool(tailDigits, max) {
  const pool = []
  for (let i = 1; i <= max; i++) {
    const lastDigit = i % 10
    if (tailDigits.includes(lastDigit)) {
      pool.push(i)
    }
  }
  return pool
}

export function fullNumberPool(max) {
  const pool = []
  for (let i = 1; i <= max; i++) pool.push(i)
  return pool
}
```

- [ ] **Step 2: 验证**

```bash
node -e "import('./lib/wuxing.js').then(m => console.log(Object.keys(m)))"
```

- [ ] **Step 3: 提交**

```bash
git add lib/wuxing.js && git commit -m "feat: add wuxing analysis and hetu mapping"
```

---

### Task 4: 实现 lib/lottery.js — 选号规则

**Files:**
- Create: `lib/lottery.js`

- [ ] **Step 1: 创建 lib/lottery.js**

```js
const RULES = {
  ssq: { red: { max: 33, count: 6 }, blue: { max: 16, count: 1 } },
  dlt: { red: { max: 35, count: 5 }, blue: { max: 12, count: 2 } },
}

export function getLotteryRules(type) {
  return RULES[type]
}

function seededRandom(seed) {
  let s = seed
  return function () {
    s = (s * 1103515245 + 12345) & 0x7fffffff
    return s / 0x7fffffff
  }
}

function pickUnique(pool, count, rand) {
  const available = [...pool]
  const result = []
  for (let i = 0; i < count && available.length > 0; i++) {
    const idx = Math.floor(rand() * available.length)
    result.push(available[idx])
    available.splice(idx, 1)
  }
  return result.sort((a, b) => a - b)
}

export function generateHuangdao(seed, type) {
  const rules = RULES[type]
  const rand = seededRandom(seed)
  const allRed = Array.from({ length: rules.red.max }, (_, i) => i + 1)
  const allBlue = Array.from({ length: rules.blue.max }, (_, i) => i + 1)
  return {
    red: pickUnique(allRed, rules.red.count, rand),
    blue: pickUnique(allBlue, rules.blue.count, rand),
  }
}

export function generateBirth(wuxingCounts, dayNayin, type, wuxingLib) {
  const missingWx = wuxingLib.findMissingWuxing(wuxingCounts)
  const tailDigits = wuxingLib.getWuxingTailDigits(missingWx)
  const rules = RULES[type]

  const wxPool = wuxingLib.buildNumberPool(tailDigits, rules.red.max)
  const fullRed = wuxingLib.fullNumberPool(rules.red.max)

  const rand = seededRandom(Date.now())

  const redPick = pickUnique(wxPool, Math.min(rules.red.count, wxPool.length), rand)
  if (redPick.length < rules.red.count) {
    const remaining = fullRed.filter(n => !redPick.includes(n))
    redPick.push(...pickUnique(remaining, rules.red.count - redPick.length, rand))
  }

  const nayinWx = wuxingLib.getNayinWuxing(dayNayin)
  const blueDigits = wuxingLib.getWuxingTailDigits(nayinWx)
  const bluePool = wuxingLib.buildNumberPool(blueDigits, rules.blue.max)
  const allBlue = wuxingLib.fullNumberPool(rules.blue.max)

  const bluePick = pickUnique(
    bluePool.length >= rules.blue.count ? bluePool : allBlue,
    rules.blue.count,
    rand
  )

  return {
    red: redPick.sort((a, b) => a - b),
    blue: bluePick.sort((a, b) => a - b),
    missingWx,
    nayinWx,
  }
}
```

- [ ] **Step 2: 验证**

```bash
node -e "import('./lib/lottery.js').then(m => console.log(m.generateHuangdao(12345, 'ssq')))"
```

预期输出类似 `{ red: [3, 8, 15, 22, 27, 31], blue: [7] }`。

- [ ] **Step 3: 提交**

```bash
git add lib/lottery.js && git commit -m "feat: add lottery number generation rules"
```

---

### Task 5: 实现 components/TopTabs.jsx

**Files:**
- Create: `components/TopTabs.jsx`

- [ ] **Step 1: 创建 components/TopTabs.jsx**

```jsx
'use client'

export default function TopTabs({ activeTab, onTabChange }) {
  return (
    <div className="flex justify-center gap-2 pt-4 pb-2">
      <button
        onClick={() => onTabChange('huangdao')}
        className={`px-6 py-2 text-lg rounded-lg border-2 transition-all ${
          activeTab === 'huangdao'
            ? 'bg-[var(--color-gold)] text-[var(--color-bg-deep)] border-[var(--color-gold)] font-bold'
            : 'bg-transparent text-[var(--color-gold)] border-[var(--color-gold-dark)] hover:border-[var(--color-gold)]'
        }`}
      >
        今日黄道选号
      </button>
      <button
        onClick={() => onTabChange('birth')}
        className={`px-6 py-2 text-lg rounded-lg border-2 transition-all ${
          activeTab === 'birth'
            ? 'bg-[var(--color-gold)] text-[var(--color-bg-deep)] border-[var(--color-gold)] font-bold'
            : 'bg-transparent text-[var(--color-gold)] border-[var(--color-gold-dark)] hover:border-[var(--color-gold)]'
        }`}
      >
        生辰本命选号
      </button>
    </div>
  )
}
```

- [ ] **Step 2: 提交**

```bash
git add components/TopTabs.jsx && git commit -m "feat: add TopTabs component"
```

---

### Task 6: 实现 components/BallGrid.jsx

**Files:**
- Create: `components/BallGrid.jsx`

- [ ] **Step 1: 创建 components/BallGrid.jsx**

```jsx
'use client'

const ballSize = 'w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16'

export default function BallGrid({ reds, blues, labelRed, labelBlue }) {
  return (
    <div className="flex flex-col items-center gap-6 py-6 lg:py-10">
      <div className="flex flex-col items-center gap-3">
        <span className="text-sm lg:text-base tracking-widest text-[var(--color-gold-light)]/70">
          {labelRed}
        </span>
        <div className="flex flex-wrap justify-center gap-3 lg:gap-4">
          {reds.map((num, i) => (
            <div
              key={`r-${i}`}
              className={`${ballSize} rounded-full flex items-center justify-center
                bg-[var(--color-bg-mid)] border-2 border-[var(--color-gold)]
                shadow-lg shadow-black/30`}
            >
              <span className="text-[var(--color-gold-light)] font-bold text-lg sm:text-xl lg:text-2xl">
                {String(num).padStart(2, '0')}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-3">
        <span className="text-sm lg:text-base tracking-widest text-[var(--color-gold-light)]/70">
          {labelBlue}
        </span>
        <div className="flex flex-wrap justify-center gap-3 lg:gap-4">
          {blues.map((num, i) => (
            <div
              key={`b-${i}`}
              className={`${ballSize} rounded-full flex items-center justify-center
                bg-[var(--color-bg-mid)] border-2 border-[var(--color-gold-light)]
                shadow-lg shadow-black/30`}
            >
              <span className="text-[var(--color-gold-light)] font-bold text-lg sm:text-xl lg:text-2xl">
                {String(num).padStart(2, '0')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: 提交**

```bash
git add components/BallGrid.jsx && git commit -m "feat: add BallGrid component"
```

---

### Task 7: 实现 components/BirthdayForm.jsx

**Files:**
- Create: `components/BirthdayForm.jsx`

- [ ] **Step 1: 创建 components/BirthdayForm.jsx**

```jsx
'use client'
import { useState } from 'react'

const now = new Date()
const thisYear = now.getFullYear()

export default function BirthdayForm({ onGenerate }) {
  const [year, setYear] = useState(thisYear - 30)
  const [month, setMonth] = useState(1)
  const [day, setDay] = useState(1)
  const [hour, setHour] = useState(0)

  const isValid = year >= 1900 && year <= thisYear && month >= 1 && month <= 12 && day >= 1 && day <= 31

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isValid) onGenerate({ year, month, day, hour })
  }

  const selectClass = "bg-[var(--color-bg-mid)] text-[var(--color-gold)] border border-[var(--color-gold-dark)] rounded px-3 py-2 text-base focus:outline-none focus:border-[var(--color-gold)]"

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 py-4">
      <div className="flex flex-wrap justify-center gap-3">
        <select value={year} onChange={e => setYear(Number(e.target.value))} className={selectClass}>
          {Array.from({ length: thisYear - 1900 + 1 }, (_, i) => 1900 + i).reverse().map(y => (
            <option key={y} value={y}>{y}年</option>
          ))}
        </select>
        <select value={month} onChange={e => setMonth(Number(e.target.value))} className={selectClass}>
          {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
            <option key={m} value={m}>{m}月</option>
          ))}
        </select>
        <select value={day} onChange={e => setDay(Number(e.target.value))} className={selectClass}>
          {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
            <option key={d} value={d}>{d}日</option>
          ))}
        </select>
        <select value={hour} onChange={e => setHour(Number(e.target.value))} className={selectClass}>
          {['子时 23-01', '丑时 01-03', '寅时 03-05', '卯时 05-07', '辰时 07-09', '巳时 09-11',
            '午时 11-13', '未时 13-15', '申时 15-17', '酉时 17-19', '戌时 19-21', '亥时 21-23']
            .map((label, i) => (
              <option key={i} value={i}>{label}</option>
            ))}
        </select>
      </div>
      <button
        type="submit"
        disabled={!isValid}
        className="px-8 py-2 text-lg rounded-lg border-2 border-[var(--color-gold)]
          text-[var(--color-gold)] bg-transparent hover:bg-[var(--color-gold)] hover:text-[var(--color-bg-deep)]
          transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        生成号码
      </button>
    </form>
  )
}
```

- [ ] **Step 2: 提交**

```bash
git add components/BirthdayForm.jsx && git commit -m "feat: add BirthdayForm component"
```

---

### Task 8: 实现 components/JieDu.jsx

**Files:**
- Create: `components/JieDu.jsx`

- [ ] **Step 1: 创建 components/JieDu.jsx**

```jsx
'use client'

export default function JieDu({ text, wuxingAnalysis }) {
  return (
    <div className="flex flex-col items-center gap-2 px-4 py-3 text-center">
      <p className="text-[var(--color-gold-light)] text-base leading-relaxed max-w-md">
        {text}
      </p>
      {wuxingAnalysis && (
        <div className="mt-2 text-sm text-[var(--color-gold-light)]/70">
          <p>缺五行：<span className="text-[var(--color-gold)] font-bold">{wuxingAnalysis.missing}</span></p>
          <p>纳音五行：<span className="text-[var(--color-gold)]">{wuxingAnalysis.nayin}</span></p>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: 提交**

```bash
git add components/JieDu.jsx && git commit -m "feat: add JieDu component"
```

---

### Task 9: 实现 components/BottomBar.jsx

**Files:**
- Create: `components/BottomBar.jsx`

- [ ] **Step 1: 创建 components/BottomBar.jsx**

```jsx
'use client'
import { useState } from 'react'

export default function BottomBar({ lotteryType, onTypeChange, numbers, onCopy }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const text = onCopy()
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // 静默忽略剪切板不可用
    }
  }

  const btnBase = "px-5 py-2 text-base rounded-lg border-2 transition-all"

  return (
    <div className="sticky bottom-0 bg-[var(--color-bg-deep)]/95 backdrop-blur-sm border-t border-[var(--color-gold-dark)]/40">
      <div className="flex items-center justify-center gap-4 py-4 px-4">
        <div className="flex gap-1">
          <button
            onClick={() => onTypeChange('ssq')}
            className={`${btnBase} ${
              lotteryType === 'ssq'
                ? 'bg-[var(--color-gold)] text-[var(--color-bg-deep)] border-[var(--color-gold)] font-bold'
                : 'bg-transparent text-[var(--color-gold)] border-[var(--color-gold-dark)] hover:border-[var(--color-gold)]'
            }`}
          >
            双色球
          </button>
          <button
            onClick={() => onTypeChange('dlt')}
            className={`${btnBase} ${
              lotteryType === 'dlt'
                ? 'bg-[var(--color-gold)] text-[var(--color-bg-deep)] border-[var(--color-gold)] font-bold'
                : 'bg-transparent text-[var(--color-gold)] border-[var(--color-gold-dark)] hover:border-[var(--color-gold)]'
            }`}
          >
            大乐透
          </button>
        </div>
        <button onClick={handleCopy} className={`${btnBase} bg-[var(--color-gold)] text-[var(--color-bg-deep)] border-[var(--color-gold)] font-bold hover:bg-[var(--color-gold-light)]`}>
          {copied ? '已复制' : '复制号码'}
        </button>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: 提交**

```bash
git add components/BottomBar.jsx && git commit -m "feat: add BottomBar component"
```

---

### Task 10: 实现 app/page.jsx — 主页面

**Files:**
- Create: `app/page.jsx`

- [ ] **Step 1: 创建 app/page.jsx**

```jsx
'use client'
import { useState, useCallback, useMemo } from 'react'
import { Solar } from 'lunar-javascript'
import TopTabs from '@/components/TopTabs'
import BallGrid from '@/components/BallGrid'
import BottomBar from '@/components/BottomBar'
import BirthdayForm from '@/components/BirthdayForm'
import JieDu from '@/components/JieDu'
import { getTodayLunar, getLuckyShiChen, getDayGanZhiIndex, getBirthdayBaZi } from '@/lib/lunar'
import { generateHuangdao, generateBirth } from '@/lib/lottery'
import { countWuxing, findMissingWuxing, getNayinWuxing, getWuxingTailDigits, buildNumberPool, fullNumberPool } from '@/lib/wuxing'

const wuxingLib = { findMissingWuxing, getNayinWuxing, getWuxingTailDigits, buildNumberPool, fullNumberPool }

function makeHuangdaoSentence(lunar, luckyList) {
  const ganzhi = lunar.getDayInGanZhi()
  const dayName = ganzhi + '日'
  const shiChen = luckyList[0]?.name || '子'
  return `今日${dayName}，${shiChen}时吉时，生财星入局`
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('huangdao')
  const [lotteryType, setLotteryType] = useState('ssq')

  const todayNumbers = useMemo(() => {
    const lunar = getTodayLunar()
    const idx = getDayGanZhiIndex(lunar)
    const lucky = getLuckyShiChen(lunar)
    const seed = idx * 100 + (lucky[0]?.index || 0)
    return {
      numbers: generateHuangdao(seed, lotteryType),
      jieDu: makeHuangdaoSentence(lunar, lucky),
    }
  }, [lotteryType])

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

  const currentNumbers = activeTab === 'huangdao'
    ? todayNumbers.numbers
    : birthResult?.numbers

  const currentJieDu = activeTab === 'huangdao'
    ? todayNumbers.jieDu
    : birthResult?.jieDu || ''

  const currentWuxingAnalysis = activeTab === 'birth'
    ? birthResult?.wuxingAnalysis
    : null

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

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab)
  }, [])

  return (
    <div className="min-h-screen pb-24 max-w-lg mx-auto">
      <TopTabs activeTab={activeTab} onTabChange={handleTabChange} />

      <div className="flex flex-col items-center pt-2">
        {activeTab === 'birth' && (
          <BirthdayForm onGenerate={handleBirthGenerate} />
        )}

        {currentNumbers && (
          <>
            <BallGrid
              reds={currentNumbers.red}
              blues={currentNumbers.blue}
              labelRed={labels.red}
              labelBlue={labels.blue}
            />
            <JieDu text={currentJieDu} wuxingAnalysis={currentWuxingAnalysis} />
          </>
        )}

        {activeTab === 'birth' && !currentNumbers && (
          <div className="py-12 text-[var(--color-gold-light)]/50 text-base">
            填入生辰信息，点击生成号码
          </div>
        )}
      </div>

      <BottomBar
        lotteryType={lotteryType}
        onTypeChange={handleTypeChange}
        numbers={currentNumbers}
        onCopy={handleCopy}
      />
    </div>
  )
}
```

- [ ] **Step 2: 启动 dev server 验证**

```bash
npm run dev
```

访问 http://localhost:3000，验证：
- 默认显示双色球 + 今日黄道 Tab
- 号码球展示正常
- 切换 Tab 到生辰，显示表单
- 切换彩票种类，号码重新生成
- 复制按钮功能正常

- [ ] **Step 3: 提交**

```bash
git add app/page.jsx && git commit -m "feat: wire up main lottery page"
```

---

### Task 11: 最终验证

- [ ] **Step 1: 完整功能验证**

```bash
npm run build && npm run dev
```

验证清单：
1. 首页默认「今日黄道」Tab + 「双色球」，显示 6 红 + 1 蓝
2. 红球从小到大排序，无重复
3. 解读文案显示「今日xx日，xx时吉时，生财星入局」
4. 切换到「生辰本命」Tab，显示年月日时选择器
5. 填写生辰后点击生成，显示号码（从小到大排序）+ 五行分析解读
6. 顶部 Tab 切换后按钮样式正确（激活态金色填充）
7. 底部切换「大乐透」，号码变为 5 前区 + 2 后区（均从小到大排序）
8. 底部「复制号码」，剪切板得到格式化的号码文本
9. 复制后按钮短暂显示「已复制」
10. 生辰表单未填完时，「生成号码」按钮禁用（灰色/半透明）
11. PC 端页面居中（max-w-lg），球体更大（lg:w-16 lg:h-16）
12. 移动端布局正常，底部栏固定

- [ ] **Step 2: 提交**

```bash
git add -A && git commit -m "chore: final verification after integration"
```
