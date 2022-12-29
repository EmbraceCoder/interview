/**
 * 查询 1 - max 的所有对称数 (数组反转)
 * @param max 最大值
 * */
export function findPalindromeNumbers(max: number): number[] {
  const res: number[] = []
  if (max <= 0) return res

  for (let i = 0; i <= max; i++) {
    // 转换为字符串, 转换为数组, 再反转, 比较
    const s = i.toString()
    if (s === s.split('').reverse().join('')) {
      res.push(i)
    }

  }
  return res
}

/**
 * 查询 1 - max 的所有对称数 (字符串前后比较)
 * @param max 最大值
 * */
export function findPalindromeNumbers1(max: number): number[] {
  const res: number[] = []
  if (max <= 0) return res

  for (let i = 0; i <= max; i++) {
    const s = i.toString()
    const length = s.length

    // 字符串头尾比较
    let flag = true
    let startIndex = 0
    let endIndex = length - 1
    while (startIndex < endIndex) {
      if (s[startIndex] !== s[endIndex]) {
        flag = false
        break
      }else {
        startIndex ++
        endIndex --
      }
    }
    if (flag) res.push(i)
  }
  return res
}


/**
 * 查询 1 - max 的所有对称数 (翻转数字)
 * @param max 最大值
 * */
export function findPalindromeNumbers2(max: number): number[] {
  const res: number[] = []
  if (max <= 0) return res

  for (let i = 0; i <= max; i ++) {
    let n = i
    let rev = 0 // 存储翻转数

    // 生成翻转数
    while(n > 0) {
      rev = rev * 10 + n % 10
      n = Math.floor(n / 10)
    }

    if(i === rev) res.push(i)
  }

  return res
}

