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
    <div className="backdrop-blur-xl bg-white/70 dark:bg-bg-primary/70 border-t border-border/50">
      <div className="flex items-center justify-center gap-2 sm:gap-3 py-2.5 sm:py-3 px-3 sm:px-4 max-w-lg mx-auto">
        {/* 彩票类型切换 */}
        <div className="flex gap-0.5 sm:gap-1 bg-bg-tertiary rounded-lg sm:rounded-xl p-0.5 sm:p-1">
          <button
            onClick={() => onTypeChange('ssq')}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-md sm:rounded-lg transition-all duration-200 ${
              lotteryType === 'ssq'
                ? 'bg-white dark:bg-bg-secondary text-text-primary shadow-sm font-medium'
                : 'text-text-tertiary hover:text-text-secondary'
            }`}
          >
            双色球
          </button>
          <button
            onClick={() => onTypeChange('dlt')}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-md sm:rounded-lg transition-all duration-200 ${
              lotteryType === 'dlt'
                ? 'bg-white dark:bg-bg-secondary text-text-primary shadow-sm font-medium'
                : 'text-text-tertiary hover:text-text-secondary'
            }`}
          >
            大乐透
          </button>
        </div>

        {/* 复制按钮 */}
        <button
          onClick={handleCopy}
          className="px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg sm:rounded-xl bg-accent text-white font-medium
            hover:bg-accent-dark active:scale-95 transition-all duration-200
            shadow-sm shadow-accent/20 whitespace-nowrap"
        >
          {copied ? '已复制' : '复制号码'}
        </button>
      </div>
    </div>
  )
}
