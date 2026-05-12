'use client'

export default function DisclaimerModal({ onAgree }) {
  return (
    <div className="fixed inset-0 z-[100] bg-bg-primary flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* 大气背景 */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, var(--color-accent-subtle) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, var(--color-gold-subtle) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative max-w-md w-full text-center space-y-8 animate-scale-in">
        {/* 图标 */}
        <div
          className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{
            background: 'var(--color-accent-subtle)',
            border: '1px solid rgba(196, 59, 42, 0.15)',
          }}
        >
          <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>

        {/* 标题 */}
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-wide">免责声明</h1>
          <div className="gold-accent-line mx-auto mt-3" />
        </div>

        {/* 内容 */}
        <div className="space-y-4 text-text-secondary text-sm sm:text-base leading-relaxed">
          <p>本工具<strong className="text-text-primary">仅供娱乐</strong>，不构成任何购彩建议。</p>
          <p>彩票中奖号码<strong className="text-text-primary">完全随机</strong>，不存在任何预测方法。</p>
          <p>请<strong className="text-accent">理性购彩，量力而行</strong>。</p>
        </div>

        {/* 按钮 */}
        <button
          onClick={onAgree}
          className="w-full px-6 py-3.5 text-sm sm:text-base font-medium rounded-xl text-white
            active:scale-[0.98] transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-dark) 100%)',
            boxShadow: '0 6px 24px var(--color-accent-glow)',
          }}
        >
          我已阅读并同意，仅用于娱乐用途
        </button>
      </div>
    </div>
  )
}
