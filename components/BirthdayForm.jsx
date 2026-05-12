'use client'
import { useState } from 'react'

const now = new Date()
const thisYear = now.getFullYear()

const SHI_CHEN_OPTIONS = ['子时 23-01', '丑时 01-03', '寅时 03-05', '卯时 05-07', '辰时 07-09', '巳时 09-11',
  '午时 11-13', '未时 13-15', '申时 15-17', '酉时 17-19', '戌时 19-21', '亥时 21-23']

export default function BirthdayForm({ onGenerate }) {
  const [year, setYear] = useState(() => thisYear - 30)
  const [month, setMonth] = useState(1)
  const [day, setDay] = useState(1)
  const [hour, setHour] = useState(0)

  const isValid = year >= 1900 && year <= thisYear && month >= 1 && month <= 12 && day >= 1 && day <= 31

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isValid) onGenerate({ year, month, day, hour })
  }

  const selectClasses = `w-full bg-bg-tertiary/60 text-text-primary border border-border/60 rounded-xl
    px-3 py-2.5 text-sm appearance-none cursor-pointer
    focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/60
    transition-all duration-200 hover:border-border-strong`

  return (
    <div className="w-full max-w-md mx-auto px-4 sm:px-5">
      <div className="glass-card p-5 sm:p-6 animate-scale-in">
        {/* 标题装饰 */}
        <div className="flex items-center gap-3 mb-1">
          <div className="gold-accent-line" />
          <h3 className="text-xs sm:text-sm font-medium text-text-secondary tracking-wide">生辰信息</h3>
        </div>
        <p className="text-[11px] text-text-tertiary mb-5 ml-[2rem]">输入出生日期和时辰，生成本命号码</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 日期选择 */}
          <div className="grid grid-cols-3 gap-2.5">
            <div>
              <label className="block text-[11px] text-text-tertiary mb-1.5 font-medium">年份</label>
              <select
                value={year}
                onChange={e => setYear(Number(e.target.value))}
                className={selectClasses}
              >
                {Array.from({ length: thisYear - 1900 + 1 }, (_, i) => 1900 + i).reverse().map(y => (
                  <option key={y} value={y}>{y}年</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] text-text-tertiary mb-1.5 font-medium">月份</label>
              <select
                value={month}
                onChange={e => setMonth(Number(e.target.value))}
                className={selectClasses}
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                  <option key={m} value={m}>{m}月</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] text-text-tertiary mb-1.5 font-medium">日期</label>
              <select
                value={day}
                onChange={e => setDay(Number(e.target.value))}
                className={selectClasses}
              >
                {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                  <option key={d} value={d}>{d}日</option>
                ))}
              </select>
            </div>
          </div>

          {/* 时辰选择 */}
          <div>
            <label className="block text-[11px] text-text-tertiary mb-1.5 font-medium">时辰</label>
            <select
              value={hour}
              onChange={e => setHour(Number(e.target.value))}
              className={selectClasses}
            >
              {SHI_CHEN_OPTIONS.map((label, i) => (
                <option key={i} value={i}>{label}</option>
              ))}
            </select>
          </div>

          {/* 生成按钮 */}
          <button
            type="submit"
            disabled={!isValid}
            className="w-full py-3 text-sm sm:text-base rounded-xl font-medium text-white
              active:scale-[0.98] transition-all duration-300
              disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
            style={{
              background: isValid
                ? 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-dark) 100%)'
                : 'var(--color-border-strong)',
              boxShadow: isValid ? '0 4px 16px var(--color-accent-glow)' : 'none',
            }}
          >
            生成号码
          </button>
        </form>
      </div>
    </div>
  )
}
