/**
 * 快速排序 (使用 splice)
 * @param arr number arr
 * */
export function quickSort(arr: number[]): number[] {
  const res: number[] = []
  const length = arr.length
  if (length === 0) return []

  const midIndex = Math.floor(length / 2)
  const midValue = arr.splice(midIndex, 1)[0]

  const left: number[] = []
  const right: number[] = []

  // 注意: arr 数组已经被 splice 修改, 所以只能使用 arr.length 而不是使用 length
  for (let i = 0; i < arr.length; i++) {
    const n = arr[i]
    if (n < midValue) {
      // n 小于 midValue, 则放在 left
      left.push(n)
    }else {
      right.push(n)
    }
  }

  return quickSort(left).concat([midValue], quickSort(right))
}

/**
 * 快速排序 (使用 slice)
 * @param arr number arr
 * */
export function quickSort1(arr: number[]): number[] {
  const res: number[] = []
  const length = arr.length
  if (length === 0) return []

  const midIndex = Math.floor(length / 2)
  const midValue = arr.slice(midIndex, midIndex + 1)[0]

  const left: number[] = []
  const right: number[] = []

  for (let i = 0; i < length; i++) {
    if (i !== midIndex) {
      const n = arr[i]
      if (n < midValue) {
        // n 小于 midValue, 则放在 left
        left.push(n)
      }else {
        right.push(n)
      }
    }
  }
  return quickSort(left).concat([midValue], quickSort(right))
}


