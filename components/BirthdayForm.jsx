'use client'
import { useState } from 'react'

const now = new Date()
const thisYear = now.getFullYear()

const selectClass = "bg-bg-mid text-gold border border-gold-dark rounded px-3 py-2 text-base focus:outline-none focus:border-gold"

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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 py-4">
      <div className="flex flex-wrap justify-center gap-3">
        <select value={year} onChange={e => setYear(Number(e.target.value))} className={selectClass}>
          {Array.from({ length: thisYear - 1900 + 1 }, (_, i) => 1900 + i).reverse().map(y => (
            <option key={y} value={y}>{y}年</option>
          ))}
        </select>
        <select value={month} onChange={e => setMonth(Number(e.target.value))} className={selectClass}>
          {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
            <option key={m} value={m}>{m}月</option>
          ))}
        </select>
        <select value={day} onChange={e => setDay(Number(e.target.value))} className={selectClass}>
          {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
            <option key={d} value={d}>{d}日</option>
          ))}
        </select>
        <select value={hour} onChange={e => setHour(Number(e.target.value))} className={selectClass}>
          {SHI_CHEN_OPTIONS.map((label, i) => (
            <option key={i} value={i}>{label}</option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        disabled={!isValid}
        className="px-8 py-2 text-lg rounded-lg border-2 border-gold
          text-gold bg-transparent hover:bg-gold hover:text-bg-deep
          transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        生成号码
      </button>
    </form>
  )
}
