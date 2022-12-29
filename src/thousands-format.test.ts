import {format, format1} from "./thousands-format";

describe('数字千分位格式化', function () {
  it('正常情况', function () {
    const n: number = 1201004500
    const res = format(n)
    const res1 = format1(n)
    expect(res).toBe("1,201,004,500")
    expect(res1).toBe("1,201,004,500")
  });
  it('小于 1k 情况', function () {
    const n: number = 999
    const res = format(n)
    const res1 = format1(n)
    expect(res).toBe("999")
    expect(res1).toBe("999")
  });
});
