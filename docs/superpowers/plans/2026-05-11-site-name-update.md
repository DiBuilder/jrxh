# 网站名称更新实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将网站名称从"吉祥选号"更新为"吉日选号工具"，并优化SEO关键词

**Architecture:** 简单的文本替换任务，修改5个文件中的网站名称和关键词，不涉及功能逻辑变化

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4

---

## 文件结构

### 修改的文件
- `app/layout.jsx` - 核心配置：SITE_NAME常量和keywords数组
- `app/bazi/page.jsx` - 页面标题
- `app/huangdao/page.jsx` - 页面标题
- `README.md` - 项目标题
- `CLAUDE.md` - 项目概述

### 不修改的文件
- `components/Logo.jsx` - Logo文字保持"吉祥"不变

---

## Task 1: 修改核心配置文件

**Files:**
- Modify: `app/layout.jsx:7-21`

- [ ] **Step 1: 修改SITE_NAME常量**

将第7行的SITE_NAME从'吉祥选号'改为'吉日选号工具'：

```javascript
const SITE_NAME = '吉日选号工具'
```

- [ ] **Step 2: 更新keywords数组**

将第19行的'吉祥选号'改为'吉日选号工具'，并在数组末尾添加新关键词：

```javascript
keywords: [
  '彩票选号', '双色球选号', '大乐透选号', '命理选号',
  '黄道吉日选号', '生辰八字选号', '五行选号',
  '彩票号码生成', '幸运号码', '吉日选号工具',
  '吉日选号', '黄道吉日', '吉日选号器',
  'lottery number picker', 'Chinese fortune numbers',
],
```

- [ ] **Step 3: 验证修改**

检查修改后的代码确保语法正确，没有遗漏的引号或逗号。

- [ ] **Step 4: 提交更改**

```bash
git add app/layout.jsx
git commit -m "refactor: 更新网站名称为吉日选号工具并优化SEO关键词"
```

---

## Task 2: 更新页面标题

**Files:**
- Modify: `app/bazi/page.jsx`
- Modify: `app/huangdao/page.jsx`

- [ ] **Step 1: 修改生辰本命选号页面标题**

在`app/bazi/page.jsx`中找到metadata导出，将标题中的'吉祥选号'改为'吉日选号工具'：

```javascript
export const metadata = {
  title: '生辰本命选号 | 吉日选号工具',
  description: '基于生辰八字的命理选号，五行补缺，支持双色球和大乐透',
}
```

- [ ] **Step 2: 修改今日黄道选号页面标题**

在`app/huangdao/page.jsx`中找到metadata导出，将标题中的'吉祥选号'改为'吉日选号工具'：

```javascript
export const metadata = {
  title: '今日黄道选号 | 吉日选号工具',
  description: '基于今日黄历吉时选号，支持双色球和大乐透',
}
```

- [ ] **Step 3: 验证修改**

检查两个文件的metadata导出语法正确。

- [ ] **Step 4: 提交更改**

```bash
git add app/bazi/page.jsx app/huangdao/page.jsx
git commit -m "refactor: 更新页面标题中的网站名称"
```

---

## Task 3: 更新项目文档

**Files:**
- Modify: `README.md:1`
- Modify: `CLAUDE.md:7`

- [ ] **Step 1: 修改README.md标题**

将第1行的标题从`# 吉祥选号 (Jixiang Xuanhao)`改为：

```markdown
# 吉日选号工具 (Jiri Xuanhao Gongju)
```

- [ ] **Step 2: 修改CLAUDE.md项目概述**

将第7行的项目概述从`"吉祥选号"`改为`"吉日选号工具"`：

```markdown
"吉日选号工具" — 基于中国传统命理学的彩票选号工具（双色球/大乐透），提供两种选号模式：今日黄道选号和生辰本命选号。
```

- [ ] **Step 3: 验证修改**

检查两个文件的Markdown格式正确。

- [ ] **Step 4: 提交更改**

```bash
git add README.md CLAUDE.md
git commit -m "docs: 更新项目文档中的网站名称"
```

---

## Task 4: 验证和测试

**Files:**
- None (verification only)

- [ ] **Step 1: 启动开发服务器**

```bash
pnpm dev
```

- [ ] **Step 2: 验证页面显示**

在浏览器中访问以下页面，检查标题显示为"吉日选号工具"：
- http://localhost:3000/huangdao
- http://localhost:3000/bazi

- [ ] **Step 3: 检查浏览器标签页**

确认浏览器标签页显示正确的标题格式：
- "今日黄道选号 | 吉日选号工具"
- "生辰本命选号 | 吉日选号工具"

- [ ] **Step 4: 验证SEO元数据**

在页面源代码中检查：
- `<title>`标签包含"吉日选号工具"
- `<meta name="description">`内容正确
- `<meta name="keywords">`包含新增的关键词

- [ ] **Step 5: 检查OpenGraph标签**

验证OpenGraph元数据：
- `og:title`包含"吉日选号工具"
- `og:site_name`为"吉日选号工具"

- [ ] **Step 6: 停止开发服务器**

按`Ctrl+C`停止开发服务器。

- [ ] **Step 7: 最终提交**

```bash
git add .
git commit -m "chore: 完成网站名称更新为吉日选号工具"
```

---

## 验证清单

- [ ] 所有页面标题显示为"吉日选号工具"
- [ ] 浏览器标签页显示正确
- [ ] OpenGraph和Twitter卡片显示正确
- [ ] SEO关键词包含新增词汇
- [ ] Logo保持不变
- [ ] 功能测试通过
- [ ] 所有更改已提交

---

## 注意事项

1. **Logo不修改**：`components/Logo.jsx`中的"吉祥"文字保持不变
2. **功能不受影响**：此次修改仅涉及文本内容，不影响选号算法或用户交互
3. **SEO优化**：新增的关键词有助于提升搜索引擎可见性
4. **向后兼容**：URL结构保持不变，无需重定向
