'use client'

export default function DisclaimerModal({ onAgree }) {
  return (
    <div className="fixed inset-0 z-[100] bg-bg-deep flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-8">
        <h1 className="text-2xl font-bold text-gold">免责声明</h1>

        <div className="space-y-4 text-gold-light/80 text-base leading-relaxed">
          <p>本工具<strong className="text-gold">仅供娱乐</strong>，不构成任何购彩建议。</p>
          <p>彩票中奖号码<strong className="text-gold">完全随机</strong>，不存在任何预测方法。</p>
          <p>请<strong className="text-gold">理性购彩，量力而行</strong>。</p>
        </div>

        <button
          onClick={onAgree}
          className="px-6 py-3 text-base sm:text-lg font-bold rounded-lg bg-gold text-bg-deep hover:bg-gold-light transition-colors whitespace-nowrap"
        >
          我已阅读并同意，仅用于娱乐用途
        </button>
      </div>
    </div>
  )
}
