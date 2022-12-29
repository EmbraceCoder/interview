import {fibonacci, fibonacci1} from "./fibonacci";

describe('菲波那切数列', function () {
  it('求斐波那契数列的第 n 值 (递归)', function () {
    const res = fibonacci(9)
    const res1 = fibonacci(20)
    expect(res).toEqual(34)
    expect(res1).toEqual(6765)
  });

  it('求斐波那契数列的第 n 值 (优化 for)', function () {
    const res = fibonacci1(9)
    const res1 = fibonacci1(20)

    expect(res).toEqual(34)
    expect(res1).toEqual(6765)
  });


  it('0 或 1', function () {
    expect(fibonacci(0)).toBe(0)
    expect(fibonacci(1)).toBe(1)

    expect(fibonacci1(0)).toBe(0)
    expect(fibonacci1(1)).toBe(1)
  });
});
