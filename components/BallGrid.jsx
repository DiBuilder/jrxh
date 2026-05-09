'use client'
import { memo } from 'react'

export default memo(function BallGrid({ reds, blues, labelRed, labelBlue }) {
  return (
    <div className="flex flex-col items-center gap-6 sm:gap-8 py-6 sm:py-8 lg:py-12 w-full px-2">
      {/* 红球区 */}
      <div className="flex flex-col items-center gap-3 sm:gap-4">
        <span className="text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase text-text-tertiary">
          {labelRed}
        </span>
        <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 lg:gap-4">
          {reds.map((num, i) => (
            <div
              key={`r-${i}`}
              className="w-11 h-11 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center
                bg-gradient-to-br from-ball-red to-accent-dark
                shadow-lg shadow-ball-red-glow
                transition-transform duration-200 active:scale-95"
            >
              <span className="text-white font-bold text-base sm:text-xl lg:text-2xl drop-shadow-sm">
                {String(num).padStart(2, '0')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 分隔线 */}
      <div className="w-16 sm:w-24 h-px bg-border" />

      {/* 蓝球区 */}
      <div className="flex flex-col items-center gap-3 sm:gap-4">
        <span className="text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase text-text-tertiary">
          {labelBlue}
        </span>
        <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 lg:gap-4">
          {blues.map((num, i) => (
            <div
              key={`b-${i}`}
              className="w-11 h-11 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center
                bg-gradient-to-br from-ball-blue to-blue-600
                shadow-lg shadow-ball-blue-glow
                transition-transform duration-200 active:scale-95"
            >
              <span className="text-white font-bold text-base sm:text-xl lg:text-2xl drop-shadow-sm">
                {String(num).padStart(2, '0')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
})
