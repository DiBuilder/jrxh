'use client'

export default function JieDu({ text, wuxingAnalysis }) {
  return (
    <div className="flex flex-col items-center gap-2 px-4 py-3 text-center">
      <p className="text-[var(--color-gold-light)] text-base leading-relaxed max-w-md">
        {text}
      </p>
      {wuxingAnalysis && (
        <div className="mt-2 text-sm text-[var(--color-gold-light)]/70">
          <p>缺五行：<span className="text-[var(--color-gold)] font-bold">{wuxingAnalysis.missing}</span></p>
          <p>纳音五行：<span className="text-[var(--color-gold)]">{wuxingAnalysis.nayin}</span></p>
        </div>
      )}
    </div>
  )
}
