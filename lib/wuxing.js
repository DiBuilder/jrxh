const WUXING_MAP = {
  '甲': '木', '乙': '木',
  '丙': '火', '丁': '火',
  '戊': '土', '己': '土',
  '庚': '金', '辛': '金',
  '壬': '水', '癸': '水',
  '子': '水', '丑': '土',
  '寅': '木', '卯': '木',
  '辰': '土', '巳': '火',
  '午': '火', '未': '土',
  '申': '金', '酉': '金',
  '戌': '土', '亥': '水',
}

const HETU_MAP = {
  '水': [1, 6],
  '火': [2, 7],
  '木': [3, 8],
  '金': [4, 9],
  '土': [5, 0],
}

const NAYIN_WUXING = {
  '海中金': '金', '炉中火': '火', '大林木': '木', '路旁土': '土',
  '剑锋金': '金', '山头火': '火', '涧下水': '水', '城头土': '土',
  '白蜡金': '金', '杨柳木': '木', '泉中水': '水', '屋上土': '土',
  '金箔金': '金', '覆灯火': '火', '天河水': '水', '大驿土': '土',
  '钗环金': '金', '桑柘木': '木', '大溪水': '水', '沙中土': '土',
  '壁上土': '土', '平地木': '木', '山下火': '火', '长流水': '水',
  '松柏木': '木', '霹雳火': '火', '沙中金': '金', '井泉水': '水',
  '石榴木': '木', '天上火': '火', '大海水': '水', '佛灯火': '火',
}

export function countWuxing(bazi) {
  const chars = bazi.year + bazi.month + bazi.day + bazi.time
  const counts = { '金': 0, '木': 0, '水': 0, '火': 0, '土': 0 }
  for (const ch of chars) {
    const wx = WUXING_MAP[ch]
    if (wx) counts[wx]++
  }
  return counts
}

export function findMissingWuxing(counts) {
  let minWx = null
  let minCount = Infinity
  for (const [wx, count] of Object.entries(counts)) {
    if (count < minCount) {
      minCount = count
      minWx = wx
    }
  }
  return minWx
}

export function getWuxingTailDigits(wx) {
  return HETU_MAP[wx] || []
}

export function getNayinWuxing(nayin) {
  return NAYIN_WUXING[nayin] || '金'
}

export function buildNumberPool(tailDigits, max) {
  const pool = []
  for (let i = 1; i <= max; i++) {
    const lastDigit = i % 10
    if (tailDigits.includes(lastDigit)) {
      pool.push(i)
    }
  }
  return pool
}

export function fullNumberPool(max) {
  const pool = []
  for (let i = 1; i <= max; i++) pool.push(i)
  return pool
}
