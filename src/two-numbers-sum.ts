/**
 * 两数之和 (嵌套循环)
 * @param arr
 * @param n
 * */
// O(n^2)
export function findTwoNumbers1(arr: number[], n: number): number[] {
  const res: number[] = []
  const length = arr.length
  if (length === 0) return res
  for (let i = 0; i < length; i++) {
    const n1 = arr[i]
    let flag = false // 是否得到了结果
    for (let j = i + 1; j < length; j++) {
      const n2 = arr[j]
      if (n1 + n2 === n) {
        res.push(i)
        res.push(j)
        flag = true
        break
      }
    }
    if (flag) break
  }
  return res
}

/**
 * 两数之和 (双指针, 要求有序)
 * @param arr
 * @param n
 * */
export function findTwoNumbers2(arr: number[], n: number): number[] {
  const res: number[] = []
  const length = arr.length
  if (length === 0) return []
  let i = 0 // 头
  let j = length - 1 // 尾
  while (i<j) {
    const n1 = arr[i]
    const n2 = arr[j]
    const sum = n1 + n2

    if (sum > n) {
      // sum 大于 n, 则 j (尾) 向前移动
      j --
    }else if (sum < n) {
      // sum 小于 n, 则 i (头) 向后移动
      i ++
    }else {
      res.push(i)
      res.push(j)
      break
    }

  }
  return res
}
