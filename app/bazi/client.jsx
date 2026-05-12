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
  const [showDisclaimer, setShowDisclaimer] = useState(() =>
    typeof window !== 'undefined' && sessionStorage.getItem('disclaimer-dismissed') === 'true' ? false : true
  )

  const handleDismiss = useCallback(() => {
    sessionStorage.setItem('disclaimer-dismissed', 'true')
    setShowDisclaimer(false)
  }, [])
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

  return (
    <>
      {/* 免责声明覆盖层 */}
      {showDisclaimer && <DisclaimerModal onAgree={handleDismiss} />}

      {/* 内容区 - 可滚动 */}
      <div className="flex-1 flex flex-col items-center px-3 sm:px-4 overflow-y-auto py-4">
        {/* 生辰表单 */}
        <BirthdayForm onGenerate={handleBirthGenerate} />

        {/* 号码展示 */}
        {currentNumbers && (
          <div className="w-full mt-4">
            <BallGrid
              reds={currentNumbers.red}
              blues={currentNumbers.blue}
              labelRed={labels.red}
              labelBlue={labels.blue}
            />
            <JieDu text={birthResult.jieDu} wuxingAnalysis={birthResult.wuxingAnalysis} />
          </div>
        )}

        {/* 空状态提示 */}
        {!currentNumbers && (
          <div className="py-12 text-text-tertiary text-sm animate-fade-up delay-400" style={{ opacity: 0 }}>
            填入生辰信息，点击生成号码
          </div>
        )}
      </div>

      {/* 底部固定区域 */}
      <div className="shrink-0">
        <BottomBar
          lotteryType={lotteryType}
          onTypeChange={handleTypeChange}
          numbers={currentNumbers}
          onCopy={handleCopy}
        />
        <div className="bg-bg-tertiary/60 border-t border-border/30 py-1.5 overflow-hidden">
          <div className="flex whitespace-nowrap animate-marquee w-max">
            <span className="text-[10px] text-text-tertiary/70 tracking-wide pr-8">温馨提示：本工具仅供娱乐，不构成购彩建议，理性购彩，量力而行</span>
            <span className="text-[10px] text-text-tertiary/70 tracking-wide pr-8">温馨提示：本工具仅供娱乐，不构成购彩建议，理性购彩，量力而行</span>
          </div>
        </div>
        <div className="bg-bg-tertiary/60 py-1.5 text-center">
          <a href="https://beian.miit.gov.cn" target="_blank" rel="noopener noreferrer" className="text-[10px] text-text-tertiary/60 hover:text-text-tertiary transition-colors">浙ICP备2021033705号-4</a>
        </div>
      </div>
    </>
  )
}
