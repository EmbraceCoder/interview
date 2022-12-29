export function matchBracket(str: string): boolean {
  const length = str.length
  if (length  === 0) return true
  const stack = []
  const leftSymbols = '{[('
  const rightSymbols = '}])'

  for (let i = 0; i < length; i++) {
    const s = str[i]
    if (leftSymbols.includes(s)) {
      // 左括号进入, 压栈
      stack.push(s)
    }else if (rightSymbols.includes(s)) {
      // 右括号进入, 出栈
      let top = stack[stack.length - 1] as string
      if (isMatch(top, s)) {
        stack.pop()
      }else {
        return false
      }
    }
  }
  return stack.length === 0
}

function isMatch(left: string, right: string): boolean {
  if(left === "{" && right === "}") return true;
  if(left === "[" && right === "]") return true;
  if(left === "(" && right === ")") return true;
  return false
}
