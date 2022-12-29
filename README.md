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

+ 二叉树
![img_3.png](img_3.png)

+ **红黑树**
![img_2.png](img_2.png)

+ B树
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





