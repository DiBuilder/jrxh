import { Solar } from 'lunar-javascript'

const DI_ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']

export function getTodayLunar() {
  const now = new Date()
  const solar = Solar.fromYmd(now.getFullYear(), now.getMonth() + 1, now.getDate())
  return solar.getLunar()
}

export function getTodayGanZhi() {
  const lunar = getTodayLunar()
  return {
    year: lunar.getYearInGanZhi(),
    month: lunar.getMonthInGanZhi(),
    day: lunar.getDayInGanZhi(),
  }
}

export function getLuckyShiChen(lunar) {
  const dayYi = lunar.getDayYi() || []
  const dayJi = lunar.getDayJi() || []

  const luckyHours = []
  for (let i = 0; i < 12; i++) {
    const branch = DI_ZHI[i]
    const isGood = dayYi.some(yi => yi.includes(branch)) && !dayJi.some(ji => ji.includes(branch))
    if (isGood) luckyHours.push({ index: i, name: branch })
  }

  if (luckyHours.length === 0) {
    luckyHours.push({ index: 0, name: '子' })
  }

  return luckyHours
}

export function getDayGanZhiIndex(lunar) {
  const ganzhi = lunar.getDayInGanZhi()
  return ganzhiToIndex(ganzhi)
}

function ganzhiToIndex(gz) {
  const gan = '甲乙丙丁戊己庚辛壬癸'
  const zhi = '子丑寅卯辰巳午未申酉戌亥'
  const g = gan.indexOf(gz[0])
  const z = zhi.indexOf(gz[1])
  return g * 12 + z
}

export function getBirthdayBaZi(year, month, day, hour) {
  const solar = Solar.fromYmdHms(year, month, day, hour, 0, 0)
  const lunar = solar.getLunar()
  const baZi = lunar.getEightChar()
  return {
    year: baZi.getYear(),
    month: baZi.getMonth(),
    day: baZi.getDay(),
    time: baZi.getTime(),
  }
}
