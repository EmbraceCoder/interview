// 移动 0 到数组的末尾 (嵌套循环)
export function moveZero(arr: number[]): void {
  const length = arr.length
  if (length === 0) return
  let zeroLength = 0
  // O(n^2)
  for (let i = 0; i < length - zeroLength; i ++) {
    if (arr[i] === 0) {
      arr.push(0)
      arr.splice(i, 1) // 本身的的复杂度 O(n)
      i -- // 数组截取了一个元素, i 要递减, 否则连续的 0 就会有错误
      zeroLength ++ // 累加 0 的长度
    }
  }
}

// 双指针
export function moveZero1(arr: number[]): void {
  const length = arr.length
  if (length === 0) return
  let i, j = -1
  for (i = 0; i < length; i ++) {
    if (arr[i] === 0) {
      // 初始化, 指向第一个 0
      if (j < 0) {
        j = i
      }
    }
    if (arr[i] !== 0 && j >= 0) {
      // 交换
      const n = arr[i]
      arr[i] = arr[j]
      arr[j] = n
      j ++
    }
  }
}
