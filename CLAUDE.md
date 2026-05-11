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

## 架构

### 路由结构 (App Router)

- `/` — 重定向到 `/huangdao`
- `/huangdao` — 今日黄道选号（基于当日干支+吉时）
- `/bazi` — 生辰本命选号（基于用户生辰八字）

每个路由由 Server Component 的 `page.jsx` + Client Component 的 `client.jsx` 组成。`page.jsx` 负责 metadata 导出，`client.jsx` 包含所有交互逻辑。

### 核心库 (`lib/`)

- `lottery.js` — 选号算法核心。`generateHuangdao()` 使用种子 LCG（线性同余生成器），`generateBirth()` 使用 `Date.now()` 时间戳。底层共用 `seededRandom` + `pickUnique` 不放回抽取机制。
- `lunar.js` — 农历/干支/吉时/八字排盘，封装 `lunar-javascript` 库。
- `wuxing.js` — 五行映射（天干地支→五行）、河图尾数、纳音五行、号码池构建。

### 组件 (`components/`)

- `TopTabs.jsx` — 顶部导航（黄道/本命切换），使用 Next.js `Link` + `usePathname`
- `BallGrid.jsx` — 号码球展示（`memo` 优化）
- `BottomBar.jsx` — 底部操作栏（双色球/大乐透切换 + 复制号码）
- `BirthdayForm.jsx` — 生辰信息输入表单
- `JieDu.jsx` — 解断语展示（`memo` 优化）
- `DisclaimerModal.jsx` — 免责声明弹窗（首次访问展示，sessionStorage 记录状态）

### 样式

使用 Tailwind CSS v4 的 `@theme` 指令定义自定义主题变量（`globals.css`）：
- 颜色：`bg-deep`(深红)、`bg-mid`(中红)、`gold`/`gold-light`/`gold-dark`(金色系)
- 字体：`chinese` (宋体/衬线)
- 动画：`marquee` (底部跑马灯)

路径别名 `@/*` 映射到项目根目录（`jsconfig.json`）。

## 关键设计决策

- 黄道选号的种子 = 干支索引 × 100 + 吉时索引 + 换注计数 × 7，保证同一天基础种子相同
- 本命选号以八字五行为核心：红球补所缺五行（河图尾数映射），蓝球取日柱纳音五行
- 所有 Client Component 使用 `'use client'` 指令，性能敏感组件使用 `memo` 包裹
- 免责声明使用 `sessionStorage` 控制展示，跨页面共享状态
