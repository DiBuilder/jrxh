'use client'
import { memo } from 'react'

export default memo(function JieDu({ text, wuxingAnalysis }) {
  return (
    <div className="w-full max-w-md mx-auto px-4 sm:px-5 mt-4">
      <div className="glass-card p-5 sm:p-6 animate-fade-up delay-300" style={{ opacity: 0 }}>
        {/* 解断标题 */}
        <div className="flex items-center gap-3 mb-3">
          <div className="gold-accent-line" />
          <h3 className="text-xs sm:text-sm font-medium text-text-secondary tracking-wide">解断</h3>
        </div>

        {/* 解断语 */}
        <p className="text-text-primary text-sm sm:text-base leading-relaxed mb-4 break-words ml-[2rem]">
          {text}
        </p>

        {/* 五行分析 */}
        {wuxingAnalysis && (
          <div className="pt-4 border-t border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-0.5 rounded-full bg-jade opacity-70" />
              <h3 className="text-xs sm:text-sm font-medium text-text-secondary tracking-wide">五行分析</h3>
            </div>
            <div className="grid grid-cols-2 gap-3 ml-[2rem]">
              <div className="rounded-xl px-4 py-3 bg-accent-subtle border border-accent/10">
                <p className="text-[11px] text-text-tertiary mb-1">所缺五行</p>
                <p className="text-accent font-bold text-lg">{wuxingAnalysis.missing}</p>
              </div>
              <div className="rounded-xl px-4 py-3 bg-jade-subtle border border-jade/10">
                <p className="text-[11px] text-text-tertiary mb-1">纳音五行</p>
                <p className="text-jade font-bold text-lg">{wuxingAnalysis.nayin}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
})
