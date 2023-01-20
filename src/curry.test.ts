import {add, curry} from "./curry";

describe('函数柯里化', function () {
  it('curry add', function () {
    const curryAdd = curry(add)
    const res = curryAdd(1)(2)(3)
    expect(res).toBe(6)
  });
});
