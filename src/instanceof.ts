/**
 * 自定义 instanceof
 * @param instance instance
 * @param origin class or function
 * */
export function myInstanceof(instance:any, origin: any): boolean {
  if (instance === null) return false // null undefined
  const type = typeof instance
  if (type !== "object" && type !== 'function') {
    // 值类型
    return false
  }
  let tempInstance = instance // 为了防止修改 instance
  while (tempInstance) {
    if (tempInstance.__proto__ === origin.prototype) {
      return true // 匹配上了
    }
    // 未匹配
    tempInstance = tempInstance.__proto__ // 顺着原型链, 往上找
  }
  return false
}
myInstanceof([], Array)
myInstanceof({}, Object)
