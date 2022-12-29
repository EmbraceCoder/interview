import {createLinkList, reverseLinkList} from "./reverse-link-list";

describe('定义一个JS函数, 反转单向链表', function () {
  it('创建单向链表', function () {
    const linkList = [100, 200, 300]
    const res = createLinkList(linkList)
    expect(res).toEqual({ value: 100, next: { value: 200, next: { value: 300 } } })
  });
  it('反转单向链表', function () {
    const arr = [100, 200, 300]
    const linkList = createLinkList(arr)
    const res = reverseLinkList(linkList)
    expect(res).toEqual({ value: 300, next: { value: 200, next: { value: 100 } } })
  });
});

