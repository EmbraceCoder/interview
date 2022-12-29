import {findTwoNumbers1, findTwoNumbers2} from "./two-numbers-sum";

describe('两数之和', function () {
  it('嵌套循环 正常情况', function () {
    const arr = [1,2,4,7,11,15]
    const target = 9
    const res = findTwoNumbers1(arr, target)
    expect(res).toEqual([1, 3])
  });
  it('嵌套循环 空数组', function () {
    const arr = [] as number[]
    const target = 9
    const res = findTwoNumbers1(arr, target)
    expect(res).toEqual([])
  });

  it('嵌套循环 找不到结果', function () {
    const arr = [1,2,4,7,11,15]
    const target = 100
    const res = findTwoNumbers1(arr, target)
    expect(res).toEqual([])
  });
  it('双指针 正常情况', function () {
    const arr = [1,2,4,7,11,15]
    const target = 9
    const res = findTwoNumbers2(arr, target)
    expect(res).toEqual([1, 3])
  });
  it('双指针 空数组', function () {
    const arr = [] as number[]
    const target = 9
    const res = findTwoNumbers2(arr, target)
    expect(res).toEqual([])
  });

  it('双指针 找不到结果', function () {
    const arr = [1,2,4,7,11,15]
    const target = 100
    const res = findTwoNumbers2(arr, target)
    expect(res).toEqual([])
  });
});

