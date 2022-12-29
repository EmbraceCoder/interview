import {switchLetterCase, switchLetterCase1} from "./switch-letter";

describe('切换字母大小写', function () {
  it('正常情况', function () {
    const s = "12aBc34"
    const res = switchLetterCase(s)
    const res1 = switchLetterCase1(s)
    expect(res).toBe("12AbC34")
    expect(res1).toBe("12AbC34")
  });
  it('空字符串', function () {
    const s = ""
    const res = switchLetterCase(s)
    const res1 = switchLetterCase1(s)
    expect(res).toBe("")
    expect(res1).toBe("")
  });
  it('非字符', function () {
    const s = "123张三"
    const res = switchLetterCase(s)
    const res1 = switchLetterCase1(s)
    expect(res).toBe("123张三")
    expect(res1).toBe("123张三")
  });
});
