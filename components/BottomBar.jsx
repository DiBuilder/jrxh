'use client'
import { useState } from 'react'

const btnBase = "px-4 py-1.5 text-sm rounded-lg border-2 transition-colors"

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
    <div className="sticky bottom-8 bg-bg-deep/95 backdrop-blur-sm border-t border-gold-dark/40">
      <div className="flex items-center justify-center gap-4 py-4 px-4">
        <div className="flex gap-1">
          <button
            onClick={() => onTypeChange('ssq')}
            className={`${btnBase} ${
              lotteryType === 'ssq'
                ? 'bg-gold text-bg-deep border-gold font-bold'
                : 'bg-transparent text-gold border-gold-dark hover:border-gold'
            }`}
          >
            双色球
          </button>
          <button
            onClick={() => onTypeChange('dlt')}
            className={`${btnBase} ${
              lotteryType === 'dlt'
                ? 'bg-gold text-bg-deep border-gold font-bold'
                : 'bg-transparent text-gold border-gold-dark hover:border-gold'
            }`}
          >
            大乐透
          </button>
        </div>
        <button onClick={handleCopy} className={`${btnBase} bg-gold text-bg-deep border-gold font-bold hover:bg-gold-light`}>
          {copied ? '已复制' : '复制号码'}
        </button>
      </div>
    </div>
  )
}
