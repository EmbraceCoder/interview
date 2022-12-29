// 递归的方式
export function fibonacci(n: number): number {
  if (n <= 0) return 0;
  if (n === 1) return 1
  return fibonacci(n - 1) + fibonacci(n - 2)
}

// 优化 for
export function fibonacci1(n: number): number {
  if (n <= 0) return 0;
  if (n === 1) return 1
  let res: number = 0;
  let n1: number = 1; // 记录 n - 1 的结果
  let n2: number = 0; // 记录 n - 2 的结果

  // n = 4 res = 7
  // 0   1   1   2   3   5   8   13
  // n2  n1
  //     n2  n1
  //         n2  n1
  //             n2  n1

  for (let i = 2; i <= n; i++) {
    res = n1 + n2

    // 记录结果
    n2 = n1
    n1 = res
  }


  return res
}
