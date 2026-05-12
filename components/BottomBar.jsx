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

  return (
    <div className="backdrop-blur-xl bg-bg-primary/80 border-t border-border/50">
      <div className="flex items-center justify-center gap-2.5 sm:gap-3 py-2.5 sm:py-3 px-4 sm:px-5 max-w-lg mx-auto">
        {/* 彩票类型切换 */}
        <div className="flex gap-1 bg-bg-tertiary/80 rounded-xl p-1 border border-border/30">
          <button
            onClick={() => onTypeChange('ssq')}
            className={`px-4 py-1.5 text-xs sm:text-sm rounded-lg transition-all duration-300 ${
              lotteryType === 'ssq'
                ? 'bg-white dark:bg-bg-tertiary text-text-primary shadow-sm ring-1 ring-border/50 font-medium'
                : 'text-text-tertiary hover:text-text-secondary'
            }`}
          >
            双色球
          </button>
          <button
            onClick={() => onTypeChange('dlt')}
            className={`px-4 py-1.5 text-xs sm:text-sm rounded-lg transition-all duration-300 ${
              lotteryType === 'dlt'
                ? 'bg-white dark:bg-bg-tertiary text-text-primary shadow-sm ring-1 ring-border/50 font-medium'
                : 'text-text-tertiary hover:text-text-secondary'
            }`}
          >
            大乐透
          </button>
        </div>

        {/* 复制按钮 */}
        <button
          onClick={handleCopy}
          className="px-5 py-1.5 text-xs sm:text-sm rounded-xl font-medium whitespace-nowrap
            transition-all duration-300 active:scale-95"
          style={{
            background: copied
              ? 'var(--color-jade)'
              : 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-dark) 100%)',
            color: 'white',
            boxShadow: copied
              ? '0 4px 14px rgba(45, 125, 95, 0.3)'
              : '0 4px 14px var(--color-accent-glow)',
          }}
        >
          {copied ? '✓ 已复制' : '复制号码'}
        </button>
      </div>
    </div>
  )
}
