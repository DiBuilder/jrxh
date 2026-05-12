'use client'
import { memo } from 'react'

function Ball({ num, variant, delay = 0 }) {
  const isRed = variant === 'red'

  return (
    <div
      className="relative group opacity-0 animate-orb-reveal"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* 外层光晕 */}
      <div
        className={`absolute inset-0 rounded-full blur-lg opacity-40 transition-opacity duration-500 group-hover:opacity-70 ${
          isRed ? 'bg-ball-red' : 'bg-ball-blue'
        }`}
        style={{ transform: 'scale(0.7)' }}
      />

      {/* 球体主体 */}
      <div
        className={`relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center
          transition-transform duration-300 ease-out active:scale-90 group-hover:scale-105`}
        style={{
          background: isRed
            ? 'radial-gradient(circle at 35% 30%, #F07058 0%, var(--color-ball-red) 45%, var(--color-ball-red-deep) 100%)'
            : 'radial-gradient(circle at 35% 30%, #6DB5F0 0%, var(--color-ball-blue) 45%, var(--color-ball-blue-deep) 100%)',
          boxShadow: isRed
            ? '0 4px 16px var(--color-ball-red-glow), inset 0 -2px 6px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.2)'
            : '0 4px 16px var(--color-ball-blue-glow), inset 0 -2px 6px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.2)',
        }}
      >
        {/* 高光反射 */}
        <div
          className="absolute top-1.5 left-2.5 w-3 h-2 sm:w-4 sm:h-2.5 rounded-full opacity-40"
          style={{
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.8) 0%, transparent 70%)',
          }}
        />

        {/* 数字 */}
        <span className="relative text-white font-bold text-base sm:text-xl lg:text-2xl drop-shadow-md tabular-nums">
          {String(num).padStart(2, '0')}
        </span>
      </div>
    </div>
  )
}

export default memo(function BallGrid({ reds, blues, labelRed, labelBlue }) {
  return (
    <div className="flex flex-col items-center gap-5 sm:gap-7 py-4 sm:py-6 w-full px-2">
      {/* 红球区 */}
      <div className="flex flex-col items-center gap-3">
        <span className="text-[10px] sm:text-xs font-medium tracking-[0.25em] uppercase text-text-tertiary">
          {labelRed}
        </span>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-3.5 lg:gap-4">
          {reds.map((num, i) => (
            <Ball key={`r-${i}`} num={num} variant="red" delay={i * 80} />
          ))}
        </div>
      </div>

      {/* 装饰分隔线 */}
      <div className="flex items-center gap-3 w-32 sm:w-48">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent" />
        <div className="w-1.5 h-1.5 rounded-full bg-gold opacity-60" />
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent" />
      </div>

      {/* 蓝球区 */}
      <div className="flex flex-col items-center gap-3">
        <span className="text-[10px] sm:text-xs font-medium tracking-[0.25em] uppercase text-text-tertiary">
          {labelBlue}
        </span>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-3.5 lg:gap-4">
          {blues.map((num, i) => (
            <Ball key={`b-${i}`} num={num} variant="blue" delay={(reds.length + i) * 80} />
          ))}
        </div>
      </div>
    </div>
  )
})
