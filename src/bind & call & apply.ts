/**
 * bind 应用
 * 返回一个函数, 但不执行
 * 绑定 this 和部分参数
 * 如果是箭头函数, 无法改变 this, 只能改变参数
 * */

// @ts-ignore
Function.prototype.customBind = function (context:any, ...bindArgs: any[]) {
  // context 是 bind 传入的 this
  // bindArgs 是 bind 传入的各个参数

  const self = this; // 当前函数本身

  return function (...args: any[]) {
    // 拼接参数
    const newArgs = bindArgs.concat(args)
    return self.apply(context, newArgs)
  }
}

function fn(this: any, a: any, b:any, c:any): void {
  console.log(this, a, b, c)
}

// @ts-ignore
const fn1 = fn.customBind({x: 100}, 10)

fn1(20,30) // {x:100} 10 20 30


/**
 * call & apply 应用
 * bind 返回一个新函数 (不执行), call 和 apply 会立即执行函数
 * 绑定 this
 * 传入执行参数
 * */
// @ts-ignore
Function.prototype.customCall = function (context: any, ...args: any[]) {
  if (context === null) context = globalThis;
  if (typeof context !== 'object') context = new Object() // 值类型, 变成对象

  const fnKey = Symbol() // 不会出现属性名称的覆盖
  context[fnKey] = this // this 就是当前函数

  const res = context[fnKey](...args) // 绑定了 this

  delete context[fnKey] // 清理掉 fn, 防止污染

  return res
}

// @ts-ignore
Function.prototype.customApply = function (context: any, args: any[] = []) {
  if (context === null) context = globalThis;
  if (typeof context !== 'object') context = new Object() // 值类型, 变成对象

  const fnKey = Symbol() // 不会出现属性名称的覆盖
  context[fnKey] = this // this 就是当前函数

  const res = context[fnKey](...args) // 绑定了 this

  delete context[fnKey] // 清理掉 fn, 防止污染

  return res
}
