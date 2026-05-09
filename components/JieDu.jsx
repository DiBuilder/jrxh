'use client'
import { memo } from 'react'

export default memo(function JieDu({ text, wuxingAnalysis }) {
  return (
    <div className="w-full max-w-md mx-auto px-3 sm:px-4">
      <div className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm">
        {/* 标题 */}
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <div className="w-1 h-4 sm:h-5 rounded-full bg-accent" />
          <h3 className="text-xs sm:text-sm font-medium text-text-secondary tracking-wide">解断</h3>
        </div>

        {/* 解断语 */}
        <p className="text-text-primary text-sm sm:text-base leading-relaxed mb-3 sm:mb-4 break-words">
          {text}
        </p>

        {/* 五行分析 */}
        {wuxingAnalysis && (
          <div className="pt-3 sm:pt-4 border-t border-border">
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <div className="w-1 h-4 sm:h-5 rounded-full bg-ball-blue" />
              <h3 className="text-xs sm:text-sm font-medium text-text-secondary tracking-wide">五行分析</h3>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <div className="bg-accent-subtle rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3">
                <p className="text-[10px] sm:text-xs text-text-tertiary mb-0.5 sm:mb-1">所缺五行</p>
                <p className="text-accent font-bold text-base sm:text-lg">{wuxingAnalysis.missing}</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3">
                <p className="text-[10px] sm:text-xs text-text-tertiary mb-0.5 sm:mb-1">纳音五行</p>
                <p className="text-ball-blue font-bold text-base sm:text-lg">{wuxingAnalysis.nayin}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
})
