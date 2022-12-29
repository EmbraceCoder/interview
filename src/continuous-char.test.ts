import {findContinuousChar, findContinuousChar1} from "./continuous-char";

describe('字符串中连续最多的字符, 以及次数', function () {
  it('正常情况 嵌套循环', function () {
    const str = "abbcccddeeee1234"
    const res = findContinuousChar(str)
    expect(res).toEqual({
      char: 'e',
      length: 4
    })
  });
  it('空字符串 嵌套循环', function () {
    const str = ""
    const res = findContinuousChar(str)
    expect(res).toEqual({
      char: '',
      length: 0
    })
  });
  it('无连续字符串 嵌套循环', function () {
    const str = "abc"
    const res = findContinuousChar(str)
    expect(res).toEqual({
      char: 'a',
      length: 1
    })
  });
  it('全连续字符串 嵌套循环', function () {
    const str = "aaa"
    const res = findContinuousChar(str)
    expect(res).toEqual({
      char: 'a',
      length: 3
    })
  });
  it('正常情况 双指针', function () {
    const str = "abbcccddeeee1234"
    const res = findContinuousChar1(str)
    expect(res).toEqual({
      char: 'e',
      length: 4
    })
  });
  it('空字符串 双指针', function () {
    const str = ""
    const res = findContinuousChar1(str)
    expect(res).toEqual({
      char: '',
      length: 0
    })
  });
  it('无连续字符串 双指针', function () {
    const str = "abc"
    const res = findContinuousChar1(str)
    expect(res).toEqual({
      char: 'a',
      length: 1
    })
  });
  it('全连续字符串 双指针', function () {
    const str = "aaa"
    const res = findContinuousChar1(str)
    expect(res).toEqual({
      char: 'a',
      length: 3
    })
  });
});
