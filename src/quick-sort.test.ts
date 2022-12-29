import {quickSort, quickSort1} from "./quick-sort";

describe('JS 快速排序', function () {
  it('正常情况 splice', function () {
    const arr: number[] = [1,6,2,7,3,8,4,9,5]
    const res = quickSort(arr)
    expect(res).toEqual([1,2,3,4,5,6,7,8,9])
  });
  it('有负数 splice', function () {
    const arr: number[] = [-2,-3,1,2]
    const res = quickSort(arr)
    expect(res).toEqual([-3,-2,1,2])
  });
  it('数组元素都一样 splice', function () {
    const arr: number[] = [2,2,2,2,2,2]
    const res = quickSort(arr)
    expect(res).toEqual([2,2,2,2,2,2])
  });
  it('空数组 splice', function () {
    const arr: number[] = []
    const res = quickSort(arr)
    expect(res).toEqual([])
  });


  it('正常情况 slice', function () {
    const arr: number[] = [1,6,2,7,3,8,4,9,5]
    const res = quickSort1(arr)
    expect(res).toEqual([1,2,3,4,5,6,7,8,9])
  });
  it('有负数 slice', function () {
    const arr: number[] = [-2,-3,1,2]
    const res = quickSort1(arr)
    expect(res).toEqual([-3,-2,1,2])
  });
  it('数组元素都一样 slice', function () {
    const arr: number[] = [2,2,2,2,2,2]
    const res = quickSort1(arr)
    expect(res).toEqual([2,2,2,2,2,2])
  });
});
