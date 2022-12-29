import {MyQueue} from "./queue-with-list";

describe('使用链表实现队列', function () {
  it('add and length', function () {
    const queue = new MyQueue()
    expect(queue.length).toBe(0)
    queue.add(100)
    queue.add(200)
    queue.add(300)
    expect(queue.length).toBe(3)
  });
  it('delete', function () {
    const queue = new MyQueue()
    expect(queue.delete()).toBeNull()
    expect(queue.length).toBe(0)
    queue.add(100)
    queue.add(200)
    queue.add(300)
    expect(queue.length).toBe(3)
    expect(queue.delete()).toBe(100)
    expect(queue.delete()).toBe(200)
    expect(queue.delete()).toBe(300)
    expect(queue.delete()).toBeNull()
    expect(queue.length).toBe(0)
  });
});
