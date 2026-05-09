'use client'

export default function DisclaimerModal({ onAgree }) {
  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-8">
        {/* 图标 */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-accent-subtle flex items-center justify-center">
          <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-text-primary">免责声明</h1>

        <div className="space-y-4 text-text-secondary text-base leading-relaxed">
          <p>本工具<strong className="text-text-primary">仅供娱乐</strong>，不构成任何购彩建议。</p>
          <p>彩票中奖号码<strong className="text-text-primary">完全随机</strong>，不存在任何预测方法。</p>
          <p>请<strong className="text-accent">理性购彩，量力而行</strong>。</p>
        </div>

        <button
          onClick={onAgree}
          className="w-full px-6 py-3.5 text-base font-medium rounded-xl
            bg-accent text-white hover:bg-accent-dark active:scale-[0.98]
            transition-all duration-200 shadow-sm shadow-accent/20"
        >
          我已阅读并同意，仅用于娱乐用途
        </button>
      </div>
    </div>
  )
}
