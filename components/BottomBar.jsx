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
