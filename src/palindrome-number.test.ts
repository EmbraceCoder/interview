import {findPalindromeNumbers, findPalindromeNumbers1, findPalindromeNumbers2} from "./palindrome-number";

describe('求 1 - 10000 之间的所有对称数', function () {
  it('正常情况 (数组反转)', function () {
    const res = findPalindromeNumbers(200)
    expect(res).toEqual([
      0,   1,   2,   3,   4,   5,   6,   7,   8,
      9,  11,  22,  33,  44,  55,  66,  77,  88,
      99, 101, 111, 121, 131, 141, 151, 161, 171,
      181, 191
    ])
  });
  it('max 小于等于 0 (数组反转)', function () {
    const res = findPalindromeNumbers(0)
    const res1 = findPalindromeNumbers(-1)
    expect(res).toEqual([])
    expect(res1).toEqual([])
  });
  it('正常情况 (字符串前后比较)', function () {
    const res = findPalindromeNumbers1(200)
    expect(res).toEqual([
      0,   1,   2,   3,   4,   5,   6,   7,   8,
      9,  11,  22,  33,  44,  55,  66,  77,  88,
      99, 101, 111, 121, 131, 141, 151, 161, 171,
      181, 191
    ])
  });
  it('max 小于等于 0 (字符串前后比较)', function () {
    const res = findPalindromeNumbers1(0)
    const res1 = findPalindromeNumbers1(-1)
    expect(res).toEqual([])
    expect(res1).toEqual([])
  });
  it('正常情况 (翻转数字)', function () {
    const res = findPalindromeNumbers2(200)
    expect(res).toEqual([
      0,   1,   2,   3,   4,   5,   6,   7,   8,
      9,  11,  22,  33,  44,  55,  66,  77,  88,
      99, 101, 111, 121, 131, 141, 151, 161, 171,
      181, 191
    ])
  });
  it('max 小于等于 0 (翻转数字)', function () {
    const res = findPalindromeNumbers2(0)
    const res1 = findPalindromeNumbers2(-1)
    expect(res).toEqual([])
    expect(res1).toEqual([])
  });
});
