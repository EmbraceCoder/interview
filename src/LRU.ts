/**
 * 用 hash 表存储数据, 这样 get set 才够快 O(1)
 * 必须是有序的, 常用数据放在前面, "沉水" 数据放在后面
 * 哈希表 + 有序, 就是 Map 其他都不行
 * */
// export default class LURCache {
//   private length: number
//   private data: Map<any, any> = new Map()
//   constructor(length: number) {
//     if (length < 1) throw new Error('invalid length')
//     this.length = length
//   }
//   set(key: any, value: any) {
//     const data = this.data
//     if (data.has(key)) {
//       data.delete(key)
//     }
//     data.set(key, value)
//
//     if (data.size > this.length) {
//       // 如果超出了容量, 则删除 MAP 最老的元素
//       const delKey = data.keys().next().value
//       data.delete(delKey)
//     }
//   }
//   get(key:any) {
//     const data = this.data
//     if (!data.has(key)) return null;
//     const value = data.get(key)
//     data.delete(key)
//     data.set(key, value)
//     return value
//   }
// }


interface IListNode {
  value: any
  key: string // 存储 key, 方便删除 (否则删除时就需要遍历对象)
  prev?: IListNode
  next?: IListNode
}

export default class LRUCache {
  private length: number
  private data: {[key: string]: IListNode | null} = {}
  private dataLength: number = 0
  private listHead: IListNode | null = null
  private listTail: IListNode | null = null
  constructor(length: number) {
    if (length < 1) throw new Error('invalid length')
    this.length = length
  }
  private moveToTail(curNode: IListNode) {
    const tail = this.listTail
    if (tail === curNode) return

    // ------------ 1. 让 prevNode nextNode 断绝与 curNode 的关系 -------------
    const prevNode = curNode?.prev
    const nextNode = curNode?.next

    if (prevNode) {
      if (nextNode) {
        prevNode.next = nextNode
      }else {
        delete prevNode.next
      }
    }

    if (nextNode) {
      if (prevNode) {
        prevNode.prev = prevNode
      }else {
        delete nextNode.prev
      }
      if (this.listHead === curNode) this.listHead = nextNode
    }

    // ------------ 2. 让 curNode 断绝与 prevNode nextNode 的关系 -------------
    delete curNode.prev
    delete curNode.next

    // ------------ 3. 在 list 的末尾重新建立 curNode 的新关系 -------------
    if (tail) {
      tail.next = curNode
      curNode.prev = tail
    }

    this.listTail = curNode

  }
  private tryClean() {
    while (this.dataLength > this.length) {
      const head = this.listHead
      if (head === null) throw new Error('head is null')
      const headNext = head.next
      if (headNext === null) throw new Error('headNext is null')
      // 1. 断绝 head 和 next 的关系
      delete headNext?.prev
      delete head?.next

      // 2. 重新赋值 listHead
      // @ts-ignore
      this.listHead = headNext

      // 3. 清理 data, 重新计数
      delete this.data[head.key]
      this.dataLength = this.dataLength - 1
    }
  }
  get(key: string): any {
    const data = this.data
    const curNode = data[key]

    if (curNode === null) return null

    if (this.listTail === curNode) {
      // 本身在末尾 (最新鲜的位置), 直接返回 value
      return curNode.value
    }

    // curNode 移动到末尾
    this.moveToTail(curNode)

    return curNode.value
  }
  set(key: string, value: any) {
    const data = this.data
    const curNode: IListNode | null = data[key]
    if (curNode === null || curNode === undefined) {
      // 新增数据
      const newNode: IListNode = {key, value}
      // 移动到末尾
      this.moveToTail(newNode)
      data[key] = newNode
      this.dataLength ++
      if (this.dataLength === 1) {
        this.listHead = newNode
      }
    }else {
      // 修改现有数据
      curNode.value = value
      // 移动到末尾
      this.moveToTail(curNode)
    }

    // 尝试清理长度
    this.tryClean()
  }
}
