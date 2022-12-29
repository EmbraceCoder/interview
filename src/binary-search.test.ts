import {binarySearch} from "./binary-search";

describe('使用JS, 实现二分查找', function () {
  it('二分, 找不到该目标', function () {
    const arr = [1,2,3,4,5,6,7,8,9,10]
    const target = 11
    const res = binarySearch(arr, target)
    expect(res).toEqual(-1)
  });

  it('二分, 找的到该目标', function () {
    const arr = [1,2,3,4,5,6,7,8,9,10]
    const target = 2
    const res = binarySearch(arr, target)
    expect(res).toEqual(1)
  });
  it('二分, 空数组', function () {
    const arr = [] as number[]
    const target = 2
    const res = binarySearch(arr, target)
    expect(res).toEqual(-1)
  });
});





