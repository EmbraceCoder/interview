import {myInstanceof} from "./instanceof";

describe('自定义 instanceof', function () {
  it('null undefined', function () {
    const res1 = myInstanceof(null, Object)
    const res2 = myInstanceof(undefined, Object)
    expect(res1).toBeFalsy()
    expect(res2).toBeFalsy()
  });
  it('值类型', function () {
    const res1 = myInstanceof(123, Number)
    const res2 = myInstanceof("张三", String)
    expect(res1).toBeFalsy()
    expect(res2).toBeFalsy()
  });
  it('引用类型', function () {
    const res1 = myInstanceof({}, Object)
    const res2 = myInstanceof([], Array)
    expect(res1).toBeTruthy()
    expect(res2).toBeTruthy()
  });
  it('函数', function () {
    function fn() {}
    const res = myInstanceof(fn, Function)
    expect(res).toBeTruthy()

  });
  it('自定义', function () {
    class Foo {}
    const f = new Foo()
    const res1 = myInstanceof(f, Foo)
    expect(res1).toBeTruthy()
    const res2 = myInstanceof(f, Object)
    expect(res2).toBeTruthy()
  });
});
