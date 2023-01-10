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


