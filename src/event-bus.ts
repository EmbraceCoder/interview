/**
 * 分析
 * on 和 once 注册函数, 存储起来
 * emit 时找到对应的函数, 执行
 * off 找到对应的函数, 从对象中删除
 *
 *
 * on 绑定事件可以连续执行, 除非 off
 * once 绑定的函数 emit 一次既删除, 也可以尾执行被 off
 * 数据结构上标识出 on 与 off
 * */

export default class EventBus {
  /**
   * {
   *   key1: [
   *     {
   *       fn: fn1,
   *       isOnce: false
   *     },
   *     {
   *       fn: fn2,
   *       isOnce: false
   *     },
   *     {
   *       fn: fn3,
   *       isOnce: true
   *     },
   *   ],
   *   key2: [],
   *   key3: []
   * }
   * */

  private events: {
    [key: string]: Array<{
      fn: Function,
      isOnce: boolean
    }>
  }
  constructor() {
    this.events = {}
  }
  on(type: string, fn: Function, isOnce: boolean = false) {
    const events = this.events
    if (events[type] == null) {
      events[type] = [] // 初始化 key 的 fn 数组
    }
    events[type].push({
      fn,
      isOnce
    })
  }
  once(type: string, fn: Function) {
    this.on(type, fn, true)
  }

  off(type: string, fn?: Function) {
    if (!fn) {
      // 解绑所有 type 的函数
      this.events[type] = []
    }else {
      // 解绑单个函数
      const fnList = this.events[type]

      if (fnList) {
        this.events[type] = fnList.filter(item => item.fn !== fn)
      }
    }
  }
  emit(type: string, ...args: any[]) {
    const fnList = this.events[type]
    if (fnList === null) return

    this.events[type] = fnList.filter(item => {
      const {fn, isOnce} = item
      fn(...args)

      if (!isOnce) return true
      return false
    })
  }
}
