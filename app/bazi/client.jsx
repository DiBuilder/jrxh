'use client'
import { useState, useCallback } from 'react'
import { Solar } from 'lunar-javascript'
import BallGrid from '@/components/BallGrid'
import BottomBar from '@/components/BottomBar'
import DisclaimerModal from '@/components/DisclaimerModal'
import BirthdayForm from '@/components/BirthdayForm'
import JieDu from '@/components/JieDu'
import { getBirthdayBaZi } from '@/lib/lunar'
import { generateBirth } from '@/lib/lottery'
import { countWuxing, findMissingWuxing, getNayinWuxing, getWuxingTailDigits, buildNumberPool, fullNumberPool } from '@/lib/wuxing'

export default function BaziClient() {
  const [showDisclaimer, setShowDisclaimer] = useState(true)
  const [lotteryType, setLotteryType] = useState('ssq')
  const [birthResult, setBirthResult] = useState(null)

  const handleBirthGenerate = useCallback(({ year, month, day, hour }) => {
    const bazi = getBirthdayBaZi(year, month, day, hour)
    const cnts = countWuxing(bazi)
    const solar = Solar.fromYmd(year, month, day)
    const dayNayin = solar.getLunar().getDayNaYin()
    const result = generateBirth(cnts, dayNayin, lotteryType, { findMissingWuxing, getNayinWuxing, getWuxingTailDigits, buildNumberPool, fullNumberPool })
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

  const currentNumbers = birthResult?.numbers

  const handleCopy = useCallback(() => {
    if (!currentNumbers) return ''
    const reds = currentNumbers.red.map(n => String(n).padStart(2, '0')).join(' ')
    const blues = currentNumbers.blue.map(n => String(n).padStart(2, '0')).join(' ')
    const name = lotteryType === 'ssq' ? '双色球' : '大乐透'
    return `【${name}】${labels.red}：${reds}  ${labels.blue}：${blues}`
  }, [currentNumbers, lotteryType])

  const handleTypeChange = useCallback((type) => {
    setLotteryType(type)
    setBirthResult(null)
  }, [])

  if (showDisclaimer) {
    return <DisclaimerModal onAgree={() => setShowDisclaimer(false)} />
  }

  return (
    <div className="min-h-screen pb-24 max-w-lg mx-auto">
      <div className="flex flex-col items-center pt-2">
        <BirthdayForm onGenerate={handleBirthGenerate} />

        {currentNumbers && (
          <>
            <BallGrid
              reds={currentNumbers.red}
              blues={currentNumbers.blue}
              labelRed={labels.red}
              labelBlue={labels.blue}
            />
            <JieDu text={birthResult.jieDu} wuxingAnalysis={birthResult.wuxingAnalysis} />
          </>
        )}

        {!currentNumbers && (
          <div className="py-12 text-gold-light/50 text-sm">
            填入生辰信息，点击生成号码
          </div>
        )}

        {currentNumbers && (
          <p className="mt-6 text-sm text-gold-light/70 text-center px-4 leading-relaxed">
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

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-amber-900/95 border-t border-amber-500/60 py-1.5 px-4">
        <p className="max-w-lg mx-auto text-center text-xs text-amber-200 font-bold">温馨提示：本工具仅供娱乐，不构成购彩建议，理性购彩，量力而行</p>
      </div>
    </div>
  )
}
