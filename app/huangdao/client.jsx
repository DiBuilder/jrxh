'use client'
import { useState, useCallback, useMemo } from 'react'
import BallGrid from '@/components/BallGrid'
import BottomBar from '@/components/BottomBar'
import DisclaimerModal from '@/components/DisclaimerModal'
import JieDu from '@/components/JieDu'
import { getTodayLunar, getLuckyShiChen, getDayGanZhiIndex } from '@/lib/lunar'
import { generateHuangdao } from '@/lib/lottery'

function makeHuangdaoSentence(lunar, luckyList) {
  const ganzhi = lunar.getDayInGanZhi()
  const dayName = ganzhi + '日'
  const shiChen = luckyList[0]?.name || '子'
  return `今日${dayName}，${shiChen}时吉时，生财星入局`
}

export default function HuangdaoClient() {
  const [showDisclaimer, setShowDisclaimer] = useState(() =>
    typeof window !== 'undefined' && sessionStorage.getItem('disclaimer-dismissed') === 'true' ? false : true
  )

  const handleDismiss = useCallback(() => {
    sessionStorage.setItem('disclaimer-dismissed', 'true')
    setShowDisclaimer(false)
  }, [])
  const [lotteryType, setLotteryType] = useState('ssq')
  const [regenerateCount, setRegenerateCount] = useState(0)

  const todayNumbers = useMemo(() => {
    const lunar = getTodayLunar()
    const idx = getDayGanZhiIndex(lunar)
    const lucky = getLuckyShiChen(lunar)
    const seed = idx * 100 + (lucky[0]?.index || 0) + regenerateCount * 7
    return {
      numbers: generateHuangdao(seed, lotteryType),
      jieDu: makeHuangdaoSentence(lunar, lucky),
    }
  }, [lotteryType, regenerateCount])

  const handleRegenerate = useCallback(() => {
    setRegenerateCount(c => c + 1)
  }, [])

  const labels = lotteryType === 'ssq'
    ? { red: '红球', blue: '蓝球' }
    : { red: '前区', blue: '后区' }

  const handleCopy = useCallback(() => {
    if (!todayNumbers.numbers) return ''
    const reds = todayNumbers.numbers.red.map(n => String(n).padStart(2, '0')).join(' ')
    const blues = todayNumbers.numbers.blue.map(n => String(n).padStart(2, '0')).join(' ')
    const name = lotteryType === 'ssq' ? '双色球' : '大乐透'
    return `【${name}】${labels.red}：${reds}  ${labels.blue}：${blues}`
  }, [todayNumbers.numbers, lotteryType])

  const handleTypeChange = useCallback((type) => {
    setLotteryType(type)
    setRegenerateCount(0)
  }, [])

  if (showDisclaimer) {
    return <DisclaimerModal onAgree={handleDismiss} />
  }

  return (
    <div className="h-full flex flex-col bg-bg-primary overflow-hidden">
      {/* 内容区 - 可滚动 */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 overflow-y-auto">
        {/* 换一注按钮 */}
        <button
          onClick={handleRegenerate}
          className="mt-4 mb-4 px-5 py-2 text-sm rounded-xl border border-border
            text-text-secondary hover:text-accent hover:border-accent
            transition-all duration-200 shrink-0"
        >
          换一注
        </button>

        {/* 号码球 */}
        <BallGrid
          reds={todayNumbers.numbers.red}
          blues={todayNumbers.numbers.blue}
          labelRed={labels.red}
          labelBlue={labels.blue}
        />

        {/* 解断语 */}
        <JieDu text={todayNumbers.jieDu} />
      </div>

      {/* 底部固定区域 */}
      <div className="shrink-0">
        <BottomBar
          lotteryType={lotteryType}
          onTypeChange={handleTypeChange}
          numbers={todayNumbers.numbers}
          onCopy={handleCopy}
        />
        <div className="bg-bg-tertiary border-t border-border py-1.5 overflow-hidden">
          <div className="flex whitespace-nowrap animate-marquee w-max">
            <span className="text-[10px] text-text-tertiary pr-8">温馨提示：本工具仅供娱乐，不构成购彩建议，理性购彩，量力而行</span>
            <span className="text-[10px] text-text-tertiary pr-8">温馨提示：本工具仅供娱乐，不构成购彩建议，理性购彩，量力而行</span>
          </div>
        </div>
      </div>
    </div>
  )
}
