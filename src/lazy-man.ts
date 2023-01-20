class LazyMan {
  private readonly name: string
  private tasks: Function[] = [] // 任务列表
  constructor(name: string) {
    this.name = name
    setTimeout(() => {
      this.next()
    })
  }
  private next() {
    const stack = this.tasks.shift()
    if (stack) {
      stack()
    }
  }
  eat(food: string) {
    const stack = () => {
      console.info(`${this.name} eat ${food}`)
      this.next() // 立即执行下一个任务
    }
    this.tasks.push(stack)
    return this // 链式调用
  }
  sleep(sleepTime: number) {
    const stack = () => {
      setTimeout(() => {
        this.next()
      }, sleepTime * 1000)
    }
    this.tasks.push(stack)
    return this
  }
}

const me = new LazyMan("Embrace")

me.eat("香蕉").eat('苹果').sleep(5).eat("桃子")
