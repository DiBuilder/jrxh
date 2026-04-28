'use client'

export default function TopTabs({ activeTab, onTabChange }) {
  return (
    <div className="flex justify-center gap-2 pt-4 pb-2">
      <button
        onClick={() => onTabChange('huangdao')}
        className={`px-6 py-2 text-lg rounded-lg border-2 transition-all ${
          activeTab === 'huangdao'
            ? 'bg-gold text-bg-deep border-gold font-bold'
            : 'bg-transparent text-gold border-gold-dark hover:border-gold'
        }`}
      >
        今日黄道选号
      </button>
      <button
        onClick={() => onTabChange('birth')}
        className={`px-6 py-2 text-lg rounded-lg border-2 transition-all ${
          activeTab === 'birth'
            ? 'bg-gold text-bg-deep border-gold font-bold'
            : 'bg-transparent text-gold border-gold-dark hover:border-gold'
        }`}
      >
        生辰本命选号
      </button>
    </div>
  )
}
