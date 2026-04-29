'use client'
import { useState, useCallback, useMemo } from 'react'
import { Solar } from 'lunar-javascript'
import TopTabs from '@/components/TopTabs'
import BallGrid from '@/components/BallGrid'
import BottomBar from '@/components/BottomBar'
import DisclaimerModal from '@/components/DisclaimerModal'
import BirthdayForm from '@/components/BirthdayForm'
import JieDu from '@/components/JieDu'
import { getTodayLunar, getLuckyShiChen, getDayGanZhiIndex, getBirthdayBaZi } from '@/lib/lunar'
import { generateHuangdao, generateBirth } from '@/lib/lottery'
import { countWuxing, findMissingWuxing, getNayinWuxing, getWuxingTailDigits, buildNumberPool, fullNumberPool } from '@/lib/wuxing'

const wuxingLib = { findMissingWuxing, getNayinWuxing, getWuxingTailDigits, buildNumberPool, fullNumberPool }

function makeHuangdaoSentence(lunar, luckyList) {
  const ganzhi = lunar.getDayInGanZhi()
  const dayName = ganzhi + '日'
  const shiChen = luckyList[0]?.name || '子'
  return `今日${dayName}，${shiChen}时吉时，生财星入局`
}

export default function HomePage() {
  const [showDisclaimer, setShowDisclaimer] = useState(true)
  const [activeTab, setActiveTab] = useState('huangdao')
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

  const [birthResult, setBirthResult] = useState(null)

  const handleBirthGenerate = useCallback(({ year, month, day, hour }) => {
    const bazi = getBirthdayBaZi(year, month, day, hour)
    const cnts = countWuxing(bazi)
    const solar = Solar.fromYmd(year, month, day)
    const dayNayin = solar.getLunar().getDayNaYin()
    const result = generateBirth(cnts, dayNayin, lotteryType, wuxingLib)
    const missing = result.missingWx
    setBirthResult({
      numbers: result,
      jieDu: `八字缺${missing}，取${missing}数补之`,
      wuxingAnalysis: {
        missing,
        nayin: dayNayin,
      },
    })
  }, [lotteryType])

  const labels = lotteryType === 'ssq'
    ? { red: '红球', blue: '蓝球' }
    : { red: '前区', blue: '后区' }

  const currentNumbers = activeTab === 'huangdao'
    ? todayNumbers.numbers
    : birthResult?.numbers

  const currentJieDu = activeTab === 'huangdao'
    ? todayNumbers.jieDu
    : birthResult?.jieDu || ''

  const currentWuxingAnalysis = activeTab === 'birth'
    ? birthResult?.wuxingAnalysis
    : null

  const handleCopy = useCallback(() => {
    if (!currentNumbers) return ''
    const reds = currentNumbers.red.map(n => String(n).padStart(2, '0')).join(' ')
    const blues = currentNumbers.blue.map(n => String(n).padStart(2, '0')).join(' ')
    const name = lotteryType === 'ssq' ? '双色球' : '大乐透'
    return `【${name}】${labels.red}：${reds}  ${labels.blue}：${blues}`
  }, [currentNumbers, lotteryType, labels])

  const handleTypeChange = useCallback((type) => {
    setLotteryType(type)
    setBirthResult(null)
    setRegenerateCount(0)
  }, [])

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab)
  }, [])

  if (showDisclaimer) {
    return <DisclaimerModal onAgree={() => setShowDisclaimer(false)} />
  }

  return (
    <div className="min-h-screen pb-24 max-w-lg mx-auto">
      <TopTabs activeTab={activeTab} onTabChange={handleTabChange} />

      <div className="flex flex-col items-center pt-2">
        {activeTab === 'huangdao' && (
          <button
            onClick={handleRegenerate}
            className="mt-4 px-6 py-2 text-base rounded-lg border-2 border-gold bg-transparent text-gold hover:bg-gold hover:text-bg-deep transition-all"
          >
            换一注
          </button>
        )}

        {activeTab === 'birth' && (
          <BirthdayForm onGenerate={handleBirthGenerate} />
        )}

        {currentNumbers && (
          <>
            <BallGrid
              reds={currentNumbers.red}
              blues={currentNumbers.blue}
              labelRed={labels.red}
              labelBlue={labels.blue}
            />
            <JieDu text={currentJieDu} wuxingAnalysis={currentWuxingAnalysis} />
          </>
        )}

        {activeTab === 'birth' && !currentNumbers && (
          <div className="py-12 text-gold-light/50 text-base">
            填入生辰信息，点击生成号码
          </div>
        )}

        {currentNumbers && (
          <p className="mt-6 text-base text-gold-light/70 text-center px-4 leading-relaxed">
            本工具仅供娱乐，不构成购彩建议，彩票中奖号码完全随机，理性购彩，量力而行
          </p>
        )}
      </div>

      <BottomBar
        lotteryType={lotteryType}
        onTypeChange={handleTypeChange}
        numbers={currentNumbers}
        onCopy={handleCopy}
      />

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-amber-900/95 border-t border-amber-500/60 py-2 px-4">
        <p className="max-w-lg mx-auto text-center text-base text-amber-200 font-bold">温馨提示：本工具仅供娱乐，不构成购彩建议，理性购彩，量力而行</p>
      </div>
    </div>
  )
}
