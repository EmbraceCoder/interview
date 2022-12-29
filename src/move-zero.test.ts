import {moveZero, moveZero1} from "./move-zero";

describe('移动 0 到数组的末尾', function () {
  it('正常情况 嵌套循环', function () {
    const arr = [1, 0, 3, 4, 0, 0, 11, 0]
    moveZero(arr)
    expect(arr).toEqual([1, 3, 4, 11, 0, 0, 0, 0])
  });
  it('没有 0 情况 嵌套循环', function () {
    const arr = [1, 3, 4, 11, 8, 9]
    moveZero(arr)
    expect(arr).toEqual([1, 3, 4, 11, 8, 9])
  });

  it('正常情况 双指针', function () {
    const arr = [1, 0, 3, 4, 0, 0, 11, 0]
    moveZero1(arr)
    expect(arr).toEqual([1, 3, 4, 11, 0, 0, 0, 0])
  });
  it('没有 0 情况 双指针', function () {
    const arr = [1, 3, 4, 11, 8, 9]
    moveZero1(arr)
    expect(arr).toEqual([1, 3, 4, 11, 8, 9])
  });
});
