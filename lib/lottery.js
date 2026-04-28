const RULES = {
  ssq: { red: { max: 33, count: 6 }, blue: { max: 16, count: 1 } },
  dlt: { red: { max: 35, count: 5 }, blue: { max: 12, count: 2 } },
}

export function getLotteryRules(type) {
  return RULES[type]
}

function seededRandom(seed) {
  let s = seed
  return function () {
    s = (s * 1103515245 + 12345) & 0x7fffffff
    return s / 0x7fffffff
  }
}

function pickUnique(pool, count, rand) {
  const available = [...pool]
  const result = []
  for (let i = 0; i < count && available.length > 0; i++) {
    const idx = Math.floor(rand() * available.length)
    result.push(available[idx])
    available.splice(idx, 1)
  }
  return result.sort((a, b) => a - b)
}

export function generateHuangdao(seed, type) {
  const rules = RULES[type]
  const rand = seededRandom(seed)
  const allRed = Array.from({ length: rules.red.max }, (_, i) => i + 1)
  const allBlue = Array.from({ length: rules.blue.max }, (_, i) => i + 1)
  return {
    red: pickUnique(allRed, rules.red.count, rand),
    blue: pickUnique(allBlue, rules.blue.count, rand),
  }
}

export function generateBirth(wuxingCounts, dayNayin, type, wuxingLib) {
  const missingWx = wuxingLib.findMissingWuxing(wuxingCounts)
  const tailDigits = wuxingLib.getWuxingTailDigits(missingWx)
  const rules = RULES[type]

  const wxPool = wuxingLib.buildNumberPool(tailDigits, rules.red.max)
  const fullRed = wuxingLib.fullNumberPool(rules.red.max)

  const rand = seededRandom(Date.now())

  const redPick = pickUnique(wxPool, Math.min(rules.red.count, wxPool.length), rand)
  if (redPick.length < rules.red.count) {
    const remaining = fullRed.filter(n => !redPick.includes(n))
    redPick.push(...pickUnique(remaining, rules.red.count - redPick.length, rand))
  }

  const nayinWx = wuxingLib.getNayinWuxing(dayNayin)
  const blueDigits = wuxingLib.getWuxingTailDigits(nayinWx)
  const bluePool = wuxingLib.buildNumberPool(blueDigits, rules.blue.max)
  const allBlue = wuxingLib.fullNumberPool(rules.blue.max)

  const bluePick = pickUnique(
    bluePool.length >= rules.blue.count ? bluePool : allBlue,
    rules.blue.count,
    rand
  )

  return {
    red: redPick.sort((a, b) => a - b),
    blue: bluePick.sort((a, b) => a - b),
    missingWx,
    nayinWx,
  }
}
