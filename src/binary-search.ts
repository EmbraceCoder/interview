export function binarySearch(arr: number[], target: number): number {
  const length = arr.length
  if (length === 0) return -1

  let startIndex = 0 // 开始位置
  let endIndex = length - 1 // 结束位置

  while(startIndex <= endIndex) {
    let midIndex = Math.floor((startIndex + endIndex) / 2)
    let midValue = arr[midIndex]
    // [1,2,3,4,5,6,7,8,9]
    // target 2
    if (target < midValue) {
      // 目标值较小则, 继续在右侧查找
      endIndex = midIndex - 1
    }else if (target > midValue) {
      // 目标值较大则, 继续在左侧查找
      startIndex = midIndex + 1
    }else {
      // 相等, 返回
      return midIndex
    }
  }
  return  -1
}
