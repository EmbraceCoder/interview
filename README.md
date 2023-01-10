# 前端面试

## 数据结构与算法
+ 什么是复杂度?
  - 程序执行时需要的计算量 (`时间`) 和内存 (`空间`) 空间 **(与代码是否简洁无关)**
  - 复杂度是 **数量级**, 不是具体的数字
  - 一般针对一个具体的算法, 而非一个完整的系统


![img.png](img.png)

### 时间复杂度
> 时间复杂度: 程序执行时需要的计算量 (CPU)

1. `O(1)`: 一次就够 (数量级)
2. `O(n)`: 与传输的数据量一样 (数量级)
3. `O(n^2)`: 数据量的平方 (数量级)
4. `O(logn)`: 数据量的对数 (数量级)
5. `O(n*logn)`: 数据量 * 数据量的对数 (数量级)

```js
// O(1)
function O1Fn(obj, key) {
  return obj[key] // O(1)
}

// O(n)
function OnFn(arr) {
  for (let  i = 0; i < arr.length; i++) {
    console.log(arr[i]) // O(n)  
  }
}

// O(n^2)
function OnFn(arr) {
  for (let  i = 0; i < arr.length; i++) {
    for (let  j = 0; j < arr.length; j++) {
      console.log(arr[j]) // O(n^2)
    }
  }
}

// O(logn)
function OLognFn(target, arr) {
  // 二分查找 ... 
}

// O(n * logn)
function OLognFn(target, arr) {
  // for () {
  //   // 二分查找 ...
  // }
}


```

### 空间复杂度

> 空间复杂度: 程序执行时需要的内存空间

1. `O(1)`: 有限的, 可数的空间 (数量级)
2. `O(n)`: 和输入的数据量相同的空间 (数量级)
3. `O(n^2)`: 数据量的平方 (数量级)
4. `O(logn)`: 数据量的对数 (数量级)
5. `O(n*logn)`: 数据量 * 数据量的对数 (数量级)

### 算法题

1. 将一个数组旋转 K 步

```ts
/**
 * 输入一个数组 [1,2,3,4,5,6,7]
 * k = 3, 既旋转 3 步
 * result: [5, 6, 7, 1, 2, 3, 4]
 * */

function rotate1(arr: number[], k: number): number[] {
  const length = arr.length
  if (!k || length === 0) return arr;
  const step = Math.abs(k % length)
  
  for (let i = 0; i < step; i++) {
    const n = arr.pop()
    if (n) {
      arr.unshift(n)
    }
  }
  return arr
}

function rotate2(arr: number[], k: number): number[] {
  const length = arr.length
  if (!k || length === 0) return arr;
  const step = Math.abs(k % length)

  const part1 = arr.slice(-step)
  const part2 = arr.slice(0, length - step)
  const part3 = part1.concat(part2)
  
  return part3
}
```

2. 判断一个字符串是否括号匹配

> 逻辑

```ts
/**
 * 一个字符串 S 可能包含 {} [] () 三种括号
 * 判断 S 是否是括号匹配
 * 如 ([a{b}c])匹配, 而 {a(b{a(b}c) 就不匹配
 * */

function isValid(s: string): boolean {
  const stack = []
  for(let i = 0; i < s.length; i ++) {
    if(stack.length === 0) {
      stack.push(s[i])
    }else {
      let top = stack[stack.length -1]
      if(top === "{" && s[i] === "}") {
        stack.pop()
      }else if(top === "(" && s[i] === ")") {
        stack.pop()
      }else if(top === "[" && s[i] === "]") {
        stack.pop()
      }else {
        stack.push(s[i])
      }
    }

  }
  return stack.length === 0 ? true : false
};
```

3. 使用两个栈实现一个队列

```ts
class MyQueue {
  private  stack1: number[] = []
  private  stack2: number[] = []
  /**
   * 入队
   * @param n n
   * */
  add(n: number) {
    this.stack1.push(n)
  }
  /**
   * 出队
   * */
  delete(): number | null {
    let res;
    const stack1 = this.stack1
    const stack2 = this.stack2

    // 将 stack1 所有元素移动到 stack2 中
    while (stack1.length) {
      const n = stack1.pop()
      if (n !== null) {
        stack2.push(n as number)
      }
    }
    // stack2 pop
    res = stack2.pop()

    // 将 stack2 所有元素 "还给" stack1
    while (stack2.length) {
      const n = stack2.pop()
      if (n !== null) {
        stack1.push(n as number)
      }
    }
    return res || null
  }
  get length(): number {
    return this.stack1.length
  }
}
```

4. 定义一个JS函数, 反转单向链表

> 链表是一种物理结构 (非逻辑结构), **类似**于数组, 数组需要一段连续的内存空间, 而链表是零散的, 链表的数据结构 {value, next?, prev?}

+ 链表 VS 数组
  - 都是有序结构
  - 链表: 查询慢 O(n), 新增和删除快 O(1)
  - 数组: 查询快 O(1), 新增和删除慢 O(n)

```ts
interface ILinkListNode {
  value: number
  next?: ILinkListNode
}

/**
 * 反转单向链表, 并返回反转之后的 head node
 * @param listNode {ILinkListNode} node
 * */
export function reverseLinkList(listNode: ILinkListNode): ILinkListNode {
  // 定义三个指针
  let prevNode: ILinkListNode | undefined = undefined;
  let curNode: ILinkListNode | undefined = undefined;
  let nextNode: ILinkListNode | undefined = listNode;
  // arr [100, 200, 300]
  // { value: 100, next: { value: 200, next: { value: 300 } } }


  // 以 nextNode 为主, 遍历链表
  while (nextNode) {
    // 第一个元素, 删掉 next, 防止循环引用
    if (curNode && !prevNode) {
      delete curNode.next
    }

    // 反转指针
    if (curNode && prevNode) {
      curNode.next = prevNode
    }

    // 整体向后移动
    prevNode = curNode
    curNode = nextNode
    nextNode = nextNode?.next
  }
  curNode!.next = prevNode
  return curNode!
}


/**
 * 根据数组创建单向链表
 * @param arr number arr
 * */
export function createLinkList(arr: number[]): ILinkListNode {
  const length = arr.length;
  if (length === 0) throw new Error("arr is empty");


  // arr: [100, 200, 300]
  // { value: 300 }
  // { value: 200, next: { value: 300 } }
  // { value: 100, next: { value: 200, next: { value: 300 } } }
  let curNode: ILinkListNode = {
    value: arr[length - 1]
  }
  if (length === 1) return curNode

  for (let i = length - 2; i>= 0; i --) {
    curNode = {
      value: arr[i],
      next: curNode
    }
  }

  return curNode
}

```

5. 使用链表实现队列

```ts
interface IListNode {
  value: number,
  next?: IListNode | null
}

export class MyQueue {
  private head: IListNode | null = null
  private tail: IListNode | null = null
  private len: number = 0

  // 入队, 在 tail 位置
  add(n: number) {
    const newNode: IListNode = {
      value: n,
      next: null
    }
    // 处理 head
    if (this.head === null) {
      this.head = newNode
    }
    // 处理 tail
    const tailNode = this.tail
    if (this.tail) {
      tailNode!.next = newNode
    }
    this.tail = newNode
    this.len ++
    }
    // 出队, 在 head 位置
    delete(): number | null {
      const headNode = this.head
      if (headNode === null) return null
      if (this.len <= 0) return null

      // 取值
      const value = headNode.value
      // 处理head
      this.head = headNode.next as IListNode
      // 记录长度
      this.len --

      return  value
    }
    get length(): number {
      // length 要单独存储, 不能通过遍历获取 (复杂时间复杂度太高 O(n))
      return this.len
    }
}
```

6. JS实现二分查找

```ts
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
```

7. 找出一个数组中为n的两个数 (两数之和)

```ts
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
```

8. 求二叉搜索树的第k小值

+ **二叉树**
![img_3.png](img_3.png)

+ **红黑树**
![img_2.png](img_2.png)

+ **B树**
![img_4.png](img_4.png)

```ts
/**
 * 二叉树 (binary tree)
 * 是一棵树
 * 每个节点, 最多只能有两个子节点
 * 树节点的数据结构 {value, left?, right?}
 * 
 * 二叉搜索树 (binary search tree)
 * left (包括其后代) value <= root value
 * right (包括其后代) value <= root value
 * 可使用二分法进行快速查找
 * 
 * 
 * 
 * 红黑树
 * 一种自平衡二叉树
 * 分为 红黑两种颜色, 通过颜色转换来维持树的平衡
 * 相对于普通的二叉树, 它维持平衡的效率更高
 * 
 *
 * 
 * B树
 * 物理上是多叉树, 但逻辑上是二叉树
 * 一般用于高效 I/O, 关系型数据库常用 B 树来组织数据
 * */


export interface ITreeNode {
  value: number
  left: ITreeNode | null
  right: ITreeNode | null
}


export const bst: ITreeNode = {
  value: 5,
  left: {
    value: 3,
    left: {
      value: 2,
      left: null,
      right: null
    },
    right: {
      value: 4,
      left: null,
      right: null
    }
  },
  right: {
    value: 7,
    left: {
      value: 6,
      left: null,
      right: null
    },
    right: {
      value: 8,
      left: null,
      right: null
    }
  }
}

const arr: number[] = []


// 二叉树 前序遍历 root -> left -> right
export function preOrderTraverse(node: ITreeNode | null) {
  if (node === null) return
  arr.push(node.value)
  preOrderTraverse(node.left)
  preOrderTraverse(node.right)
}

// 二叉树 中序遍历 left -> root -> right
export function inOrderTraverse(node: ITreeNode | null) {
  if (node === null) return
  inOrderTraverse(node.left)
  arr.push(node.value)
  inOrderTraverse(node.right)
}

// 二叉树 后续遍历 left -> right -> root
export function postOrderTraverse(node: ITreeNode | null) {
  if (node === null) return
  postOrderTraverse(node.left)
  postOrderTraverse(node.right)
  arr.push(node.value)
}


/**
 * 寻找 BST 第 K 小值
 * @param node tree node
 * @param k 第几个值
 * */
export function getKthValue(node: ITreeNode, k: number):number | null {
  inOrderTraverse(node)
  return arr[k - 1] || null
}

```


```ts
/** 
* 堆栈模型
* JS 代码执行时
* 值类型变量, 存储在栈
* 引用类型变量存储在, 堆
*/

/**
 * 堆
 * 完全二叉树
 * 最大堆: 父节点 >= 子节点
 * 最小堆: 父节点 <= 子节点
 * 堆在逻辑结构上是一颗二叉树, 但在物理结构上是一个数组
 * */
```

9. 求斐波那契数列的第 n 值

```ts
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
```

* 动态规划
  * 把一个大问题, 拆解成为多个小问题, 诼级向下拆解
  * 用递归的思路去分析问题, 在改为用循环来实现

10. 移动 0 到数组的末尾

```ts
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
```


11. 字符串中连续最多的字符, 以及次数

```ts
/**
 * 如输入 'abbcccddeeee1234' 计算得到
 * 连续最多的字符是 'e', 4次
 * */

interface IRes {
  char: string,
  length: number
}


/**
 * 求连续最多的字符和次数 (嵌套循环)
 * @param str string
 * */
export function findContinuousChar(str: string): IRes {
  const res: IRes = {
    char: '',
    length: 0
  }

  const length = str.length
  if (length === 0) return res


  let tempLength = 0 // 临时记录当前连续字符的长度

  for (let i = 0; i < length; i++) {
    tempLength = 0

    for (let j = i; j < length; j ++) {
      if (str[i] === str[j]) {
        tempLength ++
      }
      if (str[i] !== str[j] || j === length - 1) {
        // 不相等, 或者已经到了最后一个元素, 要去判断最大值
        if (tempLength > res.length) {
          res.char = str[i]
          res.length = tempLength
        }

        if (i < length - 1) {
          i = j - 1 // 跳步
        }
        break
      }
    }
  }

  return res
}


export function findContinuousChar1(str: string): IRes {
  const res: IRes = {
    char: '',
    length: 0
  }

  const length = str.length
  if (length === 0) return res

  let tempLength = 0 // 临时记录当前连续字符的长度

  let i = 0, j = 0

  for (;i<length; i++) {
    if (str[i] === str[j]) {
      tempLength ++
    }

    if (str[i] !== str[j] || i === length - 1) {
      if (tempLength > res.length) {
        res.char = str[j]
        res.length = tempLength
      }
      tempLength = 0

      if (i < length - 1) {
        j = i
        i --
      }
    }
  }


  return res
}

```

> 正则表达式的效率非常低, 慎用, (实际工作中可以用)

> 累计累计各个元素的连续长度, 最后求最大值徒增辐照度

> 算法题尽量用 "低级代码", 慎用语法糖或者高级 API

> 要注意实际复杂度, 不要被代码表面迷惑

> 双指针常用于解决嵌套循环 

12. 使用 JS 实现数组的快速排序

```ts
/**
 * 
 * 1. 找到中间位置 midValue
 * 2. 遍历数组, 小于 midValue 放在 leit, 否则放在 right
 * 3. 继续递归, 最后 concat 拼接, 返回
 *
 * 获取 midValue 的两种方式:
 * 1. 使用 splice, 会修改原数组
 * 2. 使用 slice, 不会修改原数组 -- 更加推荐
 * */

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

/**
 * 时间复杂度
 * 有遍历, 有二分 --- O(n*logn) 或者 o(nlogn)
 * (常规排序, 嵌套循环, 复杂度 是 O(n^2))
 * */

```

13. 求 1 - 10000 之间的所有对称数

```ts
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
```
14. 数字千分位格式化
```ts
/**
 * 将数字千分位格式化, 输出字符串
 * 如 输入数字 12050100, 输出字符串 12,020,100
 * 
 * 
 * 思路:
 * 1. 转换为数组, reverse, 每 3 位拆分
 * 2. 使用正则表达式
 * 3. 使用字符串拆分
 * */

/**
 * 千分位格式化 (使用数组)
 * @param n number
 * */
export function format(n: number): string {
  n = Math.floor(n) // 只考虑整数

  const s = n.toString()

  const arr: any[] = s.split('').reverse()

  return arr.reduce((prev, val, index) => {
    if (index % 3 === 0) {
      if (prev) {
        return val + ',' + prev
      }else {
        return val
      }
    }else {
      return val + prev
    }
  }, '')
}
/**
 * 千分位格式化 (使用字符串拆分)
 * @param n number
 * */

export function format1(n: number): string {
  n = Math.floor(n) // 只考虑整数

  let res = ''

  const s = n.toString()
  const length = s.length

  for (let i = length - 1; i >= 0; i --) {
    const j  = length - i
    if (j % 3 === 0) {
      if (i === 0) {
        res = s[i] + res
      }else {
        res = ',' + s[i] + res
      }
    }else {
      res = s[i] + res
    }
  }

  return res
}

```

15. 切换字母大小写

```ts
/**
 * 输入一个字符串, 切换其中的字母大小写
 * 如, 输入字符传 12aBc34, 输出 12AbC34
 * 
 * 
 * 思路:
 * 1. 正则表达式
 * 2. 通过 ASCII 码判断
 * */

/**
 * 切换字母大小写 (正则表达式)
 * @param s string
 * */

export function switchLetterCase(s: string): string {
  let res: string = ''
  const length: number = s.length
  if (length === 0) return res

  const reg1: RegExp = /[a-z]/
  const reg2: RegExp = /[A-Z]/

  for (let i = 0; i < length; i ++) {
    const c = s[i]
    if (reg1.test(c)) {
      res += c.toUpperCase()
    }else if (reg2.test(c)) {
      res += c.toLowerCase()
    } else {
      res += c
    }
  }

  return res
}

/**
 * 切换字母大小写 (ASCII 编码)
 * @param s string
 * */
export function switchLetterCase1(s: string): string {
  let res: string = ''
  const length: number = s.length
  if (length === 0) return res

  for (let i = 0; i < length; i ++) {
    const c = s[i]
    const code = s.charCodeAt(i)
    if (code >= 65 && code <= 90) {
      res += c.toLowerCase()
    }else if(code >= 97 && code <= 122) {
      res += c.toUpperCase()
    }else {
      res += c
    }

  }

  return res
}

``` 

## 前端基础知识

#### ajax fetch axios 三者的区别? 

```ts
/**
 * 1. 三者都用于网络请求, 但是维度不同
 * 2. ajax (Asynchronous Javascript And XML), 一种技术统称
 * 3. fetch, 浏览器的原生 API, 用于网络请求
 * 4. axios, 第三方库 https://axios-http.com
 * */

// 使用 XMLHttpRequest 实现 ajax
function ajax(url, successFn) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, false)
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        successFn(xhr.responseText)
      }
    }
  }
  xhr.send(null)
}

function ajax1(url) {
  return fetch(url).then(res=> res.json())
}
```

#### 节流与防抖有什么区别? 分别用于那些场景?

```ts
// 防抖: 事假被触发的n秒后执行, 在n秒内被触发, 则会重新计时
// 节流: 事件在n秒内只会被触发一次
function debounce(fn, delay) {
  let timer = null
  return function() {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.call(this, arguments)
    }, delay)
  }
}

function throttle(fn, delay) {
  let canRun = true;
  return function() {
    if (!canRun) {
      return
    }
    canRun = false;
    setTimeout(() => {
      fn.call(this, arguments)
      canRun = true;
    }, delay)
  }
}

```

#### px, %, em, rem, (vw / vh) 有什么区别?

+ `px`: 基本单位,绝对单位(其他都是相对单位)
+ `%`: 相对于父元素的宽度比例
+ `em`:  相对于当前元素的 font-size
+ `rem`: 相对于根节点的 font-size
+ `vm / vh`: 相对于视口的单位长度

#### 箭头函数

+ 箭头函数有什么缺点?
  - 没有 `arguments`
  - 无法通过 `apply` `call` `bind` 改变 this
  - 某些代码难以阅读

+ 什么时候不能使用箭头函数?
  - 对象方法
  - 原型方法
  - 构造函数
  - 动态上下文中的回调函数
  - Vue 生命周期和 method

```ts
// - 对象方法
const obj = {
  name: "Embrace",
  getName: () => {
    return this.name
  }
}

console.log(obj.getName()) // 输出为空

// - 原型方法

const obj1 = {
  name: "Embrace"
}

obj1.__proto__.getName = () => {
  return this.name
}

console.log(obj.getName()) // 输出为空

// - 构造函数

const Foo = (name: string, age: number): Object => {
  this.name = name
  this.age = age
}

const t = new Foo("张三", 18) // 报错 Foo is not a constructor

// - 动态上下文中的回调函数
const btn1 = document.getElementById('btn1')
btn1.addEventListener('click', () => {
  this.innerHTML = 'clicked' // this === window
})
```

#### for...in 和 for...of 有什么区别
1. for...in 遍历得到 key 
2. for...of 遍历得到 value
3. 遍历对象: for...in可以, for...of 不可以
4. 遍历 Map Set: for...of 可以, for...in 不可以
5. 遍历 generator: for...of 可以, for...in 不可以

#### for await...of 有什么作用

> for await...of 主要用于遍历多个 Promise

```ts
function createPromise(val) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(val)
    }, 1000)
  })
}

(async function () {
  const p1 = createPromise(100)
  const p2 = createPromise(200)
  const p3 = createPromise(300)

  // const res1 = await p1
  // console.log(res1)
  // const res2 = await p2
  // console.log(res２)
  // const res3 = await p3
  // console.log(res３)
  const list = [p1, p2, p3]
  // Promise.all(list).then(res => {
  //   console.log(res)
  // })
  for await (let res of list) {
    console.log(res)
  }
})()
```

#### offsetHeight scrollHeight clientHeight 区别
1. `offsetHeight offsetWidth`: border + padding + content
2. `clientHeight clientWidth`: padding + content
3. `scrollHeight scrollWidth`: padding + 实际尺寸

#### HTMLCollection 和 NodeList 区别 

```ts
/**
 * Node 和 Element
 * 1. DOM 是一颗树, 所有的节点都是 Node
 * 2. Node 是 Element 的基类
 * 3. Element 是其他 HTML 元素的基类, 如 HTMLDivElement
 * */

class Node {}


// document
class Document extends Node {}
class DocumentFragment extends Document {}

// 文本和注释
class CharacterData extends Node {}
class Comment extends CharacterData {}
class Text extends CharacterData {}

// elem
class Element extends Node {}
class HTMLElement extends Element {}
class HTMLDivElment extends HTMLElement {}
class HTMLInputElement extends HTMLElement {}
/**
 * HTMLCollection 和 NodeList
 * 1. HTMLCollection 是 Element 的集合 
 * 2. NodeList 是 Node 的集合
 * 3. 获取 Node 和 ELement 的返回结果可能不大一样
 * 4. 如 elem.childNodes 和 elem.children 不一样
 * 5. 前者会包含 Text 和 Comment 节点, 后者不会
 * */
```
![img_6.png](img_6.png)

#### Vue Computed 和 watch 区别 

1. computed 用于计算产生新的数据
2. watch 用于监听数据的变化

#### Vue 组件通讯的方法

1. props 和 $emit
2. 自定义事件
3. $attr
4. $parent
5. $refs
6. provide / inject
7. Vuex

#### Vuex mutation action 区别

+ `mutation`: 原子操作, 必须同步代码
+ `action`: 可以包含多个 mutation, 可包含异步代码

#### JS 严格模式有什么特点

1. 全局变量必须先声明
2. 禁止用 with
3. 创建 eval 作用域
4. 禁止 this 指向 window
5. 函数参数不能重复

#### HTTP 跨域请求时为何发送 options 请求

```ts
/**
 * 跨域请求
 * 浏览器同源策略: 同协议 + 同IP + 同端口
 * 同源策略一般限制 Ajax 网络请求, 不能跨域请求 Server
 * 不会显示 <link> <img> <script> <iframe> 加载第三方资源
 * */

/**
 * options 请求, 是跨域请求之前的检查
 * 浏览器自行发起的, 无需我们干预
 * 不会影响实际功能
 * */
```        

## 原理与源码

#### JS内存垃圾回收

+ JS 内存泄漏如何检测? 场景有哪些?
    - 什么是垃圾回收 (`GC`: `Garbage Collection`) ?
> JS的垃圾回收机制是为了以防内存泄漏, 内存泄漏的含义就是当已经不需要某块内存时这块内存还存在着, 垃圾回收机制就是间歇的不定期的寻找到不再使用的变量, 并释放掉它们所指向的内存.  
    
    
- 内存泄漏场景 (Vue)
1. 被全局变量, 函数引用, 组件销毁时未清除
2. 被全局事件, 定时器引用, 组件销毁时未清除
3. 被自定义事件引用, 组件销毁时未清除

- `WeakMap` `WeakSet` 弱引用

```ts
const wMap = new WeakMap()

function fn1() {
  const obj = {x: 200}
  wMap.set(obj) // weakMap 的key 只能是引用类型
}

```

#### 浏览器和 NODEJS 事件循环 (Event Loop)

1. 浏览器和 NODEJS 的时间循环有什么区别

+ 单线程和异步
  + JS 是单线程的 (无论是浏览器还是 NODEJS)
  + 浏览器中 JS 执行和 DOM 渲染共用一个线程
  + 异步 (单线程的解决方案)

+ 微任务和宏任务
  + 宏任务: `setTimeout` `setInterval` `网络请求`
  + 微任务: `Promise` `async / await` `MutationObserver`
  + 微任务在下一轮 DOM 渲染之前执行, 宏任务在之后执行  

```ts
const p = document.createElement('p')
p.innerHTML = 'new paragraph'
document.body.appendChild(p)

const list = document.getElementsByTagName('p')

console.log('length------', list.length) // 1

console.log('start') // 2
// 渲染之后
setTimeout(() => {
  const list = document.getElementsByTagName('p')
  console.log('length on timeout----', list.length) // 6
  alert("阻塞 setTimeout") // 7
})


// 渲染之前
Promise.resolve().then(() => {
  const list = document.getElementsByTagName('p')
  console.log('length on promise.then----', list.length)// 4
  alert("阻塞 Promise") // 5
})
console.log("end") // 3
```
![img_7.png](img_7.png)


2. Node 异步

+ node.js 同样使用ES 语法, 也是单线程, 也需要异步
+ 异步任务也分为宏任务与微任务
+ 但是, 它的宏任务和微任务, 分不同类型, 有不同的优先级 
  + 宏任务 ( 从上至下优先级排序 )
    + Timers: `setTimeout` `setInterval`
    + I/O callback: 处理网络, 流, TCP 的的错误回调
    + Idle, prepare: 闲置状态 (node.js 内部使用)
    + Poll 轮询: 执行 poll 中 I/O 队列
    + Check 检查: 存储 setImmediate 回调
    + close callback: 关闭回调, 如 socket.on('close')
  + 微任务
    + 包括 Promise, async/await, process.nextTick
    + 注意, process.nextTick 优先级最高
    + 推荐使用 setImmediate 代替 process.nextTick

#### 虚拟DOM (Virtual DOM)
> 用 JS 对象模拟 DOM 节点数据
1. Vue React 等框架的价值
    + 组件化 
    + 数据视图分离, 数据驱动视图
    + 只关注业务数据, 而不用在关心 DOM 变化
2. 虚拟 DOM 真的快吗?
    + vdom 并不快, JS直接操作 DOM 才是最快的
    + 但 "数据驱动视图" 要有合适的技术方案, 不能全部 DOM 重建
    + vdom 就是目前最合适的技术方案 (并不是因为它快, 而是合适)

#### 遍历一个数组, for 和 forEach 那个更快
   + for 更快
   + forEach 每次都要创建一个函数来调用, 而 for 不会创建函数
   + 函数需要独立的作用域, 会有额外的开销

```ts
// forEach 实现
Array.prototype.forEach = function (callback, thisArg) {
  if (this == null) {
    throw new TypeError(" this is null or not defined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  const length = this.length;
  let i = 0;
  while (i < length) {
    callback(this[i], i, this);
    i++;
  }
};
```

#### NodeJS 如何开启进程, 进程如何通讯?

+ `进程 (process)`
  - OS (系统) 进行资源分配和调度的最小单位, 有独立的内存空间

+ `线程 (thread)`
  - OS (系统) 进行运算调度的最小单位, 共享进程内存空间, 一个进程内可以包含多个线程, 进程用于内存分配, 而线程是在进程内部进行计算的, 可以共享进程的内存空间

+ JS是单线程的, 但可以开启多进程执行, 比如 webWorker

+ 为何需要多进程?
  - 多核CPU, 更适合处理多进程
  - 内存较大, 多个进程才能更好的利用(单进程有内存上限)
  - 总之, "压榨" 机器资源, 更快, 更节省

````js
// node 开启子进程

// index.js
const fork = require("child_process").fork;
const http = require("http")

const server = http.createServer((req, res) => {
  if (req.url === '/get-sum') {
    console.info("主进程 id", process.pid)
    const computedProcess = fork('./compute.js')
    computedProcess.send('开始计算')

    computedProcess.on('message', data => {
      console.log("主进程接收到信息", data)
      res.end('sum is' + data)
    })
    
    computedProcess.on('close', () => {
      console.log("子进程因报错退出")
      computedProcess.kill()
      res.end('error')
    })
  }
})

server.listen(3000, () => {
  console.info('listening on port 3000')
})

// compute.js

function getSum() {
  let sum = 0
  for (let i = 0; i < 10000; i ++) {
    sum += i
  }
  return sum
}

process.on('message', data => {
  console.log('子进程 id', process.pid)
  console.log('子进程接收到信息', data)
  const sum = getSum()
  
  // 发送消息给主进程 
  process.send(sum)
})
````

```ts
// cluster 方式
const http = require("http")
const cpuCoreLength = require("os").cpus().length
const cluster = require("cluster")

if (cluster.isMaster) {
  for (let i = 0; i < cpuCoreLength; i++) {
    cluster.fork() // 开启子进程
  }
  
  cluster.on('exit', worker => {
    console.log("子进程退出");
    cluster.fork() // 进程守护
  })
}else {
  // 多个子进程会共享一个TCP连接, 提供一份网络服务
  const server = http.createServer((req, res) => {
   res.writeHead(200)
   res.send('done') 
  })
  server.listen(300)
}

// 实际工作中 会使用 PM2
```

#### 请描述 JS Bridge 原理?

> JS 无法直接调用 native API, 需要通过一些特定的 "格式" 来调用, 这些 "格式" 就统称 JS-Bridge, 例如微信 JSSDK

![img_8.png](img_8.png)

+ JS Bridge 常见实现方式
  + 注册全局 API
  + URL Scheme

```ts
// 1. 注册全局 API
const version = window.getVersion()

// 2. URL Scheme

// const iframe1 = document.getElementById('iframe1');
// iframe1.onload = () => {
// 	const content = iframe1.contentWindow.document.body.innerHTML;
// 	console.log("content: " , content);
// }
// iframe1.src = 'http://localhost:63342/%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95/index.html?_ijt=9bakd6l999ag4bcun487h7slih&_ij_reload=RELOAD_ON_SAVE'

const SDK = {
  invoke(url, data, onSuccess, onError) {
    const iframe = document.createElement('iframe');
    iframe.style.visibility = 'hidden'
    document.body.appendChild(iframe)
    iframe.onload = function () {
      const content = iframe.contentWindow.document.body.innerHTML;
      onSuccess(JSON.parse(content))
      iframe.remove()
    }
    iframe.onerror = function () {
      onError()
      iframe.remove()
    }
    iframe.src = `my-app-name://${url}?data=${JSON.stringify(data)}`
  },
  fn1(data, onSuccess, onError) {
    this.invoke('api/fn1', data, onSuccess, onError)
  },
  fn2(data, onSuccess, onError) {
    this.invoke('api/fn2', data, onSuccess, onError)
  },
  fn3(data, onSuccess, onError) {
    this.invoke('api/fn3', data, onSuccess, onError)
  },
}
```

5. 是否了解 requestIdleCallback? 和 requestAnimationFrame 有什么区别?

```ts
/**
 * 由 React fiber 引起的关注
 * 组建树转换为链表, 可分段渲染
 * 渲染时可以暂停, 去执行其他高优任务, 空闲时在继续渲染
 * 如何判断空闲?  ---- requestIdleCallback 
 * */
```
+ 区别
  + requestIdleCallback 空闲时才执行, 低优
  + requestAnimationFrame 每次渲染玩都会执行, 高优

```ts
const box = document.getElementById('box')

document.getElementById('btn1').addEventListener('click', () => {
  let curWidth = 100, maxWidth = 300
  
  function addWidth() {
    curWidth += 3
    box.style.width = `${curWidth}px`
    if (curWidth < maxWidth) {
      // window.requestIdleCallback(addWidth)
      window.requestAnimationFrame(addWidth)
    }
  }
  addWidth()
})
```

+ 他们是宏任务还是微任务?
  + 两者都是宏任务
  + 要待 DOM 渲染完才执行, 肯定是宏任务

#### vue 生命周期

+ beforeCreate
    - 创建一个空白的实例
    - data method 尚未被初始化, 不可使用
+ created
    - Vue实例舒适化完成, 完成响应式绑定
    - data method 尚未被初始化, 不可使用
    - 尚未开始渲染模板
+ beforeMount
    - 编译模板, 调用 render 生成 vdome
    - 还没有渲染 DOM
+ mounted
    - 完成了 DOM 渲染
    - 组件创建完成
    - 开始由 "创建阶段" 进入 "运行阶段"
+ beforeUpdate
    - data 发生变化之后
    - 准备更新 DOM (尚未更新 DOM)
+ updated
    - data 发生变化, 且 DOM 更新完成
    - ( **不要再 update 中修改 data, 可能会导致死循环** )
+ beforeUnmount
    - 组件进入销毁阶段 (尚未销毁, 可以正常使用)
    - 可移除, 解绑一些全局事件, 自定义事件
+ unmounted
    - 组件被销毁了
    - 所有子组件也都被销毁了
+ onActivated
    - 缓存组件被激活
+ onDeactivated
    - 缓存组件被隐蔽

```ts
/**
 * 1. Vue 什么时候操作 DOM 比较合适
 *    - mounted 和 updated 都不能保证子组件全部挂载完成
 *    - 使用 $nextTick 来操作 DOM
 * 2. Vue3 Componsition API 生命周期有何区别?
 *    - 用 setup 代替了 beforeCreate 和 created 
 *    - 使用 Hook 函数的形式, 如 mounted 改为 onMounted 
 * */
```


#### Vue2 Vue3 React 三者的diff 算法有何区别?

+ tree diff 的优化
  - 只比较同一层级, 不跨级比较
  - tag 不同则删掉重建 (不再去比较内 部细节)  
  - 子节点通过 key 区分 (key的重要性)

+ 区别
  - React diff 仅右移
  ![img_9.png](img_9.png)
  - Vue2 diff 双端比较
  ![img_10.png](img_10.png)
  - Vue3 最长递增子序列
  ![img_11.png](img_11.png)

#### Vue React 为何循环时必须使用key?

1. vdom diff 算法会根据 key 判断元素是否要删除?
2. 匹配了 key, 则只移动元素 - 性能好
3. 未匹配key, 则删除重建 - 性能差


