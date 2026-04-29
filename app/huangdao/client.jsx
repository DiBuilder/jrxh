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
  const [showDisclaimer, setShowDisclaimer] = useState(() => {
    if (typeof window === 'undefined') return true
    return sessionStorage.getItem('disclaimer-dismissed') !== 'true'
  })

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
    <div className="min-h-screen pb-24 max-w-lg mx-auto">
      <div className="flex flex-col items-center pt-2">
        <button
          onClick={handleRegenerate}
          className="mt-4 px-6 py-2 text-base rounded-lg border-2 border-gold bg-transparent text-gold hover:bg-gold hover:text-bg-deep transition-colors"
        >
          换一注
        </button>

        <BallGrid
          reds={todayNumbers.numbers.red}
          blues={todayNumbers.numbers.blue}
          labelRed={labels.red}
          labelBlue={labels.blue}
        />
        <JieDu text={todayNumbers.jieDu} />

        <p className="mt-6 text-sm text-gold-light/70 text-center px-4 leading-relaxed">
          本工具仅供娱乐，不构成购彩建议，彩票中奖号码完全随机，理性购彩，量力而行
        </p>
      </div>

      <BottomBar
        lotteryType={lotteryType}
        onTypeChange={handleTypeChange}
        numbers={todayNumbers.numbers}
        onCopy={handleCopy}
      />

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-amber-900/95 border-t border-amber-500/60 py-1.5 px-4">
        <p className="max-w-lg mx-auto text-center text-xs text-amber-200 font-bold">温馨提示：本工具仅供娱乐，不构成购彩建议，理性购彩，量力而行</p>
      </div>
    </div>
  )
}
