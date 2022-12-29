import {MyQueue} from "./two-stacks-one-queue";


describe('两个栈 一个队列', function () {
  it('add length', function () {
    const q = new MyQueue()
    expect(q.length).toBe(0)
    q.add(1)
    q.add(2)
    q.add(3)
    expect(q.length).toBe(3)
  });
  it('delete', function () {
    const q = new MyQueue()
    expect(q.delete()).toBeNull()
    q.add(1)
    q.add(2)
    q.add(3)
    expect(q.delete()).toBe(1)
    expect(q.length).toBe(2)
    expect(q.delete()).toBe(2)
    expect(q.length).toBe(1)
    expect(q.delete()).toBe(3)
    expect(q.length).toBe(0)
  });
});
