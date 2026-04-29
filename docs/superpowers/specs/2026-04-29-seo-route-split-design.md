# SEO 路由拆分设计

日期：2026-04-29

## 目标

将单页面双 tab 架构拆分为两个独立路由页面，使"今日黄道选号"和"生辰本命选号"分别被搜索引擎独立收录。

## 当前问题

- 两个功能共享 `/` 一个 URL，tab 切换不改 URL
- 整页 `'use client'` 纯客户端渲染
- 只有 `layout.jsx` 里一套固定 metadata，两个功能无法区分
- 生辰本命内容需要用户交互后才渲染，搜索引擎完全不可见

## 路由设计

```
/          → 301 redirect to /huangdao
/huangdao  → 今日黄道选号页面
/bazi      → 生辰本命选号页面
```

## 文件结构

```
app/
  page.jsx                 → redirect('/huangdao')
  layout.jsx               → 保持不变
  globals.css              → 保持不变
  huangdao/
    page.jsx               → server component，导出 metadata，渲染 <HuangdaoClient />
    client.jsx             → 'use client'，黄道选号的完整交互
  bazi/
    page.jsx               → server component，导出 metadata，渲染 <BaziClient />
    client.jsx             → 'use client'，本命选号的完整交互
```

## 元数据

| 路由 | title | description |
|------|-------|-------------|
| `/huangdao` | 今日黄道选号 - 双色球大乐透 | 基于农历日干支和吉时辰的命理选号工具，每日黄道吉时生财星入局 |
| `/bazi` | 生辰本命选号 - 双色球大乐透 | 根据生辰八字五行补缺原理选号，缺什么补什么，纳音定蓝球 |

## 组件改动清单

### TopTabs

- 从 `onTabChange` 回调模式改为 `<Link>` 路由跳转
- 使用 `usePathname()` 判断当前路由来高亮
- 移动到 `layout.jsx` 中，两个页面共享相同的顶部导航

### page.jsx → 拆分为 huangdao/client.jsx + bazi/client.jsx

`app/page.jsx` 当前包含的状态逻辑拆到两个独立的 `'use client'` 组件中：

**HuangdaoClient** (`app/huangdao/client.jsx`):
- 保留：`lotteryType`, `regenerateCount`, `todayNumbers`, `handleRegenerate`, `handleCopy`, `handleTypeChange`, `currentNumbers`, `currentJieDu`
- 移除：`activeTab`, `birthResult`, `handleBirthGenerate` 相关
- Same `BallGrid`, `JieDu`, `BottomBar`, `DisclaimerModal`, inline warning, fixed bottom warning

**BaziClient** (`app/bazi/client.jsx`):
- 保留：`lotteryType`, `birthResult`, `handleBirthGenerate`, `handleCopy`, `handleTypeChange`, `currentNumbers`, `currentJieDu`, `currentWuxingAnalysis`
- 移除：`activeTab`, `regenerateCount`, `todayNumbers` 相关
- Same `BallGrid`, `JieDu`, `BottomBar`, `BirthdayForm`, `DisclaimerModal`, inline warning, fixed bottom warning

### 不变组件

`BallGrid`, `JieDu`, `BirthdayForm`, `DisclaimerModal`, `BottomBar` — 纯粹展示/输入组件，不需要改动。

### 共享布局

`TopTabs` 从 page 移到 `layout.jsx` 中，两个页面共用，避免在各自 page 里重复引入。Layout 需要读取 pathname，所以 layout 也要改为 `'use client'`。`metadata` 需要从 layout 中移除，改到各 page 中导出。由于 metadata 和 client component 不能共存，各 page 保持 server component 只做 metadata 导出 + 渲染对应的 client 组件。

## 测试要点

- [ ] 访问 `/` 自动跳转到 `/huangdao`
- [ ] `/huangdao` 页面正常显示，黄道选号功能完整
- [ ] `/bazi` 页面正常显示，本命选号功能完整
- [ ] Tab 按钮点击切换路由，高亮对应正确的 tab
- [ ] 每个页面的 Disclaimer 弹窗独立（刷新即弹）
- [ ] 底部提示条、内联警告两个页面都正常显示
- [ ] 切换彩票类型（双色球/大乐透）在两个页面都正常工作
- [ ] 复制号码功能正常
- [ ] 每个路由 `<head>` 中的 title 和 description 独立且正确
