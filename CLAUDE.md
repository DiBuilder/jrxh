# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

"吉日选号工具" — 基于中国传统命理学的彩票选号工具（双色球/大乐透），提供两种选号模式：今日黄道选号和生辰本命选号。

## 常用命令

```bash
pnpm install          # 安装依赖
pnpm dev              # 启动开发服务器 (http://localhost:3000)
pnpm build            # 构建生产版本
pnpm start            # 启动生产服务器
```

包管理器为 **pnpm**，不要使用 npm 或 yarn。

## 技术栈

- **框架**: Next.js 16 (App Router)，ES Module (`"type": "module"`)
- **UI**: React 19 + Tailwind CSS v4 (通过 `@tailwindcss/postcss` 插件)
- **核心依赖**: `lunar-javascript` — 农历/干支/八字计算
- **部署**: Vercel (通过 GitHub Actions 自动部署)
- **域名**: https://www.jrxh.top
- **统计**: Umami (umami.scorp.fun)

## 架构

### 路由结构 (App Router)

- `/` — 今日黄道选号（基于当日干支+吉时），SEO 内容由 Server Component 渲染
- `/bazi` — 生辰本命选号（基于用户生辰八字），SEO 内容由 Server Component 渲染
- `/huangdao` — 301 永久重定向到 `/`（保留旧 URL SEO 权重）

每个路由由 Server Component 的 `page.jsx` + Client Component 组成。`page.jsx` 负责 metadata 导出和 SEO 静态内容（H1、描述文本），Client Component 包含所有交互逻辑。免责声明弹窗作为覆盖层渲染，不替换页面内容。

### 核心库 (`lib/`)

- `lottery.js` — 选号算法核心。`generateHuangdao()` 使用种子 LCG（线性同余生成器），`generateBirth()` 使用 `Date.now()` 时间戳。底层共用 `seededRandom` + `pickUnique` 不放回抽取机制。
- `lunar.js` — 农历/干支/吉时/八字排盘，封装 `lunar-javascript` 库。
- `wuxing.js` — 五行映射（天干地支→五行）、河图尾数、纳音五行、号码池构建。

### 组件 (`components/`)

- `TopTabs.jsx` — 顶部胶囊式导航（`/` 和 `/bazi` 切换），使用 Next.js `Link` + `usePathname`
- `BallGrid.jsx` — 号码球展示（`memo` 优化，发光球体 + 逐个揭示动画）
- `BottomBar.jsx` — 底部操作栏（双色球/大乐透切换 + 复制号码）
- `BirthdayForm.jsx` — 生辰信息输入表单（玻璃卡片风格）
- `JieDu.jsx` — 解断语展示（`memo` 优化，五行分析卡片）
- `DisclaimerModal.jsx` — 免责声明弹窗（覆盖层，首次访问展示，sessionStorage 记录状态）
- `Logo.jsx` — SVG Logo（渐变背景 + 装饰圆环）
- `ThemeToggle.jsx` — 主题切换（浅色/跟随/深色）

### 样式

使用 Tailwind CSS v4 的 `@theme` 指令定义自定义主题变量（`globals.css`）：
- 颜色：朱砂红 `accent`、帝王金 `gold`、翡翠绿 `jade`
- 字体：`chinese` (衬线字体：Noto Serif SC / STSong)
- 动画：`marquee`（跑马灯）、`orb-reveal`（球体揭示）、`float-in`、`scale-in`、`fade-up`
- 工具类：`glass-card`（玻璃卡片）、`gold-accent-line`（金色装饰线）、`grain-overlay`（颗粒纹理）、`mesh-bg`（渐变网格背景）

路径别名 `@/*` 映射到项目根目录（`jsconfig.json`）。

## 关键设计决策

- 黄道选号的种子 = 干支索引 × 100 + 吉时索引 + 换注计数 × 7，保证同一天基础种子相同
- 本命选号以八字五行为核心：红球补所缺五行（河图尾数映射），蓝球取日柱纳音五行
- 所有 Client Component 使用 `'use client'` 指令，性能敏感组件使用 `memo` 包裹
- 免责声明使用 `sessionStorage` 控制展示，跨页面共享状态
- SEO 关键内容（H1、描述文本）在 Server Component 中以 `sr-only` 渲染，搜索引擎可直接读取
- og:image 使用 `public/og.svg`（注意：微信/Twitter 等平台可能不支持 SVG，建议后续替换为 PNG）
